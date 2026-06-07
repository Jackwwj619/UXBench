# UXAgent Exploration Plan

## Goal

Evaluate the UX of the CodeKite pricing calculator and adjacent marketing pages, focusing on the usability of the cost estimation tool, plan comparison clarity, and mobile responsiveness.

## Plan Summary

The run will start on the landing page to verify navigation and value proposition, then move to the Pricing page for an exhaustive test of the usage calculator (sliders, inputs, checkboxes) and plan selection logic. It will conclude with a check of the Docs page and a full mobile viewport regression to address known tap-target issues.

## Coverage Targets

- pages: `Visit index.html, pricing.html, and docs.html at least once.`
- features: `Exercise all 3 calculator sliders, 3 runner checkboxes, and 2 number inputs on the pricing page.`
- mobile: `Repeat Phase 2 (Calculator) and Phase 1 (Nav) on mobile viewport.`

## Planned Phases

### Landing Page & Navigation

- Objective: Validate the initial user journey, hero messaging, and primary CTAs.
- Target pages: index.html
- Key checks:
  - Verify Hero section YAML code snippet is readable.
  - Click 'See pricing' CTA and confirm navigation to pricing.html.
  - Click 'Read docs' CTA and confirm navigation to docs.html.
  - Check footer links for broken states or empty anchors.
- Exit criteria:
  - Successfully navigated to Pricing and Docs pages from Index.
  - No console errors during initial load.

### Pricing Calculator Core Logic

- Objective: Stress-test the interactive cost estimator for accuracy and usability.
- Target pages: pricing.html
- Key checks:
  - Interact with 'Build minutes' slider: Verify number input updates and total cost recalculates.
  - Interact with 'Concurrent builds' slider: Verify impact on recommended plan badge.
  - Type directly into number inputs: Verify sliders update correspondingly (two-way binding).
  - Toggle 'ARM', 'macOS', and 'GPU' runner checkboxes: Verify line-item cost breakdown updates immediately.
  - Test edge cases: Set values to 0 and maximums to check for UI overflow or negative costs.
- Exit criteria:
  - Calculator reflects changes in real-time.
  - Recommended plan badge switches logically (e.g., Free -> Team -> Enterprise) based on usage.
  - No visual overlap of calculator elements.

### Plan Comparison & Content

- Objective: Ensure static content (plans, FAQ, table) is legible and accessible.
- Target pages: pricing.html
- Key checks:
  - Review the 3 plan cards (Free, Team, Enterprise) for clear hierarchy.
  - Expand/Collapse multiple items in the FAQ accordion to check for layout shifts.
  - Scan the 16-row plan comparison table for readability and alignment.
  - Verify 'Start free trial' and 'Talk to sales' buttons are distinct and clickable.
- Exit criteria:
  - FAQ accordion functions without breaking layout.
  - Comparison table is readable on desktop.

### Docs & Recovery Paths

- Objective: Validate the secondary content page and return paths.
- Target pages: docs.html
- Key checks:
  - Verify YAML quickstart example is visible and formatted correctly.
  - Use global navigation to return to Pricing and Index pages.
  - Attempt to click 'Sign in' to confirm it does not crash the browser (expected no-op).
- Exit criteria:
  - Docs page loads without error.
  - Navigation loop (Index <-> Pricing <-> Docs) works seamlessly.

### Mobile Viewport Regression

- Objective: Identify usability issues specific to touch devices, focusing on the prescan warnings.
- Target pages: index.html, pricing.html
- Key checks:
  - Switch to mobile viewport (e.g., iPhone SE/12).
  - Attempt to tap nav links ('Product', 'Pricing', 'Docs') to verify if hit areas are too small.
  - Test the Pricing Calculator sliders on touch: Ensure they are draggable and not obscured by other elements.
  - Check if the sticky monthly total overlaps content when scrolling on mobile.
  - Verify the plan comparison table handles horizontal overflow gracefully (scroll vs. break).
- Exit criteria:
  - Critical mobile interactions (nav, calculator) are possible, even if difficult.
  - Layout does not break horizontally on small screens.

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

