# UXAgent Exploration Plan

## Goal

Explore the end-to-end ticket discovery → event detail → checkout booking flow, with emphasis on interactive pricing/quantity controls, attendee/payment validation, reservation timer behavior, and recovery/cancel paths across desktop and mobile.

## Plan Summary

Start on the discovery page and validate the main ways a user can find an event: featured cards, this-week grid, and the visible filter selects. Then move through at least one full booking path from an event detail page into checkout, exercising quantity steppers, share/favorite, fee previews, attendee forms, payment methods, promo codes, and cancel/confirmation states. Repeat the critical path on mobile viewport to verify tap targets, sticky/order-summary behavior, and any responsive breakpoints; also sample enough adjacent event pages to confirm the shared template and related-event navigation.

## Coverage Targets

- pages: `Visit all known HTML pages, with full-path focus on index.html, event.html, checkout.html, and at least one pass to confirmation.html.`
- features: `Exercise most visible controls on the key pages: discovery filters and nav, event tier steppers and media/share/favorite actions, checkout accordions/payment methods/promo/cancel, and confirmation completion state.`
- mobile: `Repeat the primary discovery and booking flow in a mobile viewport, explicitly checking tap-target usability, fixed/sticky elements, and form interaction reliability.`

## Planned Phases

### Discovery and browse validation

- Objective: Validate the home page browsing experience and ensure the main event entry points are discoverable through both featured cards and the this-week grid.
- Target pages: index.html
- Key checks:
  - Open the Tonight and This Week areas and confirm the four featured cards and the 12-event grid are present and clickable.
  - Change each visible filter select at least once, especially DATE and GENRE, and observe whether the event list updates or remains stable in an expected way.
  - Check that the top navigation items are present and that the highlighted active state remains consistent when interacting with the page.
  - Choose at least two different events from the featured and grid sections to confirm event detail routing works from multiple entry points.
- Exit criteria:
  - At least two event links have been followed successfully from index.html.
  - Each visible filter control has been exercised at least once.
  - No broken navigation or obvious state loss is observed on the discovery page.

### Event detail deep dive

- Objective: Validate the event detail template, ticket selection controls, media-related actions, and related-event navigation before checkout.
- Target pages: event.html
- Key checks:
  - Inspect the event header details (title, time, venue, doors) and verify the page loads a consistent event-specific state.
  - Exercise the favorite and share buttons, then verify they respond without disrupting the page.
  - Use the audio clip controls and confirm they are individually actionable and visually understandable.
  - Adjust each ticket tier stepper, with special attention to VIP availability and the 'SELLING FAST' badge behavior.
  - Confirm the sticky order summary/fee preview updates with quantity changes and remains visible as expected.
  - Follow at least one related event link to validate adjacent-event navigation and template reuse.
- Exit criteria:
  - At least one ticket tier has been incremented/decremented successfully.
  - The checkout entry point is reachable from the selected event state.
  - Related-event navigation has been sampled and returns a valid event page.

### Primary checkout path and pricing integrity

- Objective: Validate the booking handoff into checkout and verify that reservation state, cart summary, and pricing math remain coherent.
- Target pages: checkout.html
- Key checks:
  - Enter checkout from a non-trivial cart state so the page reflects quantity and tier selection from event.html.
  - Observe the 10-minute reservation countdown, including behavior when approaching the sub-1-minute red pulse state if timing allows.
  - Expand/collapse the cart and confirm the detailed fee breakdown matches the selected quantity and ticket type.
  - Apply both promo codes (DOORS5 and TONIGHT10) if the UI permits, and verify discount presentation and total recalculation.
  - Confirm the cancel flow requires the second confirmation and does not immediately abandon the order.
- Exit criteria:
  - Checkout loads with the selected ticket count intact.
  - At least one fee or promo change is reflected in totals.
  - Cancel requires a confirm step and is not a single accidental click away.

### Attendee, payment, and validation coverage

- Objective: Exercise the form-heavy parts of checkout, including per-ticket attendee sections, copy-buyer behavior, payment methods, and field formatting.
- Target pages: checkout.html
- Key checks:
  - Open each attendee accordion for multiple tickets and verify the first ticket, subsequent ticket, and VIP-specific fields appear as described.
  - Use the Copy buyer info control for non-first tickets and confirm it populates or at least mirrors expected data.
  - Toggle between all three payment methods and validate the visible field sets change appropriately.
  - Check card-number formatting behavior and any inline validation or error handling that appears when fields are incomplete.
- Exit criteria:
  - All attendee sections relevant to the current quantity have been opened at least once.
  - Each payment method has been selected and inspected.
  - At least one formatted/validated payment field behavior has been observed.

### Completion, recovery, and confirmation

- Objective: Drive the flow to a final outcome and check the post-purchase or exit states for coherence and recoverability.
- Target pages: confirmation.html, checkout.html
- Key checks:
  - Complete the purchase or submit the booking flow to reach confirmation.html.
  - Verify the confirmation state reflects the selected event, ticket count, and any promo or fee changes.
  - If completion is blocked, use the cancel/recovery path and confirm the user lands in a sensible state without losing all context unexpectedly.
  - Check whether confirmation provides a clear next step back to discovery or ticket details.
- Exit criteria:
  - confirmation.html is reached at least once, or the run records why completion is blocked.
  - A recovery path from checkout has been exercised.
  - Post-purchase messaging or navigation is understandable.

### Mobile responsive verification

- Objective: Repeat the critical discovery, event selection, and checkout checks under mobile viewport conditions to catch tap-target and layout issues.
- Target pages: index.html, event.html, checkout.html
- Key checks:
  - Recheck the small top-nav tap targets on index.html and confirm primary browsing actions remain usable on mobile.
  - Verify event cards, ticket steppers, and sticky order summary remain accessible without overlap or hidden content on small screens.
  - Repeat one checkout pass far enough to inspect countdown visibility, accordion access, and payment-method switching on mobile.
  - Note any scrolling friction, fixed-position collisions, or target-size issues affecting the booking flow.
- Exit criteria:
  - The core discovery → event → checkout path has been sampled on mobile viewport.
  - Any major mobile-only layout or interaction regressions are recorded.
  - The previously flagged small tap targets have been explicitly rechecked.

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

