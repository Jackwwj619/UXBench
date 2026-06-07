# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the Vaultkey marketing and pricing pages, focusing heavily on the interactive pricing calculators and responsive layout.

## Plan Summary

The run will begin by validating the landing page CTAs and layout. It will then deeply test the pricing page's interactive elements, including the yearly/monthly billing toggle, the business seat slider, and the linked number input. Finally, it will check the FAQ accordion and perform mobile viewport validations to assess tap targets and responsive design.

## Coverage Targets

- pages: `Visit both index.html and pricing.html.`
- features: `Thoroughly exercise the billing toggle, seat slider, linked number input, and FAQ accordions.`
- mobile: `Validate layout and interaction of the pricing calculator and navigation on mobile viewports.`

## Planned Phases

### Landing Page Validation

- Objective: Verify the structure, navigation, and primary CTAs on the landing page.
- Target pages: index.html
- Key checks:
  - Check presence and visibility of main navigation links.
  - Verify 'See plans' and 'Pricing' links successfully route to pricing.html.
- Exit criteria:
  - Navigation is confirmed functional and structural elements are present.

### Pricing Billing Toggle

- Objective: Test the Yearly/Monthly billing toggle state and its effect on prices.
- Target pages: pricing.html
- Key checks:
  - Toggle to 'Monthly' and observe price updates on Family and Business plans.
  - Toggle back to 'Yearly' and confirm the 20% discount is applied correctly.
- Exit criteria:
  - Prices correctly reflect the selected billing frequency on all affected plan cards.

### Business Seat Calculator

- Objective: Validate the slider and number input logic for Business plan pricing.
- Target pages: pricing.html
- Key checks:
  - Change the range slider value and verify the number input updates synchronously.
  - Type a valid number (e.g., 50) into the input and verify the slider and total price update.
  - Test boundary values (e.g., <3 or >200) to check error handling or clamping.
  - Observe if price calculation matches the specific volume tiers (3-24, 25-49, etc.).
- Exit criteria:
  - Slider and input stay synced, and prices calculate correctly based on volume tiers and boundaries.

### Feature Table and FAQ Interaction

- Objective: Ensure the comparison table is readable and FAQ accordions function as intended.
- Target pages: pricing.html
- Key checks:
  - Scroll through the 25-row feature comparison table to ensure groups are well-structured.
  - Click multiple FAQ accordion headers to verify expand/collapse behavior and content visibility.
- Exit criteria:
  - FAQ items can be toggled open and closed without layout breakage.

### Mobile Responsiveness

- Objective: Check layout and tap targets in a mobile viewport.
- Target pages: index.html, pricing.html
- Key checks:
  - Assess navigation menu stacking or hamburger menu presence.
  - Verify slider usability and table horizontal scrolling on narrow screens.
  - Investigate the small tap targets reported in the prescan.
- Exit criteria:
  - Mobile layout is functionally evaluated and tap target issues are documented.

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

