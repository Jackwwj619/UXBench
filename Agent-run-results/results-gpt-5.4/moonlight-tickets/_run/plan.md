# UXAgent Exploration Plan

## Goal

Explore the full MoonlightTickets booking journey end-to-end, starting from discovery on index.html through event selection, ticket configuration, checkout, cancellation/recovery, and confirmation, with added attention to pricing logic, ticket-dependent form behavior, and mobile usability.

## Plan Summary

The run should follow the real primary funnel: discover an event on index.html, open event.html, configure ticket quantities across tiers, continue into checkout.html, complete payment and promo interactions, and verify the resulting confirmation.html state. Adjacent exploration should cover discovery filters, related-event branching from the event page, cart collapse/expand, cancel flow with second confirmation, and ticket-type-specific attendee form behavior. Because this is a ticketing checkout site, deeper validation should focus on fee calculations, countdown and reservation messaging, quantity steppers, promo application, and mobile tap-target/compression risks already hinted at in the prescan.

## Coverage Targets

- pages: `Visit all 4 known HTML pages, with repeated passes on event.html and checkout.html for both happy-path and alternate states.`
- features: `Exercise most visible controls on key pages: all 4 homepage filters, multiple event links, ticket steppers for all 3 tiers, favorite/share, related events, cart collapse, attendee accordions, copy-buyer-info, e-delivery toggle, all 3 payment methods, card formatting, both promo codes, cancel confirmation, and final confirmation state.`
- mobile: `Repeat the full critical path and the highest-risk interactions on a mobile viewport, prioritizing top-nav taps, filters, icon buttons, steppers, sticky summary behavior, accordion forms, payment controls, and submit/cancel actions.`

## Planned Phases

### Discovery and filter behavior

- Objective: Validate that the homepage supports event discovery clearly and that visible filters and listing links behave predictably.
- Target pages: index.html
- Key checks:
  - Review the default state of the 'Tonight' hero cards and the 'This week' event grid.
  - Exercise each visible filter at least once: DATE, GENRE, VENUE, PRICE.
  - Check whether filter changes visibly alter listings and whether combinations produce sensible narrowing.
  - Open at least two event links from different sections ('Tonight' and 'This week') to confirm navigation into event.html.
  - Probe top navigation items with href '#' to confirm whether they scroll, do nothing, or create confusing dead interactions.
  - On mobile viewport, verify whether header links and filter controls remain tappable and readable.
- Exit criteria:
  - Observed whether filters meaningfully change listing content or state.
  - Confirmed navigation from homepage cards into event detail.
  - Captured evidence on homepage mobile usability, especially small tap targets and filter layout.

### Event detail and ticket selection

- Objective: Validate the event-detail template, ticket-tier interactions, and the handoff into checkout.
- Target pages: event.html
- Key checks:
  - Inspect event metadata, bio, audio clip controls, venue/GA sketch, accessibility notes, and related events for scanability and hierarchy.
  - Test favorite and share buttons for visible feedback and usability.
  - Use quantity steppers on Early Bird, Standard, and VIP to confirm increment/decrement behavior, zero state, and inventory messaging.
  - Include at least one run with mixed ticket types and one run with VIP selected to trigger ticket-dependent checkout behavior.
  - Verify that the sticky order summary updates immediately with ticket quantities and pricing preview.
  - Check whether 'Continue to checkout' is disabled or enabled appropriately before and after selecting tickets.
  - Open at least one related-event link to confirm branching works, then return to the main path.
- Exit criteria:
  - Confirmed order summary sync with ticket selections.
  - Observed at least one VIP-inclusive basket and one non-zero basket.
  - Successfully transitioned from event detail into checkout.

### Checkout form, fees, and promos

- Objective: Exercise the core purchase flow in checkout, with emphasis on attendee forms, payment UX, and pricing correctness.
- Target pages: checkout.html
- Key checks:
  - Inspect reservation countdown visibility and urgency messaging.
  - Expand and collapse the cart to confirm the cart remains understandable and editable.
  - Verify one attendee accordion exists per ticket in the basket.
  - Fill attendee fields for at least two tickets and test 'Copy buyer info' on a non-first ticket if present.
  - Confirm VIP-only field 'Name for signed poster' appears only for VIP attendees.
  - Toggle e-delivery and observe whether label/state is understandable.
  - Switch across the three payment methods and verify any visible state changes.
  - Enter card details to validate card-number formatting behavior.
  - Apply promo code DOORS5 and separately TONIGHT10, confirming discount feedback and recalculated totals.
  - Cross-check visible fee breakdown against expected structure: subtotal + service fee per ticket + facility fee per ticket + percentage + fixed processing - promo discount.
- Exit criteria:
  - Observed attendee-form behavior for multi-ticket checkout.
  - Validated at least one promo application path and fee recalculation.
  - Reached a state where checkout can be successfully submitted.

### Cancellation, recovery, and completion

- Objective: Validate non-happy-path controls around abandoning or completing checkout, and verify the final confirmation state.
- Target pages: checkout.html, confirmation.html
- Key checks:
  - Trigger the cancel action and inspect the second-confirmation step for clarity and reversibility.
  - Choose the safe recovery option to ensure users can back out of cancellation without losing progress unexpectedly.
  - Then complete the booking path and land on confirmation.html.
  - Verify confirmation content reflects a completed purchase coherently and does not leave residual countdown or checkout-state confusion.
  - Use browser back/navigation behavior once after confirmation to see whether the flow becomes confusing or stale.
- Exit criteria:
  - Confirmed both cancel-warning behavior and successful recovery.
  - Reached confirmation.html through the intended purchase path.
  - Captured whether post-purchase messaging clearly concludes the journey.

### Mobile regression on critical path

- Objective: Repeat the most important conversion steps on mobile to catch touch, layout, and sticky-panel issues.
- Target pages: index.html, event.html, checkout.html, confirmation.html
- Key checks:
  - Repeat homepage event selection and at least one filter interaction on mobile.
  - On event.html mobile, test quantity steppers, favorite/share buttons, and the visibility/placement of the order summary.
  - On checkout.html mobile, verify countdown readability, accordion usability, form field spacing, payment-method switching, promo entry, and submit/cancel controls.
  - Confirm that small tap target concerns seen in prescan are materially impactful on mobile navigation or icon/button use.
  - Complete or revisit confirmation.html on mobile to ensure final-state readability without clipped content.
- Exit criteria:
  - Critical booking path has been exercised on mobile from discovery through checkout or confirmation.
  - Documented concrete mobile-specific issues rather than only desktop findings.

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

