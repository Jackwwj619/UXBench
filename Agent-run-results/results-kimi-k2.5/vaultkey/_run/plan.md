# UXAgent Exploration Plan

## Goal

Explore and critique the UX of Vaultkey's landing (index.html) and pricing (pricing.html) pages, validating primary flows (pricing selection, plan comparison) and adjacent interactions (CTAs, responsive behavior).

## Plan Summary

Start with the landing page (index.html) to validate hero CTAs, trust strip, and why-cards. Then move to pricing.html to test billing toggle, plan cards, business seat slider/input, feature table, and FAQ. Repeat critical checks (e.g., slider, CTAs) in mobile viewport. Ensure all interactables (links, buttons, inputs) are exercised.

## Coverage Targets

- pages: `Visit both known pages (index.html, pricing.html) in both viewports (desktop, mobile).`
- features: `Exercise all visible controls: 2 CTAs (index), 2 toggle buttons (pricing), 3 plan CTAs, 1 seat input/slider, 5 feature table rows, 3 FAQ accordions, and all navigation links.`
- mobile: `Repeat critical checks (CTAs, toggle, seat input) on mobile viewport; validate responsive layout and tap targets.`

## Planned Phases

### Landing Page (Desktop)

- Objective: Validate hero section, trust strip, why-cards, and CTAs on index.html (desktop view).
- Target pages: index.html
- Key checks:
  - Click 'See plans →' (verify redirect to pricing.html); click 'Download free' (verify interaction feedback); check trust strip logos (Halcyon, Northwind, etc.) for visibility; validate why-cards (One shortcut, Real end-to-end, Shared with intent) for content and layout.
- Exit criteria:
  - All CTAs interacted; trust strip and why-cards validated; no console errors.

### Pricing Page (Desktop)

- Objective: Test billing toggle, plan cards, business seat input/slider, and feature table on pricing.html (desktop view).
- Target pages: pricing.html
- Key checks:
  - Toggle 'Yearly'/'Monthly' (verify price updates); click 'Get Personal' (Family/ Business CTAs for feedback); interact with Business seat input (type 12, 25, 200+; verify volume pricing updates); check 3 plan cards for content consistency; open 2–3 feature table rows (Vault & sync, Sharing, Security) for visibility.
- Exit criteria:
  - Billing toggle works; seat input/slider validated; plan cards and feature table interacted; no console errors.

### Responsive Checks (Mobile Viewport)

- Objective: Replicate critical checks (CTAs, pricing toggle, seat input) on mobile viewport (≤640px) to validate responsiveness.
- Target pages: index.html, pricing.html
- Key checks:
  - On index.html (mobile): tap 'See plans →' (redirect); tap 'Download free' (feedback); check navigation links (small tap targets) for interaction area. On pricing.html (mobile): toggle 'Yearly'/'Monthly'; interact with Business seat input (type 12); check plan card CTAs ('Start free 30-day trial', 'Start 14-day trial') for visibility.
- Exit criteria:
  - Critical CTAs and interactions work on mobile; responsive layout (breakpoints at <1000px, <640px) validated; no layout warnings escalated.

### FAQ and Accessibility (Desktop)

- Objective: Validate FAQ accordion, enterprise CTA, and footer links on pricing.html (desktop view).
- Target pages: pricing.html
- Key checks:
  - Open 3–4 FAQ accordion items (Common questions) for content and interaction (expand/collapse); click 'Talk to sales →' (Enterprise CTA, verify feedback); check footer links (© 2026 Vaultkey, SOC 2, FIDO2) for visibility and interaction.
- Exit criteria:
  - FAQ accordion works; enterprise CTA interacted; footer links validated; no console errors.

### Final Validation (All Pages)

- Objective: Recheck high-risk areas (business seat slider, small tap targets) and ensure all interactables are exercised.
- Target pages: index.html, pricing.html
- Key checks:
  - Re-verify business seat input (type 3, 24, 25, 49, 50, 99, 100, 199, 200+; check volume pricing); check navigation links (Vaultkey, Product, Pricing, etc.) for tap target consistency; verify FAQ accordion accessibility (keyboard navigation if applicable); check console for any new errors.
- Exit criteria:
  - High-risk areas validated; all interactables exercised; no console errors.

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

