# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the CodeKite marketing site, with a deep focus on the pricing page's interactive usage calculator and plan comparisons.

## Plan Summary

The run will begin by validating the landing page layout and top-level navigation. It will then dedicate significant effort to the pricing page, rigorously testing the two-way bound usage calculator (sliders vs. number inputs) and the dynamic cost breakdown. The run will also review the docs placeholder and conclude with a mobile viewport pass to evaluate responsive scaling and tap target issues flagged in the prescan.

## Coverage Targets

- pages: `Visit index.html, pricing.html, and docs.html.`
- features: `Exercise all pricing calculator inputs (sliders, typeable fields, checkboxes) and the FAQ accordion.`
- mobile: `Re-run navigation and pricing calculator checks in a mobile viewport.`

## Planned Phases

### Landing Page & Navigation

- Objective: Verify the homepage layout, hero section, and top-level navigation.
- Target pages: index.html
- Key checks:
  - Verify hero CTA buttons lead to the correct pages (Pricing, Docs).
  - Check global header navigation links.
- Exit criteria:
  - Navigation links are confirmed to route correctly to pricing.html and docs.html.

### Pricing Calculator Interaction

- Objective: Stress-test the interactive usage calculator on the pricing page.
- Target pages: pricing.html
- Key checks:
  - Drag sliders for 'Build minutes', 'Concurrent builds', and 'Storage' and verify numeric inputs update.
  - Type values into numeric inputs and verify sliders snap to corresponding positions.
  - Toggle runner checkboxes (ARM, macOS, GPU) and verify they affect the calculated total.
  - Observe the sticky monthly total, line-item breakdown, and 'recommended-plan' badge for accurate updates based on input.
  - Verify accessibility of the inputs given the 'missing_input_label' prescan warnings.
- Exit criteria:
  - Calculator inputs (both slider and typed) have been exercised, and the UI correctly reflects the dynamic cost.

### Pricing Plans & FAQ

- Objective: Validate static pricing content and interactive FAQ.
- Target pages: pricing.html
- Key checks:
  - Review the 3 main plan cards (Free, Team, Enterprise).
  - Scroll through the 16-row plan comparison table for readability.
  - Interact with the 10-question FAQ accordion to ensure it expands/collapses properly.
- Exit criteria:
  - Plan cards, comparison table, and FAQ accordion have been viewed and interacted with.

### Docs Placeholder Validation

- Objective: Confirm the docs page renders correctly.
- Target pages: docs.html
- Key checks:
  - Verify the quickstart YAML code block is visible and readable.
  - Check navigation back to the main site.
- Exit criteria:
  - docs.html has been visited and its layout verified.

### Mobile Viewport Pass

- Objective: Evaluate mobile responsiveness and touch usability.
- Target pages: index.html, pricing.html
- Key checks:
  - Verify if the navigation collapses into a hamburger menu and functions.
  - Test the pricing calculator sliders on a small screen layout.
  - Assess the impact of the 'small_tap_target' warnings on mobile usability.
- Exit criteria:
  - Core pages have been viewed in mobile mode, and critical interactions (navigation, calculator) have been re-tested.

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

