# UXAgent Exploration Plan

## Goal

Exhaustively explore the Lattice DB marketing site with emphasis on the pricing decision flow: moving from the landing page to the pricing matrix, selecting pricing cells, applying add-ons, reviewing the quote breakdown, and validating adjacent explanatory content and responsive behavior.

## Plan Summary

Start on the short landing page to confirm the entry path into pricing and sanity-check the top navigation and CTA behavior. Spend most of the run on pricing.html, since the prescan shows the core interactive system there: a 6x6 pricing matrix, sticky quote card, expandable calculation details, 9 add-on checkboxes, tier explainer mapping, feature matrix, FAQ, and footer links. Use desktop first for full-state coverage, then repeat the most important pricing interactions on mobile because the prescan already flagged several small tap targets in the header.

## Coverage Targets

- pages: `Visit both known HTML pages, with light coverage on index.html and deep coverage on pricing.html including top, mid, and lower sections.`
- features: `Exercise all major visible controls on pricing.html: representative matrix cells across the grid, the calculation disclosure, most or all 9 add-on checkboxes, tier explainer linkage, FAQ interactions if available, and key header/footer links.`
- mobile: `Repeat the critical entry path and a focused subset of pricing interactions on mobile, emphasizing nav tap targets, matrix usability, add-on toggles, sticky quote behavior, and long-page scrolling.`

## Planned Phases

### Landing page entry and navigation sanity check

- Objective: Validate that the landing page clearly funnels users into the pricing experience and that visible top-level links behave as expected.
- Target pages: index.html
- Key checks:
  - Load index.html and confirm core content hierarchy: hero statement, SQL example, three feature cards, and See pricing CTA
  - Click See pricing and confirm it reaches pricing.html
  - Check header links Lattice DB, Platform, and Pricing for sensible navigation between known pages
  - Probe Docs, Customers, Sign in, and Book demo once each to verify whether they are placeholders, inert anchors, or cause unexpected jumps
  - Assess whether the landing page gives enough pricing context before the CTA
- Exit criteria:
  - Confirmed at least one clean path from index.html into pricing.html
  - Header/navigation behavior documented for all visible landing-page links
  - No ambiguity remains about which control launches the primary pricing flow

### Core pricing matrix behavior

- Objective: Exercise the main pricing interaction model and verify that selected states, highlights, and quote-card updates are coherent across representative cells.
- Target pages: pricing.html
- Key checks:
  - Identify default selection state on initial load, if any
  - Click representative matrix cells across the grid: at least one low-end numeric cell, one mid-range numeric cell, one high numeric cell, and one or more 'Contact us' cells
  - Verify each click highlights the correct row and column intersection and updates the selected price in the sticky quote card
  - Verify the selected seat band and data-volume context remain understandable after multiple changes
  - Check whether the sticky quote card stays visible and usable during scrolling
  - Use repeated back-to-back cell changes to look for stale highlights, stale price text, or mismatched tier labels
- Exit criteria:
  - Representative coverage achieved across numeric and Contact us matrix states
  - Quote-card synchronization confirmed or clearly broken for multiple selections
  - Row/column highlighting behavior observed for several distinct cells

### Quote calculation and add-on composition

- Objective: Validate the pricing explanation and additive cost controls that turn a base cell into a fuller monthly quote.
- Target pages: pricing.html
- Key checks:
  - Open and close the 'How this is calculated' disclosure and verify the content is understandable and visually stable
  - Toggle several add-ons individually to confirm each visibly affects the quote or breakdown where applicable
  - Test both percentage-style add-ons and flat-fee add-ons, since the prescan mentions both types
  - Select multiple add-ons together and verify cumulative behavior in the final monthly-fee breakdown card
  - Turn add-ons back off to confirm totals recover correctly without lingering charges
  - Check whether add-on interactions behave differently for numeric cells versus Contact us cells
- Exit criteria:
  - At least one percentage add-on and one flat-fee add-on validated
  - Multi-add-on state and recovery state both observed
  - Final monthly-fee breakdown behavior documented for at least one numeric quote and one special-case quote if supported

### Explanatory and supporting pricing content

- Objective: Confirm that supporting sections reinforce the matrix selection rather than confusing or breaking the flow.
- Target pages: pricing.html
- Key checks:
  - Verify clicking matrix cells auto-highlights the corresponding tier in the 4-tier explainer
  - If the tier explainer itself is interactive, test whether clicking tier cells changes or clarifies state without conflicting with the matrix
  - Scroll through the 15-row feature matrix to check readability, alignment, and whether the current tier context remains understandable
  - Review the 8-question FAQ for expansion behavior if interactive, or at minimum for scannability and answer visibility
  - Check footer content and links for obvious dead ends or unexpected behavior
- Exit criteria:
  - Tier-mapping behavior confirmed for multiple matrix selections
  - Feature matrix and FAQ reviewed for layout and comprehension issues
  - Lower-page content covered enough to assess whether it supports the pricing decision

### Mobile pass on critical flows

- Objective: Repeat the most important pricing interactions on a mobile viewport, focusing on tapability, responsive layout, and sticky/scroll behavior.
- Target pages: index.html, pricing.html
- Key checks:
  - Revisit header controls on mobile and test the nav links that were flagged as small tap targets in the prescan
  - Confirm the landing-page CTA remains prominent and easy to activate on mobile
  - On pricing.html, verify the matrix remains understandable and operable on a small viewport, including horizontal scrolling or stacking if present
  - Repeat a small set of critical matrix selections on mobile: one numeric cell, one higher-end cell, and one Contact us cell
  - Toggle at least two add-ons on mobile and confirm the quote/breakdown remains visible and comprehensible
  - Check whether the sticky quote card, disclosure, FAQ, and long-table sections behave acceptably while scrolling
- Exit criteria:
  - Primary landing-to-pricing flow completed on mobile
  - Critical pricing interactions repeated successfully or major mobile blockers identified
  - Small-tap-target impact assessed on the header and key actions

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

