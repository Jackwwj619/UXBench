# UXAgent Exploration Plan

## Goal

Evaluate the UX of the Vaultkey marketing site, focusing on the clarity of the pricing model (specifically the Business tier logic) and mobile responsiveness of key navigation elements.

## Plan Summary

The run will start on the landing page to assess value proposition clarity and CTA effectiveness. It will then transition to the Pricing page to rigorously test the billing toggle and the complex Business seat calculator/slider interaction. Finally, it will verify mobile usability, specifically addressing the prescan warnings regarding small tap targets in the navigation.

## Coverage Targets

- pages: `100% of existing HTML files (index.html, pricing.html)`
- features: `Full exercise of Pricing toggle, Business slider/input, and FAQ accordion`
- mobile: `Critical path validation on <640px viewport, focusing on nav tap targets`

## Planned Phases

### Landing Page & Value Prop

- Objective: Validate the hero section messaging, trust indicators, and primary CTAs on index.html.
- Target pages: index.html
- Key checks:
  - Verify visibility of 'See plans' and 'Download free' CTAs above the fold.
  - Check legibility of the faux app screenshot (sidebar categories and item list).
  - Confirm 'Trusted By' logos are visible and not broken.
  - Test hover states on primary buttons.
- Exit criteria:
  - Hero section fully rendered without layout shifts.
  - CTAs clickable and leading to correct destinations (Pricing or #).

### Pricing Logic & Interaction

- Objective: Deep dive into pricing.html to validate the billing toggle and the complex Business tier calculator.
- Target pages: pricing.html
- Key checks:
  - Toggle 'Yearly' vs 'Monthly' and verify all three plan prices update correctly (20% savings logic).
  - Interact with the Business 'Team size' slider: drag to min (3), max (200+), and intermediate values.
  - Type directly into the Business seat number input and verify the slider moves in sync.
  - Verify the '5-tier volume pricing' text updates dynamically as the seat count changes.
  - Expand/Collapse FAQ accordion items to check for content overflow or animation glitches.
- Exit criteria:
  - Prices calculate correctly for edge cases (e.g., 200 seats, yearly billing).
  - Slider and input field remain synchronized during rapid interaction.
  - No console errors during DOM manipulation of the pricing calculator.

### Mobile Responsiveness & Accessibility

- Objective: Address prescan warnings by testing the site on mobile viewport (<640px).
- Target pages: index.html, pricing.html
- Key checks:
  - Verify navigation menu collapses into a hamburger menu or remains usable.
  - Measure tap targets for 'Sign In', 'Product', and 'Pricing' links (prescan flagged these as <44px).
  - Check that the Pricing table/cards stack vertically and remain readable.
  - Ensure the Business seat slider is usable via touch gestures.
- Exit criteria:
  - No horizontal scrolling on main content areas.
  - Critical navigation links have adequate padding/touch area or are accessible via a mobile menu.
  - Text remains legible without zooming.

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

