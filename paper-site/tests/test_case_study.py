from pathlib import Path
import re
import unittest


ROOT = Path(__file__).resolve().parents[1]
CASE_STUDY_VARIANTS = [
    "base",
    "claude-sonnet-4-6",
    "gemini-3-1-pro",
    "glm-5.1",
    "gpt-5.4",
    "gpt-5.4-mini",
    "gpt-5.4-nano",
    "kimi-k2.5",
    "qwen3.6-plus",
]


class UXBenchSiteCaseStudyTest(unittest.TestCase):
    def read_index(self) -> str:
        return (ROOT / "index.html").read_text(encoding="utf-8")

    def read_app(self) -> str:
        return (ROOT / "assets" / "app.js").read_text(encoding="utf-8")

    def test_case_study_config_uses_random_local_aeroiq_variant_pool(self):
        app = self.read_app()
        match = re.search(r"const CASE_STUDY_VARIANTS = \[(.*?)\];", app, re.S)

        self.assertIsNotNone(match)
        config = match.group(1)
        for variant in CASE_STUDY_VARIANTS:
            with self.subTest(variant=variant):
                self.assertIn(f'variantName: "{variant}"', config)
                self.assertIn(f"assets/case-study/aeroiq-comparison/{variant}/index.html", config)
                self.assertNotIn(f'variantName: "{variant}/aeroiq"', config)

        self.assertIn("function chooseCaseStudyPair()", app)
        self.assertIn("Math.random()", app)
        self.assertIn("const CASE_STUDY_PAIR = chooseCaseStudyPair();", app)
        self.assertIn("variants.slice(0, 2)", app)
        self.assertNotIn("websites-data", config)
        self.assertNotIn("dashboard-comparison", config)
        self.assertNotIn("uxbench-case-study-choice", app)

    def test_case_study_aeroiq_assets_are_self_contained(self):
        for variant in CASE_STUDY_VARIANTS:
            with self.subTest(variant=variant):
                variant_root = ROOT / "assets" / "case-study" / "aeroiq-comparison" / variant
                self.assertTrue((variant_root / "index.html").exists())
                self.assertTrue((variant_root / "styles.css").exists())
                self.assertTrue((variant_root / "script.js").exists())

                for filename in ["index.html", "alerts.html", "endpoints.html", "endpoint-detail.html", "services.html"]:
                    html = (variant_root / filename).read_text(encoding="utf-8")
                    self.assertIn('href="styles.css"', html)
                    self.assertIn('src="script.js"', html)
                    self.assertNotIn("websites-data", html)
                    self.assertNotIn("../", html)

    def test_case_study_renders_anonymous_controls_and_reveals_variant_on_choice(self):
        index = self.read_index()
        app = self.read_app()

        self.assertIn("<h2>AeroIQ dashboard comparison</h2>", index)
        self.assertIn('data-case-choice="left"', index)
        self.assertIn('data-case-choice="right"', index)
        self.assertIn('data-case-fullscreen="left"', index)
        self.assertIn('data-case-fullscreen="right"', index)
        self.assertIn('class="case-choice-result"', index)
        self.assertIn('data-case-choice-result', index)
        self.assertIn('data-revealed="false"', index)
        self.assertIn('data-case-choice-result-state', index)
        self.assertIn('data-case-choice-result-title', index)
        self.assertIn('data-case-choice-result-value', index)
        self.assertIn('class="case-choice-prompt"', index)
        self.assertIn(".case-choice-prompt", index)
        self.assertNotIn("Selection result", index)
        self.assertIn(".case-choice-result-state", index)
        self.assertIn(".case-choice-result[data-revealed=\"true\"]", index)
        self.assertIn('status.dataset.revealed = "true";', app)
        self.assertIn('state.textContent = "Revealed";', app)
        self.assertIn('value.textContent = variant.variantName;', app)
        self.assertIn('`${variant.label} selected: ${variant.variantName}.`', app)

    def test_nav_brand_shows_logo_without_visible_wordmark(self):
        index = self.read_index()
        nav_match = re.search(r"<nav>.*?</nav>", index, re.S)

        self.assertIsNotNone(nav_match)
        nav = nav_match.group(0)
        self.assertIn(
            '<a class="brand" href="#top" aria-label="UXBench home"><img class="brand-mark" src="assets/logo.png" alt="" aria-hidden="true"></a>',
            nav,
        )
        self.assertNotIn("UX<i>Bench</i>", nav)


if __name__ == "__main__":
    unittest.main()
