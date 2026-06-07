# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the full codekite system, prioritizing the primary pricing flow plus adjacent pages, states, and recovery paths.

## Plan Summary

The exploration will start by traversing the landing page and adjacent navigation to establish context, then dive deeply into the pricing calculator's interactive states and edge cases. It will validate the comparison table and FAQ accordion, check the docs page, and finally repeat critical interactive checks on a mobile viewport to assess responsiveness and tap target issues.

## Coverage Targets

- pages: `visit all 3 known HTML pages (100%)`
- features: `exercise all calculator inputs/checkboxes, FAQ accordion, and primary CTAs`
- mobile: `repeat critical checks on mobile viewport, focusing on pricing calculator and tap targets`

## Planned Phases

### Landing & Navigation Flow

- Objective: Validate the main entry point, value proposition, and primary navigation paths to the pricing and docs pages.
- Target pages: index.html
- Key checks:
  - Verify hero section content and YAML code example visibility
  - Click 'See pricing' CTA and confirm navigation to pricing.html
  - Click 'Read docs' CTA and confirm navigation to docs.html
  - Click 'Start free trial' header button and confirm navigation to pricing.html
  - Check footer link behavior (expect no-op or placeholder)
- Exit criteria:
  - All primary CTAs on index.html have been clicked and verified
  - Navigation to all other known pages has been successfully executed

### Pricing Calculator Core Interactions

- Objective: Exhaustively test the usage calculator to ensure inputs, two-way binding, and dynamic cost calculations function correctly.
- Target pages: pricing.html
- Key checks:
  - Drag 'Build minutes' slider and verify corresponding number input updates, and vice versa
  - Drag 'Concurrent builds' slider and verify corresponding number input updates, and vice versa
  - Drag 'Storage' slider and verify corresponding number input updates, and vice versa
  - Type extreme/out-of-bound values into number inputs and verify slider/error handling
  - Toggle 'Linux ARM runners' checkbox and verify line-item cost and total update
  - Toggle 'macOS runners' checkbox and verify line-item cost and total update
  - Toggle 'GPU runners' checkbox and verify line-item cost and total update
  - Verify recommended-plan badge updates appropriately when crossing plan thresholds
- Exit criteria:
  - All 3 slider/input pairs have been manipulated in both directions
  - All 3 runner checkboxes have been toggled on and off
  - Sticky total and breakdown have been verified to reflect input changes

### Pricing Page Content & Adjacent Elements

- Objective: Validate the static content, comparison table, and interactive FAQ section on the pricing page.
- Target pages: pricing.html
- Key checks:
  - Scroll through and verify visibility of the 16-row plan comparison table
  - Click at least 3 different FAQ accordion items to ensure they expand/collapse correctly
  - Verify 'Get started', 'Start trial', and 'Talk to sales' buttons are present and clickable
  - Check for layout shifts or overlapping elements around the sticky total on scroll
- Exit criteria:
  - Comparison table has been scrolled into view
  - FAQ accordion interactions have been successfully validated
  - Plan CTA buttons have been identified and clicked

### Docs & Secondary Pages

- Objective: Verify the documentation quickstart page content and ensure consistent navigation back to the pricing flow.
- Target pages: docs.html
- Key checks:
  - Verify Quickstart YAML example is visible and formatted correctly
  - Click 'Pricing' in the header nav and confirm return to pricing.html
  - Click 'CodeKite' logo and confirm return to index.html
- Exit criteria:
  - Docs page content has been verified
  - Navigation back to index.html and pricing.html works correctly

### Mobile Viewport Validation

- Objective: Re-test critical flows and layout stability on a mobile viewport, specifically addressing prescan tap target warnings.
- Target pages: index.html, pricing.html
- Key checks:
  - Verify index.html layout adapts to mobile width and hero content is readable
  - Check if navigation collapses into a hamburger menu or remains inline (assess tap target severity)
  - Interact with the pricing calculator sliders/inputs on mobile to ensure they are usable and not blocked by the sticky total
  - Verify the 16-row comparison table is scrollable or responsive on small screens
  - Validate FAQ accordion tap targets on mobile
- Exit criteria:
  - Mobile layout has been checked on index.html
  - Pricing calculator has been interacted with on mobile
  - Tap target and responsive layout issues have been documented

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

