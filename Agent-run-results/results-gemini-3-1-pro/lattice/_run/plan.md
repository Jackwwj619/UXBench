# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the full lattice system, prioritizing the primary pricing flow plus adjacent pages, states, and recovery paths.

## Plan Summary

The exploration will start on the landing page to verify navigation and basic layout, before dedicating the majority of effort to the complex pricing page. The pricing page evaluation will focus on the interactive 2D matrix, state updates in the sticky quote card, tier highlighting, and the add-on calculator logic. Finally, the run will heavily evaluate how this large matrix and sticky layout perform on a mobile viewport.

## Coverage Targets

- pages: `Visit both index.html and pricing.html.`
- features: `Exercise matrix cell selection, tier highlighting, quote expansion, and all add-on types.`
- mobile: `Strictly evaluate the horizontal overflow of the pricing table and the usability of the sticky calculator on mobile.`

## Planned Phases

### Landing Page & Navigation

- Objective: Verify the basic structure, branding, and navigation paths from the landing page.
- Target pages: index.html
- Key checks:
  - Check global header links and note the small tap targets reported in the prescan.
  - Ensure the 'See pricing' CTA properly routes to the pricing page.
- Exit criteria:
  - Navigated successfully to pricing.html via CTA.

### Pricing Matrix Interaction (Desktop)

- Objective: Validate the core interactive 2D matrix for seat/data volume selection.
- Target pages: pricing.html
- Key checks:
  - Click multiple cells (e.g., $169, $659, Contact us) and verify that row/column highlighting updates.
  - Verify that the 'SELECTED CELL' in the quote card updates with the correct dollar amount and tier.
  - Verify that clicking a cell correctly auto-highlights the corresponding tier in the 4-tier explainer section.
- Exit criteria:
  - Multiple distinct cells selected with confirmed state changes in the DOM/UI.

### Add-ons & Calculator Logic

- Objective: Test the behavior of add-on checkboxes and the final fee breakdown.
- Target pages: pricing.html
- Key checks:
  - Expand the 'How we got this number' / 'How this is calculated' section.
  - Toggle a mix of flat-fee (e.g., +$400/mo) and percentage-based (+15%) add-ons.
  - Verify the bottom final monthly-fee breakdown card calculates the expected total.
- Exit criteria:
  - Add-ons toggled and calculator breakdown visually updated.

### Mobile Viewport Stress Test

- Objective: Evaluate the complex table and calculator on mobile.
- Target pages: pricing.html
- Key checks:
  - Switch to mobile viewport.
  - Attempt to scroll and interact with the 6x6 matrix (check for horizontal scrolling or layout breakage).
  - Observe the positioning of the sticky quote card—does it block the viewport?
  - Toggle add-ons on mobile.
- Exit criteria:
  - Matrix and calculator interactions completed and screenshotted under mobile constraints.

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

