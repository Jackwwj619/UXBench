# UXAgent Exploration Plan

## Goal

Critique and validate the UX of CodeKite’s marketing/pricing experience, with primary focus on the pricing page’s usage calculator, plan recommendation, and cost breakdown; verify adjacent navigation to docs and marketing CTAs across desktop and mobile.

## Plan Summary

Start at the landing page to validate global navigation, primary CTAs, and overall information scent to the pricing calculator. Then deep-dive the pricing page: exercise all calculator inputs, confirm two-way binding between sliders and numeric fields, verify plan recommendation logic and the sticky monthly total + line-item breakdown, and test the FAQ accordion and plan comparison table. Finish by validating docs entry points and the “Start free trial / Get started / Talk to sales” CTAs, including mobile viewport behavior and potential small tap-target issues.

## Coverage Targets

- pages: `Visit all known HTML pages (index.html, pricing.html, docs.html) in both desktop and mobile viewports.`
- features: `Exercise all visible controls on pricing.html: 3 slider+number pairs, runner checkboxes (ARM/macOS/GPU), plan CTAs, sticky monthly total area (indirect via updates), comparison table readability, and FAQ accordion items.`
- mobile: `Repeat the calculator update flow plus at least 3 FAQ toggles and the top nav CTA routing on mobile.`

## Planned Phases

### Landing (index.html) navigation & CTA routing

- Objective: Validate top navigation and key marketing CTAs lead users to correct destinations and that the page communicates the pricing value proposition clearly.
- Target pages: index.html
- Key checks:
  - Use top nav links: Product, Pricing, Docs; confirm correct page loads and URL/file changes.
  - Click “Sign in” (href shown as #): validate whether it opens a modal/dialog, navigates to a sign-in flow, or remains a non-functional placeholder (confirm no dead-end experience).
  - Click “Start free trial” and “See pricing” and “Read docs”; confirm both lead to expected pages (pricing.html/docs.html).
  - Scroll to sections with “Overview/Changelog/Status/Security/About/Blog/Careers” anchors (prescan shows # links): verify whether anchors scroll to content or remain placeholders; note if any cause confusing jumps.
- Exit criteria:
  - All primary navigation items and CTA buttons (at least: Pricing, Docs, Start free trial, See pricing, Read docs) are confirmed to route to the intended known pages without errors.
  - Any # placeholder links are characterized (e.g., stay on page with no change vs. open UI), and no unexpected blank state occurs.

### Pricing calculator: correctness, two-way binding, and live totals

- Objective: Exercise the usage calculator end-to-end and verify that all dependent UI (recommended plan, sticky monthly total, and line-item breakdown) updates correctly and consistently.
- Target pages: pricing.html
- Key checks:
  - Identify all three slider+number pairs (build minutes/month, concurrency, storage) and verify two-way binding: changing slider updates the numeric value; typing a number updates the slider thumb.
  - Set representative values across the ranges (including low, mid, and near-extreme values) and confirm calculations remain stable and non-janky.
  - Toggle runner checkboxes (Linux ARM, macOS, GPU runner per prescan labels) and confirm pricing changes and that totals/line items reflect runner-specific surcharges or plan constraints.
  - Validate plan recommendation badge changes as inputs change (e.g., Free vs Team vs Enterprise) and that the recommendation matches the visual plan tiers.
  - Validate sticky monthly total updates while scrolling; ensure it remains consistent with the line-item cost breakdown below.
  - Test edge handling: clearing numeric inputs, entering non-numeric characters, and keyboard increment/decrement behavior (where supported).
- Exit criteria:
  - For each of the calculator controls, two-way sync is confirmed at least once, and resulting totals/recommendation/breakdown update coherently across multiple input combinations.
  - Sticky monthly total and line-item breakdown agree on the final computed cost for at least two different scenarios (one near Free/Team boundary, one that triggers a higher-tier plan).

### Pricing page content: plan CTAs, comparison table, and FAQ accordion

- Objective: Validate secondary UX components on pricing.html: plan CTAs, comparison table usability, and FAQ accordion interaction/accessibility.
- Target pages: pricing.html
- Key checks:
  - Click plan CTAs: “Get started” / “Start trial” for Free/Team and “Talk to sales” for Enterprise; verify destination behavior (open link, modal, or placeholder) and that user is not stranded.
  - Test plan cards interaction: focus/hover states (visual affordance) and ensuring no accidental scroll-jumps when selecting.
  - Exercise the 16-row plan comparison table: confirm headers and row content are readable and not obscured by sticky elements; verify horizontal overflow behavior on smaller widths.
  - Open and close several FAQ accordion items; confirm correct expanded/collapsed state, no multiple panels incorrectly open (unless intended), and that keyboard focus moves predictably.
- Exit criteria:
  - All visible CTA elements on pricing.html are clicked at least once and their resulting behavior is documented as expected or as a known placeholder.
  - At least 3 FAQ items are successfully expanded/collapsed with correct state persistence and no layout glitches.

### Adjacent page: Docs (docs.html) and marketing consistency

- Objective: Ensure the docs entry is discoverable from pricing/landing, and verify the docs page has coherent UX and navigation back to pricing.
- Target pages: docs.html
- Key checks:
  - From docs.html, click top nav Pricing and confirm routing back to pricing.html.
  - Click “CodeKite” and “Docs” links to ensure consistent header navigation.
  - Scroll through quickstart content to ensure code blocks are readable and not clipped on desktop; note any copy/format issues (if present).
  - Click “Start free trial” (if present in header) and confirm it routes properly to pricing.html or intended trial flow.
- Exit criteria:
  - Docs page navigation links consistently route to the known pages (index/pricing/docs) with no unexpected dead-ends.
  - Quickstart content is legible and scannable without obvious visual breakage.

### Mobile viewport regression: calculator, accordions, and tap targets

- Objective: Repeat critical flows on mobile viewport to validate tap usability, layout reflow, sticky behavior, and input accessibility.
- Target pages: index.html, pricing.html, docs.html
- Key checks:
  - Repeat landing CTA routing: Pricing, Docs, Start free trial; verify header fits and taps are accurate.
  - On pricing.html, confirm calculator controls remain usable: sliders draggable, numeric inputs focusable, and checkboxes toggle reliably.
  - Specifically validate small tap targets flagged in prescan (nav items like CodeKite/Product/Pricing/Docs/Sign in): confirm tap success rates and whether any controls are too small for comfortable mobile use.
  - Validate FAQ accordion tap targets and expanded content visibility; ensure sticky monthly total doesn’t cover content or trap scrolling.
  - Validate plan CTAs (“Get started”, “Start trial”, “Talk to sales”) remain accessible and readable on mobile.
- Exit criteria:
  - All critical interactions from phases 1–3 succeed on mobile at least once (no broken controls, no hidden/covered sticky elements).
  - Sticky monthly total remains functional/consistent and does not block access to the calculator or FAQ content.

## Prescan Summary

### CodeKite CI — Faster builds. Honest bills.

- Page: `index.html`
- Headings: Faster builds.
Honest bills., Parallelism, plain, Bill you can read, Drop-in YAML
- Interactables: `0` buttons, `17` links, `0` inputs
- Notable controls:
  - clickable:a:CodeKite
  - clickable:a:Product
  - clickable:a:Pricing
  - clickable:a:Docs
  - clickable:a:Sign in
  - clickable:a:Start free trial
  - clickable:a:See pricing
  - clickable:a:Read docs

### CodeKite Docs

- Page: `docs.html`
- Headings: Quickstart
- Interactables: `0` buttons, `5` links, `0` inputs
- Notable controls:
  - clickable:a:CodeKite
  - clickable:a:Product
  - clickable:a:Pricing
  - clickable:a:Docs
  - clickable:a:Sign in

### CodeKite CI — Faster builds. Honest bills.

- Page: `pricing.html`
- Headings: Pricing built for builds, not seats., Free, Team, Enterprise, Estimate your monthly cost, What's in each plan, Frequently asked
- Interactables: `0` buttons, `18` links, `9` inputs
- Notable controls:
  - clickable:a:CodeKite
  - clickable:a:Product
  - clickable:a:Pricing
  - clickable:a:Docs
  - clickable:a:Sign in
  - clickable:a:Start free trial
  - clickable:a:Get started
  - clickable:a:Start trial

