from __future__ import annotations

import hashlib
import json
import re
import shutil
import subprocess
from datetime import datetime
from pathlib import Path
from typing import Iterable

from pydantic import ValidationError

from .schemas import (
    AuditReport,
    ClaudeFixResult,
    ClaudePermissionMode,
    FeedbackReport,
)


CLAUDE_RESULT_SCHEMA = {
    "type": "object",
    "properties": {
        "summary": {"type": "string"},
        "applied_findings": {
            "type": "array",
            "items": {"type": "string"},
        },
        "changed_files": {
            "type": "array",
            "items": {"type": "string"},
        },
        "notes": {
            "type": "array",
            "items": {"type": "string"},
        },
    },
    "required": ["summary", "applied_findings", "changed_files", "notes"],
    "additionalProperties": False,
}


def apply_claude_fix(
    report: AuditReport,
    source_dir: Path,
    *,
    executable: str = "claude",
    permission_mode: ClaudePermissionMode = "acceptEdits",
    model: str | None = None,
    allowed_tools: list[str] | None = None,
) -> ClaudeFixResult:
    run_dir = Path(report.run_dir).resolve()
    report_json_path = run_dir / "report.json"
    prompt = build_fix_prompt(report, source_dir.resolve(), report_json_path)
    return run_claude_fix_prompt(
        run_dir=run_dir,
        source_dir=source_dir.resolve(),
        prompt=prompt,
        executable=executable,
        permission_mode=permission_mode,
        model=model,
        allowed_tools=allowed_tools,
        context_paths=[report_json_path],
    )


def apply_feedback_fix(
    feedback_path: Path,
    baseline_source_dir: Path,
    out_dir: Path,
    *,
    executable: str = "claude",
    permission_mode: ClaudePermissionMode = "acceptEdits",
    model: str | None = None,
    allowed_tools: list[str] | None = None,
) -> ClaudeFixResult:
    run_dir = make_run_dir(out_dir.resolve())
    result_path = run_dir / "claude-fix-result.json"
    resolved_feedback_path = feedback_path.resolve()
    resolved_baseline_dir = baseline_source_dir.resolve()
    source_copy_dir = run_dir / "source"

    if not resolved_feedback_path.exists():
        result = ClaudeFixResult(
            success=False,
            permission_mode=permission_mode,
            source_dir=str(source_copy_dir),
            result_path=str(result_path),
            error=f"Feedback JSON was not found: {resolved_feedback_path}",
        )
        write_result(result_path, result)
        return result

    if not resolved_baseline_dir.exists():
        result = ClaudeFixResult(
            success=False,
            permission_mode=permission_mode,
            source_dir=str(source_copy_dir),
            result_path=str(result_path),
            error=f"Baseline source directory was not found: {resolved_baseline_dir}",
        )
        write_result(result_path, result)
        return result

    try:
        feedback = load_feedback_report(resolved_feedback_path)
    except RuntimeError as exc:
        result = ClaudeFixResult(
            success=False,
            permission_mode=permission_mode,
            source_dir=str(source_copy_dir),
            result_path=str(result_path),
            error=str(exc),
        )
        write_result(result_path, result)
        return result

    try:
        shutil.copytree(resolved_baseline_dir, source_copy_dir)
    except OSError as exc:
        result = ClaudeFixResult(
            success=False,
            permission_mode=permission_mode,
            source_dir=str(source_copy_dir),
            result_path=str(result_path),
            error=(
                "Failed to create the fresh editable source copy from the baseline "
                f"directory: {exc}"
            ),
        )
        write_result(result_path, result)
        return result

    try:
        copied_context = copy_feedback_context(resolved_feedback_path, run_dir)
    except OSError as exc:
        result = ClaudeFixResult(
            success=False,
            permission_mode=permission_mode,
            source_dir=str(source_copy_dir),
            result_path=str(result_path),
            error=f"Failed to copy feedback context into the run directory: {exc}",
        )
        write_result(result_path, result)
        return result

    write_feedback_context_metadata(
        run_dir,
        baseline_source_dir=resolved_baseline_dir,
        source_copy_dir=source_copy_dir,
        original_feedback_path=resolved_feedback_path,
        copied_context=copied_context,
    )
    prompt = build_feedback_fix_prompt(
        feedback=feedback,
        editable_source_dir=source_copy_dir,
        baseline_source_dir=resolved_baseline_dir,
        feedback_json_path=copied_context["feedback_json"],
        supporting_context_paths=[
            path
            for key, path in copied_context.items()
            if key != "feedback_json"
        ],
    )
    return run_claude_fix_prompt(
        run_dir=run_dir,
        source_dir=source_copy_dir,
        prompt=prompt,
        executable=executable,
        permission_mode=permission_mode,
        model=model,
        allowed_tools=allowed_tools,
        context_paths=copied_context.values(),
    )


def load_feedback_report(feedback_path: Path) -> FeedbackReport:
    try:
        payload = json.loads(feedback_path.read_text(encoding="utf-8"))
    except OSError as exc:
        raise RuntimeError(f"Could not read feedback JSON: {feedback_path} ({exc})") from exc
    except json.JSONDecodeError as exc:
        raise RuntimeError(f"Feedback JSON is invalid: {feedback_path} ({exc})") from exc

    try:
        return FeedbackReport.model_validate(payload)
    except ValidationError as exc:
        raise RuntimeError(
            f"Feedback JSON has an unexpected shape: {feedback_path} ({exc})"
        ) from exc


def build_fix_prompt(report: AuditReport, source_dir: Path, report_json_path: Path) -> str:
    prioritized_findings = report.findings
    finding_lines = []
    for index, finding in enumerate(prioritized_findings[:8], start=1):
        finding_lines.append(
            f"{index}. [{finding.severity.upper()}] {finding.problem} | "
            f"Area: {finding.ux_area} | Suggestion: {finding.suggestion} | "
            f"Source hint: {finding.source_hint or 'unknown'}"
        )

    findings_block = "\n".join(finding_lines) if finding_lines else "No findings were available."
    return f"""
You are applying concrete UX fixes to a local static website after an automated UX audit.

Source directory you may edit:
{source_dir}

Audit report JSON to read before making changes:
{report_json_path}

Target audited URL:
{report.target}

Site summary:
- Site name: {report.site.name}
- Page type: {report.site.page_type}
- Explored goal: {report.explored_user_goal}

Priority UX findings:
{findings_block}

Instructions:
1. Read the audit report JSON and inspect the relevant source files under the source directory.
2. Implement the highest-impact fixes for the reported UX issues, prioritizing high severity and then medium severity findings.
3. Preserve the site's scenario, content intent, and overall visual language while improving clarity, flow, and usability.
4. Prefer direct HTML/CSS/JS edits over speculative rewrites.
5. Do not edit files outside the source directory.
6. If multiple findings can be fixed together, make the smallest cohesive set of changes.
7. If a finding cannot be safely addressed from the local static source alone, skip it and mention that in notes.
8. After editing, return JSON only, matching the provided schema.
""".strip()


def build_feedback_fix_prompt(
    *,
    feedback: FeedbackReport,
    editable_source_dir: Path,
    baseline_source_dir: Path,
    feedback_json_path: Path,
    supporting_context_paths: list[Path],
) -> str:
    issue_lines = []
    for index, issue in enumerate(feedback.issues[:10], start=1):
        issue_lines.append(
            f"{index}. [{issue.severity.upper()}] {issue.problem} | "
            f"Area: {issue.area} | Page hint: {issue.page_hint or 'unknown'} | "
            f"Suggested fix: {issue.suggested_fix} | "
            f"Evidence: {shorten_text(issue.evidence, 260)}"
        )

    issues_block = "\n".join(issue_lines) if issue_lines else "No feedback issues were available."
    support_block = (
        "\n".join(f"- {path}" for path in supporting_context_paths)
        if supporting_context_paths
        else "- None"
    )
    intent_completed = "yes" if feedback.intent_completed else "no"
    return f"""
You are applying concrete UX fixes to a local static website from model-generated feedback.

Editable working copy you may modify:
{editable_source_dir}

Baseline source that was copied into this working copy:
{baseline_source_dir}

Feedback JSON to read before making changes:
{feedback_json_path}

Supporting context you may read if helpful:
{support_block}

Feedback summary:
{feedback.summary}

Was the original audit intent fully completed?
{intent_completed}

Priority feedback issues:
{issues_block}

Instructions:
1. Read the feedback JSON first, then inspect the relevant files in the editable working copy.
2. This working copy was freshly copied from the baseline source. Do not assume any edits from previous fix runs exist here.
3. Treat the editable working copy as the only place you may modify.
4. Use page hints and supporting report context to find the affected HTML/CSS/JS quickly.
5. Implement the highest-impact fixes first, prioritizing high severity and then medium severity issues.
6. Preserve the site's scenario, content intent, and overall visual language while improving clarity, flow, responsiveness, accessibility, and usability.
7. Prefer direct HTML/CSS/JS edits over speculative rewrites.
8. If multiple issues can be solved together, make the smallest cohesive set of changes.
9. If an issue cannot be safely addressed from the local static source alone, skip it and mention that in notes.
10. After editing, return JSON only, matching the provided schema.
""".strip()


def run_claude_fix_prompt(
    *,
    run_dir: Path,
    source_dir: Path,
    prompt: str,
    executable: str,
    permission_mode: ClaudePermissionMode,
    model: str | None,
    allowed_tools: list[str] | None,
    context_paths: Iterable[Path] | None = None,
) -> ClaudeFixResult:
    resolved_source_dir = source_dir.resolve()
    result_path = run_dir / "claude-fix-result.json"
    prompt_path = run_dir / "claude-fix-prompt.txt"
    raw_output_path = run_dir / "claude-fix-raw-output.json"
    prompt_path.write_text(prompt, encoding="utf-8")

    executable_path = shutil.which(executable)
    serialized_context_paths = [str(path.resolve()) for path in context_paths or []]
    if not executable_path:
        result = ClaudeFixResult(
            success=False,
            permission_mode=permission_mode,
            source_dir=str(resolved_source_dir),
            context_paths=serialized_context_paths,
            prompt_path=str(prompt_path),
            result_path=str(result_path),
            error=f"Claude Code executable was not found on PATH: {executable}",
        )
        write_result(result_path, result)
        return result

    if not resolved_source_dir.exists():
        result = ClaudeFixResult(
            success=False,
            permission_mode=permission_mode,
            source_dir=str(resolved_source_dir),
            context_paths=serialized_context_paths,
            prompt_path=str(prompt_path),
            result_path=str(result_path),
            error=f"Source directory for Claude fixes does not exist: {resolved_source_dir}",
        )
        write_result(result_path, result)
        return result

    command = [
        executable_path,
        "--print",
        "--permission-mode",
        permission_mode,
    ]
    for allowed_dir in unique_existing_paths([resolved_source_dir, run_dir]):
        command.extend(["--add-dir", str(allowed_dir)])
    command.extend(
        [
            "--no-session-persistence",
            "--json-schema",
            json.dumps(CLAUDE_RESULT_SCHEMA, ensure_ascii=False),
        ]
    )
    if allowed_tools:
        command.extend(["--allowedTools", ",".join(allowed_tools)])
    if model:
        command.extend(["--model", model])

    before_snapshot = snapshot_files(resolved_source_dir)
    completed = subprocess.run(
        command,
        cwd=resolved_source_dir,
        input=prompt,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
        check=False,
    )
    raw_output = (completed.stdout or "").strip()
    if completed.stderr:
        raw_output = f"{raw_output}\n\n[stderr]\n{completed.stderr.strip()}".strip()
    raw_output_path.write_text(raw_output, encoding="utf-8")

    after_snapshot = snapshot_files(resolved_source_dir)
    changed_files = detect_changed_files(before_snapshot, after_snapshot)

    if completed.returncode != 0:
        result = ClaudeFixResult(
            success=False,
            permission_mode=permission_mode,
            command=command,
            changed_files=changed_files,
            source_dir=str(resolved_source_dir),
            context_paths=serialized_context_paths,
            raw_output_path=str(raw_output_path),
            prompt_path=str(prompt_path),
            result_path=str(result_path),
            error=f"Claude Code exited with code {completed.returncode}.",
        )
        write_result(result_path, result)
        return result

    try:
        payload = parse_json_text(completed.stdout or "{}")
    except json.JSONDecodeError as exc:
        result = ClaudeFixResult(
            success=False,
            permission_mode=permission_mode,
            command=command,
            changed_files=changed_files,
            source_dir=str(resolved_source_dir),
            context_paths=serialized_context_paths,
            raw_output_path=str(raw_output_path),
            prompt_path=str(prompt_path),
            result_path=str(result_path),
            error=f"Claude Code returned invalid JSON: {exc}",
        )
        write_result(result_path, result)
        return result

    reported_files = [
        str(item).strip()
        for item in payload.get("changed_files", [])
        if str(item).strip()
    ]
    result = ClaudeFixResult(
        success=True,
        permission_mode=permission_mode,
        command=command,
        summary=str(payload.get("summary", "")).strip(),
        applied_findings=clean_lines(payload.get("applied_findings")),
        changed_files=merge_changed_files(changed_files, reported_files),
        notes=clean_lines(payload.get("notes")),
        source_dir=str(resolved_source_dir),
        context_paths=serialized_context_paths,
        raw_output_path=str(raw_output_path),
        prompt_path=str(prompt_path),
        result_path=str(result_path),
    )
    write_result(result_path, result)
    return result


def copy_feedback_context(feedback_path: Path, run_dir: Path) -> dict[str, Path]:
    context_root = run_dir / "context"
    context_root.mkdir(parents=True, exist_ok=True)
    candidates = {
        "feedback_json": feedback_path,
        "feedback_md": feedback_path.with_suffix(".md"),
        "report_json": feedback_path.parent / "_run" / "report.json",
        "report_md": feedback_path.parent / "_run" / "report.md",
    }
    copied: dict[str, Path] = {}
    for key, original_path in candidates.items():
        if not original_path.exists():
            continue
        relative_path = original_path.relative_to(feedback_path.parent)
        copied_path = context_root / relative_path
        copied_path.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(original_path, copied_path)
        copied[key] = copied_path
    return copied


def write_feedback_context_metadata(
    run_dir: Path,
    *,
    baseline_source_dir: Path,
    source_copy_dir: Path,
    original_feedback_path: Path,
    copied_context: dict[str, Path],
) -> None:
    payload = {
        "mode": "feedback-fix",
        "created_at": datetime.now().isoformat(timespec="seconds"),
        "baseline_source_dir": str(baseline_source_dir),
        "source_copy_dir": str(source_copy_dir),
        "original_feedback_path": str(original_feedback_path),
        "copied_context": {key: str(path) for key, path in copied_context.items()},
    }
    (run_dir / "fix-context.json").write_text(
        json.dumps(payload, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )


def make_run_dir(out_dir: Path) -> Path:
    out_dir.mkdir(parents=True, exist_ok=True)
    name = datetime.now().strftime("%Y%m%d-%H%M%S")
    run_dir = out_dir / name
    suffix = 1
    while run_dir.exists():
        run_dir = out_dir / f"{name}-{suffix}"
        suffix += 1
    run_dir.mkdir(parents=True, exist_ok=False)
    return run_dir


def write_result(result_path: Path, result: ClaudeFixResult) -> None:
    result_path.write_text(result.model_dump_json(indent=2), encoding="utf-8")


def unique_existing_paths(paths: Iterable[Path]) -> list[Path]:
    unique: list[Path] = []
    seen: set[str] = set()
    for path in paths:
        resolved = path.resolve()
        key = str(resolved)
        if key in seen or not resolved.exists():
            continue
        seen.add(key)
        unique.append(resolved)
    return unique


def shorten_text(text: str, limit: int) -> str:
    cleaned = " ".join(str(text).split())
    if len(cleaned) <= limit:
        return cleaned
    return cleaned[: limit - 3].rstrip() + "..."


def snapshot_files(root: Path) -> dict[str, str]:
    snapshot: dict[str, str] = {}
    for path in sorted(root.rglob("*")):
        if not path.is_file():
            continue
        rel_path = path.relative_to(root).as_posix()
        digest = hashlib.sha256(path.read_bytes()).hexdigest()
        snapshot[rel_path] = digest
    return snapshot


def detect_changed_files(before: dict[str, str], after: dict[str, str]) -> list[str]:
    changed = []
    for path in sorted(set(before) | set(after)):
        if before.get(path) != after.get(path):
            changed.append(path)
    return changed


def merge_changed_files(actual: list[str], reported: list[str]) -> list[str]:
    merged = []
    seen: set[str] = set()
    for path in [*actual, *reported]:
        cleaned = str(path).strip().replace("\\", "/")
        if not cleaned or cleaned in seen:
            continue
        seen.add(cleaned)
        merged.append(cleaned)
    return merged


def clean_lines(value: object) -> list[str]:
    if not isinstance(value, list):
        return []
    items = []
    for item in value:
        text = str(item).strip()
        if text:
            items.append(text)
    return items


def parse_json_text(text: str) -> dict:
    cleaned = text.strip()
    if not cleaned:
        return {}
    if cleaned.startswith("```"):
        cleaned = re.sub(r"^```(?:json)?\s*", "", cleaned)
        cleaned = re.sub(r"\s*```$", "", cleaned)
    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        match = re.search(r"\{.*\}", cleaned, flags=re.S)
        if not match:
            raise
        return json.loads(match.group(0))
