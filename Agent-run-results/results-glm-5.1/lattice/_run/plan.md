# UXAgent Exploration Plan

## Goal

Exhaustively explore and critique the UX of the Lattice DB site, focusing on the complex two-dimensional pricing matrix, add-on calculations, and responsive layout behaviors.

## Plan Summary

The run will start by validating the landing page and its navigation, then move deeply into the pricing page's core matrix interaction and quote card updates. It will systematically test all add-on checkboxes and the calculation breakdown, followed by validating the tier explainer and feature matrix. Finally, it will assess mobile responsiveness and layout warnings across both pages.

## Coverage Targets

- pages: `visit all known HTML pages (index.html, pricing.html)`
- features: `exercise all 36 matrix cells conceptually (test at least 5 distinct cells), all 9 add-ons, FAQ, tier explainer, and feature matrix`
- mobile: `repeat critical pricing matrix and quote card checks on mobile viewport, verify navigation tap targets`

## Planned Phases

### Landing Page Validation

- Objective: Verify the structure, content, and navigation of the landing page before proceeding to the primary flow.
- Target pages: index.html
- Key checks:
  - Verify all headings and the SQL code block render correctly
  - Click the 'See pricing' CTA and confirm navigation to pricing.html
  - Click top navigation links (Platform, Pricing, Docs, Customers, Sign in, Book demo) and verify behavior
- Exit criteria:
  - All landing page interactions tested
  - Successfully navigated to pricing.html

### Pricing Matrix Core Flow

- Objective: Validate the primary two-dimensional pricing matrix interactions and the sticky quote card updates.
- Target pages: pricing.html
- Key checks:
  - Click cells across different rows (seats) and columns (data volume)
  - Verify the sticky quote card updates with the correct base price
  - Verify the 'Contact us' cells behave appropriately (no price update, possible modal or text change)
  - Click the 'How we got this number' / 'How this is calculated' expansion and verify content
- Exit criteria:
  - At least 5 different matrix cells selected
  - Quote card accurately reflects selected cell
  - Calculation expansion opens and closes correctly

### Add-ons and Breakdown

- Objective: Test the 9 add-on checkboxes and ensure the final monthly-fee breakdown card calculates correctly.
- Target pages: pricing.html
- Key checks:
  - Toggle percentage-based add-ons (e.g., Continuous cross-region backups +15%)
  - Toggle flat-fee add-ons (e.g., HIPAA compliance pack +$400/mo)
  - Verify the bottom final monthly-fee breakdown card updates with correct sums
  - Test combining multiple add-ons to check for calculation errors
- Exit criteria:
  - All 9 add-ons toggled individually
  - Multiple add-ons combined successfully
  - Breakdown card math verified

### Tiers and Feature Comparison

- Objective: Validate the 4-tier explainer synchronization and the 15-row feature comparison matrix.
- Target pages: pricing.html
- Key checks:
  - Select a matrix cell and verify the corresponding tier (Developer, Team, Scale, Enterprise) auto-highlights
  - Click through tier explainer sections
  - Scroll through and verify the 15-row feature comparison matrix aligns with tiers
- Exit criteria:
  - Tier highlighting matches selected matrix cell
  - Feature matrix reviewed for layout and content integrity

### FAQ and Footer

- Objective: Ensure the 8-question FAQ section is interactive and the footer is well-structured.
- Target pages: pricing.html
- Key checks:
  - Expand and collapse multiple FAQ items
  - Verify FAQ content is legible and doesn't break layout
  - Check footer links and content
- Exit criteria:
  - At least 3 FAQ items expanded/collapsed
  - Footer validated

### Mobile Responsiveness

- Objective: Repeat critical checks on a mobile viewport to validate responsive design and address layout warnings.
- Target pages: index.html, pricing.html
- Key checks:
  - Verify mobile navigation menu (if exists) or horizontal scrolling behavior
  - Test pricing matrix interaction on mobile viewport
  - Verify sticky quote card positioning and readability on mobile
  - Re-validate small tap targets identified in prescan (nav links)
- Exit criteria:
  - Mobile viewport tested on both pages
  - Matrix and quote card interactions functional on mobile
  - Tap target issues documented

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

