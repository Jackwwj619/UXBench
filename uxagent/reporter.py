from __future__ import annotations

import json
from pathlib import Path

from .schemas import AuditReport, ExplorationPlan, TraceEntry, dump_model


class ReportWriter:
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

    def write_report(self, report: AuditReport) -> tuple[Path, Path]:
        json_path = self.run_dir / "report.json"
        md_path = self.run_dir / "report.md"
        json_path.write_text(
            report.model_dump_json(indent=2),
            encoding="utf-8",
        )
        md_path.write_text(self._markdown(report), encoding="utf-8")
        return json_path, md_path

    def _markdown(self, report: AuditReport) -> str:
        lines: list[str] = [
            "# UXAgent Report",
            "",
            "## Target",
            "",
            f"- Site: `{report.site.name}`",
            f"- Page type: `{report.site.page_type}`",
            f"- Target: `{report.target}`",
            f"- Run directory: `{report.run_dir}`",
            "",
            "## Explored User Goal",
            "",
            report.explored_user_goal,
            "",
            "## Exploration Summary",
            "",
            report.exploration_summary,
            "",
        ]

        if report.exploration_plan:
            lines.extend(
                [
                    "## Execution Plan",
                    "",
                    report.exploration_plan.summary,
                    "",
                ]
            )
            if report.exploration_plan.phases:
                for phase in report.exploration_plan.phases:
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
                        for item in phase.key_checks[:8]:
                            lines.append(f"  - {item}")
                    if phase.exit_criteria:
                        lines.append("- Exit criteria:")
                        for item in phase.exit_criteria[:6]:
                            lines.append(f"  - {item}")
                    lines.append("")
            else:
                lines.extend(["_No explicit exploration phases were generated._", ""])

        lines.extend(["## Exploration Coverage", ""])
        coverage = report.coverage or {}
        if coverage:
            lines.extend(
                [
                    f"- Status: `{coverage.get('status', 'unknown')}`",
                    f"- Confidence: `{coverage.get('confidence', 'unknown')}`",
                    f"- Page coverage: `{coverage.get('page_coverage_percent', 0)}%`",
                    f"- Feature coverage: `{coverage.get('feature_coverage_percent', 0)}%`",
                    f"- Action success rate: `{coverage.get('action_success_rate_percent', 0)}%`",
                    f"- Viewports exercised: `{', '.join(coverage.get('observed_viewports', []) or ['none'])}`",
                    "",
                ]
            )
            gaps = coverage.get("gaps") or []
            if gaps:
                lines.append("Coverage gaps:")
                for gap in gaps[:10]:
                    lines.append(f"- {gap}")
                lines.append("")
            unexplored = coverage.get("unexplored_features") or []
            if unexplored:
                lines.append("Visible but not directly exercised:")
                for item in unexplored[:12]:
                    label = item.get("label") or item.get("signature") or "unknown"
                    page = item.get("page") or "unknown page"
                    lines.append(f"- `{page}`: {label}")
                lines.append("")
        else:
            lines.extend(["_No structured coverage analysis was generated for this run._", ""])

        lines.extend(["## Top UX Feedback", ""])

        if not report.findings:
            lines.append("No concrete UX issues were detected in this short run.")
        else:
            for idx, finding in enumerate(report.findings[:5], start=1):
                lines.append(
                    f"{idx}. **[{finding.severity.upper()}] {finding.problem}** "
                    f"({finding.ux_area})"
                )
        lines.append("")

        for severity in ("high", "medium", "low"):
            group = [finding for finding in report.findings if finding.severity == severity]
            lines.extend([f"## {severity.title()} Severity Findings", ""])
            if not group:
                lines.append("_None in this run._")
                lines.append("")
                continue
            for finding in group:
                lines.extend(
                    [
                        f"### {finding.problem}",
                        "",
                        f"- UX area: `{finding.ux_area}`",
                        f"- User goal: {finding.user_goal}",
                        f"- Evidence: {finding.evidence}",
                        f"- Why it matters: {finding.why_it_matters}",
                        f"- Suggested change: {finding.suggestion}",
                        f"- Source hint: `{finding.source_hint or 'unknown'}`",
                        "",
                    ]
                )

        lines.extend(["## Screenshots and Evidence", ""])
        for path in report.screenshots[:20]:
            lines.append(f"- `{path}`")
        if not report.screenshots:
            lines.append("_No screenshots captured._")
        lines.extend(
            [
                "",
                "## Suggested Fix Priorities",
                "",
            ]
        )
        if report.findings:
            for idx, finding in enumerate(report.findings[:8], start=1):
                lines.append(f"{idx}. {finding.suggestion}")
        else:
            lines.append("No prioritized fixes generated.")
        lines.extend(
            [
                "",
                "## Claude Remediation",
                "",
            ]
        )
        if report.claude_fix is None:
            lines.append("_Claude Code fix pass was not requested for this run._")
        elif not report.claude_fix.success:
            lines.append(f"- Status: `failed`")
            lines.append(f"- Permission mode: `{report.claude_fix.permission_mode}`")
            lines.append(f"- Error: {report.claude_fix.error or 'Unknown Claude fix failure.'}")
            if report.claude_fix.result_path:
                lines.append(f"- Result file: `{report.claude_fix.result_path}`")
            if report.claude_fix.raw_output_path:
                lines.append(f"- Raw output: `{report.claude_fix.raw_output_path}`")
        else:
            lines.append(f"- Status: `applied`")
            lines.append(f"- Permission mode: `{report.claude_fix.permission_mode}`")
            lines.append(f"- Summary: {report.claude_fix.summary or 'Claude Code completed with no summary.'}")
            if report.claude_fix.changed_files:
                lines.append("- Changed files:")
                for path in report.claude_fix.changed_files[:20]:
                    lines.append(f"  - `{path}`")
            else:
                lines.append("- Changed files: _None detected._")
            if report.claude_fix.notes:
                lines.append("- Notes:")
                for note in report.claude_fix.notes[:10]:
                    lines.append(f"  - {note}")
        lines.extend(
            [
                "",
                "## Trace Summary",
                "",
                f"- Trace entries: `{report.trace_entries}`",
                "- Full trace: `trace.json`",
                "- Structured report: `report.json`",
                "",
            ]
        )
        return "\n".join(lines)

    def _plan_markdown(self, plan: ExplorationPlan, prescan_summary: list[dict]) -> str:
        lines = [
            "# UXAgent Exploration Plan",
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
