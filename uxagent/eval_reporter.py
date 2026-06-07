from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from .schemas import ExplorationPlan, TraceEntry, UXEvalReport, VariantProbePlan, dump_model

METRIC_TITLES = {
    "goal_state_clarity": "Goal & State Clarity",
    "navigation_information_scent": "Navigation & Information Scent",
    "action_feedback": "Action Feedback",
    "flow_efficiency": "Flow Efficiency",
    "error_recovery": "Error Recovery",
    "trust_consequence_transparency": "Trust & Consequence Transparency",
    "scanability_responsive_accessibility": "Scanability, Responsive & Accessibility",
    "discrete_action_feedback": "Discrete Action Feedback",
    "selection_state_clarity": "Selection & State Clarity",
    "gated_cta_explanation": "Gated CTA Explanation",
    "tap_target_mobile_operability": "Tap Target & Mobile Operability",
}


class EvalReportWriter:
    def __init__(self, run_dir: Path):
        self.run_dir = run_dir
        self.run_dir.mkdir(parents=True, exist_ok=True)

    def write_trace(self, trace: list[TraceEntry], metadata: dict) -> Path:
        path = self.run_dir / "trace.json"
        payload = {
            "metadata": metadata,
            "entries": [dump_model(entry) for entry in trace],
        }
        path.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")
        return path

    def write_plan(self, plan: ExplorationPlan, prescan_summary: list[dict]) -> tuple[Path, Path]:
        json_path = self.run_dir / "plan.json"
        md_path = self.run_dir / "plan.md"
        payload = {
            "plan": dump_model(plan),
            "prescan_summary": prescan_summary,
        }
        json_path.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")
        md_path.write_text(self._plan_markdown(plan, prescan_summary), encoding="utf-8")
        return json_path, md_path

    def write_variant_probe_plan(self, plan: VariantProbePlan) -> tuple[Path, Path]:
        json_path = self.run_dir / "variant-probe-plan.json"
        md_path = self.run_dir / "variant-probe-plan.md"
        json_path.write_text(plan.model_dump_json(indent=2), encoding="utf-8")
        md_path.write_text(self._variant_probe_plan_markdown(plan), encoding="utf-8")
        return json_path, md_path

    def write_eval(self, report: UXEvalReport) -> tuple[Path, Path]:
        json_path = self.run_dir / "eval.json"
        md_path = self.run_dir / "eval.md"
        json_path.write_text(report.model_dump_json(indent=2), encoding="utf-8")
        md_path.write_text(self._markdown(report), encoding="utf-8")
        return json_path, md_path

    def write_final_eval_debug(
        self,
        *,
        raw_text: str | None,
        parsed_payload: dict[str, Any] | None,
        validation: dict[str, Any],
    ) -> dict[str, str]:
        paths: dict[str, str] = {}
        if raw_text is not None:
            raw_path = self.run_dir / "final-eval.raw.txt"
            raw_path.write_text(raw_text, encoding="utf-8")
            paths["raw"] = str(raw_path.resolve())
        if parsed_payload is not None:
            parsed_path = self.run_dir / "final-eval.parsed.json"
            parsed_path.write_text(
                json.dumps(parsed_payload, indent=2, ensure_ascii=False),
                encoding="utf-8",
            )
            paths["parsed"] = str(parsed_path.resolve())
        validation_path = self.run_dir / "final-eval.validation.json"
        validation_path.write_text(
            json.dumps(validation, indent=2, ensure_ascii=False),
            encoding="utf-8",
        )
        paths["validation"] = str(validation_path.resolve())
        return paths

    def _markdown(self, report: UXEvalReport) -> str:
        score_text = f"{report.overall_score}/100" if report.overall_score is not None else "N/A"
        raw_score_text = f"{report.overall_score_raw:.2f}/10" if report.overall_score_raw is not None else "N/A"
        lines = [
            "# UX Eval Report",
            "",
            "## Target",
            "",
            f"- Site: `{report.site.name}`",
            f"- Page type: `{report.site.page_type}`",
            f"- Target: `{report.target}`",
            f"- Run directory: `{report.run_dir}`",
            "",
            "## Overall",
            "",
            f"- Status: `{report.status}`",
            f"- UX score: `{score_text}`",
            f"- Raw mean score: `{raw_score_text}`",
            f"- Evidence confidence: `{report.evidence_confidence}`",
            "",
            report.summary or "_No evaluation summary was generated._",
            "",
            "## Metric Scores",
            "",
        ]
        if report.eval_error:
            lines.extend([f"- Eval error: {report.eval_error}", ""])
        if not report.metrics:
            lines.extend(["_No metric scores were generated for this run._", ""])
        else:
            for metric_id, metric in report.metrics.items():
                title = METRIC_TITLES.get(metric_id, metric_id.replace("_", " ").title())
                lines.extend(
                    [
                        f"### {title}",
                        "",
                        f"- Score: `{metric.score}/10`",
                        f"- Confidence: `{metric.confidence}`",
                        f"- Rationale: {metric.rationale}",
                    ]
                )
                if metric.positive_evidence:
                    lines.append("- Positive evidence:")
                    for item in metric.positive_evidence[:8]:
                        lines.append(f"  - {item}")
                if metric.negative_evidence:
                    lines.append("- Negative evidence:")
                    for item in metric.negative_evidence[:8]:
                        lines.append(f"  - {item}")
                if metric.missing_evidence:
                    lines.append("- Missing evidence:")
                    for item in metric.missing_evidence[:8]:
                        lines.append(f"  - {item}")
                elif metric.evidence:
                    lines.append("- Evidence:")
                    for item in metric.evidence[:8]:
                        lines.append(f"  - {item}")
                if metric.score_cap_reason:
                    lines.append(f"- Score cap reason: {metric.score_cap_reason}")
                if metric.issues:
                    lines.append("- Issues:")
                    for item in metric.issues[:8]:
                        lines.append(f"  - {item}")
                lines.append("")

        lines.extend(["## Top UX Issues", ""])
        if report.top_issues:
            for issue in report.top_issues:
                lines.extend(
                    [
                        f"### [{issue.severity.upper()}] {issue.problem}",
                        "",
                        f"- Metric: `{issue.metric}`",
                        f"- Page: `{issue.page_hint or 'unknown'}`",
                        f"- Evidence: {issue.evidence}",
                        f"- Suggested change: {issue.suggestion or 'Not specified.'}",
                        "",
                    ]
                )
        else:
            if report.status == "complete":
                lines.extend(["_No major UX issues were scored in this eval._", ""])
            else:
                lines.extend(["_No scored UX issues were emitted for this run._", ""])

        coverage = report.coverage or {}
        lines.extend(["## Evidence Coverage", ""])
        if coverage:
            lines.extend(
                [
                    f"- Coverage status: `{coverage.get('status', 'unknown')}`",
                    f"- Coverage confidence: `{coverage.get('confidence', 'unknown')}`",
                    f"- Page coverage: `{coverage.get('page_coverage_percent', 0)}%`",
                    f"- Feature coverage: `{coverage.get('feature_coverage_percent', 0)}%`",
                    f"- Action success rate: `{coverage.get('action_success_rate_percent', 0)}%`",
                    f"- Viewports exercised: `{', '.join(coverage.get('observed_viewports', []) or ['none'])}`",
                    "",
                ]
            )
            if coverage.get("open_page_actions") is not None:
                lines.extend(
                    [
                        f"- `open_page` actions: `{coverage.get('open_page_actions', 0)}`",
                        f"- Same-document `open_page` actions: `{coverage.get('same_document_open_actions', 0)}`",
                        f"- Blocked redundant `open_page` attempts: `{coverage.get('redundant_open_page_blocked', 0)}`",
                        "",
                    ]
                )
            gaps = coverage.get("gaps") or []
            if gaps:
                lines.append("Coverage gaps:")
                for gap in gaps[:10]:
                    lines.append(f"- {gap}")
                lines.append("")
        else:
            lines.extend(["_No structured coverage data was generated._", ""])

        lines.extend(["## Screenshots", ""])
        if report.screenshots:
            for path in report.screenshots[:24]:
                lines.append(f"- `{path}`")
        else:
            lines.append("_No screenshots captured._")

        lines.extend(
            [
                "",
                "## Trace",
                "",
                f"- Trace entries: `{report.trace_entries}`",
                "- Full trace: `trace.json`",
                "- Structured eval: `eval.json`",
                "",
            ]
        )
        if report.variant_probe_plan:
            lines.extend(
                [
                    "## Variant Probe Plan",
                    "",
                    f"- Probe count: `{len(report.variant_probe_plan.probes)}`",
                    f"- Baseline variant: `{report.variant_probe_plan.baseline_variant}`",
                    "- Full probe plan: `variant-probe-plan.json`",
                    "",
                ]
            )
        return "\n".join(lines)

    def _plan_markdown(self, plan: ExplorationPlan, prescan_summary: list[dict]) -> str:
        lines = [
            "# UX Judge Exploration Plan",
            "",
            "## Goal",
            "",
            plan.goal,
            "",
            "## Plan Summary",
            "",
            plan.summary,
            "",
            "## Coverage Targets",
            "",
        ]
        if plan.coverage_targets:
            for key, value in plan.coverage_targets.items():
                lines.append(f"- {key}: `{value}`")
        else:
            lines.append("_No structured coverage targets were generated._")
        lines.extend(["", "## Planned Phases", ""])
        if plan.phases:
            for phase in plan.phases:
                lines.extend(
                    [
                        f"### {phase.title}",
                        "",
                        f"- Objective: {phase.objective}",
                        f"- Target pages: {', '.join(phase.target_pages) if phase.target_pages else 'none'}",
                    ]
                )
                if phase.key_checks:
                    lines.append("- Key checks:")
                    for item in phase.key_checks[:10]:
                        lines.append(f"  - {item}")
                if phase.exit_criteria:
                    lines.append("- Exit criteria:")
                    for item in phase.exit_criteria[:8]:
                        lines.append(f"  - {item}")
                lines.append("")
        else:
            lines.extend(["_No exploration phases were generated._", ""])

        lines.extend(["## Prescan Summary", ""])
        if prescan_summary:
            for page in prescan_summary[:20]:
                title = page.get("title") or page.get("page") or "unknown"
                lines.extend(
                    [
                        f"### {title}",
                        "",
                        f"- Page: `{page.get('page') or 'unknown'}`",
                        f"- Headings: {', '.join(page.get('headings') or []) or 'none'}",
                        f"- Interactables: `{page.get('counts', {}).get('buttons', 0)}` buttons, "
                        f"`{page.get('counts', {}).get('links', 0)}` links, "
                        f"`{page.get('counts', {}).get('inputs', 0)}` inputs",
                    ]
                )
                controls = page.get("top_interactables") or []
                if controls:
                    lines.append("- Notable controls:")
                    for item in controls[:8]:
                        lines.append(f"  - {item}")
                lines.append("")
        else:
            lines.append("_No prescan summary was captured._")
        lines.append("")
        return "\n".join(lines)

    def _variant_probe_plan_markdown(self, plan: VariantProbePlan) -> str:
        lines = [
            "# Variant Probe Plan",
            "",
            "## Goal",
            "",
            plan.goal,
            "",
            "## Summary",
            "",
            plan.summary,
            "",
            "## Coverage Targets",
            "",
        ]
        if plan.coverage_targets:
            for key, value in plan.coverage_targets.items():
                lines.append(f"- {key}: `{value}`")
        else:
            lines.append("_No structured coverage targets were generated._")
        lines.extend(["", "## Probes", ""])
        if not plan.probes:
            lines.extend(["_No variant probes were generated._", ""])
            return "\n".join(lines)
        for probe in plan.probes:
            lines.extend(
                [
                    f"### {probe.id}",
                    "",
                    f"- Metrics: {', '.join(probe.metric_targets) if probe.metric_targets else 'none'}",
                    f"- Page hint: `{probe.page_hint or 'unknown'}`",
                    f"- Semantic target: {probe.semantic_target or 'unspecified'}",
                    f"- Precondition: {probe.precondition or 'none'}",
                    f"- Action template: {probe.action_template or 'none'}",
                    f"- Viewport: `{probe.viewport}`",
                    f"- Compare priority: `{probe.compare_priority}`",
                ]
            )
            if probe.expected_evidence:
                lines.append("- Expected evidence:")
                for item in probe.expected_evidence[:8]:
                    lines.append(f"  - {item}")
            if probe.binding_hints:
                lines.append("- Binding hints:")
                for item in probe.binding_hints[:6]:
                    lines.append(f"  - {item}")
            if probe.fallback_policy:
                lines.append(f"- Fallback: {probe.fallback_policy}")
            if probe.notes:
                lines.append("- Notes:")
                for item in probe.notes[:6]:
                    lines.append(f"  - {item}")
            lines.append("")
        return "\n".join(lines)
