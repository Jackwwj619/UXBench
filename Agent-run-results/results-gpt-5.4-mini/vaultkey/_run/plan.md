# UXAgent Exploration Plan

## Goal

Exhaustively explore the Vaultkey marketing and pricing experience, with emphasis on the pricing calculator, plan comparison, FAQ behavior, and mobile usability of navigation and tap targets.

## Plan Summary

Start on the landing page to validate the primary conversion paths into pricing and any obvious navigation dead ends, then move into the pricing page as the core interaction surface. On pricing, exercise the billing toggle, all plan CTAs, the business seat control and linked number input across key ranges, the feature comparison table, and the FAQ accordion states. Repeat the critical checks in a mobile viewport to confirm responsive behavior and to capture the small tap-target warnings seen in prescan.

## Coverage Targets

- pages: `Visit all known HTML pages: index.html and pricing.html.`
- features: `Exercise every visible CTA on the landing page, the billing toggle, all plan CTAs, the business seat slider and linked input, representative pricing breakpoints, several FAQ items, and the comparison table sections.`
- mobile: `Repeat the homepage conversion path and the pricing calculator/FAQ checks at mobile viewport, with special attention to the small tap-target warnings and any overflow in the pricing table.`

## Planned Phases

### Landing page conversion path

- Objective: Validate the homepage’s main marketing flow and whether the primary calls to action lead cleanly to pricing or reveal broken/inert links.
- Target pages: index.html
- Key checks:
  - Click 'See plans →' from the hero and confirm it opens pricing.html
  - Click 'See pricing →' at the bottom and confirm it also opens pricing.html
  - Inspect whether 'Download free' and top-nav placeholder links are inert, return to page, or trigger any unexpected behavior
  - Check that the faux app screenshot remains visually coherent and does not overlap at the current viewport
- Exit criteria:
  - Both pricing CTAs have been exercised and their destinations verified
  - All visible homepage links have been clicked or intentionally classified as inert
  - No unexpected console or network errors appear during navigation

### Pricing page baseline structure

- Objective: Confirm the pricing page layout, plan cards, and toggle state messaging before deeper interaction testing.
- Target pages: pricing.html
- Key checks:
  - Verify the default billing mode on load and the corresponding plan prices
  - Click the yearly/monthly toggle and confirm all visible plan prices update consistently
  - Check the three plan cards for clear differentiation, especially the featured Family plan
  - Click plan CTAs such as 'Get Personal', 'Start free 30-day trial', and 'Start 14-day trial' to confirm they are functional or clearly inert
- Exit criteria:
  - Default and alternate billing states have both been observed
  - Each plan card CTA has been exercised once
  - The featured plan treatment and pricing copy are captured without layout regressions

### Business calculator and pricing thresholds

- Objective: Stress the interactive business pricing controls and validate state synchronization and breakpoint behavior.
- Target pages: pricing.html
- Key checks:
  - Move the Business seat slider to minimum, mid-range, and maximum values
  - Edit the linked number input and confirm it updates the slider and pricing output correctly
  - Verify tiered pricing changes at the published breakpoints (3–24, 25–49, 50–99, 100–199, 200+)
  - Check both monthly and yearly totals after toggling billing while the seat count is set to edge values
  - Confirm the enterprise contact strip remains visible and usable near the business section
- Exit criteria:
  - Slider and number input remain synchronized across tested ranges
  - At least one value from each pricing tier has been validated
  - Monthly and yearly outputs respond correctly to both seat changes and billing mode changes

### Comparison table and FAQ behavior

- Objective: Validate information architecture and state changes in the feature comparison table and FAQ accordion.
- Target pages: pricing.html
- Key checks:
  - Scroll through the grouped feature comparison table and confirm section headings and row structure remain readable
  - Check for horizontal overflow or clipped cells in the comparison table at narrower widths
  - Expand several FAQ items, including the first, middle, and last questions, and then collapse them again
  - Verify only the intended FAQ item(s) open at a time if the control behaves like an accordion
- Exit criteria:
  - Comparison table content is readable across the tested viewport
  - Multiple FAQ items have been opened and closed successfully
  - No broken spacing, overlapping text, or inaccessible toggle states are observed

### Mobile responsive verification

- Objective: Repeat the critical conversion and calculator checks on mobile to confirm responsive layout and tap-target usability.
- Target pages: index.html, pricing.html
- Key checks:
  - Recheck the homepage primary CTAs and top navigation at mobile width
  - Confirm the pricing page toggle, plan CTAs, and business controls remain operable on touch-sized viewports
  - Look for tap-target issues on the top nav and primary buttons flagged by prescan
  - Confirm the comparison table and FAQ do not become unusably cramped or overflow badly on mobile
- Exit criteria:
  - Critical homepage and pricing interactions have been repeated in mobile viewport
  - Any tap-target or overflow issues are documented with concrete affected controls
  - Mobile behavior is compared against desktop for the main pricing flow

## Prescan Summary

### Vaultkey — passwords, passkeys, and shared secrets for everyone

- Page: `index.html`
- Headings: Every login, every passkey,
one keychain., One shortcut, every site, Real end-to-end, Shared with intent, Stop reusing passwords.
- Interactables: `0` buttons, `11` links, `0` inputs
- Notable controls:
  - clickable:a:Vaultkey
  - clickable:a:Product
  - clickable:a:Pricing
  - clickable:a:Security
  - clickable:a:Enterprise
  - clickable:a:Help
  - clickable:a:Sign in
  - clickable:a:Get Vaultkey

### Pricing — Vaultkey

- Page: `pricing.html`
- Headings: Plans for every kind of keychain., Personal, Family, Business, Need bigger?, Compare every feature., Common questions.
- Interactables: `10` buttons, `12` links, `2` inputs
- Notable controls:
  - clickable:a:Vaultkey
  - clickable:a:Product
  - clickable:a:Pricing
  - clickable:a:Security
  - clickable:a:Enterprise
  - clickable:a:Help
  - clickable:a:Sign in
  - clickable:a:Get Vaultkey

