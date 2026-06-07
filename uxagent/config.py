from __future__ import annotations

import os
import re
from pathlib import Path
from typing import Any, Literal

import yaml
from dotenv import load_dotenv
from pydantic import BaseModel, Field, ValidationError


DEFAULT_CONFIG_FILE = "uxagent.config.yaml"
ExplorationDepth = Literal["quick", "standard", "deep", "exhaustive"]
ViewportMode = Literal["desktop", "mobile", "both"]
ConfigPath = str | Path | None


class ProviderConfig(BaseModel):
    api_key: str = ""
    model: str = ""
    models: list[str] | dict[str, str] = Field(default_factory=dict)
    base_url: str | None = None
    default_headers: dict[str, str] = Field(default_factory=dict)
    default_query: dict[str, Any] = Field(default_factory=dict)


class CommandDefaults(BaseModel):
    provider: str | None = None
    model: str | None = None
    max_steps: int | None = 80
    exploration_depth: ExplorationDepth = "exhaustive"
    headed: bool = False
    viewport: ViewportMode = "both"
    protect_risky_actions: bool = True
    out: str = "runs"


class AuditDefaults(CommandDefaults):
    start: str = "index.html"


class AuditUrlDefaults(CommandDefaults):
    pass


class EvalDefaults(AuditDefaults):
    out: str = "eval-runs"


class EvalUrlDefaults(CommandDefaults):
    out: str = "eval-runs"


class AppConfig(BaseModel):
    default_provider: str
    providers: dict[str, ProviderConfig] = Field(default_factory=dict)
    audit: AuditDefaults = Field(default_factory=AuditDefaults)
    audit_url: AuditUrlDefaults = Field(default_factory=AuditUrlDefaults)
    eval: EvalDefaults = Field(default_factory=EvalDefaults)
    eval_url: EvalUrlDefaults = Field(default_factory=EvalUrlDefaults)


class ResolvedProviderConfig(BaseModel):
    name: str
    api_key: str
    model: str
    base_url: str | None = None
    default_headers: dict[str, str] = Field(default_factory=dict)
    default_query: dict[str, Any] = Field(default_factory=dict)
    config_path: str


class ResolvedAuditConfig(BaseModel):
    provider_config: ResolvedProviderConfig
    start: str
    max_steps: int | None = None
    exploration_depth: ExplorationDepth
    headed: bool
    viewport: ViewportMode
    protect_risky_actions: bool
    out: str


class ResolvedAuditUrlConfig(BaseModel):
    provider_config: ResolvedProviderConfig
    max_steps: int | None = None
    exploration_depth: ExplorationDepth
    headed: bool
    viewport: ViewportMode
    protect_risky_actions: bool
    out: str


class ResolvedEvalConfig(ResolvedAuditConfig):
    pass


class ResolvedEvalUrlConfig(ResolvedAuditUrlConfig):
    pass


def default_config_path(workspace: Path | None = None) -> Path:
    root = workspace or Path.cwd()
    return root / DEFAULT_CONFIG_FILE


def _resolve_path(config_path: ConfigPath = None) -> Path:
    if config_path is None:
        return default_config_path().resolve()
    return Path(config_path).resolve()


def load_app_config(config_path: ConfigPath = None) -> AppConfig:
    path = _resolve_path(config_path)
    if not path.exists():
        raise RuntimeError(
            f"Config file was not found: {path}. Create {DEFAULT_CONFIG_FILE} in the project root."
        )
    try:
        data = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
    except yaml.YAMLError as exc:
        raise RuntimeError(f"Config file is not valid YAML: {path} ({exc})") from exc
    try:
        return AppConfig.model_validate(data)
    except ValidationError as exc:
        raise RuntimeError(f"Config file shape is invalid: {path} ({exc})") from exc


def provider_model_catalog(provider: ProviderConfig) -> dict[str, str]:
    catalog: dict[str, str] = {}
    raw_models = provider.models
    if isinstance(raw_models, dict):
        raw_items = raw_models.items()
    else:
        raw_items = ((str(item), str(item)) for item in raw_models)

    for raw_alias, raw_model in raw_items:
        alias = str(raw_alias).strip()
        model = str(raw_model).strip()
        if not alias or not model:
            continue
        catalog[alias] = model

    default_model = provider.model.strip()
    has_default = default_model in catalog or default_model in catalog.values()
    if default_model and default_model != "your-model" and not has_default:
        catalog[default_model] = default_model
    return catalog


def format_provider_model_choices(provider: ProviderConfig) -> list[str]:
    formatted = []
    for alias, model in provider_model_catalog(provider).items():
        if alias == model:
            formatted.append(alias)
        else:
            formatted.append(f"{alias} -> {model}")
    return formatted


def resolve_provider_model_name(
    provider: ProviderConfig,
    selected_model: str,
    *,
    provider_name: str,
    resolved_path: Path,
) -> str:
    catalog = provider_model_catalog(provider)
    if not catalog:
        return selected_model
    if selected_model in catalog:
        return catalog[selected_model]
    if selected_model in catalog.values():
        return selected_model

    available = ", ".join(format_provider_model_choices(provider))
    raise RuntimeError(
        f"Model '{selected_model}' is not configured for provider '{provider_name}' "
        f"in {resolved_path}. Available: {available}"
    )


def resolve_provider_config(
    config_path: ConfigPath = None,
    provider_name: str | None = None,
    model_override: str | None = None,
) -> ResolvedProviderConfig:
    resolved_path = _resolve_path(config_path)
    load_dotenv(resolved_path.parent / ".env", override=False)
    app_config = load_app_config(resolved_path)
    selected_name = provider_name or app_config.default_provider

    if selected_name not in app_config.providers:
        available = ", ".join(sorted(app_config.providers))
        raise RuntimeError(
            f"Provider '{selected_name}' was not found in {resolved_path}. Available: {available}"
        )

    provider = app_config.providers[selected_name]
    api_key = resolve_provider_api_key(provider, selected_name, resolved_path)
    selected_model = (model_override or provider.model).strip()
    if not selected_model or selected_model == "your-model":
        raise RuntimeError(
            f"Provider '{selected_name}' in {resolved_path} is missing a real model."
        )
    model = resolve_provider_model_name(
        provider,
        selected_model,
        provider_name=selected_name,
        resolved_path=resolved_path,
    )

    return ResolvedProviderConfig(
        name=selected_name,
        api_key=api_key,
        model=model,
        base_url=provider.base_url,
        default_headers=provider.default_headers,
        default_query=provider.default_query,
        config_path=str(resolved_path),
    )


def resolve_provider_api_key(
    provider: ProviderConfig,
    provider_name: str,
    resolved_path: Path,
) -> str:
    raw_value = provider.api_key.strip()
    if raw_value and not raw_value.startswith("replace-with-your"):
        if _is_env_var_name(raw_value):
            env_value = os.environ.get(raw_value, "").strip()
            if env_value:
                return env_value
            if _looks_like_explicit_env_reference(raw_value):
                raise RuntimeError(
                    f"Environment variable '{raw_value}' for provider '{provider_name}' is not set. "
                    "Put the real key in .env using the same field name, or set api_key to the inline secret."
                )
        return raw_value

    fallback_env_names = _default_api_key_env_names(provider_name)
    for env_name in fallback_env_names:
        api_key = os.environ.get(env_name, "").strip()
        if api_key:
            return api_key

    fallback_hint = ", ".join(fallback_env_names) or "<PROVIDER>_API_KEY"
    raise RuntimeError(
        f"Provider '{provider_name}' in {resolved_path} is missing api_key. "
        "Set api_key to the inline secret, set api_key to an environment variable name, "
        f"or define one of these variables in .env: {fallback_hint}."
    )


def _is_env_var_name(value: str) -> bool:
    return bool(re.match(r"^[A-Za-z_][A-Za-z0-9_]*$", value))


def _looks_like_explicit_env_reference(value: str) -> bool:
    if not _is_env_var_name(value):
        return False
    upper_value = value.upper()
    return value == upper_value or upper_value.endswith(("_API_KEY", "_TOKEN"))


def _default_api_key_env_names(provider_name: str) -> list[str]:
    normalized = re.sub(r"[^A-Za-z0-9]+", "_", provider_name).strip("_").upper()
    if not normalized:
        return []
    return [f"{normalized}_API_KEY"]


def resolve_audit_config(
    config_path: ConfigPath = None,
    *,
    provider_name: str | None = None,
    model_override: str | None = None,
    start: str | None = None,
    max_steps: int | None = None,
    exploration_depth: ExplorationDepth | None = None,
    headed: bool | None = None,
    viewport: ViewportMode | None = None,
    protect_risky_actions: bool | None = None,
    out: str | None = None,
) -> ResolvedAuditConfig:
    resolved_path = _resolve_path(config_path)
    app_config = load_app_config(resolved_path)
    defaults = app_config.audit
    provider_config = resolve_provider_config(
        config_path=resolved_path,
        provider_name=provider_name or defaults.provider,
        model_override=model_override or defaults.model,
    )
    return ResolvedAuditConfig(
        provider_config=provider_config,
        start=start or defaults.start,
        max_steps=max_steps if max_steps is not None else defaults.max_steps,
        exploration_depth=exploration_depth or defaults.exploration_depth,
        headed=headed if headed is not None else defaults.headed,
        viewport=viewport or defaults.viewport,
        protect_risky_actions=(
            protect_risky_actions
            if protect_risky_actions is not None
            else defaults.protect_risky_actions
        ),
        out=out or defaults.out,
    )


def resolve_audit_url_config(
    config_path: ConfigPath = None,
    *,
    provider_name: str | None = None,
    model_override: str | None = None,
    max_steps: int | None = None,
    exploration_depth: ExplorationDepth | None = None,
    headed: bool | None = None,
    viewport: ViewportMode | None = None,
    protect_risky_actions: bool | None = None,
    out: str | None = None,
) -> ResolvedAuditUrlConfig:
    resolved_path = _resolve_path(config_path)
    app_config = load_app_config(resolved_path)
    defaults = app_config.audit_url
    provider_config = resolve_provider_config(
        config_path=resolved_path,
        provider_name=provider_name or defaults.provider,
        model_override=model_override or defaults.model,
    )
    return ResolvedAuditUrlConfig(
        provider_config=provider_config,
        max_steps=max_steps if max_steps is not None else defaults.max_steps,
        exploration_depth=exploration_depth or defaults.exploration_depth,
        headed=headed if headed is not None else defaults.headed,
        viewport=viewport or defaults.viewport,
        protect_risky_actions=(
            protect_risky_actions
            if protect_risky_actions is not None
            else defaults.protect_risky_actions
        ),
        out=out or defaults.out,
    )


def resolve_eval_config(
    config_path: ConfigPath = None,
    *,
    provider_name: str | None = None,
    model_override: str | None = None,
    start: str | None = None,
    max_steps: int | None = None,
    exploration_depth: ExplorationDepth | None = None,
    headed: bool | None = None,
    viewport: ViewportMode | None = None,
    protect_risky_actions: bool | None = None,
    out: str | None = None,
) -> ResolvedEvalConfig:
    resolved_path = _resolve_path(config_path)
    app_config = load_app_config(resolved_path)
    defaults = app_config.eval
    provider_config = resolve_provider_config(
        config_path=resolved_path,
        provider_name=provider_name or defaults.provider,
        model_override=model_override or defaults.model,
    )
    return ResolvedEvalConfig(
        provider_config=provider_config,
        start=start or defaults.start,
        max_steps=max_steps if max_steps is not None else defaults.max_steps,
        exploration_depth=exploration_depth or defaults.exploration_depth,
        headed=headed if headed is not None else defaults.headed,
        viewport=viewport or defaults.viewport,
        protect_risky_actions=(
            protect_risky_actions
            if protect_risky_actions is not None
            else defaults.protect_risky_actions
        ),
        out=out or defaults.out,
    )


def resolve_eval_url_config(
    config_path: ConfigPath = None,
    *,
    provider_name: str | None = None,
    model_override: str | None = None,
    max_steps: int | None = None,
    exploration_depth: ExplorationDepth | None = None,
    headed: bool | None = None,
    viewport: ViewportMode | None = None,
    protect_risky_actions: bool | None = None,
    out: str | None = None,
) -> ResolvedEvalUrlConfig:
    resolved_path = _resolve_path(config_path)
    app_config = load_app_config(resolved_path)
    defaults = app_config.eval_url
    provider_config = resolve_provider_config(
        config_path=resolved_path,
        provider_name=provider_name or defaults.provider,
        model_override=model_override or defaults.model,
    )
    return ResolvedEvalUrlConfig(
        provider_config=provider_config,
        max_steps=max_steps if max_steps is not None else defaults.max_steps,
        exploration_depth=exploration_depth or defaults.exploration_depth,
        headed=headed if headed is not None else defaults.headed,
        viewport=viewport or defaults.viewport,
        protect_risky_actions=(
            protect_risky_actions
            if protect_risky_actions is not None
            else defaults.protect_risky_actions
        ),
        out=out or defaults.out,
    )
