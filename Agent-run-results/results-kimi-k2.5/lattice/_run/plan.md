# UXAgent Exploration Plan

## Goal

Explore and critique the UX of the lattice system, focusing on the pricing flow, adjacent pages, states, and recovery paths, with exhaustive coverage of all known pages and features in both viewport modes.

## Plan Summary

Start with the index.html landing page to validate its content and CTA. Then move to the pricing.html page to explore the matrix interaction, add-ons, tier details, and other sections. Repeat critical checks in mobile viewport. Ensure all pages, features, and states are covered within the step limit.

## Coverage Targets

- pages: `visit and test all known HTML pages (index.html, pricing.html)`
- features: `exercise all visible controls (navigation links, CTA, matrix cells, add-ons, tier explainer, feature matrix, FAQ) per key page`
- mobile: `repeat critical checks (matrix interaction, add-ons, navigation) on mobile viewport`

## Planned Phases

### Landing Page Exploration

- Objective: Validate index.html content, interactables, and responsive layout.
- Target pages: index.html
- Key checks:
  - Check all navigation links (Platform, Pricing, Docs, etc.) for responsiveness
  - Validate 'See pricing' CTA functionality
  - Check feature cards (Postgres wire, Columnar under the hood, etc.) for content and layout
  - Test mobile viewport for small tap targets and responsive design
- Exit criteria:
  - All index.html interactables tested, responsive layout validated, and CTA functionality confirmed

### Pricing Page Initial Exploration

- Objective: Explore the pricing matrix, cell interaction, and initial quote card updates.
- Target pages: pricing.html
- Key checks:
  - Click multiple matrix cells (e.g., $89, $304, $160) to test row/column highlighting and quote card updates
  - Validate 'How this is calculated' expansion functionality
  - Check tier explainer (Developer, Team, etc.) for cell highlighting and tier details
  - Test mobile viewport for matrix interaction and quote card responsiveness
- Exit criteria:
  - Matrix cell interaction validated, quote card updates confirmed, and tier explainer functionality tested

### Add-ons and Final Breakdown

- Objective: Test add-on checkboxes (percentage/flat) and final monthly-fee breakdown.
- Target pages: pricing.html
- Key checks:
  - Toggle add-on checkboxes (e.g., Continuous cross-region backups, HIPAA compliance pack) to test percentage/flat calculation updates
  - Validate final monthly-fee breakdown card for accuracy
  - Check add-on recovery paths (unchecking add-ons) for correct calculation updates
  - Test mobile viewport for add-on interaction and breakdown responsiveness
- Exit criteria:
  - Add-on functionality validated, final breakdown accuracy confirmed, and recovery paths tested

### Pricing Page Exhaustive Exploration

- Objective: Explore remaining sections (feature matrix, FAQ, footer) and validate all interactables.
- Target pages: pricing.html
- Key checks:
  - Explore feature matrix (15-row comparison) for content and layout
  - Test FAQ accordions (if present) for expansion/collapse functionality
  - Validate footer links and content
  - Test mobile viewport for remaining sections and interactables
- Exit criteria:
  - All pricing.html sections explored, interactables tested, and mobile responsiveness validated

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

