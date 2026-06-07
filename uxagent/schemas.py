from __future__ import annotations

from typing import Any, Literal

from pydantic import BaseModel, Field


PlanStatus = Literal["pending", "done", "failed", "skipped"]
Severity = Literal["high", "medium", "low"]
Confidence = Literal["low", "medium", "high"]
EvalStatus = Literal["complete", "incomplete", "invalid_eval"]
ClaudePermissionMode = Literal[
    "acceptEdits",
    "auto",
    "bypassPermissions",
    "default",
    "dontAsk",
    "plan",
]


class SiteProfile(BaseModel):
    name: str
    site_dir: str
    start_page: str
    page_type: str
    html_files: list[str] = Field(default_factory=list)
    css_files: list[str] = Field(default_factory=list)
    js_files: list[str] = Field(default_factory=list)
    readme_path: str | None = None
    summary: str = ""
    skipped: bool = False
    skip_reason: str | None = None


class Interactable(BaseModel):
    target_id: str
    tag: str
    kind: Literal["clickable", "typeable", "selectable", "other"]
    role: str | None = None
    name: str = ""
    text: str = ""
    aria_label: str = ""
    label: str = ""
    placeholder: str = ""
    href: str = ""
    input_type: str = ""
    enabled: bool = True
    visible: bool = True
    bbox: dict[str, float] = Field(default_factory=dict)


class LayoutWarning(BaseModel):
    kind: str
    severity: Severity = "low"
    message: str
    target_id: str | None = None
    evidence: dict[str, Any] = Field(default_factory=dict)


class PlanStep(BaseModel):
    id: str
    objective: str
    tool: str
    input: dict[str, Any] = Field(default_factory=dict)
    success_criteria: str
    status: PlanStatus = "pending"


class Observation(BaseModel):
    step_id: str
    url: str
    title: str
    viewport: str
    screenshot_path: str
    visible_text: str
    dom_summary: dict[str, Any] = Field(default_factory=dict)
    interactables: list[Interactable] = Field(default_factory=list)
    console_errors: list[str] = Field(default_factory=list)
    network_errors: list[str] = Field(default_factory=list)
    layout_warnings: list[LayoutWarning] = Field(default_factory=list)


class ToolResult(BaseModel):
    action: str
    target: str | None = None
    before_url: str = ""
    after_url: str = ""
    changed: bool = False
    feedback: str = ""
    error: str | None = None
    screenshot_paths: list[str] = Field(default_factory=list)


class Reflection(BaseModel):
    step_id: str
    success: bool
    ux_notes: list[str] = Field(default_factory=list)
    need_replan: bool = False
    done: bool = False


class UXFinding(BaseModel):
    severity: Severity
    ux_area: str
    user_goal: str
    problem: str
    evidence: str
    why_it_matters: str
    suggestion: str
    source_hint: str | None = None


class FeedbackIssue(BaseModel):
    id: str = ""
    severity: Severity
    area: str
    page_hint: str = ""
    problem: str
    evidence: str
    suggested_fix: str


class FeedbackReport(BaseModel):
    summary: str
    intent_completed: bool = False
    issues: list[FeedbackIssue] = Field(default_factory=list)


class UXEvalMetric(BaseModel):
    score: int = Field(ge=1, le=10)
    confidence: Confidence = "medium"
    rationale: str = ""
    evidence: list[str] = Field(default_factory=list)
    positive_evidence: list[str] = Field(default_factory=list)
    negative_evidence: list[str] = Field(default_factory=list)
    missing_evidence: list[str] = Field(default_factory=list)
    score_cap_reason: str = ""
    issues: list[str] = Field(default_factory=list)


class UXEvalIssue(BaseModel):
    metric: str
    severity: Severity = "medium"
    page_hint: str = ""
    problem: str
    evidence: str
    suggestion: str = ""


class ExplorationPhase(BaseModel):
    id: str
    title: str
    objective: str
    target_pages: list[str] = Field(default_factory=list)
    key_checks: list[str] = Field(default_factory=list)
    exit_criteria: list[str] = Field(default_factory=list)


class ExplorationPlan(BaseModel):
    goal: str
    summary: str
    assumptions: list[str] = Field(default_factory=list)
    target_pages: list[str] = Field(default_factory=list)
    risk_hotspots: list[str] = Field(default_factory=list)
    phases: list[ExplorationPhase] = Field(default_factory=list)
    coverage_targets: dict[str, Any] = Field(default_factory=dict)
    notes: list[str] = Field(default_factory=list)


class VariantProbe(BaseModel):
    id: str
    metric_targets: list[str] = Field(default_factory=list)
    page_hint: str = ""
    semantic_target: str = ""
    precondition: str = ""
    action_template: str = ""
    viewport: str = "desktop"
    expected_evidence: list[str] = Field(default_factory=list)
    binding_hints: list[str] = Field(default_factory=list)
    fallback_policy: str = ""
    compare_priority: Severity = "medium"
    notes: list[str] = Field(default_factory=list)


class VariantProbePlan(BaseModel):
    goal: str
    summary: str
    baseline_variant: str = "baseline"
    target_pages: list[str] = Field(default_factory=list)
    probes: list[VariantProbe] = Field(default_factory=list)
    coverage_targets: dict[str, Any] = Field(default_factory=dict)
    notes: list[str] = Field(default_factory=list)


class ClaudeFixResult(BaseModel):
    success: bool
    permission_mode: ClaudePermissionMode
    command: list[str] = Field(default_factory=list)
    summary: str = ""
    applied_findings: list[str] = Field(default_factory=list)
    changed_files: list[str] = Field(default_factory=list)
    notes: list[str] = Field(default_factory=list)
    source_dir: str | None = None
    context_paths: list[str] = Field(default_factory=list)
    raw_output_path: str | None = None
    prompt_path: str | None = None
    result_path: str | None = None
    error: str | None = None


class AgentDecision(BaseModel):
    thought: str
    plan: list[str] = Field(default_factory=list)
    objective: str
    action: str
    target_id: str | None = None
    input: dict[str, Any] = Field(default_factory=dict)
    success_criteria: str
    done: bool = False


class TraceEntry(BaseModel):
    step: PlanStep
    result: ToolResult
    observation: Observation
    reflection: Reflection


class AuditReport(BaseModel):
    target: str
    site: SiteProfile
    explored_user_goal: str
    exploration_summary: str
    exploration_plan: ExplorationPlan | None = None
    findings: list[UXFinding] = Field(default_factory=list)
    coverage: dict[str, Any] = Field(default_factory=dict)
    screenshots: list[str] = Field(default_factory=list)
    trace_entries: int = 0
    run_dir: str
    claude_fix: ClaudeFixResult | None = None


class UXEvalReport(BaseModel):
    target: str
    site: SiteProfile
    evaluated_user_goal: str
    status: EvalStatus = "complete"
    summary: str
    overall_score: int | None = Field(default=None, ge=0, le=100)
    overall_score_raw: float | None = Field(default=None, ge=1, le=10)
    metrics: dict[str, UXEvalMetric] = Field(default_factory=dict)
    evidence_confidence: Confidence = "medium"
    top_issues: list[UXEvalIssue] = Field(default_factory=list)
    exploration_plan: ExplorationPlan | None = None
    variant_probe_plan: VariantProbePlan | None = None
    coverage: dict[str, Any] = Field(default_factory=dict)
    screenshots: list[str] = Field(default_factory=list)
    trace_entries: int = 0
    run_dir: str
    eval_error: str | None = None


def dump_model(model: BaseModel) -> dict[str, Any]:
    return model.model_dump(mode="json")
