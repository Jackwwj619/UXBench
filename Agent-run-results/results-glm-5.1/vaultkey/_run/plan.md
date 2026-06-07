# UXAgent Exploration Plan

## Goal

Exhaustively explore and critique the UX of the Vaultkey marketing and pricing system, focusing on interactive pricing components, navigation, responsive layout shifts, and accessibility of controls.

## Plan Summary

The run will start by exploring the landing page (index.html), validating navigation, layout, and mobile responsiveness. It will then transition to the pricing page (pricing.html) to deeply test the billing toggle, the Business per-seat slider/input, and the FAQ accordion. Finally, it will verify the feature comparison table and ensure all critical states are checked on both desktop and mobile viewports.

## Coverage Targets

- pages: `visit all known HTML pages (index.html, pricing.html)`
- features: `exercise all visible controls: billing toggle, slider, number input, accordion, and all CTAs`
- mobile: `repeat critical checks (pricing toggle, slider, accordion, table scroll) on mobile viewport`

## Planned Phases

### Landing Page Exploration

- Objective: Validate the layout, content, and navigation of the primary landing page.
- Target pages: index.html
- Key checks:
  - Verify hero section renders correctly with dual CTAs
  - Click 'See plans →' and 'See pricing →' links to ensure they route to pricing.html
  - Check faux app screenshot section for layout integrity
  - Validate trust strip and why-cards layout
  - Test all '#' href links (Security, Enterprise, etc.) for expected behavior
- Exit criteria:
  - All visible links on index.html have been clicked
  - Page structure and content have been fully observed

### Pricing Page Core Interactions

- Objective: Deeply test the primary interactive pricing components on the pricing page.
- Target pages: pricing.html
- Key checks:
  - Toggle between 'Yearly' and 'Monthly' billing and verify price updates for Personal, Family, and Business plans
  - Interact with the Business per-seat slider across its range (3-200) and verify linked number input updates
  - Type values into the Business number input and verify slider updates
  - Validate that volume pricing tiers update correctly based on seat count
  - Click 'Get Personal', 'Start free 30-day trial', and 'Start 14-day trial' buttons
- Exit criteria:
  - Billing toggle has been switched multiple times
  - Slider dragged to minimum, middle, and maximum values
  - Number input tested with boundary values (3, 25, 200)
  - Price calculations observed for all states

### Pricing Page Content & Accordion

- Objective: Validate the feature comparison table and FAQ accordion interactions.
- Target pages: pricing.html
- Key checks:
  - Expand and collapse multiple FAQ accordion items
  - Verify only one or multiple FAQ items can be open simultaneously
  - Scroll through the 25-row grouped feature comparison table
  - Click 'Talk to sales →' link
- Exit criteria:
  - At least 3 FAQ items expanded and collapsed
  - Feature comparison table fully scrolled and observed

### Mobile Responsiveness Checks

- Objective: Re-evaluate critical flows and layouts on a mobile viewport to identify responsive issues.
- Target pages: index.html, pricing.html
- Key checks:
  - Check navigation menu behavior on mobile (hamburger menu or stacked links)
  - Validate hero section and CTAs stacking on mobile
  - Test Business per-seat slider/input on mobile viewport
  - Check feature comparison table horizontal scrolling or stacking on mobile
  - Re-verify small tap target issues flagged in prescan
- Exit criteria:
  - Both pages viewed on mobile viewport
  - Critical interactions (toggle, slider, accordion) repeated on mobile
  - Layout warnings and tap target sizes assessed

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

