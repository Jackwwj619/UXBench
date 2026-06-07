# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the full moonlight-tickets system, prioritizing the primary checkout/booking flow plus adjacent pages, states, and recovery paths.

## Plan Summary

The exploration will start by testing the discovery and filtering mechanisms on the index page, then proceed through the event detail page interacting with ticket selection and media. The core focus will be on the exhaustive validation of the checkout flow, including dynamic form states, promo codes, and fee calculations. Finally, the confirmation page and critical mobile viewport adaptations will be verified.

## Coverage Targets

- pages: `visit all 4 known HTML pages (index, event, checkout, confirmation)`
- features: `exercise all filters, ticket steppers, audio players, accordion forms, promo codes, payment toggles, and the cancel confirmation`
- mobile: `repeat the full discovery-to-checkout flow on mobile viewport to validate tap targets and responsive layout`

## Planned Phases

### Discovery & Filtering

- Objective: Validate the index page layout, event discovery cards, and the 4-axis filtering functionality.
- Target pages: index.html
- Key checks:
  - Interact with all 4 filter dropdowns (Date, Genre, Venue, Price) and verify the event grid updates accordingly.
  - Click a 'Tonight' card and a 'This week' card to ensure correct navigation to event.html.
  - Check for layout shifts or overlapping elements when filters are activated.
- Exit criteria:
  - All 4 filters have been exercised individually and in combination.
  - At least two event cards have been clicked to proceed to the next phase.

### Event Detail & Ticket Selection

- Objective: Validate the event page interactions, including media, ticket steppers, and order summary updates.
- Target pages: event.html
- Key checks:
  - Play audio clips and verify player state changes.
  - Use the + and - steppers for Early Bird, Standard, and VIP tickets.
  - Verify the VIP tier displays the 'SELLING FAST' badge.
  - Ensure the sticky order summary updates correctly with ticket count and subtotal.
  - Click 'Continue to checkout' with tickets in the cart.
- Exit criteria:
  - Audio clips have been interacted with.
  - Multiple ticket tiers have been added to the cart.
  - Successfully navigated to checkout.html with a populated cart.

### Checkout Flow & Dynamic States

- Objective: Exhaustively test the checkout page, focusing on the countdown, dynamic forms, payment methods, and promo logic.
- Target pages: checkout.html
- Key checks:
  - Verify the 10-minute reservation countdown is visible and ticking.
  - Expand and fill the accordion attendee forms; validate 'Copy buyer info' functionality on the second ticket.
  - Add a VIP ticket and verify the 'Name for signed poster' field appears.
  - Toggle the e-delivery toggle and observe state changes.
  - Apply promo codes (DOORS5, TONIGHT10) and verify the detailed fee breakdown recalculates correctly.
  - Test the Cancel button to ensure second-confirmation appears.
  - Switch between the 3 payment methods and verify card-number formatting if card is selected.
- Exit criteria:
  - Attendee forms filled for multiple tiers including VIP.
  - Promo codes applied and fee breakdown verified.
  - Cancel confirmation and payment method switching tested.
  - Order successfully submitted to reach confirmation.html.

### Confirmation & Edge Cases

- Objective: Validate the confirmation page and test edge cases like zero-ticket states and empty cart navigation.
- Target pages: confirmation.html, event.html, checkout.html
- Key checks:
  - Verify confirmation page displays correct event details and attendee info.
  - Navigate back to event.html and attempt to proceed with 0 tickets selected.
  - Attempt to access checkout.html directly without an active cart/session.
- Exit criteria:
  - Confirmation page content validated.
  - Edge case attempts handled gracefully by the UI.

### Mobile Viewport Validation

- Objective: Repeat critical checks on a mobile viewport to identify responsive design flaws, especially tap targets and layout shifts.
- Target pages: index.html, event.html, checkout.html
- Key checks:
  - Verify navigation tap targets on index.html (noted as high-risk in prescan).
  - Check sticky order summary behavior on event.html (does it overlap content?).
  - Validate accordion form interactions and checkout countdown visibility on small screens.
- Exit criteria:
  - Primary flow successfully completed on mobile viewport.
  - Responsive layout issues and tap target problems documented.

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

