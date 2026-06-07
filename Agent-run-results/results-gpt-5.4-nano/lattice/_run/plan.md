# UXAgent Exploration Plan

## Goal

Critique and validate the UX of the full Lattice DB marketing/pricing system, with emphasis on the interactive pricing matrix flow, add-ons, tier calculator behavior, and the supporting content below the fold (feature matrix + FAQ), including mobile usability.

## Plan Summary

Start on the landing page and validate navigation to pricing and the primary CTA behavior. Then run the full interactive pricing experience on pricing.html: selecting different matrix cells, verifying the sticky quote card and the “How this is calculated” expansion, toggling all add-ons, and checking the bottom monthly fee breakdown updates. Finally, validate the feature comparison section and FAQ interactions, and re-run the critical pricing checks on mobile.

## Coverage Targets

- pages: `Visit all known HTML pages (index.html, pricing.html).`
- features: `Exercise: pricing matrix cell selection; tier explainer; sticky quote card; “How this is calculated” expansion; all 9 add-ons; feature comparison section scroll/read; FAQ accordion.`
- mobile: `Repeat: entry navigation to pricing; matrix selection; a subset of add-ons; “How this is calculated” expansion.`

## Planned Phases

### Landing page entry & navigation sanity

- Objective: Validate that users can reach the pricing flow from index.html and that header navigation behaves as expected.
- Target pages: index.html
- Key checks:
  - Click “See pricing” CTA and confirm navigation lands on pricing.html at the pricing section (not a blank page).
  - Click header “Pricing” and confirm it also reaches pricing.html.
  - Click “Docs”, “Customers”, and “Sign in” to confirm they either navigate to a valid location (or gracefully do nothing) without console/network errors.
  - Click “Book demo” to confirm it is responsive (no blocked link) and does not break layout.
- Exit criteria:
  - All primary navigation paths from index.html reach the correct expected page or stable placeholder state.
  - No console or network errors are observed during navigation attempts.

### Interactive pricing matrix: selection, sticky quote, tier mapping

- Objective: Exercise the primary pricing interaction: selecting cells and validating all dependent UI updates.
- Target pages: pricing.html
- Key checks:
  - Verify the initial selected cell state (shows “SELECTED CELL $304”, Tier · Developer, and the quote card is visible).
  - Click several distinct matrix cells across different rows/columns (at least 5 cells spanning: low, mid, high volume and small vs larger seats) and confirm: (1) the chosen cell highlights, (2) sticky quote card updates price, tier name, and any supporting text.
  - After changing the selected cell, confirm the 4-tier explainer highlights the corresponding tier automatically.
  - Scroll down/up to ensure the right-side sticky quote card remains visible and continues to reflect the latest selected cell.
- Exit criteria:
  - For each tested cell, pricing/highlight/tier explainer/selected cell label stay consistent with no mismatch after scrolling.

### Add-ons and fee breakdown correctness + state management

- Objective: Validate add-on controls (all visible checkboxes/inputs) and ensure they correctly update the final monthly fee breakdown.
- Target pages: pricing.html
- Key checks:
  - Identify and toggle all 9 add-on options: Continuous cross-region backups (+15%), HIPAA compliance pack (+$400/mo), SOC 2 reporting incl. Team+ (checkbox/label as shown), PrivateLink / VPC peering (+$120/mo), Dedicated support engineer (+$2,500/mo), GPU acceleration pool (per GPU-hour) (+$… placeholder risk).
  - For each toggle: confirm the sticky quote card and/or bottom final monthly-fee breakdown card updates immediately and reflects the expected add-on label/value (percentage vs flat).
  - Toggle combinations (at least: single add-on, two add-ons of different types, and then clear all) and confirm totals return correctly.
  - Change the selected pricing matrix cell after add-ons are set, and confirm totals/tier/add-ons interplay updates correctly (add-ons should apply to the newly selected base tier/price, or the UI should clearly indicate rules).
  - Expand/collapse “How this is calculated” while add-ons are toggled and/or after changing selected cells to ensure explanation matches current state.
- Exit criteria:
  - All add-ons can be toggled without UI breakage, and the monthly breakdown reflects selection and combinations.
  - No formatting issues remain noticeable (especially the GPU/hour “+$” placeholder).

### Down-page content: feature matrix + FAQ interaction

- Objective: Validate that supporting content below the pricing matrix is readable and interactive elements behave correctly.
- Target pages: pricing.html
- Key checks:
  - Scroll through the 15-row feature comparison section; verify headers/rows remain aligned and legible.
  - Interact with any expand/collapse controls or links in the feature matrix if present (prescan indicates only feature matrix text, but validate actual behavior).
  - Locate the 8-question FAQ and expand/collapse multiple questions to verify accordion behavior and that it remains accessible.
- Exit criteria:
  - Feature comparison remains usable across scroll; FAQ accordion opens/closes reliably for multiple questions.

### Mobile critical path re-check

- Objective: Repeat the highest-risk interactive steps on a mobile viewport to uncover tap-target and layout issues.
- Target pages: index.html, pricing.html
- Key checks:
  - On index.html: tap “See pricing” and header “Pricing” to confirm correct navigation and that tap targets are usable.
  - On pricing.html: select at least 3 matrix cells using mobile taps (verify highlight + sticky quote updates).
  - Toggle 2-3 add-ons (including at least one percentage-based and one flat $/mo add-on) and verify fee breakdown updates.
  - Expand “How this is calculated” to verify it doesn’t cover critical controls or become impossible to close.
- Exit criteria:
  - Critical pricing interactions work on mobile with no dead taps or major layout breakage.

## Prescan Summary

### Lattice DB — Analytics database

- Page: `index.html`
- Headings: The relational column-store for teams that want both axes priced honestly., Postgres wire, Columnar under the hood, Pay for the cell you live in
- Interactables: `0` buttons, `8` links, `0` inputs
- Notable controls:
  - clickable:a:Lattice DB
  - clickable:a:Platform
  - clickable:a:Pricing
  - clickable:a:Docs
  - clickable:a:Customers
  - clickable:a:Sign in
  - clickable:a:Book demo
  - clickable:a:See pricing

### Lattice DB — Pricing

- Page: `pricing.html`
- Headings: Pricing scales on two axes — pick a cell., What tier are you in?, Developer, Team, Scale, Enterprise, Feature matrix, FAQ
- Interactables: `0` buttons, `16` links, `9` inputs
- Notable controls:
  - clickable:a:Lattice DB
  - clickable:a:Platform
  - clickable:a:Pricing
  - clickable:a:Docs
  - clickable:a:Customers
  - clickable:a:Sign in
  - clickable:a:Book demo
  - other:td:$89

