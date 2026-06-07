from __future__ import annotations

import json
from collections import Counter
from dataclasses import dataclass
from json import JSONDecodeError
from pathlib import Path
from typing import Any

from openai import OpenAI

from .brain import (
    compact_observation,
    compact_trace,
    image_data_url,
    normalize_action_payload,
    parse_json_object,
    select_high_signal_trace_entries,
    summarize_raw_response,
)
from .config import ResolvedProviderConfig
from pydantic import ValidationError
from .schemas import (
    AgentDecision,
    ExplorationPlan,
    Observation,
    PlanStep,
    Reflection,
    SiteProfile,
    TraceEntry,
    ToolResult,
    UXEvalIssue,
    UXEvalMetric,
    VariantProbePlan,
)


JUDGE_ACTIONS = [
    "open_page",
    "click",
    "type_text",
    "hover",
    "select_option",
    "check",
    "uncheck",
    "drag",
    "scroll",
    "press_key",
    "go_back",
    "go_forward",
    "reload",
    "wait",
    "screenshot_pair",
    "finish",
]

DEFAULT_METRIC_IDS = [
    "goal_state_clarity",
    "navigation_information_scent",
    "action_feedback",
    "flow_efficiency",
    "error_recovery",
    "trust_consequence_transparency",
    "scanability_responsive_accessibility",
]

CONTROL_METRIC_IDS = [
    "discrete_action_feedback",
    "selection_state_clarity",
    "gated_cta_explanation",
    "tap_target_mobile_operability",
]

DEFAULT_RUBRIC_SUMMARY = """
Score the webpage UX, not the browser agent.

Metrics:
- goal_state_clarity: users can tell what the page is for, what state they are in, and what to do next.
- navigation_information_scent: navigation labels, search, tabs, filters, links, and sectioning help users find the right path.
- action_feedback: clicks, typing, selecting, submitting, loading, success, and failure states are visible and understandable.
- flow_efficiency: multi-step and cross-page tasks stay coherent, avoid unnecessary repetition, and preserve momentum.
- error_recovery: the page prevents mistakes where possible and helps users recover when actions fail or confusion appears.
- trust_consequence_transparency: fees, permissions, privacy implications, destructive outcomes, and next-step consequences are clear enough to act with confidence.
- scanability_responsive_accessibility: content hierarchy is easy to scan, and the page remains operable on mobile with basic accessibility cues such as labels and target sizes.

Use a 1-10 scale. Score 6 means basically usable but mixed or incomplete. Do not give high scores
without direct positive evidence. When key evidence is missing, respect the provided score caps
rather than inferring excellence.
""".strip()

CONTROLS_RUBRIC_SUMMARY = """
Score control and button usability, not the browser agent.

Metrics:
- discrete_action_feedback: buttons, links, tabs, toggles, submits, menus, and similar controls acknowledge input with visible, understandable feedback.
- selection_state_clarity: selected, active, expanded, loading, disabled, and current states are obvious enough that users know what changed.
- gated_cta_explanation: when the next step is blocked, disabled, or gated, the UI explains why, what is missing, and when the CTA becomes available.
- tap_target_mobile_operability: controls remain comfortably tappable on mobile with adequate target size, spacing, and viewport reachability.

Use a 1-10 scale. Score 6 means basically usable but mixed or incomplete. Do not give high scores
without direct positive evidence. When key evidence is missing, respect the provided score caps
rather than inferring excellence.
""".strip()


@dataclass(frozen=True)
class JudgeRubric:
    name: str
    metric_ids: tuple[str, ...]
    metric_weights: dict[str, float]
    summary: str
    aliases: dict[str, str]


def _equal_metric_weights(metric_ids: list[str]) -> dict[str, float]:
    return {metric_id: 1 / len(metric_ids) for metric_id in metric_ids}


JUDGE_RUBRICS = {
    "default": JudgeRubric(
        name="default",
        metric_ids=tuple(DEFAULT_METRIC_IDS),
        metric_weights=_equal_metric_weights(DEFAULT_METRIC_IDS),
        summary=DEFAULT_RUBRIC_SUMMARY,
        aliases={
            "clarity": "goal_state_clarity",
            "goal_clarity": "goal_state_clarity",
            "current_state_clarity": "goal_state_clarity",
            "navigation_flow": "navigation_information_scent",
            "findability_navigation": "navigation_information_scent",
            "interaction_feedback": "action_feedback",
            "feedback_status_visibility": "action_feedback",
            "forms_input_ux": "flow_efficiency",
            "flow_continuity_efficiency": "flow_efficiency",
            "task_flow_efficiency": "flow_efficiency",
            "trust": "trust_consequence_transparency",
            "consequence_transparency": "trust_consequence_transparency",
            "responsive_accessibility": "scanability_responsive_accessibility",
            "visual_hierarchy_scanability": "scanability_responsive_accessibility",
            "scanability": "scanability_responsive_accessibility",
            "visual_hierarchy": "scanability_responsive_accessibility",
        },
    ),
    "controls": JudgeRubric(
        name="controls",
        metric_ids=tuple(CONTROL_METRIC_IDS),
        metric_weights=_equal_metric_weights(CONTROL_METRIC_IDS),
        summary=CONTROLS_RUBRIC_SUMMARY,
        aliases={
            "button_feedback": "discrete_action_feedback",
            "interaction_feedback": "discrete_action_feedback",
            "silent_action_feedback": "discrete_action_feedback",
            "selection_state": "selection_state_clarity",
            "active_state_clarity": "selection_state_clarity",
            "expanded_state_clarity": "selection_state_clarity",
            "cta_gating": "gated_cta_explanation",
            "disabled_cta_explanation": "gated_cta_explanation",
            "gated_cta": "gated_cta_explanation",
            "tap_target_size": "tap_target_mobile_operability",
            "mobile_tap_target": "tap_target_mobile_operability",
            "touch_target_mobile": "tap_target_mobile_operability",
            "responsive_tap_target": "tap_target_mobile_operability",
        },
    ),
}

DEFAULT_JUDGE_RUBRIC = "default"
JUDGE_RUBRIC_NAMES = tuple(JUDGE_RUBRICS.keys())

METRIC_IDS = list(JUDGE_RUBRICS[DEFAULT_JUDGE_RUBRIC].metric_ids)
METRIC_WEIGHTS = dict(JUDGE_RUBRICS[DEFAULT_JUDGE_RUBRIC].metric_weights)
RUBRIC_SUMMARY = JUDGE_RUBRICS[DEFAULT_JUDGE_RUBRIC].summary


def get_judge_rubric(name: str | None = None) -> JudgeRubric:
    rubric_name = str(name or DEFAULT_JUDGE_RUBRIC).strip().lower()
    rubric = JUDGE_RUBRICS.get(rubric_name)
    if rubric is None:
        valid = ", ".join(sorted(JUDGE_RUBRICS))
        raise ValueError(f"Unsupported judge rubric: {rubric_name}. Expected one of: {valid}")
    return rubric


def _build_plan_system_prompt(rubric: JudgeRubric) -> str:
    metric_count = len(rubric.metric_ids)
    return f"""
You are UXBench Judge, a browser-based UX evaluator.
Plan how to collect evidence for scoring the webpage's UX using this rubric:

{rubric.summary}

You receive a prescan of known pages and controls. Produce a concrete exploration plan for the
judge run. The plan should gather representative evidence for the {metric_count} core metrics,
including mobile when configured. Prefer phases that expose high-information evidence such as
feedback states, blocked actions, recovery paths, and cross-page continuity. Do not frame the
objective as completing a task; frame it as judging the webpage UX quality from observable
interactions and producing a reusable baseline for later variant comparison.

Output only JSON:
{{
  "goal": "overall judge goal",
  "summary": "2-4 sentence plan summary",
  "assumptions": ["..."],
  "target_pages": ["page.html"],
  "risk_hotspots": ["specific surface to inspect"],
  "phases": [
    {{
      "id": "phase-1",
      "title": "Short title",
      "objective": "What UX evidence this phase collects",
      "target_pages": ["page.html"],
      "key_checks": ["specific controls or states to inspect"],
      "exit_criteria": ["evidence that this phase is sufficiently covered"]
    }}
  ],
  "coverage_targets": {{
    "pages": "which pages matter for evidence",
    "features": "which controls/states matter for evidence",
    "mobile": "which checks need mobile evidence"
  }},
  "notes": ["optional note"]
}}
""".strip()


def _build_decision_system_prompt(rubric: JudgeRubric) -> str:
    metric_count = len(rubric.metric_ids)
    return f"""
You are UXBench Judge operating a real browser to collect UX scoring evidence.

{rubric.summary}

Choose exactly one browser action per turn. Prefer actions that expose evidence for the {metric_count} core metric
scores. When coverage.stop_allowed is false, broaden evidence collection across pages, controls,
feedback states, navigation paths, recovery routes, trust-sensitive copy, and mobile surfaces.
Prefer high-information probes over shallow page coverage: invalid or empty submissions, CTA gating,
modal close/reopen behavior, state persistence, filter/tab switching, and mobile tap-target checks.
Use the current trajectory to notice repeated friction, dead ends, or unclear consequences. If an
action needs an element, use a target_id from current_observation.interactables. Do not use
open_page to reopen the current document or to clear minor UI state. Prefer click, scroll,
go_back, or a different visible control. Use open_page only when it materially changes the page
or URL state being inspected.

Output only JSON:
{{
  "thought": "brief reason for the next step",
  "plan": ["current judge plan item"],
  "objective": "what UX evidence this action should collect",
  "action": "one of the available actions",
  "target_id": "target id or null",
  "input": {{"page": "page.html", "url": "...", "text": "...", "enter": false}},
  "success_criteria": "what evidence should be observed after the action",
  "done": false
}}

Use finish with done=true only on the last possible step when the remaining budget is exhausted and
the collected evidence is enough to score all {metric_count} metrics. Coverage should guide broader exploration,
but it is not a hard stop gate.
""".strip()


def _build_reflection_system_prompt(rubric: JudgeRubric) -> str:
    metric_count = len(rubric.metric_ids)
    return f"""
You are UXBench Judge's reflection loop.
Evaluate the latest browser action only as UX evidence for the webpage.

{rubric.summary}

Ground notes in the result, screenshot, visible text, DOM summary, console/network errors, layout
warnings, interactables, and coverage. Do not judge the agent. Prefer notes that clarify whether the
new evidence supports a high score, reveals a problem, or leaves a metric capped by missing state coverage.

Output only JSON:
{{
  "success": true,
  "ux_notes": ["brief evidence-backed UX signal"],
  "need_replan": false,
  "done": false
}}

Set done=true only on the last possible step when the trace contains enough evidence to score all
{metric_count} UX metrics. Coverage should guide broader exploration, but it is not a hard stop gate.
""".strip()


def _build_metric_schema_lines(metric_ids: tuple[str, ...]) -> str:
    return "\n".join(
        (
            f'    "{metric_id}": {{"score": 6, "confidence": "medium", "rationale": "...", '
            f'"positive_evidence": ["..."], "negative_evidence": ["..."], '
            f'"missing_evidence": ["..."], "score_cap_reason": "", "issues": ["..."]}},'
        )
        for metric_id in metric_ids
    ).rstrip(",")


def _build_variant_probe_schema_lines() -> str:
    return """
    {
      "id": "probe-1",
      "metric_targets": ["goal_state_clarity"],
      "page_hint": "index.html",
      "semantic_target": "primary next-step CTA or the closest equivalent action",
      "precondition": "fresh page load with no prior input",
      "action_template": "Inspect the target, then activate it if doing so is safe and informative.",
      "viewport": "desktop",
      "expected_evidence": ["Whether the next step is obvious before interaction", "Whether the response clarifies what changed"],
      "binding_hints": ["Prefer role=button or primary link", "Match visible text before using generic controls"],
      "fallback_policy": "If the exact control is absent, bind to the most prominent same-purpose action on the same page.",
      "compare_priority": "high",
      "notes": ["Designed for baseline-vs-variant replay."]
    }
""".strip()


def _build_final_system_prompt(rubric: JudgeRubric) -> str:
    metric_schema = _build_metric_schema_lines(rubric.metric_ids)
    return f"""
You are UXBench Judge. Score the webpage UX using this rubric:

{rubric.summary}

Return concise, evidence-backed scoring. Penalize observed webpage UX issues. Do not score the
agent's efficiency. High scores require direct positive evidence, not the absence of visible
problems. If a metric has a cap in metric_score_caps, do not exceed it; explain the limitation in
missing_evidence and score_cap_reason.

For each metric, use score 1-10:
- 9-10: excellent; direct positive evidence shows the key UX questions for this metric are handled clearly and reliably
- 7-8: good; mostly strong evidence with only minor issues
- 5-6: basically usable but mixed, incomplete, or noticeably frictional
- 3-4: poor; repeated or meaningful UX problems
- 1-2: critical; blocking, misleading, or highly confusing failure

Additional rules:
- Without direct positive evidence, do not score above 6.
- If important state coverage is missing, respect the provided cap even if no issue was observed.
- Keep positive_evidence and negative_evidence concrete and tied to observed states or actions.

Use the full trajectory, not just the final screenshot, whenever state changes, gated actions,
selection cues, or recovery behavior matter. Use high_signal_trajectory for important earlier
evidence and recent_trajectory for the latest state.

Output only JSON:
{{
  "summary": "2-4 sentence UX evaluation summary",
  "metrics": {{
{metric_schema}
  }},
  "evidence_confidence": "low|medium|high",
  "top_issues": [
    {{
      "metric": "{rubric.metric_ids[-1]}",
      "severity": "high|medium|low",
      "page_hint": "page or selector",
      "problem": "...",
      "evidence": "...",
      "suggestion": "..."
    }}
  ]
}}
""".strip()


def _build_variant_probe_system_prompt(rubric: JudgeRubric) -> str:
    probe_schema = _build_variant_probe_schema_lines()
    return f"""
You are UXBench Judge preparing a reusable probe plan for comparing UX variants of the same site.

Use the explored baseline evidence to create stable probes that can be replayed on sibling
variants. Keep the probes aligned to this rubric:

{rubric.summary}

Do not rely on target_id values because variants may change the DOM. Prefer semantic targets,
preconditions, and binding hints that can be re-mapped in a related variant. Favor high-information
checks that are likely to expose meaningful differences under the same user goal.

Output only JSON:
{{
  "goal": "overall comparison goal",
  "summary": "2-4 sentence summary of what the probes compare",
  "baseline_variant": "baseline",
  "target_pages": ["index.html"],
  "coverage_targets": {{
    "metrics": "which rubric dimensions need direct comparison evidence",
    "viewports": "which probes must be replayed on mobile or desktop",
    "states": "which interactive states should be mirrored across variants"
  }},
  "probes": [
{probe_schema}
  ],
  "notes": ["optional note"]
}}
""".strip()


def build_metric_score_caps(
    rubric: JudgeRubric,
    trace: list[TraceEntry],
    coverage: dict[str, Any],
) -> dict[str, dict[str, Any]]:
    action_counts = Counter(entry.step.tool for entry in trace)
    changed_actions = sum(1 for entry in trace if entry.result.changed)
    failed_actions = sum(1 for entry in trace if entry.result.error)
    unique_pages = len(set(coverage.get("visited_pages") or []))
    observed_viewports = {str(viewport) for viewport in coverage.get("observed_viewports") or []}
    text_corpus = " ".join(
        [
            *[entry.observation.visible_text[:1200] for entry in trace if entry.observation.visible_text],
            *[" ".join(entry.reflection.ux_notes[:4]) for entry in trace if entry.reflection.ux_notes],
        ]
    ).lower()

    caps: dict[str, dict[str, Any]] = {}

    def add_cap(metric_id: str, max_score: int, reason: str) -> None:
        current = caps.get(metric_id)
        if current is None or max_score < int(current["max_score"]):
            caps[metric_id] = {"max_score": max_score, "reason": reason}

    if rubric.name == "controls":
        if changed_actions == 0:
            add_cap("discrete_action_feedback", 5, "No direct post-action control feedback was observed.")
        if action_counts.get("click", 0) + action_counts.get("select_option", 0) + action_counts.get("check", 0) == 0:
            add_cap("selection_state_clarity", 6, "No selection or state-transition evidence was collected.")
        if failed_actions == 0 and "disabled" not in text_corpus and "required" not in text_corpus:
            add_cap("gated_cta_explanation", 5, "No blocked or gated CTA state was directly observed.")
        if "mobile" not in observed_viewports:
            add_cap("tap_target_mobile_operability", 6, "Mobile control operability was not directly exercised.")
        return caps

    if unique_pages < 2:
        add_cap("goal_state_clarity", 7, "Cross-state goal clarity was under-evidenced.")
        add_cap("navigation_information_scent", 6, "Navigation was not checked across multiple destinations or states.")
        add_cap("flow_efficiency", 6, "No multi-page or multi-state flow evidence was collected.")
    if changed_actions == 0:
        add_cap("action_feedback", 5, "No direct changed-action feedback evidence was observed.")
    elif changed_actions < 3:
        add_cap("action_feedback", 6, "Only limited changed-action feedback evidence was observed.")
    if failed_actions == 0 and not any(keyword in text_corpus for keyword in ("error", "validation", "cancel", "recover")):
        add_cap("error_recovery", 5, "No direct error, blocked, or recovery path evidence was collected.")
    if not any(keyword in text_corpus for keyword in ("privacy", "delete", "remove", "permission", "billing", "fee", "export", "data")):
        add_cap("trust_consequence_transparency", 6, "No consequence-bearing action or copy was directly inspected.")
    if "mobile" not in observed_viewports:
        add_cap("scanability_responsive_accessibility", 6, "Mobile scanability and operability were not directly exercised.")
    return caps


class JudgeBrain:
    def __init__(
        self,
        provider_config: ResolvedProviderConfig,
        temperature: float | None = None,
        max_interactables: int = 120,
        rubric_name: str = DEFAULT_JUDGE_RUBRIC,
    ):
        self.client = OpenAI(
            api_key=provider_config.api_key,
            base_url=provider_config.base_url,
            default_headers=provider_config.default_headers or None,
            default_query=provider_config.default_query or None,
        )
        self.provider_config = provider_config
        self.model = provider_config.model
        self.temperature = temperature
        self.max_interactables = max_interactables
        self.rubric = get_judge_rubric(rubric_name)

    def plan_run(
        self,
        profile: SiteProfile,
        evaluated_user_goal: str,
        prescan_summary: list[dict[str, Any]],
        initial_observation: Observation,
        *,
        exploration_depth: str,
        max_steps: int,
        viewport_mode: str,
    ) -> ExplorationPlan:
        payload = {
            "site": profile.model_dump(mode="json"),
            "evaluated_user_goal": evaluated_user_goal,
            "rubric": self.rubric.summary,
            "exploration_depth": exploration_depth,
            "max_steps": max_steps,
            "viewport_mode": viewport_mode,
            "initial_observation": compact_observation(
                initial_observation,
                max_interactables=24,
                text_limit=1800,
                layout_limit=12,
            ),
            "prescan_summary": prescan_summary,
            "instruction": (
                "Create the concrete judge exploration plan. Use the prescan rather than guessing. "
                f"Prefer 3-6 phases that collect evidence for all {len(self.rubric.metric_ids)} core UX metrics."
            ),
        }
        text = self._call_json(
            _build_plan_system_prompt(self.rubric),
            payload,
            initial_observation.screenshot_path,
        )
        return ExplorationPlan(**parse_json_object(text))

    def decide(
        self,
        profile: SiteProfile,
        observation: Observation,
        trace: list[TraceEntry],
        run_plan: ExplorationPlan | None,
        plan_progress: dict[str, Any],
        session_memory: dict[str, Any],
        trajectory_chunks: list[dict[str, Any]],
        step_index: int,
        max_steps: int,
        exploration_depth: str,
        coverage: dict[str, Any],
        must_continue_reason: str | None = None,
    ) -> AgentDecision:
        payload = {
            "site": profile.model_dump(mode="json"),
            "rubric": self.rubric.summary,
            "exploration_depth": exploration_depth,
            "step_index": step_index,
            "max_steps": max_steps,
            "available_actions": JUDGE_ACTIONS,
            "run_plan": run_plan.model_dump(mode="json") if run_plan else None,
            "plan_progress": plan_progress,
            "session_memory": session_memory,
            "trajectory_chunks": trajectory_chunks,
            "coverage": coverage,
            "current_observation": compact_observation(
                observation,
                min(self.max_interactables, 36),
                text_limit=1800,
                layout_limit=12,
            ),
            "recent_trajectory": compact_trace(trace[-4:]),
            "instruction": (
                "Pick the next browser action that best collects webpage UX evidence for the seven "
                "judge metrics. Prefer high-information probes over shallow page coverage. If "
                "coverage.stop_allowed is false, broaden evidence before finishing."
            ),
        }
        if must_continue_reason:
            payload["must_continue_reason"] = must_continue_reason
        base_instruction = payload["instruction"]
        last_error: str | None = None
        last_raw_text: str | None = None
        max_attempts = 2

        for attempt_number in range(1, max_attempts + 1):
            attempt_payload = dict(payload)
            if last_error:
                attempt_payload["instruction"] = (
                    f"{base_instruction} The previous response was invalid: {last_error}. "
                    f"Return one JSON object and set action to exactly one of: {', '.join(JUDGE_ACTIONS)}."
                )
            raw_text = self._call_json(
                _build_decision_system_prompt(self.rubric),
                attempt_payload,
                observation.screenshot_path,
            )
            last_raw_text = raw_text
            try:
                data = normalize_action_payload(parse_json_object(raw_text))
                if data.get("action") not in JUDGE_ACTIONS:
                    raise ValueError(f"unsupported action: {data.get('action')}")
                return AgentDecision(**data)
            except (JSONDecodeError, ValidationError, ValueError) as exc:
                last_error = str(exc)

        raise ValueError(
            "Judge selected unsupported action after "
            f"{max_attempts} attempt(s): {last_error}. Raw response: {summarize_raw_response(last_raw_text)}"
        )

    def reflect_step(
        self,
        profile: SiteProfile,
        step: PlanStep,
        result: ToolResult,
        observation: Observation,
        coverage: dict[str, Any],
    ) -> Reflection:
        payload = {
            "site": profile.model_dump(mode="json"),
            "rubric": self.rubric.summary,
            "step": step.model_dump(mode="json"),
            "tool_result": result.model_dump(mode="json"),
            "coverage": coverage,
            "new_observation": compact_observation(
                observation,
                min(self.max_interactables, 24),
                text_limit=1400,
                layout_limit=10,
            ),
            "instruction": (
                "Reflect on what this browser action reveals about the webpage UX. Keep notes "
                "specific enough to support final metric scoring."
            ),
        }
        text = self._call_json(
            _build_reflection_system_prompt(self.rubric),
            payload,
            observation.screenshot_path,
        )
        data = parse_json_object(text)
        data["step_id"] = step.id
        return Reflection(**data)

    def final_eval(
        self,
        profile: SiteProfile,
        trace: list[TraceEntry],
        evaluated_user_goal: str,
        session_memory: dict[str, Any],
        trajectory_chunks: list[dict[str, Any]],
        coverage: dict[str, Any],
        final_observation: Observation | None,
    ) -> dict[str, Any]:
        selected_trace = select_high_signal_trace_entries(trace, recent_count=3, signal_count=5)
        metric_score_caps = build_metric_score_caps(self.rubric, trace, coverage)
        payload = {
            "site": profile.model_dump(mode="json"),
            "evaluated_user_goal": evaluated_user_goal,
            "rubric": self.rubric.summary,
            "session_memory": session_memory,
            "trajectory_chunks": trajectory_chunks,
            "coverage": coverage,
            "metric_score_caps": metric_score_caps,
            "recent_trajectory": compact_trace(trace[-3:]),
            "high_signal_trajectory": compact_trace(selected_trace),
            "final_observation": compact_observation(
                final_observation,
                min(self.max_interactables, 40),
                text_limit=2600,
                layout_limit=20,
            )
            if final_observation
            else None,
            "instruction": (
                f"Return scores for all {len(self.rubric.metric_ids)} metrics. Respect metric_score_caps, "
                "use direct evidence before giving high scores, and keep top_issues focused on observed webpage UX problems."
            ),
        }
        screenshot = (
            final_observation.screenshot_path
            if final_observation
            else trace[-1].observation.screenshot_path if trace else None
        )
        attempts: list[dict[str, Any]] = []
        last_raw_text: str | None = None
        last_parsed_payload: dict[str, Any] | None = None
        last_error: str | None = None
        max_attempts = 2

        for attempt_number in range(1, max_attempts + 1):
            attempt_payload = dict(payload)
            if last_error:
                attempt_payload["instruction"] = (
                    f"{payload['instruction']} The previous response was invalid: {last_error}. "
                    f"Return one JSON object with a non-empty summary and all {len(self.rubric.metric_ids)} metric objects."
                )
            raw_text = self._call_json(
                _build_final_system_prompt(self.rubric),
                attempt_payload,
                screenshot,
            )
            parsed_payload: dict[str, Any] | None = None
            try:
                parsed_payload = parse_json_object(raw_text)
                validate_eval_payload(parsed_payload, rubric=self.rubric)
                normalized_payload = normalize_eval_payload(
                    parsed_payload,
                    rubric=self.rubric,
                    metric_score_caps=metric_score_caps,
                )
                attempts.append(
                    {
                        "attempt": attempt_number,
                        "status": "valid",
                    }
                )
                return {
                    "ok": True,
                    "raw_text": raw_text,
                    "parsed_payload": parsed_payload,
                    "normalized_payload": normalized_payload,
                    "validation": {
                        "status": "valid",
                        "attempts": attempts,
                    },
                    "error": None,
                }
            except (JSONDecodeError, ValueError, InvalidEvalPayload) as exc:
                last_raw_text = raw_text
                last_parsed_payload = parsed_payload
                last_error = str(exc)
                attempts.append(
                    {
                        "attempt": attempt_number,
                        "status": "invalid",
                        "error": last_error,
                        "parsed_payload_present": parsed_payload is not None,
                    }
                )

        return {
            "ok": False,
            "raw_text": last_raw_text,
            "parsed_payload": last_parsed_payload,
            "normalized_payload": None,
            "validation": {
                "status": "invalid",
                "attempts": attempts,
                "error": last_error or "Unknown final eval validation failure.",
            },
            "error": last_error or "Unknown final eval validation failure.",
        }

    def build_variant_probe_plan(
        self,
        profile: SiteProfile,
        trace: list[TraceEntry],
        evaluated_user_goal: str,
        run_plan: ExplorationPlan | None,
        session_memory: dict[str, Any],
        trajectory_chunks: list[dict[str, Any]],
        coverage: dict[str, Any],
        final_observation: Observation | None,
    ) -> VariantProbePlan:
        selected_trace = select_high_signal_trace_entries(trace, recent_count=4, signal_count=6)
        payload = {
            "site": profile.model_dump(mode="json"),
            "evaluated_user_goal": evaluated_user_goal,
            "rubric": self.rubric.summary,
            "run_plan": run_plan.model_dump(mode="json") if run_plan else None,
            "session_memory": session_memory,
            "trajectory_chunks": trajectory_chunks,
            "coverage": coverage,
            "high_signal_trajectory": compact_trace(selected_trace),
            "final_observation": compact_observation(
                final_observation,
                min(self.max_interactables, 36),
                text_limit=2200,
                layout_limit=16,
            )
            if final_observation
            else None,
            "instruction": (
                "Create reusable comparison probes derived from this explored baseline. "
                "Prefer semantic, high-information checks that remain stable across sibling variants."
            ),
        }
        screenshot = (
            final_observation.screenshot_path
            if final_observation
            else trace[-1].observation.screenshot_path if trace else None
        )
        text = self._call_json(
            _build_variant_probe_system_prompt(self.rubric),
            payload,
            screenshot,
        )
        return VariantProbePlan(**parse_json_object(text))

    def _call_json(
        self,
        system_prompt: str,
        payload: dict[str, Any],
        screenshot_path: str | None,
    ) -> str:
        content: list[dict[str, Any]] = [
            {"type": "input_text", "text": json.dumps(payload, ensure_ascii=False)}
        ]
        if screenshot_path and Path(screenshot_path).exists():
            content.append({"type": "input_image", "image_url": image_data_url(Path(screenshot_path))})

        request: dict[str, Any] = {
            "model": self.model,
            "input": [
                {"role": "system", "content": [{"type": "input_text", "text": system_prompt}]},
                {"role": "user", "content": content},
            ],
        }
        if self.temperature is not None:
            request["temperature"] = self.temperature
        response = self.client.responses.create(**request)
        return response.output_text


def normalize_eval_payload(
    data: dict[str, Any],
    *,
    rubric: JudgeRubric | None = None,
    metric_score_caps: dict[str, dict[str, Any]] | None = None,
) -> dict[str, Any]:
    rubric = rubric or get_judge_rubric()
    raw_metrics = data.get("metrics") if isinstance(data.get("metrics"), dict) else {}
    metrics: dict[str, UXEvalMetric] = {}
    for metric_id in rubric.metric_ids:
        raw = raw_metrics.get(metric_id) if isinstance(raw_metrics.get(metric_id), dict) else {}
        positive_evidence = clean_string_list(raw.get("positive_evidence"))
        negative_evidence = clean_string_list(raw.get("negative_evidence"))
        missing_evidence = clean_string_list(raw.get("missing_evidence"))
        score = clamp_score(raw.get("score", 6))
        cap_reason = str(raw.get("score_cap_reason") or "").strip()
        if metric_score_caps and metric_id in metric_score_caps:
            max_score = int(metric_score_caps[metric_id].get("max_score", 10))
            enforced_reason = str(metric_score_caps[metric_id].get("reason") or "").strip()
            if score > max_score:
                score = max_score
                if not cap_reason:
                    cap_reason = enforced_reason
                if enforced_reason and enforced_reason not in missing_evidence:
                    missing_evidence.append(enforced_reason)
        metrics[metric_id] = UXEvalMetric(
            score=score,
            confidence=normalize_confidence(raw.get("confidence")),
            rationale=str(raw.get("rationale") or "").strip(),
            evidence=_merge_metric_evidence(
                positive_evidence,
                negative_evidence,
                clean_string_list(raw.get("evidence")),
            ),
            positive_evidence=positive_evidence,
            negative_evidence=negative_evidence,
            missing_evidence=missing_evidence,
            score_cap_reason=cap_reason,
            issues=clean_string_list(raw.get("issues")),
        )

    top_issues: list[UXEvalIssue] = []
    raw_issues = data.get("top_issues") if isinstance(data.get("top_issues"), list) else []
    for item in raw_issues:
        if not isinstance(item, dict):
            continue
        problem = str(item.get("problem") or "").strip()
        evidence = str(item.get("evidence") or "").strip()
        if not problem or not evidence:
            continue
        top_issues.append(
            UXEvalIssue(
                metric=normalize_metric_id(item.get("metric"), rubric=rubric),
                severity=normalize_severity(item.get("severity")),
                page_hint=str(item.get("page_hint") or "").strip(),
                problem=problem,
                evidence=evidence,
                suggestion=str(item.get("suggestion") or "").strip(),
            )
        )

    return {
        "summary": str(data.get("summary") or "").strip(),
        "metrics": metrics,
        "evidence_confidence": normalize_confidence(data.get("evidence_confidence")),
        "top_issues": top_issues,
        "overall_score_raw": compute_overall_raw_mean(metrics, rubric=rubric),
        "overall_score": compute_overall_score(metrics, rubric=rubric),
    }


def compute_overall_raw_mean(
    metrics: dict[str, UXEvalMetric],
    *,
    rubric: JudgeRubric | None = None,
) -> float:
    rubric = rubric or get_judge_rubric()
    missing_metrics = [metric_id for metric_id in rubric.metric_ids if metric_id not in metrics]
    if missing_metrics:
        raise InvalidEvalPayload(f"Missing normalized metrics: {', '.join(missing_metrics)}")
    weighted = 0.0
    for metric_id, weight in rubric.metric_weights.items():
        metric = metrics[metric_id]
        weighted += metric.score * weight
    return round(weighted, 2)


def compute_overall_score(
    metrics: dict[str, UXEvalMetric],
    *,
    rubric: JudgeRubric | None = None,
) -> int:
    rubric = rubric or get_judge_rubric()
    missing_metrics = [metric_id for metric_id in rubric.metric_ids if metric_id not in metrics]
    if missing_metrics:
        raise InvalidEvalPayload(f"Missing normalized metrics: {', '.join(missing_metrics)}")
    weighted = 0.0
    for metric_id, weight in rubric.metric_weights.items():
        metric = metrics[metric_id]
        weighted += ((metric.score - 1) / 9) * 100 * weight
    return round(weighted)


def clamp_score(value: Any) -> int:
    try:
        score = int(value)
    except (TypeError, ValueError):
        score = 6
    return max(1, min(10, score))


def normalize_confidence(value: Any) -> str:
    text = str(value or "").strip().lower()
    return text if text in {"low", "medium", "high"} else "medium"


def normalize_severity(value: Any) -> str:
    text = str(value or "").strip().lower()
    return text if text in {"low", "medium", "high"} else "medium"


def normalize_metric_id(value: Any, *, rubric: JudgeRubric | None = None) -> str:
    rubric = rubric or get_judge_rubric()
    text = str(value or "").strip().lower().replace("-", "_").replace(" ", "_")
    normalized = rubric.aliases.get(text, text)
    fallback_metric = rubric.metric_ids[0]
    return normalized if normalized in rubric.metric_ids else fallback_metric


def clean_string_list(value: Any, limit: int = 12) -> list[str]:
    if not isinstance(value, list):
        return []
    cleaned = [str(item).strip() for item in value if str(item).strip()]
    return cleaned[:limit]


def _merge_metric_evidence(
    positive_evidence: list[str],
    negative_evidence: list[str],
    legacy_evidence: list[str],
) -> list[str]:
    merged: list[str] = []
    for item in [*positive_evidence, *negative_evidence, *legacy_evidence]:
        if item and item not in merged:
            merged.append(item)
    return merged[:12]


class InvalidEvalPayload(ValueError):
    """Raised when the judge's final eval payload is missing required structure."""


def validate_eval_payload(
    data: dict[str, Any],
    *,
    rubric: JudgeRubric | None = None,
) -> None:
    rubric = rubric or get_judge_rubric()
    errors: list[str] = []

    summary = str(data.get("summary") or "").strip()
    if not summary:
        errors.append("missing non-empty summary")

    raw_metrics = data.get("metrics")
    if not isinstance(raw_metrics, dict):
        errors.append("missing metrics object")
    else:
        for metric_id in rubric.metric_ids:
            raw_metric = raw_metrics.get(metric_id)
            if not isinstance(raw_metric, dict):
                errors.append(f"missing metric object: {metric_id}")
                continue
            if "score" not in raw_metric:
                errors.append(f"metric {metric_id} missing score")
            else:
                try:
                    score = int(raw_metric.get("score"))
                except (TypeError, ValueError):
                    errors.append(f"metric {metric_id} has non-integer score")
                else:
                    if score < 1 or score > 10:
                        errors.append(f"metric {metric_id} score out of range")
            if not str(raw_metric.get("rationale") or "").strip():
                errors.append(f"metric {metric_id} missing rationale")

    if errors:
        raise InvalidEvalPayload("; ".join(errors))
