# UXAgent Exploration Plan

## Goal

Explore and critique the UX of the moonlight-tickets system, focusing on the checkout/booking flow, adjacent pages, states, and recovery paths.

## Plan Summary

The exploration will proceed in phases: starting with the discovery page (index.html) to understand filtering and event selection, then moving to event details (event.html) to explore ticket options, followed by the checkout process (checkout.html) to validate form flows and fee breakdowns, and finally confirming the booking (confirmation.html) and checking recovery paths. Mobile viewport checks will be included for critical interactions.

## Coverage Targets

- pages: `Visit all known HTML pages (index.html, event.html, checkout.html, confirmation.html).`
- features: `Exercise most visible controls (filters, ticket steppers, attendee forms, promo codes, recovery buttons) per key page.`
- mobile: `Repeat critical checks (filters, ticket selection, checkout forms) on mobile viewport.`

## Planned Phases

### Discovery Page (index.html)

- Objective: Validate filtering and event selection UX.
- Target pages: index.html
- Key checks:
  - Interact with date, genre, venue, and price filters to see if they update event lists.
  - Click on a 'Tonight' event card (e.g., 'Sea Glass Sextet') to navigate to event.html.
  - Check mobile viewport for filter and card tap targets (small tap target warnings noted).
- Exit criteria:
  - All filters interacted with, at least one event card clicked, mobile viewport checks completed.

### Event Detail (event.html)

- Objective: Explore ticket tiers, favorites, sharing, and related events.
- Target pages: event.html
- Key checks:
  - Interact with ticket steppers (increase/decrease) for each tier.
  - Click 'favorite' and 'share' buttons to check functionality.
  - Explore related events section to see navigation.
  - Check mobile viewport for ticket stepper and button tap targets.
- Exit criteria:
  - All ticket tiers interacted with, favorite/share buttons checked, related events explored, mobile viewport checks completed.

### Checkout Flow (checkout.html)

- Objective: Validate checkout form, fee breakdown, and promo codes.
- Target pages: checkout.html
- Key checks:
  - Interact with attendee forms (accordion, copy buyer info, VIP fields).
  - Test promo codes (DOORS5 / TONIGHT10) to check discount application.
  - Validate payment method selection and card number formatting.
  - Check mobile viewport for form fields and promo code input.
- Exit criteria:
  - Attendee forms completed, promo codes tested, payment methods explored, mobile viewport checks completed.

### Booking Confirmation (confirmation.html)

- Objective: Validate booking confirmation and recovery paths.
- Target pages: confirmation.html
- Key checks:
  - Check confirmation details (event, tickets, fees).
  - Click 'Cancel' (if available) to test recovery path to checkout or event page.
  - Check mobile viewport for confirmation message and recovery buttons.
- Exit criteria:
  - Confirmation details reviewed, recovery path tested, mobile viewport checks completed.

### Mobile Viewport Checks (All Pages)

- Objective: Repeat critical interactions in mobile viewport.
- Target pages: index.html, event.html, checkout.html, confirmation.html
- Key checks:
  - Re-interact with filters, event cards, ticket steppers, and checkout forms in mobile viewport.
  - Verify tap target sizes and responsiveness for small targets (noted in prescan).
- Exit criteria:
  - Critical interactions repeated in mobile viewport, tap target issues validated.

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

