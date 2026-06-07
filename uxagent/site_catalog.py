from __future__ import annotations

from pathlib import Path

from bs4 import BeautifulSoup

from .schemas import SiteProfile


SITE_TYPE_OVERRIDES = {
    "aeroiq": "dashboard",
    "aurora-network": "settings/privacy",
    "booking": "checkout/booking",
    "chatgpt": "chatbot/agent interface",
    "civicport": "form/onboarding",
    "climate-almanac": "data visualization",
    "cloudflare-radar": "dashboard",
    "codekite": "pricing",
    "fleetatlas": "dashboard",
    "forge-coder": "chatbot/agent interface",
    "fred-unrate": "data visualization",
    "github-404": "error page",
    "govuk-passport": "form/onboarding",
    "greengrove": "form/onboarding",
    "lattice": "pricing",
    "lumen-research": "chatbot/agent interface",
    "meadowid": "settings/privacy",
    "meadowos": "landing",
    "microsoft-privacy": "settings/privacy",
    "migration-atlas": "data visualization",
    "moonlight-tickets": "checkout/booking",
    "notion": "landing",
    "orbitride": "checkout/booking",
    "owid-population": "data visualization",
    "pelagic": "landing",
    "privacy-dashboard": "settings/privacy",
    "shopify": "form/onboarding",
    "slack": "pricing",
    "solstice-bank": "form/onboarding",
    "stripe-docs": "docs/tutorial",
    "tessera": "docs/tutorial",
    "weaveapi": "docs/tutorial",
}


PAGE_TYPE_RULES: list[tuple[str, list[str]]] = [
    ("checkout/booking", ["booking", "checkout", "reservation", "ticket", "ride", "hotel"]),
    ("dashboard", ["dashboard", "radar", "analytics", "fleet", "monitoring", "observability"]),
    ("docs/tutorial", ["docs", "documentation", "quickstart", "reference", "api", "tutorial"]),
    ("settings/privacy", ["privacy", "settings", "toggle", "account", "muted", "audience"]),
    ("data visualization", ["chart", "graph", "visualization", "map", "data", "almanac"]),
    ("chatbot/agent interface", ["chat", "agent", "assistant", "conversation", "diff"]),
    ("pricing", ["pricing", "plan", "calculator", "tier"]),
    ("form/onboarding", ["form", "onboarding", "apply", "signup", "trial", "passport", "quote"]),
    ("error page", ["404", "error page", "not found"]),
    ("landing", ["landing", "marketing", "homepage", "hero"]),
]


def scan_sites(websites_dir: Path) -> list[SiteProfile]:
    if not websites_dir.exists():
        return []
    return [load_site_profile(path) for path in sorted(websites_dir.iterdir()) if path.is_dir()]


def load_site_profile(site_dir: Path, start_page: str = "index.html") -> SiteProfile:
    html_files = sorted(p.relative_to(site_dir).as_posix() for p in site_dir.rglob("*.html"))
    css_files = sorted(p.relative_to(site_dir).as_posix() for p in site_dir.rglob("*.css"))
    js_files = sorted(p.relative_to(site_dir).as_posix() for p in site_dir.rglob("*.js"))
    readme = site_dir / "README.md"
    readme_text = readme.read_text(encoding="utf-8", errors="replace") if readme.exists() else ""
    summary = _summarize_site(site_dir, readme_text, html_files)
    page_type = infer_page_type(site_dir.name, readme_text, html_files)

    skipped = not html_files
    skip_reason = "No HTML files found." if skipped else None
    if start_page not in html_files and html_files:
        start_page = html_files[0]

    return SiteProfile(
        name=site_dir.name,
        site_dir=str(site_dir.resolve()),
        start_page=start_page,
        page_type=page_type,
        html_files=html_files,
        css_files=css_files,
        js_files=js_files,
        readme_path=str(readme.resolve()) if readme.exists() else None,
        summary=summary,
        skipped=skipped,
        skip_reason=skip_reason,
    )


def infer_page_type(site_name: str, readme_text: str, html_files: list[str]) -> str:
    if site_name in SITE_TYPE_OVERRIDES:
        return SITE_TYPE_OVERRIDES[site_name]
    haystack = " ".join([site_name, readme_text, *html_files]).lower()
    for page_type, keywords in PAGE_TYPE_RULES:
        if any(keyword in haystack for keyword in keywords):
            return page_type
    return "landing"


def _summarize_site(site_dir: Path, readme_text: str, html_files: list[str]) -> str:
    if readme_text.strip():
        lines = [line.strip("# ").strip() for line in readme_text.splitlines() if line.strip()]
        return " ".join(lines[:8])[:1200]

    snippets: list[str] = []
    for html in html_files[:3]:
        path = site_dir / html
        try:
            soup = BeautifulSoup(path.read_text(encoding="utf-8", errors="replace"), "html.parser")
            title = soup.title.get_text(" ", strip=True) if soup.title else html
            body_text = soup.get_text(" ", strip=True)[:300]
            snippets.append(f"{title}: {body_text}")
        except OSError:
            continue
    return " ".join(snippets)[:1200]
