# UXAgent Exploration Plan

## Goal

Evaluate the UX of the Lattice DB pricing model, specifically focusing on the usability and clarity of the two-dimensional matrix selector, add-on logic, and mobile responsiveness.

## Plan Summary

The run will start on the landing page to verify navigation and value proposition, then move to the pricing page for deep interaction with the 6x6 matrix. It will validate that clicking cells correctly updates the sticky quote card, highlights corresponding tiers, and handles 'Contact us' edge cases. Finally, it will audit the feature comparison table and FAQ before repeating critical matrix interactions on a mobile viewport to check for layout breakage.

## Coverage Targets

- pages: `100% of known HTML files (index.html, pricing.html)`
- features: `Interact with >80% of matrix cells, toggle all add-ons, expand all FAQs`
- mobile: `Full regression of Phase 2 and 3 on mobile viewport`

## Planned Phases

### Landing Page & Navigation Audit

- Objective: Verify initial load performance, visual hierarchy, and navigation integrity.
- Target pages: index.html
- Key checks:
  - Validate 'See pricing' CTA leads to pricing.html.
  - Check hover states on all nav links.
  - Verify code snippet block is readable and properly formatted.
  - Confirm no layout shifts occur on load.
- Exit criteria:
  - Successfully navigated to pricing.html via CTA.
  - No console errors on index.html load.

### Pricing Matrix Core Interaction

- Objective: Test the primary user flow: selecting a seat/volume combination and observing state changes.
- Target pages: pricing.html
- Key checks:
  - Click various cells in the middle of the matrix (e.g., 6-15 seats, 50-250GB).
  - Verify the selected cell highlights visually (row/column highlight).
  - Confirm the 'Sticky Quote Card' updates with the correct price immediately.
  - Click a 'Contact us' cell (edge case) and verify appropriate messaging.
  - Check if the 'Tier' indicator below the matrix updates to match the selected cell's tier.
- Exit criteria:
  - At least 5 different matrix cells interacted with.
  - Quote card updates verified for standard and 'Contact us' scenarios.

### Add-ons & Calculation Transparency

- Objective: Validate the secondary pricing controls and the transparency of the final cost.
- Target pages: pricing.html
- Key checks:
  - Toggle 'How this is calculated' expansion in the quote card.
  - Select multiple add-ons (mix of % and flat fees).
  - Verify the 'Final monthly-fee breakdown' reflects these additions accurately.
  - Deselect add-ons to ensure price reverts correctly.
  - Check for any visual overlap between the quote card and the matrix when scrolling.
- Exit criteria:
  - All 9 add-on types toggled at least once.
  - Price calculation logic appears consistent in the UI.

### Content Depth & Support Info

- Objective: Review the static content sections for clarity and accessibility.
- Target pages: pricing.html
- Key checks:
  - Scan the 15-row feature comparison matrix for readability.
  - Expand/Collapse FAQ items to check for smooth animation and content visibility.
  - Verify footer links are present and styled correctly.
- Exit criteria:
  - FAQ accordion functionality tested.
  - Feature matrix legibility confirmed.

### Mobile Responsiveness & Recovery

- Objective: Repeat critical path tests on mobile viewport to identify layout failures.
- Target pages: index.html, pricing.html
- Key checks:
  - Switch to mobile viewport (e.g., iPhone SE or Pixel 5 dimensions).
  - Check if the 6x6 matrix becomes horizontally scrollable or stacks poorly.
  - Verify the 'Sticky Quote Card' behavior on mobile (does it stick? does it block view?).
  - Test tap targets for matrix cells (prescan indicated small tap targets on desktop nav; check matrix cells specifically).
  - Re-run a basic selection flow (Phase 2) on mobile.
- Exit criteria:
  - Critical pricing flow functional on mobile.
  - No horizontal layout breakage outside of intended scrolling areas.

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

