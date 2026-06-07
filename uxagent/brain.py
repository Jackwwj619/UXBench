from __future__ import annotations

import base64
import json
import re
from json import JSONDecodeError
from pathlib import Path
from typing import Any

from openai import OpenAI
from pydantic import ValidationError

from .config import ResolvedProviderConfig

from .schemas import (
    AgentDecision,
    ExplorationPlan,
    Observation,
    PlanStep,
    Reflection,
    SiteProfile,
    ToolResult,
    TraceEntry,
    UXFinding,
)


AGENTIC_ACTIONS = [
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

ACTION_ALIASES = {
    "open": "open_page",
    "navigate": "open_page",
    "tap": "click",
    "press": "click",
    "type": "type_text",
    "fill": "type_text",
    "enter_text": "type_text",
    "input_text": "type_text",
    "select": "select_option",
    "choose": "select_option",
    "choose_option": "select_option",
    "keypress": "press_key",
    "key_press": "press_key",
    "back": "go_back",
    "forward": "go_forward",
    "pause": "wait",
    "sleep": "wait",
    "take_screenshot": "screenshot_pair",
    "screenshot": "screenshot_pair",
    "stop": "finish",
    "done": "finish",
    "complete": "finish",
    "end": "finish",
}

DECISION_SYSTEM_PROMPT = """
You are UXAgent, an autonomous UX research agent operating a real browser.
Your job is to thoroughly explore the site's UX like a user, plan your own next steps, and discover UX feedback.

Do not follow fixed templates. Coverage is more important than early summarization: explore the
primary flow plus adjacent pages, alternate branches, forms, filters, error states, and recovery
paths before stopping. Use the screenshot, visible text, DOM summary, session memory, trajectory
chunk summaries, recent trajectory, coverage progress, and interactable element list to decide what
to do next. Choose exactly one browser action per turn.

Prefer actions that broaden coverage when coverage.stop_allowed is false. Avoid repeating the same
stuck action if unvisited pages or alternative branches remain. When linked navigation is limited,
you may use open_page with input.page set to a relative file from site.html_files or input.url set
to a direct destination.

When an action needs an element, choose a concrete target_id from the provided interactables.

Prioritize user experience evidence:
- goal completion
- clarity
- navigation and orientation
- affordance
- interaction feedback
- error recovery
- form experience
- visual hierarchy
- trust and confidence
- accessibility
- mobile usability

Output only JSON matching this shape:
{
  "thought": "brief reason for the next step",
  "plan": ["current high-level plan item", "..."],
  "objective": "what this next action is trying to learn about the UX",
  "action": "one of the available actions",
  "target_id": "target id or null",
  "input": {"page": "confirmation.html", "url": "...", "text": "...", "enter": false, "delta_y": 700, "seconds": 1},
  "success_criteria": "what useful UX signal should be observed after the action",
  "done": false
}

Use "finish" with done=true only when coverage.stop_allowed is true and further browser actions are
unlikely to reveal new UX evidence.
""".strip()


REPORT_SYSTEM_PROMPT = """
You are the UX critique module for an autonomous UX research agent.
You receive session memory, trajectory chunk summaries, a recent trajectory window, a
high-signal trajectory window, source
context, and browser observations. Produce concrete user-experience feedback, not code style notes.

Every finding must be grounded in evidence from the chunk summaries, recent trajectory, high-signal trajectory, screenshot
paths, observations, or specific actions. Prefer issues that a user would feel: confusion, missing
feedback, unclear next steps, weak affordance, form friction, mobile friction, trust gaps, poor
visual hierarchy, or accessibility barriers.

Output only JSON:
{
  "summary": "2-4 sentence UX summary",
  "findings": [
    {
      "severity": "high|medium|low",
      "ux_area": "goal completion|clarity|navigation|affordance|feedback|error recovery|forms|visual hierarchy|trust|accessibility|mobile usability|other",
      "user_goal": "...",
      "problem": "...",
      "evidence": "...",
      "why_it_matters": "...",
      "suggestion": "...",
      "source_hint": "file/page/selector hint or null"
    }
  ]
}
""".strip()


REFLECTION_SYSTEM_PROMPT = """
You are UXAgent's autonomous reflection loop.
Evaluate the last browser action against its objective and the new observation.
Do not invent issues. Ground notes in the tool result, screenshot, visible text, DOM summary,
console/network errors, layout warnings, the interactable list, and coverage progress.

Output only JSON:
{
  "success": true,
  "ux_notes": ["brief evidence-backed UX signal from this action"],
  "need_replan": false,
  "done": false
}

Set done=true only when coverage.stop_allowed is true and the trajectory already contains enough
evidence for a useful UX report.
""".strip()


PLAN_SYSTEM_PROMPT = """
You are UXAgent's exploration planner.
Before the autonomous browser run begins, you receive a lightweight prescan of the site's known
pages, structure, and visible controls. Produce a concrete exploration plan that the execution loop
can follow.

The plan must not be generic. Use the prescan evidence to:
- identify the primary flow and adjacent flows
- group the run into sensible phases
- call out high-risk pages or controls worth deeper validation
- set realistic coverage targets for pages, features, and mobile checks
- avoid claiming capabilities that were not seen in the prescan

Output only JSON:
{
  "goal": "overall exploration goal",
  "summary": "2-4 sentence summary of how the run should proceed",
  "assumptions": ["important assumption based on prescan"],
  "target_pages": ["page1.html", "page2.html"],
  "risk_hotspots": ["specific page/control/risk"],
  "phases": [
    {
      "id": "phase-1",
      "title": "Short phase title",
      "objective": "What this phase is trying to validate",
      "target_pages": ["page1.html"],
      "key_checks": ["specific interaction or state to validate"],
      "exit_criteria": ["evidence that this phase is sufficiently covered"]
    }
  ],
  "coverage_targets": {
    "pages": "visit all known HTML pages",
    "features": "exercise most visible controls per key page",
    "mobile": "repeat critical checks on mobile viewport"
  },
  "notes": ["optional planning note"]
}
""".strip()


class AgenticBrain:
    def __init__(
        self,
        provider_config: ResolvedProviderConfig,
        temperature: float | None = None,
        max_interactables: int = 120,
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

    def plan_run(
        self,
        profile: SiteProfile,
        explored_user_goal: str,
        prescan_summary: list[dict[str, Any]],
        initial_observation: Observation,
        *,
        exploration_depth: str,
        max_steps: int,
        viewport_mode: str,
    ) -> ExplorationPlan:
        payload = {
            "site": profile.model_dump(mode="json"),
            "explored_user_goal": explored_user_goal,
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
                "Create the concrete plan that should guide the upcoming exploration run. "
                "Use the prescan rather than guessing. Prefer 3-6 phases with specific checks."
            ),
        }
        text = self._call_json(
            system_prompt=PLAN_SYSTEM_PROMPT,
            payload=payload,
            screenshot_path=initial_observation.screenshot_path,
        )
        data = parse_json_object(text)
        return ExplorationPlan(**data)

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
            "exploration_depth": exploration_depth,
            "step_index": step_index,
            "max_steps": max_steps,
            "available_actions": AGENTIC_ACTIONS,
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
                "Plan autonomously. Pick the next action that is most likely to reveal UX evidence "
                "while broadening coverage. Follow the run_plan unless the live page state clearly "
                "suggests a better route to satisfy the same phase objective. Prefer unvisited pages, "
                "unused branches, and recovery states when coverage.stop_allowed is false. If an action "
                "needs an element, set target_id to one listed in current_observation.interactables. "
                "For open_page include input.page from site.html_files or input.url. For type_text "
                "include input.text. For scroll include input.delta_y or input.to. For drag include "
                "input.delta_x/delta_y if useful."
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
                    f"Return one JSON object and set action to exactly one of: {', '.join(AGENTIC_ACTIONS)}."
                )
            raw_text = self._call_json(
                system_prompt=DECISION_SYSTEM_PROMPT,
                payload=attempt_payload,
                screenshot_path=observation.screenshot_path,
            )
            last_raw_text = raw_text
            try:
                data = normalize_action_payload(parse_json_object(raw_text))
                if data.get("action") not in AGENTIC_ACTIONS:
                    raise ValueError(f"unsupported action: {data.get('action')}")
                return AgentDecision(**data)
            except (JSONDecodeError, ValidationError, ValueError) as exc:
                last_error = str(exc)

        raise ValueError(
            "Model selected unsupported action after "
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
                "Reflect on the latest action as an autonomous UX researcher. Record concrete UX "
                "signals discovered by the action, whether the action achieved its objective, and "
                "whether the exploration now has enough evidence and coverage to finish."
            ),
        }
        text = self._call_json(
            system_prompt=REFLECTION_SYSTEM_PROMPT,
            payload=payload,
            screenshot_path=observation.screenshot_path,
        )
        data = parse_json_object(text)
        data["step_id"] = step.id
        return Reflection(**data)

    def final_findings(
        self,
        profile: SiteProfile,
        trace: list[TraceEntry],
        explored_user_goal: str,
        session_memory: dict[str, Any],
        trajectory_chunks: list[dict[str, Any]],
        coverage: dict[str, Any] | None = None,
        final_observation: Observation | None = None,
    ) -> tuple[str, list[UXFinding]]:
        selected_trace = select_high_signal_trace_entries(trace, recent_count=3, signal_count=4)
        payload = {
            "site": profile.model_dump(mode="json"),
            "explored_user_goal": explored_user_goal,
            "session_memory": session_memory,
            "trajectory_chunks": trajectory_chunks,
            "coverage": coverage or {},
            "recent_trajectory": compact_trace(trace[-3:]),
            "high_signal_trajectory": compact_trace(selected_trace),
            "final_observation": compact_observation(
                final_observation,
                min(self.max_interactables, 28),
                text_limit=1800,
                layout_limit=12,
            )
            if final_observation
            else None,
            "instruction": (
                "Return 3-12 high-quality UX findings when evidence supports them. "
                "Use coverage.gaps to avoid overstating completeness; mention important untested "
                "areas in the summary when coverage is not near_complete."
            ),
        }
        screenshot = (
            final_observation.screenshot_path
            if final_observation
            else trace[-1].observation.screenshot_path if trace else None
        )
        text = self._call_json(REPORT_SYSTEM_PROMPT, payload, screenshot)
        data = parse_json_object(text)
        findings = [UXFinding(**item) for item in data.get("findings", [])]
        return str(data.get("summary", "")).strip(), findings

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


def compact_observation(
    observation: Observation,
    max_interactables: int,
    *,
    text_limit: int = 2500,
    layout_limit: int = 30,
) -> dict[str, Any]:
    dom_summary = observation.dom_summary or {}
    return {
        "step_id": observation.step_id,
        "url": observation.url,
        "title": observation.title,
        "viewport": observation.viewport,
        "screenshot_path": observation.screenshot_path,
        "visible_text": compact_visible_text(observation.visible_text, text_limit),
        "dom_summary": {
            "headings": (dom_summary.get("headings") or [])[:12],
            "counts": dom_summary.get("counts", {}),
            "text_length": dom_summary.get("text_length", len(observation.visible_text)),
        },
        "interactables": compact_interactables(observation.interactables, max_interactables),
        "console_errors": observation.console_errors[-6:],
        "network_errors": observation.network_errors[-6:],
        "layout_warnings": compact_layout_warnings(observation.layout_warnings, layout_limit),
    }


def compact_visible_text(text: str, limit: int) -> str:
    normalized = re.sub(r"\s+", " ", str(text or "")).strip()
    if len(normalized) <= limit:
        return normalized
    if limit < 240:
        return normalized[:limit]

    marker_top = "[top] "
    marker_middle = "[middle] "
    marker_bottom = "[bottom] "
    separators = " ... "
    marker_budget = len(marker_top) + len(marker_middle) + len(marker_bottom) + len(separators) * 2
    segment_budget = max(60, (limit - marker_budget) // 3)

    top = normalized[:segment_budget]
    middle_start = max(0, (len(normalized) // 2) - (segment_budget // 2))
    middle = normalized[middle_start : middle_start + segment_budget]
    bottom = normalized[-segment_budget:]

    compacted = (
        f"{marker_top}{top}{separators}"
        f"{marker_middle}{middle}{separators}"
        f"{marker_bottom}{bottom}"
    )
    return compacted[:limit]


def compact_layout_warnings(warnings, limit: int) -> list[dict[str, Any]]:
    severity_rank = {"high": 3, "medium": 2, "low": 1}
    ranked: list[tuple[int, int, Any]] = []
    for index, warning in enumerate(warnings):
        rank = severity_rank.get(str(getattr(warning, "severity", "")).lower(), 0)
        ranked.append((rank, index, warning))

    compacted: list[dict[str, Any]] = []
    seen: set[str] = set()
    for _, _, warning in sorted(ranked, key=lambda row: (-row[0], row[1])):
        key = f"{warning.kind}|{warning.message}|{warning.target_id or ''}"
        if key in seen:
            continue
        seen.add(key)
        compacted.append(warning.model_dump(mode="json"))
        if len(compacted) >= limit:
            break
    return compacted


def compact_interactables(items, limit: int) -> list[dict[str, Any]]:
    ranked: list[tuple[int, int, str, Any]] = []
    for index, item in enumerate(items):
        label = interactable_label(item)
        ranked.append((interactable_priority(item, label), index, interactable_signature(item, label), item))

    result: list[dict[str, Any]] = []
    seen: set[str] = set()
    for _, _, signature, item in sorted(ranked, key=lambda row: (-row[0], row[1])):
        if signature in seen:
            continue
        seen.add(signature)
        result.append(
            {
                "target_id": item.target_id,
                "kind": item.kind,
                "tag": item.tag,
                "role": item.role,
                "name": item.name,
                "text": item.text,
                "label": item.label,
                "placeholder": item.placeholder,
                "href": item.href,
                "input_type": item.input_type,
                "bbox": item.bbox,
            }
        )
        if len(result) >= limit:
            break
    return result


def interactable_label(item) -> str:
    for value in (item.name, item.label, item.text, item.placeholder, item.href, item.input_type):
        text = str(value or "").strip()
        if text:
            return text[:120]
    return ""


def interactable_signature(item, label: str) -> str:
    return "|".join(
        [
            str(item.kind or ""),
            str(item.tag or ""),
            str(item.role or ""),
            label.lower()[:80],
            str(item.href or "").lower()[:120],
        ]
    )


def interactable_priority(item, label: str) -> int:
    kind_score = {
        "typeable": 40,
        "selectable": 36,
        "clickable": 30,
        "other": 10,
    }.get(str(item.kind or "").lower(), 0)
    score = kind_score
    if label:
        score += 14
    if item.href:
        score += 8
    if item.input_type:
        score += 6
    if item.role:
        score += 4
    if item.enabled:
        score += 2
    return score


def compact_trace(trace: list[TraceEntry], include_observations: bool = False) -> list[dict[str, Any]]:
    items: list[dict[str, Any]] = []
    for entry in trace:
        item: dict[str, Any] = {
            "step": entry.step.model_dump(mode="json"),
            "result": entry.result.model_dump(mode="json"),
            "reflection": entry.reflection.model_dump(mode="json"),
        }
        if include_observations:
            item["observation"] = compact_observation(entry.observation, max_interactables=40)
        else:
            dom_summary = entry.observation.dom_summary or {}
            item["observation"] = {
                "url": entry.observation.url,
                "title": entry.observation.title,
                "viewport": entry.observation.viewport,
                "screenshot_path": entry.observation.screenshot_path,
                "visible_text": compact_visible_text(entry.observation.visible_text, 1200),
                "headings": (dom_summary.get("headings") or [])[:8],
                "layout_warning_count": len(entry.observation.layout_warnings),
                "layout_warning_kinds": [warning.kind for warning in entry.observation.layout_warnings[:8]],
                "console_error_count": len(entry.observation.console_errors),
                "network_error_count": len(entry.observation.network_errors),
            }
        items.append(item)
    return items


def compact_trace_for_report(trace: list[TraceEntry]) -> list[dict[str, Any]]:
    items: list[dict[str, Any]] = []
    for entry in trace:
        observation = entry.observation
        dom_summary = observation.dom_summary or {}
        item = {
            "step": entry.step.model_dump(mode="json"),
            "result": entry.result.model_dump(mode="json"),
            "reflection": entry.reflection.model_dump(mode="json"),
            "observation": {
                "url": observation.url,
                "title": observation.title,
                "viewport": observation.viewport,
                "screenshot_path": observation.screenshot_path,
                "visible_text": compact_visible_text(observation.visible_text, 1200),
                "headings": dom_summary.get("headings", [])[:12],
                "counts": dom_summary.get("counts", {}),
                "interactables": [
                    {
                        "target_id": item.target_id,
                        "kind": item.kind,
                        "tag": item.tag,
                        "role": item.role,
                        "name": item.name,
                        "text": item.text,
                        "label": item.label,
                        "placeholder": item.placeholder,
                        "href": item.href,
                        "input_type": item.input_type,
                    }
                    for item in observation.interactables[:18]
                ],
                "layout_warnings": [
                    warning.model_dump(mode="json")
                    for warning in observation.layout_warnings[:10]
                ],
                "console_errors": observation.console_errors[-4:],
                "network_errors": observation.network_errors[-4:],
            },
        }
        items.append(item)
    return items


def select_high_signal_trace_entries(
    trace: list[TraceEntry],
    *,
    recent_count: int = 3,
    signal_count: int = 4,
) -> list[TraceEntry]:
    if len(trace) <= recent_count + signal_count:
        return trace

    recent_start = max(0, len(trace) - recent_count)
    recent_indexes = set(range(recent_start, len(trace)))
    recent_entries = [trace[index] for index in sorted(recent_indexes)]

    ranked: list[tuple[int, int]] = []
    for index, entry in enumerate(trace):
        if index in recent_indexes:
            continue
        ranked.append((trace_entry_signal_score(entry), index))

    chosen_indexes = {
        index
        for _, index in sorted(ranked, key=lambda row: (-row[0], row[1]))[:signal_count]
    }
    selected = [trace[index] for index in range(len(trace)) if index in chosen_indexes or index in recent_indexes]
    return selected or recent_entries


def trace_entry_signal_score(entry: TraceEntry) -> int:
    score = 0
    if entry.result.error:
        score += 40
    if entry.result.before_url != entry.result.after_url:
        score += 12
    if not entry.result.changed:
        score += 6
    if entry.reflection.need_replan:
        score += 10
    score += sum(
        {"high": 10, "medium": 5, "low": 1}.get(str(warning.severity).lower(), 0)
        for warning in entry.observation.layout_warnings[:6]
    )
    score += min(10, len(entry.observation.console_errors) * 2)
    score += min(10, len(entry.observation.network_errors) * 2)

    negative_keywords = (
        "unclear",
        "confus",
        "failed",
        "error",
        "no ",
        "not ",
        "without",
        "dead",
        "missing",
        "disabled",
    )
    for note in entry.reflection.ux_notes[:6]:
        lowered = str(note).lower()
        if any(keyword in lowered for keyword in negative_keywords):
            score += 8
        else:
            score += 2
    return score


def image_data_url(path: Path) -> str:
    encoded = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:image/png;base64,{encoded}"


def parse_json_object(text: str) -> dict[str, Any]:
    cleaned = text.strip()
    if cleaned.startswith("```"):
        cleaned = re.sub(r"^```(?:json)?\s*", "", cleaned)
        cleaned = re.sub(r"\s*```$", "", cleaned)
    try:
        parsed = json.loads(cleaned)
    except json.JSONDecodeError:
        parsed = extract_first_json_object(cleaned)
        if parsed is None:
            raise
        return parsed
    if not isinstance(parsed, dict):
        raise ValueError(f"Expected JSON object, got {type(parsed).__name__}")
    return parsed


def normalize_action_payload(data: dict[str, Any]) -> dict[str, Any]:
    normalized = dict(data)
    raw_action = str(normalized.get("action") or "").strip().lower()
    if not raw_action:
        return normalized

    action = raw_action.replace("-", "_").replace(" ", "_")
    action_input = normalized.get("input")
    if not isinstance(action_input, dict):
        action_input = {}

    if action in {"scroll_down", "page_down"}:
        action = "scroll"
        action_input.setdefault("delta_y", 700)
    elif action in {"scroll_up", "page_up"}:
        action = "scroll"
        action_input.setdefault("delta_y", -700)
    else:
        action = ACTION_ALIASES.get(action, action)

    normalized["action"] = action
    if action_input:
        normalized["input"] = action_input
    return normalized


def summarize_raw_response(text: str | None, limit: int = 240) -> str:
    if not text:
        return "<empty>"
    compact = re.sub(r"\s+", " ", str(text)).strip()
    if len(compact) <= limit:
        return compact
    return f"{compact[: limit - 3]}..."


def extract_first_json_object(text: str) -> dict[str, Any] | None:
    decoder = json.JSONDecoder()
    for match in re.finditer(r"\{", text):
        try:
            parsed, _ = decoder.raw_decode(text, match.start())
        except json.JSONDecodeError:
            continue
        if isinstance(parsed, dict):
            return parsed
    return None
