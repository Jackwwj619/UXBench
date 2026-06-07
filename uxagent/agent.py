from __future__ import annotations

import math
import re
from collections import Counter
from datetime import datetime
from pathlib import Path
from typing import Any, Literal
from urllib.parse import unquote, urljoin, urlparse, urlunsplit

from .brain import AgenticBrain
from .config import ResolvedProviderConfig
from .observer import PageObserver
from .reporter import ReportWriter
from .schemas import (
    AgentDecision,
    AuditReport,
    ExplorationPlan,
    Observation,
    PlanStep,
    SiteProfile,
    ToolResult,
    TraceEntry,
)
from .tools import BrowserTools


ViewportMode = Literal["desktop", "mobile", "both"]

MIN_STEPS_BY_DEPTH = {
    "quick": 6,
    "standard": 12,
    "deep": 20,
    "exhaustive": 32,
}

MIN_UNIQUE_PAGES_BY_DEPTH = {
    "quick": 4,
    "standard": 6,
    "deep": 8,
    "exhaustive": 10,
}

UNIQUE_PAGE_RATIO_BY_DEPTH = {
    "quick": 0.25,
    "standard": 0.40,
    "deep": 0.65,
    "exhaustive": 1.00,
}


class AuditAgent:
    def __init__(
        self,
        run_dir: Path,
        provider_config: ResolvedProviderConfig,
        headless: bool = True,
        max_steps: int = 80,
        viewport_mode: ViewportMode = "both",
        exploration_depth: str = "exhaustive",
        protect_risky_actions: bool = True,
    ):
        self.run_dir = run_dir
        self.provider_config = provider_config
        self.headless = headless
        self.max_steps = max_steps
        self.viewport_mode = viewport_mode
        self.model = provider_config.model
        self.exploration_depth = exploration_depth
        self.protect_risky_actions = protect_risky_actions
        self.reporter = ReportWriter(run_dir)

    async def run(self, profile: SiteProfile, target_url: str) -> AuditReport:
        return await self._run_agentic(profile, target_url)

    async def _run_agentic(self, profile: SiteProfile, target_url: str) -> AuditReport:
        if profile.skipped:
            raise ValueError(profile.skip_reason or "Site is marked skipped.")

        tools = BrowserTools(
            self.run_dir,
            headless=self.headless,
            protect_risky_actions=self.protect_risky_actions,
        )
        trace: list[TraceEntry] = []
        screenshots: list[str] = []
        explored_goal = (
            f"Autonomously explore and critique the UX of the full {profile.name} system, "
            f"prioritizing the primary {profile.page_type} flow plus adjacent pages, states, "
            "and recovery paths."
        )
        brain = AgenticBrain(provider_config=self.provider_config)

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

            prescan_summary = await self._collect_prescan(profile, target_url, tools)
            run_plan = brain.plan_run(
                profile=profile,
                explored_user_goal=explored_goal,
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
            for index in range(self.max_steps):
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
                    observation = await observer.observe(f"mobile-phase-{index + 1:02d}")
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
                    step_index=index,
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
                if (decision.done or decision.action == "finish") and not coverage["stop_allowed"]:
                    decision = brain.decide(
                        profile=profile,
                        observation=observation,
                        trace=trace,
                        run_plan=run_plan,
                        plan_progress=plan_progress,
                        session_memory=session_memory,
                        trajectory_chunks=trajectory_chunks,
                        step_index=index,
                        max_steps=self.max_steps,
                        exploration_depth=self.exploration_depth,
                        coverage=coverage,
                        must_continue_reason=coverage["must_continue_reason"],
                    )
                    planned_decisions.append(
                        {
                            "decision_source": "coverage-retry",
                            "coverage": coverage,
                            **decision.model_dump(mode="json"),
                        }
                    )
                if (decision.done or decision.action == "finish") and not coverage["stop_allowed"]:
                    decision = fallback_continue_decision(profile, observation, coverage)
                    planned_decisions.append(
                        {
                            "decision_source": "coverage-fallback",
                            "coverage": coverage,
                            **decision.model_dump(mode="json"),
                        }
                    )
                if decision.done or decision.action == "finish":
                    break

                step_input = {**decision.input, "target_id": decision.target_id}
                if decision.target_id:
                    step_input["target_summary"] = summarize_target(decision.target_id, observation, profile)
                step = PlanStep(
                    id=f"agentic-{index + 1:02d}-{decision.action}",
                    objective=decision.objective,
                    tool=decision.action,
                    input=step_input,
                    success_criteria=decision.success_criteria,
                )
                result = await self._execute_agentic_decision(
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
                if reflection.done and not post_step_coverage["stop_allowed"]:
                    reflection.done = False
                    reflection.need_replan = True
                    reflection.ux_notes.append(
                        "Coverage gate kept exploration active: "
                        f"{post_step_coverage['must_continue_reason']}"
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
            )
            trajectory_chunks = build_trace_chunk_summaries(profile, trace)
            session_memory = build_session_memory(
                profile=profile,
                trace=trace,
                current_observation=observation,
                coverage=final_coverage,
                trajectory_chunks=trajectory_chunks,
            )
            summary, findings = brain.final_findings(
                profile,
                trace,
                explored_goal,
                session_memory=session_memory,
                trajectory_chunks=trajectory_chunks,
                coverage=exploration_coverage,
                final_observation=observation,
            )
            report = AuditReport(
                target=target_url,
                site=profile,
                explored_user_goal=explored_goal,
                exploration_summary=summary,
                exploration_plan=run_plan,
                findings=findings,
                coverage=exploration_coverage,
                screenshots=_unique(screenshots),
                trace_entries=len(trace),
                run_dir=str(self.run_dir.resolve()),
            )

            self.reporter.write_trace(
                trace,
                metadata={
                    "mode": "agentic",
                    "provider": self.provider_config.name,
                    "model": self.model,
                    "base_url": self.provider_config.base_url,
                    "coverage_mode": "coverage-first",
                    "exploration_depth": self.exploration_depth,
                    "created_at": datetime.now().isoformat(timespec="seconds"),
                    "target": target_url,
                    "site": profile.model_dump(mode="json"),
                    "run_plan": run_plan.model_dump(mode="json"),
                    "prescan_summary": prescan_summary,
                    "agent_decisions": planned_decisions,
                    "final_coverage": final_coverage,
                    "final_plan_progress": final_plan_progress,
                    "exploration_coverage": exploration_coverage,
                    "session_memory": session_memory,
                    "trajectory_chunks": trajectory_chunks,
                    "open_result": open_result.model_dump(mode="json"),
                },
            )
            self.reporter.write_report(report)
            return report
        finally:
            await tools.close()

    async def _execute_agentic_decision(
        self,
        step: PlanStep,
        decision,
        tools: BrowserTools,
        observation: Observation,
        profile: SiteProfile,
    ) -> ToolResult:
        action = decision.action
        target_id = decision.target_id or step.input.get("target_id")
        if action == "open_page":
            raw_target = str(decision.input.get("url") or decision.input.get("page") or "").strip()
            if not raw_target:
                return ToolResult(
                    action="open_page",
                    before_url=observation.url,
                    after_url=observation.url,
                    error="open_page requires input.page or input.url.",
                )
            target_url = resolve_open_page_target(raw_target, profile, observation.url)
            redundant_reason = redundant_open_page_reason(target_url, observation.url)
            if redundant_reason:
                return ToolResult(
                    action="open_page",
                    before_url=observation.url,
                    after_url=observation.url,
                    error=f"Blocked redundant open_page: {redundant_reason}.",
                )
            return await tools.open_page(target_url)
        if action == "click":
            if not target_id:
                return missing_target_result(action, observation.url)
            return await tools.click(target_id)
        if action == "hover":
            if not target_id:
                return missing_target_result(action, observation.url)
            return await tools.hover(target_id)
        if action == "type_text":
            if not target_id:
                return missing_target_result(action, observation.url)
            return await tools.type_text(
                target_id=target_id,
                text=str(decision.input.get("text", "")),
                enter=bool(decision.input.get("enter", False)),
            )
        if action == "select_option":
            if not target_id:
                return missing_target_result(action, observation.url)
            return await tools.select_option(target_id, value=decision.input.get("value"))
        if action in {"check", "uncheck"}:
            if not target_id:
                return missing_target_result(action, observation.url)
            return await tools.check(target_id, checked=action == "check")
        if action == "drag":
            if not target_id:
                return missing_target_result(action, observation.url)
            return await tools.drag(
                target_id,
                delta_x=int(decision.input.get("delta_x", 120)),
                delta_y=int(decision.input.get("delta_y", 0)),
            )
        if action == "scroll":
            return await tools.scroll(
                delta_x=int(decision.input.get("delta_x", 0)),
                delta_y=int(decision.input.get("delta_y", 700)),
                target_id=target_id,
                to=decision.input.get("to"),
            )
        if action == "press_key":
            return await tools.press_key(str(decision.input.get("key", "Enter")))
        if action == "go_back":
            return await tools.go_back()
        if action == "go_forward":
            return await tools.go_forward()
        if action == "reload":
            return await tools.reload()
        if action == "wait":
            return await tools.wait(float(decision.input.get("seconds", 1.0)))
        if action == "screenshot_pair":
            paths = await tools.capture_viewport_pair(step.id)
            return ToolResult(
                action="screenshot_pair",
                before_url=observation.url,
                after_url=observation.url,
                changed=False,
                feedback="Captured responsive screenshots.",
                screenshot_paths=paths,
            )
        return ToolResult(
            action=action,
            before_url=observation.url,
            after_url=observation.url,
            error=f"Unsupported agentic action: {action}",
        )

    async def _collect_prescan(
        self,
        profile: SiteProfile,
        target_url: str,
        tools: BrowserTools,
    ) -> list[dict[str, Any]]:
        pages = [profile.start_page, *[page for page in profile.html_files if page != profile.start_page]]
        if not pages:
            pages = [relative_page_hint(target_url, profile)]

        summary: list[dict[str, Any]] = []
        for page in pages:
            target = resolve_open_page_target(page, profile, target_url) if page else target_url
            tools.clear_errors()
            result = await tools.open_page(target)
            page_handle = tools._page()
            dom_summary = await tools.get_dom_summary()
            interactables = await tools.get_interactables()
            layout_warnings = await tools.measure_layout()
            page_hint = relative_page_hint(page_handle.url or target, profile)
            summary.append(
                {
                    "page": page_hint,
                    "title": await page_handle.title(),
                    "url": page_handle.url,
                    "load_error": result.error,
                    "visible_text_excerpt": dom_summary.get("visible_text", "")[:900],
                    "headings": (dom_summary.get("headings") or [])[:10],
                    "counts": dom_summary.get("counts", {}),
                    "top_interactables": summarize_interactables(interactables[:16]),
                    "layout_warning_kinds": [warning.kind for warning in layout_warnings[:10]],
                    "console_errors": list(tools.console_errors[-4:]),
                    "network_errors": list(tools.network_errors[-4:]),
                }
            )
        return summary



def make_run_dir(out_dir: Path) -> Path:
    name = datetime.now().strftime("%Y%m%d-%H%M%S")
    run_dir = out_dir / name
    suffix = 1
    while run_dir.exists():
        run_dir = out_dir / f"{name}-{suffix}"
        suffix += 1
    run_dir.mkdir(parents=True, exist_ok=False)
    return run_dir


def _unique(paths: list[str]) -> list[str]:
    seen: set[str] = set()
    result: list[str] = []
    for path in paths:
        if path and path not in seen:
            seen.add(path)
            result.append(path)
    return result


def summarize_interactables(items) -> list[str]:
    summary: list[str] = []
    seen: set[str] = set()
    for item in items:
        label = feature_label(item.model_dump(mode="json"))
        text = f"{item.kind}:{item.tag}:{label}"
        if text in seen:
            continue
        seen.add(text)
        summary.append(text[:180])
    return summary


def build_trace_chunk_summaries(
    profile: SiteProfile,
    trace: list[TraceEntry],
    chunk_size: int = 6,
) -> list[dict[str, Any]]:
    if not trace:
        return []

    summaries: list[dict[str, Any]] = []
    for start in range(0, len(trace), chunk_size):
        chunk = trace[start : start + chunk_size]
        pages = _unique(
            [relative_page_hint(entry.observation.url, profile) for entry in chunk if entry.observation.url]
        )
        viewports = _unique([entry.observation.viewport for entry in chunk if entry.observation.viewport])
        action_counts = Counter(entry.step.tool for entry in chunk)
        objectives = _unique(
            [str(entry.step.objective).strip()[:180] for entry in chunk if str(entry.step.objective).strip()]
        )[:6]
        tested_controls = _unique(
            [
                summary
                for entry in chunk
                if (summary := summarize_step_target(entry, profile))
            ]
        )[:10]
        ux_signals = _unique(
            [
                note.strip()[:240]
                for entry in chunk
                for note in entry.reflection.ux_notes
                if str(note).strip()
            ]
        )[:8]
        failures = _unique(
            [str(entry.result.error).strip() for entry in chunk if str(entry.result.error or "").strip()]
        )[:4]
        summaries.append(
            {
                "chunk_id": f"steps-{start + 1:02d}-{start + len(chunk):02d}",
                "step_range": {
                    "start": start + 1,
                    "end": start + len(chunk),
                },
                "pages": pages,
                "viewports": viewports,
                "action_counts": dict(sorted(action_counts.items())),
                "objectives": objectives,
                "tested_controls": tested_controls,
                "ux_signals": ux_signals,
                "failures": failures,
                "successful_actions": sum(1 for entry in chunk if not entry.result.error),
                "changed_actions": sum(1 for entry in chunk if entry.result.changed),
            }
        )
    return summaries


def build_session_memory(
    profile: SiteProfile,
    trace: list[TraceEntry],
    current_observation: Observation,
    coverage: dict[str, Any],
    trajectory_chunks: list[dict[str, Any]],
) -> dict[str, Any]:
    feature_gate = estimate_feature_coverage(profile, trace)
    visited_pages = list(coverage.get("visited_pages") or [])
    if current_observation.url:
        current_page = relative_page_hint(current_observation.url, profile)
        if current_page and current_page not in visited_pages:
            visited_pages.append(current_page)

    visited_viewports = _unique(
        [
            *[entry.observation.viewport for entry in trace if entry.observation.viewport],
            current_observation.viewport,
        ]
    )
    tested_controls = _unique(
        [
            summary
            for entry in trace
            if (summary := summarize_step_target(entry, profile))
        ]
    )[:14]
    important_ux_signals = _unique(
        [
            note.strip()[:240]
            for entry in trace
            for note in entry.reflection.ux_notes
            if str(note).strip()
        ]
    )[:10]
    notable_failures = _unique(
        [str(entry.result.error).strip() for entry in trace if str(entry.result.error or "").strip()]
    )[:8]
    open_questions = [str(item).strip() for item in coverage.get("remaining_requirements") or [] if str(item).strip()]
    for feature in feature_gate.get("unexplored_features", [])[:4]:
        label = str(feature.get("label") or feature.get("signature") or "").strip()
        page = str(feature.get("page") or "").strip()
        if label:
            open_questions.append(f"Still untested: {page + ': ' if page else ''}{label}")
    open_questions = _unique(open_questions)[:10]

    candidate_findings = list(notable_failures)
    candidate_findings.extend(
        signal
        for signal in important_ux_signals
        if any(
            keyword in signal.lower()
            for keyword in ("no ", "not ", "lack", "without", "unclear", "failed", "error")
        )
    )
    candidate_findings.extend(
        summary
        for entry in trace
        if (summary := summarize_layout_warning(entry, profile))
    )

    return {
        "steps_recorded": len(trace),
        "visited_pages": visited_pages[:20],
        "visited_viewports": visited_viewports,
        "tested_controls": tested_controls,
        "notable_failures": notable_failures,
        "important_ux_signals": important_ux_signals,
        "open_questions": open_questions,
        "candidate_findings": _unique(candidate_findings)[:10],
        "recent_chunks": [chunk["chunk_id"] for chunk in trajectory_chunks[-3:]],
        "feature_coverage_percent": feature_gate["feature_coverage_percent"],
    }


def summarize_step_target(entry: TraceEntry, profile: SiteProfile) -> str:
    target_summary = entry.step.input.get("target_summary")
    if isinstance(target_summary, dict):
        page = str(target_summary.get("page") or relative_page_hint(entry.observation.url, profile)).strip()
        label = feature_label(target_summary)
        if label and label != "unlabeled control":
            return f"{page}: {label}" if page else label
        if page:
            return page

    if entry.step.tool == "open_page":
        page = str(entry.step.input.get("page") or "").strip()
        if page:
            return f"open_page: {page}"
    return ""


def summarize_layout_warning(entry: TraceEntry, profile: SiteProfile) -> str:
    for warning in entry.observation.layout_warnings:
        if warning.severity != "low":
            page = relative_page_hint(entry.observation.url, profile)
            return f"{page}: {warning.message}"
    return ""


def build_coverage_state(
    profile: SiteProfile,
    target_url: str,
    trace: list[TraceEntry],
    current_observation: Observation | None,
    max_steps: int,
    exploration_depth: str,
    viewport_mode: ViewportMode = "desktop",
    completed_steps: int = 0,
    plan_progress: dict[str, Any] | None = None,
) -> dict:
    known_pages = list(profile.html_files)
    visited_candidates = [relative_page_hint(target_url, profile)]
    visited_candidates.extend(relative_page_hint(entry.observation.url, profile) for entry in trace)
    if current_observation:
        visited_candidates.append(relative_page_hint(current_observation.url, profile))
    visited_pages = _unique([page for page in visited_candidates if page])

    steps_taken = len(trace) + completed_steps
    min_steps = min(MIN_STEPS_BY_DEPTH[exploration_depth], max_steps)

    if known_pages:
        ratio_target = math.ceil(len(known_pages) * UNIQUE_PAGE_RATIO_BY_DEPTH[exploration_depth])
        desired_unique_pages = max(MIN_UNIQUE_PAGES_BY_DEPTH[exploration_depth], ratio_target)
        desired_unique_pages = min(desired_unique_pages, len(known_pages))
    else:
        desired_unique_pages = MIN_UNIQUE_PAGES_BY_DEPTH[exploration_depth]
    desired_unique_pages = min(desired_unique_pages, max_steps + 1)

    remaining_steps_needed = max(0, min_steps - steps_taken)
    remaining_pages_needed = max(0, desired_unique_pages - len(visited_pages))
    unvisited_pages = [page for page in known_pages if page not in visited_pages]
    viewport_steps = Counter(entry.observation.viewport for entry in trace)
    if completed_steps and current_observation:
        viewport_steps[current_observation.viewport] += completed_steps
    feature_gate = estimate_feature_coverage(profile, trace)

    core_remaining_requirements: list[str] = []
    if remaining_steps_needed:
        core_remaining_requirements.append(f"take {remaining_steps_needed} more action(s)")
    if remaining_pages_needed:
        core_remaining_requirements.append(f"visit {remaining_pages_needed} more unique page(s)")
    if not remaining_pages_needed and unvisited_pages and exploration_depth in {"deep", "exhaustive"}:
        core_remaining_requirements.append(
            f"inspect additional unvisited page(s), such as {', '.join(unvisited_pages[:3])}"
        )
    min_feature_coverage = {
        "quick": 0,
        "standard": 35,
        "deep": 55,
        "exhaustive": 70,
    }[exploration_depth]
    if (
        trace
        and feature_gate["observed_feature_count"] >= 4
        and feature_gate["feature_coverage_percent"] < min_feature_coverage
        and steps_taken < max_steps
    ):
        core_remaining_requirements.append(
            "exercise more visible controls/features "
            f"({feature_gate['feature_coverage_percent']}% of {min_feature_coverage}% target)"
        )

    min_mobile_steps = 0
    remaining_mobile_steps = 0
    if viewport_mode == "both":
        min_mobile_steps = min(max_steps, max(8, min(16, math.ceil(max_steps * 0.2))))
        remaining_mobile_steps = max(0, min_mobile_steps - viewport_steps.get("mobile", 0))

    remaining_requirements = list(core_remaining_requirements)
    if remaining_mobile_steps:
        remaining_requirements.append(f"exercise mobile viewport with {remaining_mobile_steps} more action(s)")

    plan_phase_status = (plan_progress or {}).get("phase_status") or []
    known_page_set = set(known_pages)
    unvisited_plan_pages: list[str] = []
    phases_missing_interaction: list[dict[str, Any]] = []
    incomplete_phase_summaries: list[str] = []
    for phase in plan_phase_status:
        remaining_targets = [
            page
            for page in (phase.get("remaining_target_pages") or [])
            if not known_page_set or page in known_page_set
        ]
        for page in remaining_targets:
            if page not in unvisited_plan_pages:
                unvisited_plan_pages.append(page)
        target_pages = phase.get("visited_target_pages", []) + remaining_targets
        if target_pages and not remaining_targets and not phase.get("interactions_count"):
            phases_missing_interaction.append(
                {
                    "id": phase.get("id"),
                    "title": phase.get("title"),
                    "viewport_scope": phase.get("viewport_scope"),
                    "visited_target_pages": phase.get("visited_target_pages", []),
                }
            )
        if phase.get("status") not in {"complete", "covered_pages"}:
            scope = phase.get("viewport_scope") or "desktop"
            label = phase.get("title") or phase.get("id") or "phase"
            hint_parts = [f"'{label}' [{scope}]"]
            if remaining_targets:
                hint_parts.append("visit " + ", ".join(remaining_targets[:3]))
            elif not phase.get("interactions_count"):
                hint_parts.append("interact, don't just open_page")
            incomplete_phase_summaries.append(" — ".join(hint_parts))

    if unvisited_plan_pages:
        remaining_requirements.append(
            f"visit {len(unvisited_plan_pages)} more plan-required page(s): "
            + ", ".join(unvisited_plan_pages[:5])
        )
    if phases_missing_interaction:
        labels = [
            (phase.get("title") or phase.get("id") or "phase")
            for phase in phases_missing_interaction[:3]
        ]
        remaining_requirements.append(
            f"interact (not just navigate) in {len(phases_missing_interaction)} plan phase(s): "
            + ", ".join(labels)
        )

    stop_allowed = not remaining_requirements
    if stop_allowed:
        must_continue_reason = ""
    else:
        must_continue_reason = "Coverage requirements are not satisfied yet: " + "; ".join(
            remaining_requirements
        )
        if incomplete_phase_summaries:
            must_continue_reason += ". Next plan focus: " + "; ".join(
                incomplete_phase_summaries[:3]
            )

    return {
        "mode": "coverage-first",
        "steps_taken": steps_taken,
        "step_budget": max_steps,
        "steps_remaining_budget": max(0, max_steps - steps_taken),
        "min_steps_required": min_steps,
        "unique_pages_visited": len(visited_pages),
        "min_unique_pages_required": desired_unique_pages,
        "viewport_steps": dict(sorted(viewport_steps.items())),
        "min_mobile_steps_required": min_mobile_steps,
        "remaining_mobile_steps": remaining_mobile_steps,
        "feature_coverage_percent": feature_gate["feature_coverage_percent"],
        "min_feature_coverage_required": min_feature_coverage,
        "unexplored_feature_examples": feature_gate["unexplored_features"][:12],
        "visited_pages": visited_pages[:20],
        "unvisited_pages": unvisited_pages[:20],
        "known_site_pages": len(known_pages),
        "core_remaining_requirements": core_remaining_requirements,
        "remaining_requirements": remaining_requirements,
        "unvisited_plan_pages": unvisited_plan_pages,
        "phases_missing_interaction": phases_missing_interaction,
        "incomplete_phase_summaries": incomplete_phase_summaries,
        "must_continue_reason": must_continue_reason,
        "stop_allowed": stop_allowed,
    }


def _phase_is_mobile(phase) -> bool:
    haystack = f"{phase.id} {phase.title} {phase.objective}".lower()
    return "mobile" in haystack or "responsive" in haystack


def build_plan_progress(
    run_plan: ExplorationPlan,
    profile: SiteProfile,
    trace: list[TraceEntry],
    current_observation: Observation,
) -> dict[str, Any]:
    desktop_visited: set[str] = set()
    mobile_visited: set[str] = set()
    desktop_interacted: set[str] = set()
    mobile_interacted: set[str] = set()
    for entry in trace:
        page = relative_page_hint(entry.observation.url, profile)
        if not page:
            continue
        if entry.observation.viewport == "mobile":
            mobile_visited.add(page)
            if entry.step.tool != "open_page":
                mobile_interacted.add(page)
        else:
            desktop_visited.add(page)
            if entry.step.tool != "open_page":
                desktop_interacted.add(page)
    current_page = relative_page_hint(current_observation.url, profile)
    current_viewport = current_observation.viewport
    if current_page:
        if current_viewport == "mobile":
            mobile_visited.add(current_page)
        else:
            desktop_visited.add(current_page)
    visited_pages = desktop_visited | mobile_visited

    phase_status: list[dict[str, Any]] = []
    for phase in run_plan.phases:
        is_mobile = _phase_is_mobile(phase)
        relevant_visited = mobile_visited if is_mobile else desktop_visited
        relevant_interacted = mobile_interacted if is_mobile else desktop_interacted
        target_pages = [page for page in phase.target_pages if page]
        visited_targets = [page for page in target_pages if page in relevant_visited]
        remaining_targets = [page for page in target_pages if page not in relevant_visited]
        interacted_targets = [page for page in target_pages if page in relevant_interacted]
        interactions_count = (
            len(interacted_targets)
            if target_pages
            else sum(
                1
                for entry in trace
                if (entry.observation.viewport == "mobile") == is_mobile
                and entry.step.tool != "open_page"
            )
        )
        if not target_pages:
            phase_has_progress = interactions_count > 0
            status = "in_progress" if phase_has_progress else "pending"
        elif not remaining_targets and interactions_count > 0:
            status = "complete"
        elif not remaining_targets:
            status = "covered_pages"  # pages visited but no real interaction yet
        elif visited_targets or current_page in target_pages:
            status = "in_progress"
        else:
            status = "pending"
        phase_status.append(
            {
                "id": phase.id,
                "title": phase.title,
                "status": status,
                "viewport_scope": "mobile" if is_mobile else "desktop",
                "visited_target_pages": visited_targets,
                "remaining_target_pages": remaining_targets,
                "interacted_target_pages": interacted_targets,
                "interactions_count": interactions_count,
            }
        )

    active_phase = next(
        (phase for phase in phase_status if phase["status"] not in {"complete", "covered_pages"}),
        phase_status[-1] if phase_status else None,
    )
    return {
        "visited_pages": sorted(visited_pages),
        "desktop_visited_pages": sorted(desktop_visited),
        "mobile_visited_pages": sorted(mobile_visited),
        "current_page": current_page,
        "current_viewport": current_viewport,
        "phase_status": phase_status,
        "active_phase_id": active_phase["id"] if active_phase else None,
        "active_phase_title": active_phase["title"] if active_phase else None,
    }


def should_start_mobile_phase(coverage: dict, viewport_mode: ViewportMode, current_viewport: str) -> bool:
    core_requirements = coverage.get("core_remaining_requirements") or []
    page_or_step_requirements = [
        requirement
        for requirement in core_requirements
        if not str(requirement).startswith("exercise more visible controls/features")
    ]
    reserve_mobile_budget = coverage.get("steps_remaining_budget", 0) <= coverage.get(
        "min_mobile_steps_required",
        0,
    ) + 1
    return (
        viewport_mode == "both"
        and current_viewport != "mobile"
        and coverage.get("remaining_mobile_steps", 0) > 0
        and not page_or_step_requirements
        and (not core_requirements or reserve_mobile_budget)
    )


def summarize_target(target_id: str, observation: Observation, profile: SiteProfile) -> dict[str, Any]:
    page = relative_page_hint(observation.url, profile)
    for item in observation.interactables:
        if item.target_id == target_id:
            return {
                "target_id": item.target_id,
                "page": page,
                "viewport": observation.viewport,
                "kind": item.kind,
                "tag": item.tag,
                "role": item.role,
                "name": item.name,
                "text": item.text,
                "label": item.label,
                "placeholder": item.placeholder,
                "href": item.href,
                "input_type": item.input_type,
                "enabled": item.enabled,
                "bbox": item.bbox,
            }
    return {"target_id": target_id, "page": page, "viewport": observation.viewport}


def estimate_feature_coverage(profile: SiteProfile, trace: list[TraceEntry]) -> dict[str, Any]:
    feature_map: dict[str, dict[str, Any]] = {}
    acted_features: set[str] = set()
    for entry in trace:
        page = relative_page_hint(entry.observation.url, profile)
        for item in entry.observation.interactables:
            if not item.visible or not item.enabled:
                continue
            signature = feature_signature(page, item.model_dump(mode="json"))
            feature_map.setdefault(
                signature,
                {
                    "signature": signature,
                    "page": page,
                    "viewport": entry.observation.viewport,
                    "kind": item.kind,
                    "tag": item.tag,
                    "label": feature_label(item.model_dump(mode="json")),
                },
            )
        target_summary = entry.step.input.get("target_summary")
        if isinstance(target_summary, dict):
            acted_features.add(feature_signature(str(target_summary.get("page") or page), target_summary))

    feature_signatures = set(feature_map)
    unexplored_features = [
        feature
        for signature, feature in sorted(feature_map.items())
        if signature not in acted_features and feature.get("kind") != "other"
    ]
    feature_coverage_percent = (
        round((len(acted_features & feature_signatures) / len(feature_signatures)) * 100)
        if feature_signatures
        else 100
    )
    return {
        "feature_map": feature_map,
        "acted_features": acted_features,
        "feature_coverage_percent": feature_coverage_percent,
        "observed_feature_count": len(feature_map),
        "exercised_feature_count": len(acted_features & feature_signatures),
        "unexplored_features": unexplored_features,
    }


def build_exploration_coverage_report(
    profile: SiteProfile,
    trace: list[TraceEntry],
    final_coverage: dict,
    viewport_mode: ViewportMode,
    blocked_redundant_open_count: int = 0,
) -> dict[str, Any]:
    known_pages = list(profile.html_files)
    visited_pages = list(final_coverage.get("visited_pages") or [])
    page_coverage_percent = round((len(visited_pages) / len(known_pages)) * 100) if known_pages else 100

    feature_gate = estimate_feature_coverage(profile, trace)
    feature_map = feature_gate["feature_map"]
    feature_coverage_percent = feature_gate["feature_coverage_percent"]
    unexplored_features = feature_gate["unexplored_features"]

    action_counts = Counter(entry.step.tool for entry in trace)
    failed_actions = sum(1 for entry in trace if entry.result.error)
    unchanged_actions = sum(1 for entry in trace if not entry.result.error and not entry.result.changed)
    open_page_actions = sum(1 for entry in trace if entry.step.tool == "open_page")
    same_exact_url_open_actions = sum(
        1
        for entry in trace
        if entry.step.tool == "open_page" and entry.result.before_url == entry.result.after_url
    )
    same_document_open_actions = sum(
        1
        for entry in trace
        if entry.step.tool == "open_page"
        and redundant_open_page_reason(entry.result.after_url, entry.result.before_url) is not None
    )
    total_actions = len(trace)
    successful_actions = total_actions - failed_actions
    action_success_rate_percent = round((successful_actions / total_actions) * 100) if total_actions else 0
    unchanged_action_percent = round((unchanged_actions / total_actions) * 100) if total_actions else 0
    observed_viewports = sorted({entry.observation.viewport for entry in trace})
    mobile_steps = final_coverage.get("viewport_steps", {}).get("mobile", 0)
    min_mobile_steps = final_coverage.get("min_mobile_steps_required", 0)

    gaps: list[str] = []
    if page_coverage_percent < 100:
        unvisited = final_coverage.get("unvisited_pages") or []
        gaps.append(f"Only visited {len(visited_pages)} of {len(known_pages)} HTML page(s); unvisited: {', '.join(unvisited[:8])}.")
    if viewport_mode == "both" and mobile_steps < min_mobile_steps:
        gaps.append(f"Mobile viewport was under-exercised: {mobile_steps}/{min_mobile_steps} required mobile actions.")
    if feature_coverage_percent < 70 and feature_map:
        gaps.append(f"Only directly exercised {feature_coverage_percent}% of visible interactive feature signatures.")
    if failed_actions:
        gaps.append(f"{failed_actions} browser action(s) failed and should be retried or analyzed.")
    if unchanged_action_percent > 35:
        gaps.append(f"{unchanged_action_percent}% of actions produced no visible URL/text change; this may indicate dead controls or repeated probes.")
    if same_document_open_actions:
        gaps.append(
            f"{same_document_open_actions} open_page action(s) reopened the current document instead of broadening coverage."
        )
    if blocked_redundant_open_count:
        gaps.append(
            f"Blocked {blocked_redundant_open_count} redundant open_page attempt(s) before execution."
        )

    mobile_ok = viewport_mode != "both" or mobile_steps >= min_mobile_steps
    if page_coverage_percent == 100 and feature_coverage_percent >= 70 and action_success_rate_percent >= 85 and mobile_ok:
        status = "near_complete"
        confidence = "high"
    elif page_coverage_percent >= 80 and action_success_rate_percent >= 70:
        status = "substantial"
        confidence = "medium"
    else:
        status = "partial"
        confidence = "low"

    return {
        "status": status,
        "confidence": confidence,
        "page_coverage_percent": page_coverage_percent,
        "feature_coverage_percent": feature_coverage_percent,
        "action_success_rate_percent": action_success_rate_percent,
        "unchanged_action_percent": unchanged_action_percent,
        "known_pages": known_pages,
        "visited_pages": visited_pages,
        "unvisited_pages": final_coverage.get("unvisited_pages") or [],
        "observed_viewports": observed_viewports,
        "viewport_steps": final_coverage.get("viewport_steps") or {},
        "action_counts": dict(sorted(action_counts.items())),
        "open_page_actions": open_page_actions,
        "same_document_open_actions": same_document_open_actions,
        "same_exact_url_open_actions": same_exact_url_open_actions,
        "redundant_open_page_blocked": blocked_redundant_open_count,
        "total_actions": total_actions,
        "successful_actions": successful_actions,
        "failed_actions": failed_actions,
        "unchanged_actions": unchanged_actions,
        "observed_feature_count": feature_gate["observed_feature_count"],
        "exercised_feature_count": feature_gate["exercised_feature_count"],
        "unexplored_features": unexplored_features[:40],
        "gaps": gaps,
    }


def feature_signature(page: str, item: dict[str, Any]) -> str:
    label = feature_label(item).lower()
    role = str(item.get("role") or "").lower()
    href = str(item.get("href") or "").lower()
    input_type = str(item.get("input_type") or "").lower()
    kind = str(item.get("kind") or "").lower()
    tag = str(item.get("tag") or "").lower()
    return "|".join([page, kind, tag, role, input_type, label[:80], href[:120]])


def feature_label(item: dict[str, Any]) -> str:
    for key in ("name", "label", "text", "placeholder", "aria_label", "href", "input_type"):
        value = str(item.get(key) or "").strip()
        if value:
            return re.sub(r"\s+", " ", value)[:160]
    return "unlabeled control"


def fallback_continue_decision(
    profile: SiteProfile,
    observation: Observation,
    coverage: dict,
) -> AgentDecision:
    unvisited_pages = coverage.get("unvisited_pages") or []
    if unvisited_pages:
        page = str(unvisited_pages[0])
        return AgentDecision(
            thought="Coverage requirements are still unmet, so broaden exploration by opening an unvisited page.",
            plan=[
                "Continue broadening site coverage before finishing",
                f"Inspect unvisited page {page} for new UX evidence",
            ],
            objective=f"Inspect unvisited page {page} to broaden exploration coverage beyond the main flow.",
            action="open_page",
            target_id=None,
            input={"page": page},
            success_criteria="The browser lands on a previously unseen page and reveals new UX surface area.",
            done=False,
        )

    return AgentDecision(
        thought="Coverage requirements are still unmet, so continue exploring the current page rather than stopping.",
        plan=[
            "Continue exploring until the coverage gate is satisfied",
            "Reveal more of the current page to look for uninspected states or links",
        ],
        objective="Reveal additional content and affordances that may lead to new states or pages.",
        action="scroll",
        target_id=None,
        input={"to": "bottom"},
        success_criteria="Additional controls, content, or navigation options become visible.",
        done=False,
    )


def relative_page_hint(url: str, profile: SiteProfile) -> str:
    parsed = urlparse(url)
    path = unquote(parsed.path or "")
    if parsed.scheme == "file":
        file_path = _file_url_to_path(path)
        site_dir = Path(profile.site_dir).resolve()
        try:
            return file_path.resolve().relative_to(site_dir).as_posix()
        except ValueError:
            return file_path.name or file_path.as_posix()
    normalized = path.lstrip("/") or parsed.netloc or url
    return normalized[:300]


def resolve_open_page_target(target: str, profile: SiteProfile, current_url: str) -> str:
    stripped = target.strip()
    parsed = urlparse(stripped)
    if parsed.scheme in {"file", "http", "https"}:
        return stripped

    if stripped in profile.html_files:
        return (Path(profile.site_dir) / stripped).resolve().as_uri()

    current = urlparse(current_url)
    if current.scheme == "file":
        current_path = _file_url_to_path(current.path)
        return (current_path.parent / stripped).resolve().as_uri()

    return urljoin(current_url, stripped)


def canonicalize_open_page_url(url: str) -> str:
    parsed = urlparse(url)
    return urlunsplit((parsed.scheme, parsed.netloc, parsed.path, parsed.query, ""))


def redundant_open_page_reason(target_url: str, current_url: str) -> str | None:
    if not target_url or not current_url:
        return None
    if canonicalize_open_page_url(target_url) == canonicalize_open_page_url(current_url):
        return "open_page would reopen the current document"
    return None


def _file_url_to_path(path: str) -> Path:
    normalized = unquote(path)
    if re.match(r"^/[A-Za-z]:/", normalized):
        normalized = normalized[1:]
    return Path(normalized)


def missing_target_result(action: str, url: str) -> ToolResult:
    return ToolResult(
        action=action,
        before_url=url,
        after_url=url,
        error=f"Agent selected action '{action}' without a target_id.",
    )
