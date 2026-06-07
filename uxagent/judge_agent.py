from __future__ import annotations

from datetime import datetime
from pathlib import Path
from typing import Literal

from .agent import (
    AuditAgent,
    _unique,
    build_coverage_state,
    build_exploration_coverage_report,
    canonicalize_open_page_url,
    build_plan_progress,
    build_session_memory,
    build_trace_chunk_summaries,
    fallback_continue_decision,
    make_run_dir,
    redundant_open_page_reason,
    resolve_open_page_target,
    should_start_mobile_phase,
    summarize_target,
)
from .config import ResolvedProviderConfig
from .eval_reporter import EvalReportWriter
from .judge_brain import DEFAULT_JUDGE_RUBRIC, JudgeBrain, get_judge_rubric
from .observer import PageObserver
from .schemas import PlanStep, SiteProfile, TraceEntry, UXEvalReport
from .tools import BrowserTools


ViewportMode = Literal["desktop", "mobile", "both"]
REQUIRED_JUDGE_STEPS = 80


class UXJudgeAgent:
    def __init__(
        self,
        run_dir: Path,
        provider_config: ResolvedProviderConfig,
        headless: bool = True,
        max_steps: int = 80,
        viewport_mode: ViewportMode = "both",
        exploration_depth: str = "exhaustive",
        protect_risky_actions: bool = True,
        judge_rubric: str = DEFAULT_JUDGE_RUBRIC,
    ):
        self.run_dir = run_dir
        self.provider_config = provider_config
        self.headless = headless
        self.max_steps = max(1, max_steps)
        self.viewport_mode = viewport_mode
        self.model = provider_config.model
        self.exploration_depth = exploration_depth
        self.protect_risky_actions = protect_risky_actions
        self.judge_rubric = judge_rubric
        self.reporter = EvalReportWriter(run_dir)

    async def run(self, profile: SiteProfile, target_url: str) -> UXEvalReport:
        if profile.skipped:
            raise ValueError(profile.skip_reason or "Site is marked skipped.")

        tools = BrowserTools(
            self.run_dir,
            headless=self.headless,
            protect_risky_actions=self.protect_risky_actions,
        )
        audit_helper = AuditAgent(
            run_dir=self.run_dir,
            provider_config=self.provider_config,
            headless=self.headless,
            max_steps=self.max_steps,
            viewport_mode=self.viewport_mode,
            exploration_depth=self.exploration_depth,
            protect_risky_actions=self.protect_risky_actions,
        )
        trace: list[TraceEntry] = []
        screenshots: list[str] = []
        rubric = get_judge_rubric(self.judge_rubric)
        if rubric.name == "controls":
            evaluated_user_goal = (
                f"Judge the control and button usability of the full {profile.name} system, using "
                f"browser evidence from the primary {profile.page_type} surface, adjacent pages, "
                "interactive states, CTA gating, mobile tap targets, and visible feedback cues."
            )
        else:
            evaluated_user_goal = (
                f"Judge the UX quality of the full {profile.name} system, using browser evidence "
                f"from the primary {profile.page_type} surface, adjacent pages, interaction states, "
                "forms, navigation, mobile responsiveness, accessibility, and visual hierarchy."
            )
        brain = JudgeBrain(provider_config=self.provider_config, rubric_name=self.judge_rubric)
        blocked_redundant_open_count = 0

        try:
            await tools.start()
            if self.viewport_mode == "mobile":
                await tools.set_viewport("mobile")
            else:
                await tools.set_viewport("desktop")

            open_result = await tools.open_page(target_url)
            if open_result.error:
                raise RuntimeError(open_result.error)

            observer = PageObserver(tools)
            observation = await observer.observe("initial")
            screenshots.append(observation.screenshot_path)
            if self.viewport_mode == "both":
                screenshots.extend(await tools.capture_viewport_pair("initial-responsive-screenshots"))
                observation = await observer.observe("initial-after-responsive-check")
                screenshots.append(observation.screenshot_path)

            prescan_summary = await audit_helper._collect_prescan(profile, target_url, tools)
            run_plan = brain.plan_run(
                profile=profile,
                evaluated_user_goal=evaluated_user_goal,
                prescan_summary=prescan_summary,
                initial_observation=observation,
                exploration_depth=self.exploration_depth,
                max_steps=self.max_steps,
                viewport_mode=self.viewport_mode,
            )
            _, plan_md_path = self.reporter.write_plan(run_plan, prescan_summary)
            print(f"Plan:   {plan_md_path}", flush=True)
            print(f"Plan Summary: {run_plan.summary}", flush=True)

            tools.clear_errors()
            reset_viewport = "mobile" if self.viewport_mode == "mobile" else "desktop"
            await tools.set_viewport(reset_viewport)
            reset_result = await tools.open_page(target_url)
            if reset_result.error:
                raise RuntimeError(reset_result.error)
            observation = await observer.observe("post-plan-reset")
            screenshots.append(observation.screenshot_path)

            planned_decisions = []
            while len(trace) < self.max_steps:
                step_index = len(trace)
                plan_progress = build_plan_progress(run_plan, profile, trace, observation)
                coverage = build_coverage_state(
                    profile=profile,
                    target_url=target_url,
                    trace=trace,
                    current_observation=observation,
                    max_steps=self.max_steps,
                    exploration_depth=self.exploration_depth,
                    viewport_mode=self.viewport_mode,
                    plan_progress=plan_progress,
                )
                if should_start_mobile_phase(coverage, self.viewport_mode, tools.current_viewport):
                    await tools.set_viewport("mobile")
                    mobile_open_result = await tools.open_page(target_url)
                    observation = await observer.observe(f"mobile-phase-{len(trace) + 1:02d}")
                    screenshots.append(observation.screenshot_path)
                    planned_decisions.append(
                        {
                            "decision_source": "coverage-mobile-phase",
                            "coverage": coverage,
                            "open_result": mobile_open_result.model_dump(mode="json"),
                        }
                    )
                    continue

                trajectory_chunks = build_trace_chunk_summaries(profile, trace)
                session_memory = build_session_memory(
                    profile=profile,
                    trace=trace,
                    current_observation=observation,
                    coverage=coverage,
                    trajectory_chunks=trajectory_chunks,
                )
                decision = brain.decide(
                    profile=profile,
                    observation=observation,
                    trace=trace,
                    run_plan=run_plan,
                    plan_progress=plan_progress,
                    session_memory=session_memory,
                    trajectory_chunks=trajectory_chunks,
                    step_index=step_index,
                    max_steps=self.max_steps,
                    exploration_depth=self.exploration_depth,
                    coverage=coverage,
                )
                planned_decisions.append(
                    {
                        "decision_source": "model",
                        "coverage": coverage,
                        **decision.model_dump(mode="json"),
                    }
                )
                if decision.done or decision.action == "finish":
                    remaining_steps = self.max_steps - len(trace)
                    continue_reason = (
                        f"{coverage.get('must_continue_reason')}; continue exploring until the full "
                        f"{self.max_steps}-step budget is used ({remaining_steps} step(s) remaining)."
                        if coverage.get("must_continue_reason")
                        else f"Continue exploring until the full {self.max_steps}-step budget is used "
                        f"({remaining_steps} step(s) remaining)."
                    )
                    decision = brain.decide(
                        profile=profile,
                        observation=observation,
                        trace=trace,
                        run_plan=run_plan,
                        plan_progress=plan_progress,
                        session_memory=session_memory,
                        trajectory_chunks=trajectory_chunks,
                        step_index=step_index,
                        max_steps=self.max_steps,
                        exploration_depth=self.exploration_depth,
                        coverage=coverage,
                        must_continue_reason=continue_reason,
                    )
                    planned_decisions.append(
                        {
                            "decision_source": "budget-retry",
                            "coverage": coverage,
                            **decision.model_dump(mode="json"),
                        }
                    )
                if decision.done or decision.action == "finish":
                    decision = fallback_continue_decision(profile, observation, coverage)
                    planned_decisions.append(
                        {
                            "decision_source": "budget-fallback",
                            "coverage": coverage,
                            **decision.model_dump(mode="json"),
                        }
                    )

                if decision.action == "open_page":
                    raw_target = str(decision.input.get("url") or decision.input.get("page") or "").strip()
                    redundant_reason = None
                    resolved_target = ""
                    if raw_target:
                        resolved_target = resolve_open_page_target(raw_target, profile, observation.url)
                        redundant_reason = redundant_open_page_reason(resolved_target, observation.url)
                    if redundant_reason:
                        blocked_redundant_open_count += 1
                        planned_decisions.append(
                            {
                                "decision_source": "redundant-open-guard",
                                "coverage": coverage,
                                "blocked_reason": redundant_reason,
                                "resolved_target": resolved_target,
                                "current_url": canonicalize_open_page_url(observation.url),
                                **decision.model_dump(mode="json"),
                            }
                        )
                        retry_reason = (
                            f"{coverage['must_continue_reason']}; avoid redundant open_page to the current "
                            "document and choose a different action or URL state."
                            if coverage.get("must_continue_reason")
                            else "Avoid redundant open_page to the current document and choose a different action or URL state."
                        )
                        decision = brain.decide(
                            profile=profile,
                            observation=observation,
                            trace=trace,
                            run_plan=run_plan,
                            plan_progress=plan_progress,
                            session_memory=session_memory,
                            trajectory_chunks=trajectory_chunks,
                            step_index=step_index,
                            max_steps=self.max_steps,
                            exploration_depth=self.exploration_depth,
                            coverage=coverage,
                            must_continue_reason=retry_reason,
                        )
                        planned_decisions.append(
                            {
                                "decision_source": "redundant-open-retry",
                                "coverage": coverage,
                                **decision.model_dump(mode="json"),
                                }
                            )
                        if decision.action == "open_page":
                            retry_target = str(
                                decision.input.get("url") or decision.input.get("page") or ""
                            ).strip()
                            retry_reason = None
                            retry_resolved_target = ""
                            if retry_target:
                                retry_resolved_target = resolve_open_page_target(
                                    retry_target,
                                    profile,
                                    observation.url,
                                )
                                retry_reason = redundant_open_page_reason(
                                    retry_resolved_target,
                                    observation.url,
                                )
                            if retry_reason:
                                blocked_redundant_open_count += 1
                                planned_decisions.append(
                                    {
                                        "decision_source": "redundant-open-retry-blocked",
                                        "coverage": coverage,
                                        "blocked_reason": retry_reason,
                                        "resolved_target": retry_resolved_target,
                                        "current_url": canonicalize_open_page_url(observation.url),
                                        **decision.model_dump(mode="json"),
                                    }
                                )
                                decision = fallback_continue_decision(profile, observation, coverage)
                                planned_decisions.append(
                                    {
                                        "decision_source": "redundant-open-fallback",
                                        "coverage": coverage,
                                        **decision.model_dump(mode="json"),
                                    }
                                )
                        if decision.done or decision.action == "finish":
                            decision = fallback_continue_decision(profile, observation, coverage)
                            planned_decisions.append(
                                {
                                    "decision_source": "redundant-open-fallback",
                                    "coverage": coverage,
                                    **decision.model_dump(mode="json"),
                                }
                            )

                step_input = {**decision.input, "target_id": decision.target_id}
                if decision.target_id:
                    step_input["target_summary"] = summarize_target(
                        decision.target_id,
                        observation,
                        profile,
                    )
                step = PlanStep(
                    id=f"judge-{len(trace) + 1:02d}-{decision.action}",
                    objective=decision.objective,
                    tool=decision.action,
                    input=step_input,
                    success_criteria=decision.success_criteria,
                )
                result = await audit_helper._execute_agentic_decision(
                    step,
                    decision,
                    tools,
                    observation,
                    profile,
                )
                observation = await observer.observe(step.id)
                screenshots.append(observation.screenshot_path)
                screenshots.extend(result.screenshot_paths)

                post_step_plan_progress = build_plan_progress(run_plan, profile, trace, observation)
                post_step_coverage = build_coverage_state(
                    profile=profile,
                    target_url=target_url,
                    trace=trace,
                    current_observation=observation,
                    max_steps=self.max_steps,
                    exploration_depth=self.exploration_depth,
                    viewport_mode=self.viewport_mode,
                    completed_steps=1,
                    plan_progress=post_step_plan_progress,
                )
                reflection = brain.reflect_step(
                    profile=profile,
                    step=step,
                    result=result,
                    observation=observation,
                    coverage=post_step_coverage,
                )
                if reflection.done and len(trace) + 1 < self.max_steps:
                    reflection.done = False
                    reflection.need_replan = True
                    reflection.ux_notes.append(
                        f"Budget gate kept judge exploration active: {self.max_steps - (len(trace) + 1)} "
                        "step(s) still remain in the required exhaustive run."
                    )
                step.status = "failed" if result.error else "done"
                trace.append(
                    TraceEntry(
                        step=step,
                        result=result,
                        observation=observation,
                        reflection=reflection,
                    )
                )
                if reflection.done:
                    break

            final_plan_progress = build_plan_progress(run_plan, profile, trace, observation)
            final_coverage = build_coverage_state(
                profile=profile,
                target_url=target_url,
                trace=trace,
                current_observation=observation,
                max_steps=self.max_steps,
                exploration_depth=self.exploration_depth,
                viewport_mode=self.viewport_mode,
                plan_progress=final_plan_progress,
            )
            exploration_coverage = build_exploration_coverage_report(
                profile=profile,
                trace=trace,
                final_coverage=final_coverage,
                viewport_mode=self.viewport_mode,
                blocked_redundant_open_count=blocked_redundant_open_count,
            )
            trajectory_chunks = build_trace_chunk_summaries(profile, trace)
            session_memory = build_session_memory(
                profile=profile,
                trace=trace,
                current_observation=observation,
                coverage=final_coverage,
                trajectory_chunks=trajectory_chunks,
            )
            variant_probe_plan = None
            variant_probe_plan_paths: dict[str, str] = {}
            build_variant_probe_plan = getattr(brain, "build_variant_probe_plan", None)
            if callable(build_variant_probe_plan):
                variant_probe_plan = build_variant_probe_plan(
                    profile=profile,
                    trace=trace,
                    evaluated_user_goal=evaluated_user_goal,
                    run_plan=run_plan,
                    session_memory=session_memory,
                    trajectory_chunks=trajectory_chunks,
                    coverage=exploration_coverage,
                    final_observation=observation,
                )
                probe_json_path, probe_md_path = self.reporter.write_variant_probe_plan(variant_probe_plan)
                variant_probe_plan_paths = {
                    "json": str(probe_json_path.resolve()),
                    "md": str(probe_md_path.resolve()),
                }
            final_eval_debug_paths: dict[str, str]
            final_eval_result = brain.final_eval(
                profile=profile,
                trace=trace,
                evaluated_user_goal=evaluated_user_goal,
                session_memory=session_memory,
                trajectory_chunks=trajectory_chunks,
                coverage=exploration_coverage,
                final_observation=observation,
            )
            final_eval_debug_paths = self.reporter.write_final_eval_debug(
                raw_text=final_eval_result.get("raw_text"),
                parsed_payload=final_eval_result.get("parsed_payload"),
                validation={
                    **final_eval_result["validation"],
                    "coverage": exploration_coverage,
                    "coverage_gate_satisfied": bool(final_coverage.get("stop_allowed", False)),
                    "coverage_gate_reason": final_coverage.get("must_continue_reason", ""),
                },
            )
            if final_eval_result["ok"]:
                eval_payload = final_eval_result["normalized_payload"]
                report = UXEvalReport(
                    target=target_url,
                    site=profile,
                    evaluated_user_goal=evaluated_user_goal,
                    status="complete",
                    summary=eval_payload["summary"],
                    overall_score=eval_payload["overall_score"],
                    overall_score_raw=eval_payload.get("overall_score_raw"),
                    metrics=eval_payload["metrics"],
                    evidence_confidence=min_confidence(
                        eval_payload["evidence_confidence"],
                        exploration_coverage.get("confidence", "medium"),
                    ),
                    top_issues=eval_payload["top_issues"],
                    exploration_plan=run_plan,
                    variant_probe_plan=variant_probe_plan,
                    coverage=exploration_coverage,
                    screenshots=_unique(screenshots),
                    trace_entries=len(trace),
                    run_dir=str(self.run_dir.resolve()),
                )
            else:
                report = UXEvalReport(
                    target=target_url,
                    site=profile,
                    evaluated_user_goal=evaluated_user_goal,
                    status="invalid_eval",
                    summary=(
                        "The browser exploration completed, but the final model scoring payload was invalid, "
                        "so no UX score was generated."
                    ),
                    overall_score=None,
                    overall_score_raw=None,
                    metrics={},
                    evidence_confidence="low",
                    top_issues=[],
                    exploration_plan=run_plan,
                    variant_probe_plan=variant_probe_plan,
                    coverage=exploration_coverage,
                    screenshots=_unique(screenshots),
                    trace_entries=len(trace),
                    run_dir=str(self.run_dir.resolve()),
                    eval_error=final_eval_result["error"],
                )
            self.reporter.write_trace(
                trace,
                metadata={
                    "mode": "judge",
                    "provider": self.provider_config.name,
                    "model": self.model,
                    "base_url": self.provider_config.base_url,
                    "coverage_mode": "coverage-guided",
                    "exploration_depth": self.exploration_depth,
                    "created_at": datetime.now().isoformat(timespec="seconds"),
                    "target": target_url,
                    "site": profile.model_dump(mode="json"),
                    "rubric_name": rubric.name,
                    "rubric": rubric.summary,
                    "run_plan": run_plan.model_dump(mode="json"),
                    "prescan_summary": prescan_summary,
                    "judge_decisions": planned_decisions,
                    "final_coverage": final_coverage,
                    "final_plan_progress": final_plan_progress,
                    "exploration_coverage": exploration_coverage,
                    "session_memory": session_memory,
                    "trajectory_chunks": trajectory_chunks,
                    "open_result": open_result.model_dump(mode="json"),
                    "final_eval_artifacts": final_eval_debug_paths,
                    "variant_probe_plan_artifacts": variant_probe_plan_paths,
                    "blocked_redundant_open_count": blocked_redundant_open_count,
                    "report_status": report.status,
                },
            )
            self.reporter.write_eval(report)
            return report
        finally:
            await tools.close()


__all__ = ["UXJudgeAgent", "make_run_dir", "resolve_open_page_target"]


CONFIDENCE_ORDER = {"low": 0, "medium": 1, "high": 2}


def min_confidence(*values: str) -> str:
    normalized = [str(value or "medium").strip().lower() for value in values]
    valid_values = [value for value in normalized if value in CONFIDENCE_ORDER]
    if not valid_values:
        return "medium"
    return min(valid_values, key=lambda value: CONFIDENCE_ORDER[value])
