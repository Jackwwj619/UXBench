# UXAgent Exploration Plan

## Goal

Exhaustively validate the Lattice DB marketing and pricing experience, with emphasis on the interactive pricing matrix, add-on pricing logic, tier explainer, feature comparison, FAQ, and mobile usability.

## Plan Summary

Start on the landing page to verify the primary navigation and pricing CTA, then move to the pricing page for the core matrix flow. On pricing, systematically exercise cell selection, row/column highlighting, sticky quote updates, the calculation expander, add-on checkboxes, tier explainer, and the downstream price breakdown. Finish by checking adjacent informational sections and repeating the critical pricing interactions in a mobile viewport, with special attention to the small-tap-target warnings seen in prescan.

## Coverage Targets

- pages: `visit all known HTML pages`
- features: `exercise the landing CTA, top navigation, pricing matrix, sticky quote card, calculation expander, add-on checkboxes, tier explainer, feature comparison, and FAQ`
- mobile: `repeat the pricing matrix selection, add-on toggles, and disclosure interaction on a mobile viewport, while checking header/CTA tap targets`

## Planned Phases

### Landing page orientation

- Objective: Verify the homepage messaging and the paths into pricing from the landing experience.
- Target pages: index.html
- Key checks:
  - Confirm the hero narrative, SQL example, and three feature cards render coherently.
  - Click the primary 'See pricing' CTA and confirm it lands on pricing.html.
  - Check the top navigation links for expected behavior, especially Pricing versus placeholder links like Docs/Customers/Sign in.
- Exit criteria:
  - Pricing page is reached from the landing page via the CTA or nav.
  - No unexpected navigation errors or broken rendering are observed on the landing page.

### Core pricing matrix validation

- Objective: Exercise the main two-axis pricing interaction and verify the page responds correctly to different cell selections.
- Target pages: pricing.html
- Key checks:
  - Click representative cells across multiple rows and columns, including a low-price cell, a mid-tier cell, a high-price cell, and at least one 'Contact us' cell.
  - Verify the selected cell state changes, the correct row and column highlight, and the sticky quote card updates to the selected amount and tier.
  - Confirm the displayed tier labels correspond to the row band and that switching cells clears or updates prior selection state correctly.
- Exit criteria:
  - At least one cell from each major row band has been selected.
  - The quote card and highlighted matrix state have been observed to update consistently across selections.

### Pricing explanation and add-ons

- Objective: Validate the supporting pricing logic around the selected cell and the add-on controls that modify monthly cost.
- Target pages: pricing.html
- Key checks:
  - Open the 'How we got this number' expansion and confirm the explanatory content appears and remains tied to the selected cell.
  - Toggle several add-on checkboxes, mixing percentage and flat monthly add-ons, and verify the bottom breakdown card changes appropriately.
  - Test at least one combination of multiple add-ons to look for stacking, ordering, or total-calculation issues.
- Exit criteria:
  - The calculation disclosure has been opened successfully.
  - Add-on selections visibly affect the breakdown or quote state, and multi-add-on combinations do not break layout or totals.

### Tier explainer, feature matrix, and FAQ

- Objective: Check the deeper informational sections for interactive mapping and layout integrity.
- Target pages: pricing.html
- Key checks:
  - Click each of the tier explainer cells to confirm the corresponding tier highlight/state changes as expected.
  - Scan the feature comparison table for readability and any missing alignment or truncation issues.
  - Interact with the FAQ items if they are expandable, verifying open/close behavior and content completeness.
- Exit criteria:
  - The tier mapping interaction has been validated for multiple tiers.
  - The feature comparison and FAQ sections have been inspected for interaction or layout defects.

### Responsive/mobile verification

- Objective: Repeat the most important pricing and navigation interactions in mobile viewport, focusing on tap-target and layout risks.
- Target pages: index.html, pricing.html
- Key checks:
  - Re-check the header navigation and primary CTA on the landing page for tap usability.
  - Repeat at least one matrix selection, one add-on toggle, and the calculation expander on pricing.html in mobile viewport.
  - Look for clipping, overflow, sticky-card obstruction, and any controls that become too small or hard to tap.
- Exit criteria:
  - Critical pricing interactions have been confirmed in mobile viewport.
  - Any tap-target or layout issues are documented with page and control specificity.

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

