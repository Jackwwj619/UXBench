from __future__ import annotations

import asyncio
from pathlib import Path
from urllib.parse import unquote, urlparse

import click
from dotenv import load_dotenv

from .agent import AuditAgent, make_run_dir
from .claude_code import apply_claude_fix, apply_feedback_fix
from .config import (
    DEFAULT_CONFIG_FILE,
    load_app_config,
    provider_model_catalog,
    resolve_audit_config,
    resolve_audit_url_config,
    resolve_eval_config,
    resolve_eval_url_config,
)
from .judge_brain import JUDGE_RUBRIC_NAMES
from .judge_agent import UXJudgeAgent
from .reporter import ReportWriter
from .schemas import SiteProfile
from .site_catalog import load_site_profile, scan_sites

DEPTH_DEFAULT_STEPS = {
    "quick": 8,
    "standard": 20,
    "deep": 40,
    "exhaustive": 80,
}
CLAUDE_PERMISSION_MODES = [
    "acceptEdits",
    "auto",
    "bypassPermissions",
    "default",
    "dontAsk",
    "plan",
]


@click.group()
def main() -> None:
    """UXBench UXAgent: automated UX exploration and feedback reports."""
    load_dotenv()


@main.command("audit")
@click.option("--site", required=True, help="Directory name under websites/.")
@click.option("--start", default=None, help="Start HTML file. Defaults to config.")
@click.option(
    "--max-steps",
    default=None,
    type=int,
    help="Maximum autonomous action steps. Defaults to config.",
)
@click.option(
    "--exploration-depth",
    default=None,
    type=click.Choice(["quick", "standard", "deep", "exhaustive"]),
    help="Exploration budget and ambition. Defaults to config.",
)
@click.option(
    "--config",
    "config_path",
    default=Path(DEFAULT_CONFIG_FILE),
    show_default=True,
    type=click.Path(path_type=Path, dir_okay=False),
    help="Provider config file.",
)
@click.option(
    "--provider",
    default=None,
    help="Provider name from the config file. Defaults to config.default_provider.",
)
@click.option(
    "--model",
    default=None,
    help="Optional model override for the selected provider.",
)
@click.option(
    "--headed/--headless",
    default=None,
    help="Show or hide the browser window. Defaults to config.",
)
@click.option(
    "--protect-risky-actions/--allow-risky-actions",
    default=None,
    help="Skip or allow final destructive/payment confirmations. Defaults to config.",
)
@click.option(
    "--out",
    default=None,
    type=click.Path(path_type=Path),
    help="Output directory. Defaults to config.",
)
@click.option(
    "--viewport",
    default=None,
    type=click.Choice(["desktop", "mobile", "both"]),
    help="Viewport coverage. Defaults to config.",
)
@click.option(
    "--claude-fix/--no-claude-fix",
    default=False,
    help="After generating the UX report, ask Claude Code to apply fixes to the local site files.",
)
@click.option(
    "--claude-exe",
    default="claude",
    show_default=True,
    help="Claude Code executable to invoke for auto-fixes.",
)
@click.option(
    "--claude-model",
    default=None,
    help="Optional Claude model override for the fix pass.",
)
@click.option(
    "--claude-permission-mode",
    default="acceptEdits",
    show_default=True,
    type=click.Choice(CLAUDE_PERMISSION_MODES),
    help="Permission mode passed to Claude Code during the fix pass.",
)
@click.option(
    "--claude-allowed-tools",
    default=None,
    help="Optional comma-separated Claude Code tools to allow during the fix pass.",
)
@click.option(
    "--fail-on-claude-fix-failure/--no-fail-on-claude-fix-failure",
    default=False,
    show_default=True,
    help="Return a non-zero exit code when the optional Claude fix pass fails.",
)
def audit(
    site: str,
    start: str | None,
    max_steps: int | None,
    exploration_depth: str | None,
    config_path: Path,
    provider: str | None,
    model: str | None,
    headed: bool | None,
    protect_risky_actions: bool | None,
    out: Path | None,
    viewport: str | None,
    claude_fix: bool,
    claude_exe: str,
    claude_model: str | None,
    claude_permission_mode: str,
    claude_allowed_tools: str | None,
    fail_on_claude_fix_failure: bool,
) -> None:
    """Audit a built-in site under websites/."""
    workspace = Path.cwd()
    websites_dir = workspace / "websites"
    site_dir = websites_dir / site
    if not site_dir.exists():
        available = ", ".join(profile.name for profile in scan_sites(websites_dir)[:20])
        raise click.ClickException(f"Site '{site}' was not found under websites/. Available: {available}")

    resolved = resolve_audit_or_raise(
        config_path=config_path,
        provider=provider,
        model=model,
        start=start,
        max_steps=max_steps,
        exploration_depth=exploration_depth,
        headed=headed,
        viewport=viewport,
        protect_risky_actions=protect_risky_actions,
        out=str(out) if out else None,
    )
    if not (site_dir / resolved.start).exists():
        raise click.ClickException(f"Start page does not exist: {site_dir / resolved.start}")
    profile = load_site_profile(site_dir, start_page=resolved.start)
    if profile.skipped:
        raise click.ClickException(profile.skip_reason or f"Site '{site}' has no auditable HTML.")
    run_dir = make_run_dir((workspace / resolved.out).resolve())
    target_url = (site_dir / profile.start_page).resolve().as_uri()
    report = run_agent_or_raise(
        AuditAgent(
            run_dir=run_dir,
            provider_config=resolved.provider_config,
            headless=not resolved.headed,
            max_steps=resolve_max_steps(resolved.max_steps, resolved.exploration_depth),
            viewport_mode=resolved.viewport,
            exploration_depth=resolved.exploration_depth,
            protect_risky_actions=resolved.protect_risky_actions,
        ),
        profile,
        target_url,
    )
    report_path = Path(report.run_dir) / "report.md"
    trace_path = Path(report.run_dir) / "trace.json"
    plan_path = Path(report.run_dir) / "plan.md"

    if claude_fix:
        fix_result = apply_claude_fix(
            report,
            site_dir,
            executable=claude_exe,
            permission_mode=claude_permission_mode,
            model=claude_model,
            allowed_tools=parse_csv_list(claude_allowed_tools),
        )
        report.claude_fix = fix_result
        ReportWriter(Path(report.run_dir)).write_report(report)

    click.echo(f"Plan:   {plan_path}")
    click.echo(f"Report: {report_path}")
    click.echo(f"Trace:  {trace_path}")
    if claude_fix:
        fix_path = Path(report.run_dir) / "claude-fix-result.json"
        click.echo(f"Claude Fix: {fix_path}")
        if fail_on_claude_fix_failure and (not report.claude_fix or not report.claude_fix.success):
            error = report.claude_fix.error if report.claude_fix else "unknown Claude fix failure"
            raise click.ClickException(f"Claude fix failed: {error}")


@main.command("audit-url")
@click.option("--url", required=True, help="URL to audit. file:// and http(s) are supported.")
@click.option(
    "--source-dir",
    default=None,
    type=click.Path(exists=True, file_okay=False, path_type=Path),
    help="Optional local source directory for context and source hints.",
)
@click.option(
    "--max-steps",
    default=None,
    type=int,
    help="Maximum autonomous action steps. Defaults to config.",
)
@click.option(
    "--exploration-depth",
    default=None,
    type=click.Choice(["quick", "standard", "deep", "exhaustive"]),
    help="Exploration budget and ambition. Defaults to config.",
)
@click.option(
    "--config",
    "config_path",
    default=Path(DEFAULT_CONFIG_FILE),
    show_default=True,
    type=click.Path(path_type=Path, dir_okay=False),
    help="Provider config file.",
)
@click.option(
    "--provider",
    default=None,
    help="Provider name from the config file. Defaults to config.default_provider.",
)
@click.option(
    "--model",
    default=None,
    help="Optional model override for the selected provider.",
)
@click.option(
    "--headed/--headless",
    default=None,
    help="Show or hide the browser window. Defaults to config.",
)
@click.option(
    "--protect-risky-actions/--allow-risky-actions",
    default=None,
    help="Skip or allow final destructive/payment confirmations. Defaults to config.",
)
@click.option(
    "--out",
    default=None,
    type=click.Path(path_type=Path),
    help="Output directory. Defaults to config.",
)
@click.option(
    "--viewport",
    default=None,
    type=click.Choice(["desktop", "mobile", "both"]),
    help="Viewport coverage. Defaults to config.",
)
@click.option(
    "--claude-fix/--no-claude-fix",
    default=False,
    help="After generating the UX report, ask Claude Code to apply fixes to the local source files.",
)
@click.option(
    "--claude-exe",
    default="claude",
    show_default=True,
    help="Claude Code executable to invoke for auto-fixes.",
)
@click.option(
    "--claude-model",
    default=None,
    help="Optional Claude model override for the fix pass.",
)
@click.option(
    "--claude-permission-mode",
    default="acceptEdits",
    show_default=True,
    type=click.Choice(CLAUDE_PERMISSION_MODES),
    help="Permission mode passed to Claude Code during the fix pass.",
)
@click.option(
    "--claude-allowed-tools",
    default=None,
    help="Optional comma-separated Claude Code tools to allow during the fix pass.",
)
@click.option(
    "--fail-on-claude-fix-failure/--no-fail-on-claude-fix-failure",
    default=False,
    show_default=True,
    help="Return a non-zero exit code when the optional Claude fix pass fails.",
)
def audit_url(
    url: str,
    source_dir: Path | None,
    max_steps: int | None,
    exploration_depth: str | None,
    config_path: Path,
    provider: str | None,
    model: str | None,
    headed: bool | None,
    protect_risky_actions: bool | None,
    out: Path | None,
    viewport: str | None,
    claude_fix: bool,
    claude_exe: str,
    claude_model: str | None,
    claude_permission_mode: str,
    claude_allowed_tools: str | None,
    fail_on_claude_fix_failure: bool,
) -> None:
    """Audit an arbitrary local or remote URL."""
    if claude_fix and source_dir is None:
        raise click.ClickException(
            "Claude fixes for audit-url require --source-dir so there are local files to edit."
        )
    workspace = Path.cwd()
    profile = _profile_for_url(url, source_dir)
    resolved = resolve_audit_url_or_raise(
        config_path=config_path,
        provider=provider,
        model=model,
        max_steps=max_steps,
        exploration_depth=exploration_depth,
        headed=headed,
        viewport=viewport,
        protect_risky_actions=protect_risky_actions,
        out=str(out) if out else None,
    )
    run_dir = make_run_dir((workspace / resolved.out).resolve())
    report = run_agent_or_raise(
        AuditAgent(
            run_dir=run_dir,
            provider_config=resolved.provider_config,
            headless=not resolved.headed,
            max_steps=resolve_max_steps(resolved.max_steps, resolved.exploration_depth),
            viewport_mode=resolved.viewport,
            exploration_depth=resolved.exploration_depth,
            protect_risky_actions=resolved.protect_risky_actions,
        ),
        profile,
        url,
    )
    report_path = Path(report.run_dir) / "report.md"
    trace_path = Path(report.run_dir) / "trace.json"
    plan_path = Path(report.run_dir) / "plan.md"

    if claude_fix and source_dir is not None:
        fix_result = apply_claude_fix(
            report,
            source_dir,
            executable=claude_exe,
            permission_mode=claude_permission_mode,
            model=claude_model,
            allowed_tools=parse_csv_list(claude_allowed_tools),
        )
        report.claude_fix = fix_result
        ReportWriter(Path(report.run_dir)).write_report(report)

    click.echo(f"Plan:   {plan_path}")
    click.echo(f"Report: {report_path}")
    click.echo(f"Trace:  {trace_path}")
    if claude_fix:
        fix_path = Path(report.run_dir) / "claude-fix-result.json"
        click.echo(f"Claude Fix: {fix_path}")
        if fail_on_claude_fix_failure and (not report.claude_fix or not report.claude_fix.success):
            error = report.claude_fix.error if report.claude_fix else "unknown Claude fix failure"
            raise click.ClickException(f"Claude fix failed: {error}")


@main.command("eval")
@click.option("--site", required=True, help="Directory name under websites/.")
@click.option("--start", default=None, help="Start HTML file. Defaults to config.")
@click.option(
    "--max-steps",
    default=None,
    type=int,
    help="Maximum autonomous judge action steps. Defaults to config.",
)
@click.option(
    "--exploration-depth",
    default=None,
    type=click.Choice(["quick", "standard", "deep", "exhaustive"]),
    help="Exploration budget and ambition. Defaults to config.",
)
@click.option(
    "--config",
    "config_path",
    default=Path(DEFAULT_CONFIG_FILE),
    show_default=True,
    type=click.Path(path_type=Path, dir_okay=False),
    help="Provider config file.",
)
@click.option(
    "--provider",
    default=None,
    help="Provider name from the config file. Defaults to config.default_provider.",
)
@click.option(
    "--model",
    default=None,
    help="Optional model override for the selected provider.",
)
@click.option(
    "--headed/--headless",
    default=None,
    help="Show or hide the browser window. Defaults to config.",
)
@click.option(
    "--protect-risky-actions/--allow-risky-actions",
    default=None,
    help="Skip or allow final destructive/payment confirmations. Defaults to config.",
)
@click.option(
    "--out",
    default=None,
    type=click.Path(path_type=Path),
    help="Output directory. Defaults to config.",
)
@click.option(
    "--viewport",
    default=None,
    type=click.Choice(["desktop", "mobile", "both"]),
    help="Viewport coverage. Defaults to config.",
)
@click.option(
    "--judge-rubric",
    default="default",
    show_default=True,
    type=click.Choice(list(JUDGE_RUBRIC_NAMES)),
    help="Scoring rubric preset to use for judge metrics.",
)
def eval_site(
    site: str,
    start: str | None,
    max_steps: int | None,
    exploration_depth: str | None,
    config_path: Path,
    provider: str | None,
    model: str | None,
    headed: bool | None,
    protect_risky_actions: bool | None,
    out: Path | None,
    viewport: str | None,
    judge_rubric: str,
) -> None:
    """Judge the UX quality of a built-in site under websites/."""
    workspace = Path.cwd()
    websites_dir = workspace / "websites"
    site_dir = websites_dir / site
    if not site_dir.exists():
        available = ", ".join(profile.name for profile in scan_sites(websites_dir)[:20])
        raise click.ClickException(f"Site '{site}' was not found under websites/. Available: {available}")

    resolved = resolve_eval_or_raise(
        config_path=config_path,
        provider=provider,
        model=model,
        start=start,
        max_steps=max_steps,
        exploration_depth=exploration_depth,
        headed=headed,
        viewport=viewport,
        protect_risky_actions=protect_risky_actions,
        out=str(out) if out else None,
    )
    if not (site_dir / resolved.start).exists():
        raise click.ClickException(f"Start page does not exist: {site_dir / resolved.start}")
    profile = load_site_profile(site_dir, start_page=resolved.start)
    if profile.skipped:
        raise click.ClickException(profile.skip_reason or f"Site '{site}' has no evaluable HTML.")
    run_dir = make_run_dir((workspace / resolved.out).resolve())
    target_url = (site_dir / profile.start_page).resolve().as_uri()
    report = run_judge_or_raise(
        UXJudgeAgent(
            run_dir=run_dir,
            provider_config=resolved.provider_config,
            headless=not resolved.headed,
            max_steps=resolve_max_steps(resolved.max_steps, resolved.exploration_depth),
            viewport_mode=resolved.viewport,
            exploration_depth=resolved.exploration_depth,
            protect_risky_actions=resolved.protect_risky_actions,
            judge_rubric=judge_rubric,
        ),
        profile,
        target_url,
    )
    eval_path = Path(report.run_dir) / "eval.md"
    trace_path = Path(report.run_dir) / "trace.json"
    plan_path = Path(report.run_dir) / "plan.md"
    click.echo(f"Plan:   {plan_path}")
    click.echo(f"Eval:   {eval_path}")
    click.echo(f"Trace:  {trace_path}")
    score_text = f"{report.overall_score}/100" if report.overall_score is not None else "N/A"
    raw_score_text = f"{report.overall_score_raw:.2f}/10" if report.overall_score_raw is not None else "N/A"
    status_suffix = "" if report.status == "complete" else f", {report.status}"
    click.echo(
        f"Score:  {score_text} raw={raw_score_text} ({report.evidence_confidence} confidence{status_suffix})"
    )
    if report.eval_error:
        click.echo(f"Eval status: {report.eval_error}")


@main.command("eval-url")
@click.option("--url", required=True, help="URL to judge. file:// and http(s) are supported.")
@click.option(
    "--source-dir",
    default=None,
    type=click.Path(exists=True, file_okay=False, path_type=Path),
    help="Optional local source directory for context and source hints.",
)
@click.option(
    "--max-steps",
    default=None,
    type=int,
    help="Maximum autonomous judge action steps. Defaults to config.",
)
@click.option(
    "--exploration-depth",
    default=None,
    type=click.Choice(["quick", "standard", "deep", "exhaustive"]),
    help="Exploration budget and ambition. Defaults to config.",
)
@click.option(
    "--config",
    "config_path",
    default=Path(DEFAULT_CONFIG_FILE),
    show_default=True,
    type=click.Path(path_type=Path, dir_okay=False),
    help="Provider config file.",
)
@click.option(
    "--provider",
    default=None,
    help="Provider name from the config file. Defaults to config.default_provider.",
)
@click.option(
    "--model",
    default=None,
    help="Optional model override for the selected provider.",
)
@click.option(
    "--headed/--headless",
    default=None,
    help="Show or hide the browser window. Defaults to config.",
)
@click.option(
    "--protect-risky-actions/--allow-risky-actions",
    default=None,
    help="Skip or allow final destructive/payment confirmations. Defaults to config.",
)
@click.option(
    "--out",
    default=None,
    type=click.Path(path_type=Path),
    help="Output directory. Defaults to config.",
)
@click.option(
    "--viewport",
    default=None,
    type=click.Choice(["desktop", "mobile", "both"]),
    help="Viewport coverage. Defaults to config.",
)
@click.option(
    "--judge-rubric",
    default="default",
    show_default=True,
    type=click.Choice(list(JUDGE_RUBRIC_NAMES)),
    help="Scoring rubric preset to use for judge metrics.",
)
def eval_url(
    url: str,
    source_dir: Path | None,
    max_steps: int | None,
    exploration_depth: str | None,
    config_path: Path,
    provider: str | None,
    model: str | None,
    headed: bool | None,
    protect_risky_actions: bool | None,
    out: Path | None,
    viewport: str | None,
    judge_rubric: str,
) -> None:
    """Judge the UX quality of an arbitrary local or remote URL."""
    workspace = Path.cwd()
    profile = _profile_for_url(url, source_dir)
    resolved = resolve_eval_url_or_raise(
        config_path=config_path,
        provider=provider,
        model=model,
        max_steps=max_steps,
        exploration_depth=exploration_depth,
        headed=headed,
        viewport=viewport,
        protect_risky_actions=protect_risky_actions,
        out=str(out) if out else None,
    )
    run_dir = make_run_dir((workspace / resolved.out).resolve())
    report = run_judge_or_raise(
        UXJudgeAgent(
            run_dir=run_dir,
            provider_config=resolved.provider_config,
            headless=not resolved.headed,
            max_steps=resolve_max_steps(resolved.max_steps, resolved.exploration_depth),
            viewport_mode=resolved.viewport,
            exploration_depth=resolved.exploration_depth,
            protect_risky_actions=resolved.protect_risky_actions,
            judge_rubric=judge_rubric,
        ),
        profile,
        url,
    )
    eval_path = Path(report.run_dir) / "eval.md"
    trace_path = Path(report.run_dir) / "trace.json"
    plan_path = Path(report.run_dir) / "plan.md"
    click.echo(f"Plan:   {plan_path}")
    click.echo(f"Eval:   {eval_path}")
    click.echo(f"Trace:  {trace_path}")
    score_text = f"{report.overall_score}/100" if report.overall_score is not None else "N/A"
    raw_score_text = f"{report.overall_score_raw:.2f}/10" if report.overall_score_raw is not None else "N/A"
    status_suffix = "" if report.status == "complete" else f", {report.status}"
    click.echo(
        f"Score:  {score_text} raw={raw_score_text} ({report.evidence_confidence} confidence{status_suffix})"
    )
    if report.eval_error:
        click.echo(f"Eval status: {report.eval_error}")


@main.command("feedback-fix")
@click.option(
    "--feedback",
    "feedback_path",
    required=True,
    type=click.Path(exists=True, dir_okay=False, path_type=Path),
    help="Path to a feedback.json file under a results-* directory.",
)
@click.option(
    "--baseline-site-dir",
    required=True,
    type=click.Path(exists=True, file_okay=False, path_type=Path),
    help="Baseline site directory to copy before Claude applies fixes.",
)
@click.option(
    "--out",
    "out_dir",
    default=Path("feedback-fixes"),
    show_default=True,
    type=click.Path(path_type=Path),
    help="Parent output directory for generated feedback-fix runs.",
)
@click.option(
    "--claude-exe",
    default="claude",
    show_default=True,
    help="Claude Code executable to invoke for feedback-driven fixes.",
)
@click.option(
    "--claude-model",
    default=None,
    help="Optional Claude model override for the fix pass.",
)
@click.option(
    "--claude-permission-mode",
    default="acceptEdits",
    show_default=True,
    type=click.Choice(CLAUDE_PERMISSION_MODES),
    help="Permission mode passed to Claude Code during the fix pass.",
)
@click.option(
    "--claude-allowed-tools",
    default=None,
    help="Optional comma-separated Claude Code tools to allow during the fix pass.",
)
@click.option(
    "--fail-on-claude-fix-failure/--no-fail-on-claude-fix-failure",
    default=False,
    show_default=True,
    help="Return a non-zero exit code when the feedback-driven Claude fix pass fails.",
)
def feedback_fix(
    feedback_path: Path,
    baseline_site_dir: Path,
    out_dir: Path,
    claude_exe: str,
    claude_model: str | None,
    claude_permission_mode: str,
    claude_allowed_tools: str | None,
    fail_on_claude_fix_failure: bool,
) -> None:
    """Copy a baseline site directory and apply a results-* feedback file with Claude Code."""
    workspace = Path.cwd()
    resolved_out_dir = out_dir if out_dir.is_absolute() else (workspace / out_dir)
    fix_result = apply_feedback_fix(
        feedback_path=feedback_path,
        baseline_source_dir=baseline_site_dir,
        out_dir=resolved_out_dir.resolve(),
        executable=claude_exe,
        permission_mode=claude_permission_mode,
        model=claude_model,
        allowed_tools=parse_csv_list(claude_allowed_tools),
    )

    if fix_result.source_dir:
        click.echo(f"Working Copy: {fix_result.source_dir}")
    if fix_result.prompt_path:
        click.echo(f"Prompt: {fix_result.prompt_path}")
    if fix_result.raw_output_path:
        click.echo(f"Raw Output: {fix_result.raw_output_path}")
    if fix_result.result_path:
        click.echo(f"Claude Fix: {fix_result.result_path}")
    if fail_on_claude_fix_failure and not fix_result.success:
        raise click.ClickException(f"Claude fix failed: {fix_result.error or 'unknown failure'}")


@main.command("list-sites")
def list_sites() -> None:
    """List auditable sites under websites/."""
    websites_dir = Path.cwd() / "websites"
    for profile in scan_sites(websites_dir):
        status = "skipped" if profile.skipped else profile.page_type
        click.echo(f"{profile.name}\t{status}\t{len(profile.html_files)} html")


@main.command("list-providers")
@click.option(
    "--config",
    "config_path",
    default=Path(DEFAULT_CONFIG_FILE),
    show_default=True,
    type=click.Path(path_type=Path, dir_okay=False),
    help="Provider config file.",
)
def list_providers(config_path: Path) -> None:
    """List configured model providers."""
    app_config = load_config_or_raise(config_path)
    for name in sorted(app_config.providers):
        provider = app_config.providers[name]
        marker = "*" if name == app_config.default_provider else " "
        base_url = provider.base_url or "https://api.openai.com/v1"
        model = provider.model or "(no model configured)"
        configured_models = len(provider_model_catalog(provider))
        suffix = f"\t{configured_models} configured models" if configured_models > 1 else ""
        click.echo(f"{marker} {name}\t{model}\t{base_url}{suffix}")


@main.command("list-models")
@click.option(
    "--config",
    "config_path",
    default=Path(DEFAULT_CONFIG_FILE),
    show_default=True,
    type=click.Path(path_type=Path, dir_okay=False),
    help="Provider config file.",
)
@click.option(
    "--provider",
    default=None,
    help="Provider name from the config file. Defaults to config.default_provider.",
)
def list_models(config_path: Path, provider: str | None) -> None:
    """List configured models for one provider."""
    app_config = load_config_or_raise(config_path)
    selected_name = provider or app_config.default_provider
    if selected_name not in app_config.providers:
        available = ", ".join(sorted(app_config.providers))
        raise click.ClickException(
            f"Provider '{selected_name}' was not found in {config_path.resolve()}. Available: {available}"
        )

    provider_config = app_config.providers[selected_name]
    configured_models = provider_model_catalog(provider_config)
    if not configured_models:
        model = provider_config.model or "(no model configured)"
        click.echo(f"* {model}")
        return

    default_selector = provider_config.model.strip()
    default_model = configured_models.get(default_selector, default_selector)
    for alias, model in configured_models.items():
        marker = "*" if alias == default_selector or model == default_model else " "
        if alias == model:
            click.echo(f"{marker} {alias}")
        else:
            click.echo(f"{marker} {alias}\t{model}")


def _profile_for_url(url: str, source_dir: Path | None) -> SiteProfile:
    if source_dir:
        parsed = urlparse(url)
        start_page = "index.html"
        if parsed.scheme == "file":
            start_page = Path(unquote(parsed.path)).name or start_page
        profile = load_site_profile(source_dir, start_page=start_page)
        profile.skipped = False
        profile.skip_reason = None
        return profile

    parsed = urlparse(url)
    name = parsed.netloc or Path(unquote(parsed.path)).stem or "custom-url"
    return SiteProfile(
        name=name,
        site_dir=str(Path.cwd().resolve()),
        start_page=Path(unquote(parsed.path)).name or "remote",
        page_type="landing",
        summary=f"Custom URL audit for {url}",
        skipped=False,
    )


def resolve_max_steps(max_steps: int | None, exploration_depth: str) -> int:
    if max_steps is not None:
        return max_steps
    return DEPTH_DEFAULT_STEPS[exploration_depth]


def parse_csv_list(raw: str | None) -> list[str] | None:
    if raw is None:
        return None
    items = [item.strip() for item in raw.split(",")]
    cleaned = [item for item in items if item]
    return cleaned or None


def run_agent_or_raise(agent: AuditAgent, profile: SiteProfile, target_url: str):
    try:
        return asyncio.run(agent.run(profile=profile, target_url=target_url))
    except RuntimeError as exc:
        raise click.ClickException(str(exc)) from exc


def run_judge_or_raise(agent: UXJudgeAgent, profile: SiteProfile, target_url: str):
    try:
        return asyncio.run(agent.run(profile=profile, target_url=target_url))
    except RuntimeError as exc:
        raise click.ClickException(str(exc)) from exc


def load_config_or_raise(config_path: Path):
    try:
        return load_app_config(config_path)
    except RuntimeError as exc:
        raise click.ClickException(str(exc)) from exc


def resolve_audit_or_raise(
    config_path: Path,
    provider: str | None,
    model: str | None,
    start: str | None,
    max_steps: int | None,
    exploration_depth: str | None,
    headed: bool | None,
    viewport: str | None,
    protect_risky_actions: bool | None,
    out: str | None,
):
    try:
        return resolve_audit_config(
            config_path=config_path,
            provider_name=provider,
            model_override=model,
            start=start,
            max_steps=max_steps,
            exploration_depth=exploration_depth,
            headed=headed,
            viewport=viewport,
            protect_risky_actions=protect_risky_actions,
            out=out,
        )
    except RuntimeError as exc:
        raise click.ClickException(str(exc)) from exc


def resolve_audit_url_or_raise(
    config_path: Path,
    provider: str | None,
    model: str | None,
    max_steps: int | None,
    exploration_depth: str | None,
    headed: bool | None,
    viewport: str | None,
    protect_risky_actions: bool | None,
    out: str | None,
):
    try:
        return resolve_audit_url_config(
            config_path=config_path,
            provider_name=provider,
            model_override=model,
            max_steps=max_steps,
            exploration_depth=exploration_depth,
            headed=headed,
            viewport=viewport,
            protect_risky_actions=protect_risky_actions,
            out=out,
        )
    except RuntimeError as exc:
        raise click.ClickException(str(exc)) from exc


def resolve_eval_or_raise(
    config_path: Path,
    provider: str | None,
    model: str | None,
    start: str | None,
    max_steps: int | None,
    exploration_depth: str | None,
    headed: bool | None,
    viewport: str | None,
    protect_risky_actions: bool | None,
    out: str | None,
):
    try:
        return resolve_eval_config(
            config_path=config_path,
            provider_name=provider,
            model_override=model,
            start=start,
            max_steps=max_steps,
            exploration_depth=exploration_depth,
            headed=headed,
            viewport=viewport,
            protect_risky_actions=protect_risky_actions,
            out=out,
        )
    except RuntimeError as exc:
        raise click.ClickException(str(exc)) from exc


def resolve_eval_url_or_raise(
    config_path: Path,
    provider: str | None,
    model: str | None,
    max_steps: int | None,
    exploration_depth: str | None,
    headed: bool | None,
    viewport: str | None,
    protect_risky_actions: bool | None,
    out: str | None,
):
    try:
        return resolve_eval_url_config(
            config_path=config_path,
            provider_name=provider,
            model_override=model,
            max_steps=max_steps,
            exploration_depth=exploration_depth,
            headed=headed,
            viewport=viewport,
            protect_risky_actions=protect_risky_actions,
            out=out,
        )
    except RuntimeError as exc:
        raise click.ClickException(str(exc)) from exc


if __name__ == "__main__":
    main()
