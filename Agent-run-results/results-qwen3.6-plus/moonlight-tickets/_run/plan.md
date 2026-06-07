# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the full moonlight-tickets system, prioritizing the primary checkout/booking flow plus adjacent pages, states, and recovery paths.

## Plan Summary

The run will proceed from the discovery page (index.html) through event selection (event.html), ticket configuration, and the complex checkout process (checkout.html), ending at confirmation. It will specifically validate the 4-axis filtering logic, the dynamic pricing/fee calculations in the sticky order summary, and the attendee form behaviors (copying info, VIP fields). Finally, it will repeat critical path checks on mobile to address known tap-target risks.

## Coverage Targets

- pages: `Visit all 4 HTML files (index, event, checkout, confirmation).`
- features: `Exercise filters, audio players, ticket steppers, promo codes, copy-info logic, and payment form.`
- mobile: `Repeat Phase 1, 2, and 3 key interactions on mobile viewport.`

## Planned Phases

### Discovery & Filtering

- Objective: Validate the homepage layout, navigation, and the 4-axis filtering system (Date, Genre, Venue, Price).
- Target pages: index.html
- Key checks:
  - Verify visibility of 'Tonight' cards vs 'This week' grid.
  - Interact with all 4 filter dropdowns to ensure options load.
  - Apply a combined filter (e.g., Genre: Jazz + Venue: Coppergate Hall) and verify results update.
  - Check navigation links (Calendar, Venues, Artists) for validity or placeholder behavior.
- Exit criteria:
  - Filters applied and results visibly changed.
  - At least one event card clicked to transition to event.html.

### Event Detail & Ticket Selection

- Objective: Explore the event page, audio clips, and ticket tier selection logic.
- Target pages: event.html
- Key checks:
  - Play/pause audio clips to check media controls.
  - Select 'VIP' tier and verify 'SELLING FAST' badge and price point ($52).
  - Use stepper to increase quantity to 2 tickets.
  - Verify sticky 'Your Order' summary updates subtotal and fees dynamically.
  - Click 'Continue to checkout'.
- Exit criteria:
  - 2 VIP tickets selected.
  - Order summary reflects correct base price.
  - Transitioned to checkout.html.

### Checkout Flow & Form Logic

- Objective: Complete the attendee and payment forms, testing edge cases like VIP fields and data copying.
- Target pages: checkout.html
- Key checks:
  - Verify 10-minute countdown timer is visible.
  - Fill Buyer Info (First/Last/Email).
  - Expand Attendee 2 form; use 'Copy buyer info' and verify fields populate.
  - Locate and fill 'Name for signed poster' field (specific to VIP tickets).
  - Enter invalid promo code, then valid code (DOORS5) and verify fee reduction in breakdown.
  - Select Payment Method and enter dummy card details (checking formatting).
- Exit criteria:
  - All required fields filled.
  - Promo discount applied in fee breakdown.
  - Ready to submit order.

### Confirmation & Recovery

- Objective: Submit the order and verify the success state, then test cancellation/recovery.
- Target pages: confirmation.html, checkout.html
- Key checks:
  - Submit order and verify redirect to confirmation.html.
  - Validate order details on confirmation page match checkout inputs.
  - Return to checkout.html (via back nav or new session).
  - Test 'Cancel' button and verify second-confirmation dialog appears.
- Exit criteria:
  - Confirmation page viewed.
  - Cancellation flow interrupted or confirmed.

### Mobile Responsiveness Check

- Objective: Repeat critical path interactions on mobile viewport to assess touch usability.
- Target pages: index.html, event.html, checkout.html
- Key checks:
  - Switch to mobile viewport.
  - Re-test filtering on index.html (check for overlap/usability).
  - Re-test ticket stepper on event.html (ensure buttons are tappable).
  - Re-test checkout form inputs (verify keyboard triggers and layout stacking).
  - Specifically target previously identified small tap targets (nav links) to document difficulty.
- Exit criteria:
  - Critical flows completed on mobile viewport.
  - Usability issues noted for small tap targets.

## Prescan Summary

### MoonlightTickets — Tickets for tonight, not next week

- Page: `index.html`
- Headings: Tonight in your city, Sea Glass Sextet, Northern Brushfires, Halcyon Dial, Telegraph Bay, This week
- Interactables: `0` buttons, `22` links, `4` inputs
- Notable controls:
  - clickable:a:MoonlightTickets
  - clickable:a:Tonight
  - clickable:a:This Week
  - clickable:a:Calendar
  - clickable:a:Venues
  - clickable:a:Artists
  - clickable:a:Sell tickets
  - clickable:a:Sign in

### MoonlightTickets — Tickets for tonight, not next week

- Page: `index.html`
- Headings: Tonight in your city, Sea Glass Sextet, Northern Brushfires, Halcyon Dial, Telegraph Bay, This week
- Interactables: `0` buttons, `22` links, `4` inputs
- Notable controls:
  - clickable:a:MoonlightTickets
  - clickable:a:Tonight
  - clickable:a:This Week
  - clickable:a:Calendar
  - clickable:a:Venues
  - clickable:a:Artists
  - clickable:a:Sell tickets
  - clickable:a:Sign in

### MoonlightTickets — Tickets for tonight, not next week

- Page: `index.html`
- Headings: Tonight in your city, Sea Glass Sextet, Northern Brushfires, Halcyon Dial, Telegraph Bay, This week
- Interactables: `0` buttons, `22` links, `4` inputs
- Notable controls:
  - clickable:a:MoonlightTickets
  - clickable:a:Tonight
  - clickable:a:This Week
  - clickable:a:Calendar
  - clickable:a:Venues
  - clickable:a:Artists
  - clickable:a:Sell tickets
  - clickable:a:Sign in

### Event — MoonlightTickets

- Page: `event.html`
- Headings: Sea Glass Sextet, ABOUT, LISTEN, VENUE, YOU MIGHT ALSO LIKE, YOUR ORDER
- Interactables: `9` buttons, `5` links, `0` inputs
- Notable controls:
  - clickable:a:MoonlightTickets
  - clickable:button:♡
  - clickable:button:↗
  - clickable:button:decrease
  - clickable:button:increase
  - clickable:a:→
  - clickable:a:Northern Brushfires Halo Room · Tonight · 10:00 PM
  - clickable:a:Halcyon Dial Velvet Pier · Tonight · 11:00 PM

