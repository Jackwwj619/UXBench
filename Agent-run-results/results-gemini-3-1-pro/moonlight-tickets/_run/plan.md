# UXAgent Exploration Plan

## Goal

Exhaustively explore and critique the ticket booking flow from event discovery to confirmation, verifying cart logic, checkout validation, and responsive adaptations.

## Plan Summary

The run will start on the discovery page to test filters, then navigate to an event to test ticket selection and the sticky cart. From there, it will proceed to checkout to evaluate the attendee forms, promo codes, and payment flow, ending with the confirmation page. A mobile pass will verify responsive layout and tap targets.

## Coverage Targets

- pages: `Visit index, event, checkout, and confirmation pages.`
- features: `Exercise filtering, multi-tier ticket selection, dynamic cart updates, multi-attendee forms, promo codes, and payment validation.`
- mobile: `Execute a full booking flow on the mobile viewport to surface responsive UI issues.`

## Planned Phases

### Discovery and Filtering

- Objective: Validate event discovery and filter functionality on the home page.
- Target pages: index.html
- Key checks:
  - Interact with Date, Genre, Venue, and Price select filters to observe updates.
  - Verify navigation links and small tap targets in the header.
  - Click on a 'Tonight' event card and a 'This week' event card to ensure correct routing.
- Exit criteria:
  - Filters are tested and an event card is successfully clicked, loading event.html.

### Ticket Selection and Cart Logic

- Objective: Test the ticket tier selection, constraints, and dynamic order summary.
- Target pages: event.html
- Key checks:
  - Use the +/- steppers to add different types of tickets (Early Bird, Standard, VIP).
  - Verify the 'SELLING FAST' badge on VIP tickets.
  - Observe the right-side sticky order summary and fee preview updating dynamically.
  - Test favorite (♡) and share (↗) buttons.
- Exit criteria:
  - Multiple tickets are selected, the order summary reflects the correct subtotal, and the 'Continue to checkout' button is clicked.

### Checkout Flow and Validation

- Objective: Evaluate the checkout forms, countdown timer, and payment processing UI.
- Target pages: checkout.html
- Key checks:
  - Observe the 10-minute reservation countdown.
  - Fill out attendee forms, testing the 'Copy buyer info' feature for secondary tickets and 'Name for signed poster' for VIP.
  - Apply promo codes (DOORS5 / TONIGHT10) and verify the detailed fee breakdown updates.
  - Interact with payment methods and test card-number formatting.
  - Trigger the 'Cancel second-confirmation' flow.
- Exit criteria:
  - Forms are validated, promo codes applied, payment details entered, and the order is submitted.

### Confirmation

- Objective: Verify the final state of the booking process.
- Target pages: confirmation.html
- Key checks:
  - Ensure the confirmation page displays the correct event, ticket quantities, and final price.
  - Check for any next steps or return-to-home links.
- Exit criteria:
  - Confirmation page is loaded and reviewed.

### Mobile Responsive Check

- Objective: Re-run critical interactions on a mobile viewport to check for layout issues.
- Target pages: index.html, event.html, checkout.html
- Key checks:
  - Check header navigation tap targets on mobile.
  - Verify ticket stepper UI and sticky order summary behavior on event.html.
  - Ensure complex accordion forms on checkout.html are usable on small screens.
- Exit criteria:
  - Primary flow is completed on a mobile viewport without severe layout blockers.

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

