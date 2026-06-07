# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full orbitride system, prioritizing the primary checkout/booking flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

OrbitRide’s booking flow generally preserves trip context across steps (search → results → seats → payment → confirmation), and pricing/add-ons update with immediate summary feedback. However, several key progress actions appear to be silent no-ops or are gated without clear explanation (e.g., Continue on seats/payment, Manage trip on confirmation), and mobile usability is weakened by undersized tap targets and tight/overflow layouts. The seat map UI is visually clear, but interactive seat selection and progression could not be verified due to repeated click targeting/timing failures, raising a critical usability risk.

## Issues (4)

### [HIGH] the-primary-progression-control-on-the — navigation
- **Page**: `seats.html (Continue disabled; seat click timeouts). See screenshots: /.../seats.html agentic-80-click-mobile.png; failed clicks in session memory for P1/A1/ux-2b/Continue.`
- **Problem**: The primary progression control on the seat map (“Continue”) appears disabled and blocking progression without providing a clear, actionable explanation; seat selection itself could not be successfully performed in multiple attempts.
- **Evidence**: Failed clicks on Continue show it is disabled: locator resolved to a disabled button (id continueBtn, data-uxagent-id="ux-2", class btn-primary big). Multiple seat-selection attempts timed out (e.g., P1 and ux-2b). On mobile seats.html, the UI shows 'SELECTED' -> 'No seats selected' and 'Continue' with 'Seats $0.00' (screenshot path: .../agentic-80-click-mobile.png).
- **Suggested fix**: Ensure seat elements are clearly clickable/tappable and provide immediate visual selection feedback (e.g., selected seat highlight + selected list update). When Continue is disabled, show an explicit inline message like “Select 2 seats to continue” and ensure keyboard/screen-reader focus moves to selected seats/CTA after selection.

### [HIGH] post-booking-ctas-can-behave-like — feedback
- **Page**: `confirmation.html (Manage trip + Email me a copy silent/no-op actions; changed_actions=0; session memory steps-31-36).`
- **Problem**: Post-booking CTAs can behave like silent no-ops, with no observable navigation or success/error feedback for actions such as “Manage trip” and “Email me a copy”.
- **Evidence**: On confirmation.html: clicking “Manage trip” produced no detectable URL change or visible state change (after_url remained confirmation.html). Clicking “Email me a copy” similarly produced no observable navigation/feedback (tool result: no URL/navigation change; no obvious feedback).
- **Suggested fix**: Add clear confirmation states: show a toast/modal (“Email sent”, “Opening manage trip…”) and handle errors visibly (network/form validation). If actions are implemented via downloads or dialogs, ensure the UI provides a visible progress indicator.

### [MEDIUM] mobile-tap-targets-are-frequently-below — mobile usability
- **Page**: `Mobile warnings cited in session memory: OrbitRide link 83x27px; amenity checkbox ~13x13px; horizontal overflow warnings in index.html/routes.html.`
- **Problem**: Mobile tap targets are frequently below recommended sizes, and there are layout overflow warnings that can increase mis-taps and reduce confidence when interacting with filters and navigation links.
- **Evidence**: Layout warnings repeatedly flag small tap targets: OrbitRide header link is ~83x27px on mobile (below 44px guidance) across routes/seats/confirmation. Amenities checkboxes are very small (~13x13px). There are multiple horizontal overflow warnings (e.g., page width 433px > viewport 390px) on mobile (recent trajectory: index.html, routes.html, seats.html).
- **Suggested fix**: Increase tap target sizes to meet 44x44px guidance (or at least ensure adequate padding). For small checkboxes, enlarge the clickable label area, add spacing between controls, and resolve horizontal overflow by reflowing/stacking filter panels.

### [MEDIUM] several-filtering-selection-actions-show-little — clarity
- **Page**: `routes.html filtering tests: carousel click timeout (steps-01-06), Max price drag unchanged (steps-43-48), mobile amenity toggle ambiguous/no change (steps-67-72).`
- **Problem**: Several filtering/selection actions show little to no visible result change or ambiguous evidence, suggesting insufficient feedback or delayed/unclear filter application.
- **Evidence**: Failed objective: clicking intended carousel day control timed out; URL remained date=2026-05-25 (after_url unchanged). On filters, an attempted drag of the Max price slider produced no observable change in trip rows/prices and URL stayed unchanged. In mobile, unchecking Power outlet produced no observable change (checked state remained False→False) at least in one observation window.
- **Suggested fix**: Add stronger filter feedback: show an applied-state indicator (e.g., “Max price: $120” chip), animate/flash updated results, and ensure the selected date visibly highlights and updates the list (plus update query parameters deterministically). For no-result scenarios, show a dedicated empty state explaining why.
