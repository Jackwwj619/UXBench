# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the vaultkey marketing-to-pricing UX, prioritizing navigation, plan selection/billing logic, and the most interactive pricing controls, then validating key responsive/mobile behaviors.

## Plan Summary

Start at the landing page to validate top navigation, primary CTAs, and the in-page messaging/visual metaphor (searchable vault screenshot). Then move to the pricing page to thoroughly exercise the Yearly/Monthly toggle, plan CTAs, and the Business seat slider + linked number input and tiered volume pricing totals. Finish by validating the FAQ accordion and enterprise/contact CTA, including repeat checks on mobile viewport for critical interactions.

## Coverage Targets

- pages: `visit all known HTML pages (index.html, pricing.html)`
- features: `exercise most visible controls per key page: header nav CTAs, pricing Yearly/Monthly toggle, all plan CTAs, Business slider+number input+tiered totals, FAQ accordion, enterprise CTA`
- mobile: `repeat critical checks on mobile viewport for: nav-to-pricing, billing toggle, Business seat control linkage, and FAQ accordion`

## Planned Phases

### Landing page navigation & primary CTAs

- Objective: Validate that the header navigation and primary CTAs correctly route users (especially to pricing.html) and that the landing page provides a coherent entry to plan consideration.
- Target pages: index.html
- Key checks:
  - Verify clicking 'Pricing' in the header navigates to pricing.html and the corresponding active nav state highlights 'Pricing' (prescan shows a green underline on Pricing)
  - Verify both landing CTAs ('See plans →' and 'See pricing →') lead to pricing.html and land in/near the plans section (not just at top of page)
  - Verify 'Download free' and 'Get Vaultkey' buttons/links have expected behavior (if they are placeholders, confirm there is at least a clear UI response such as opening a section or starting a flow)
  - Click header items with href='#' (Security, Enterprise, Help) and confirm they either scroll to content or provide a reasonable non-dead response (no blank/undefined state)
  - Use the fake searchable vault screenshot area: check if Cmd/Ctrl shortcut hints correspond to any functional keyboard/search UI (if present); otherwise validate that the static metaphor is readable and not misleading
- Exit criteria:
  - Confirmed all header items either navigate correctly (for Pricing) or behave consistently (anchors/placeholder responses are non-dead)
  - At least one 'See plans/See pricing' CTA was clicked and confirmed to reach pricing.html
  - No console/network errors during interactions on index.html

### Pricing page billing toggle, plan CTAs, and Business seat control

- Objective: Thoroughly exercise pricing selection logic and ensure interactive controls correctly update displayed pricing totals and tier labels.
- Target pages: pricing.html
- Key checks:
  - Toggle 'Yearly · save 20%' and 'Monthly' and verify the displayed prices/totals for at least Personal and Family change consistently with the toggle
  - For each plan card (Personal, Family, Business), click the primary CTA (e.g., 'Get Personal', 'Start free 30-day trial', and Business CTAs if present) and confirm expected navigation/feedback (e.g., scroll to relevant form/contact section or show a dialog/anchor)
  - Exercise Business team size input linkage: drag the seat slider to several points and confirm the team size number input updates; then type values directly and confirm the slider thumb moves
  - Check boundary values for Business team size (at least: 3, 24, 25, 49, 50, 99, 100, 199, 200) and verify which tier applies and that monthly/yearly totals update correctly
  - Validate that monthly vs yearly totals remain consistent with the applied billing toggle and the same seat count (no mismatch between tier and computed totals)
- Exit criteria:
  - Billing toggle produces coherent and consistent price changes across plans
  - Slider and number input remain synchronized for repeated changes
  - Tier boundary checks show correct tier selection and totals at all tested boundaries
  - No broken UI states or console/network errors while interacting with controls

### Pricing page compare table, FAQ accordion, and enterprise contact

- Objective: Validate information architecture and disclosure mechanics (feature comparison + FAQ accordion) and confirm enterprise/contact CTA behavior.
- Target pages: pricing.html
- Key checks:
  - Scroll through the 'Compare every feature' section and verify the grouped feature comparison table is readable (no overlapping columns at current viewport)
  - Interact with the FAQ accordion: open multiple questions, verify only the intended panels expand/collapse (and animations are smooth), and confirm expanded state is accessible (focus/aria behavior if detectable)
  - Find and click the enterprise-related CTA ('Talk to sales →' or similar) and confirm it leads to the enterprise/contact strip or a clear next step
  - Confirm that 'Need bigger?' and the enterprise strip are reachable (not obscured) and that the CTA is consistent regardless of earlier billing/seat interactions
- Exit criteria:
  - FAQ accordion interactions work reliably across multiple opens/closes with no stuck states
  - Enterprise/contact CTA produces the expected next step (scroll or navigation) and remains functional
  - No layout breaks while reaching compare table + FAQ sections

### Responsive/mobile validation for critical flows

- Objective: Repeat the highest-risk interactions on mobile viewport to catch tap-target and layout issues.
- Target pages: index.html, pricing.html
- Key checks:
  - On mobile, tap header links (Pricing, Sign in, Get Vaultkey, and at least one href='#' item) and confirm they are selectable and not mis-targeted
  - On pricing mobile, toggle Yearly/Monthly and verify control hit areas are usable and state updates
  - On pricing mobile, operate Business seat slider (or alternative control if slider becomes constrained) and confirm number input updates; test at least one mid value and one boundary
  - Open/close FAQ accordion on mobile and verify expanded content remains readable and not hidden behind sticky elements
- Exit criteria:
  - Critical interactions (nav-to-pricing, billing toggle, Business seat linkage, FAQ accordion) are functional on mobile viewport
  - No severe usability issues (e.g., controls not tappable or overlap causing wrong targets)

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

