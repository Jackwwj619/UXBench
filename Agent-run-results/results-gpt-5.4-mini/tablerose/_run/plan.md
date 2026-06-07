# UXAgent Exploration Plan

## Goal

Exhaustively validate Tablerose’s primary reservation discovery-to-booking flow, including search, results filtering/sorting, restaurant details, guest details, card-hold/payment, and confirmation/recovery paths in both desktop and mobile viewports.

## Plan Summary

Start on the discovery page and verify the main search entry points, quick-category shortcuts, and featured restaurant cards. Then move through results and a restaurant detail page to confirm that the search context, time-slot availability, tabs, favorite/save behavior, and booking entry points all connect cleanly into guest details, hold/payment, and confirmation. Repeat the critical booking path on mobile and pay close attention to small tap targets, missing labels, and any state mismatches across pages.

## Coverage Targets

- pages: `visit all known HTML pages`
- features: `exercise the main search card, at least two quick-pills, one featured restaurant card, 2-3 filters, one sort change, all restaurant detail tabs, save/favorite toggle, guest form fields, payment method controls, at least one add-on, and confirmation recovery actions`
- mobile: `repeat the primary search-to-confirmation path on mobile viewport, with extra attention to tap targets, sticky booking controls, and form entry on guest/payment pages`

## Planned Phases

### Discovery entry and search setup

- Objective: Validate the landing page’s primary search flow and alternative discovery shortcuts.
- Target pages: index.html
- Key checks:
  - Enter or confirm WHERE, PARTY, DATE, and TIME values in the search card and submit Find tables.
  - Click at least one quick-pill category and one featured restaurant card to confirm routing and state preservation.
  - Verify the hero claims and search affordances remain coherent after interaction.
- Exit criteria:
  - Search submission successfully reaches restaurants.html.
  - At least one quick-pill and one restaurant-card path have been exercised.
  - No blocking issues in the search card interactions.

### Results page filtering and sorting

- Objective: Validate the results list, context bar, filter rail, and sort behavior under the selected search context.
- Target pages: restaurants.html
- Key checks:
  - Check that the top reservation summary bar reflects the selected city, guest count, date, and time.
  - Exercise multiple filters across cuisine, price, neighborhood, and feature groups, then observe whether result count or visible cards change appropriately.
  - Change sort order at least once and confirm the list updates without losing the query context.
  - Open at least one restaurant from the results and verify the selected card/time-slot affordance routes correctly.
- Exit criteria:
  - At least one filter change and one sort change are validated.
  - A restaurant detail page is reached from the results list.
  - Search context remains understandable after results interactions.

### Restaurant detail and reservation entry

- Objective: Validate the restaurant detail page’s informational tabs, booking card, and save/favorite behavior.
- Target pages: restaurant.html
- Key checks:
  - Switch among Overview, Menu, Photos, and Reviews tabs and confirm the content changes.
  - Inspect the sticky booking card: party selector, date/time buttons, and any disabled time slots for Bella Suora.
  - Toggle the heart/save control and confirm visible state feedback.
  - Use a booking action that leads into the guest details flow.
- Exit criteria:
  - All four content tabs have been exercised at least once.
  - At least one available time slot is selected and the next step is reached.
  - Disabled-slot behavior is observed or confirmed where applicable.

### Guest details and hold/payment branch

- Objective: Validate the booking funnel’s data collection and the branch where a card hold becomes required.
- Target pages: guest.html, payment.html
- Key checks:
  - Fill the guest form with valid contact info and test optional fields such as dietary needs, occasion, and special request.
  - Proceed to the hold/payment step and verify the no-show policy, hold amount, and card authorization language.
  - Try at least one payment method switch if available (Card, Apple Pay, Google Pay) and validate required-field exposure.
  - Select one or more add-ons and confirm totals update or are clearly summarized.
- Exit criteria:
  - Guest form can advance without validation blocking on mandatory fields.
  - Payment/hold page is reachable and actionable.
  - At least one add-on and one payment-method interaction are validated.

### Confirmation, recovery, and post-booking actions

- Objective: Validate successful booking confirmation and the recovery actions available after booking.
- Target pages: confirmation.html
- Key checks:
  - Confirm the reservation details, booking code, and communication status shown on the success page.
  - Exercise Add to calendar, Resend email, Modify, and Cancel controls if they are interactive.
  - Verify the back-to-discover path returns to the discovery page with sensible continuity.
- Exit criteria:
  - A complete end-to-end reservation lands on confirmation.html.
  - At least two post-booking actions are tested.
  - Recovery/navigation back to discovery is confirmed.

### Mobile regression pass on critical booking steps

- Objective: Repeat the highest-risk interactions in a mobile viewport to assess tap-target sizing, layout stability, and form usability.
- Target pages: index.html, restaurants.html, restaurant.html, guest.html, payment.html, confirmation.html
- Key checks:
  - Run the index search card on mobile and verify the main controls are still usable despite small-tap-target warnings.
  - Repeat at least one filter/sort interaction on results and one tab switch on the restaurant page.
  - Validate the booking continuation from restaurant to guest to payment on mobile.
  - Check that confirmation actions remain accessible and the page does not truncate critical reservation info.
- Exit criteria:
  - Critical booking path is exercised on mobile through at least guest or payment step.
  - Mobile-specific tap-target or layout issues are noted with evidence.
  - No mobile-only blocker prevents completing the end-to-end flow.

## Prescan Summary

### Tablerose — find a table tonight

- Page: `index.html`
- Headings: Reserve dinner. No phone calls., Reserved most this week, Editor guides, Where to take a first date in Portland, Birthday dinners that won't ruin the budget, Quiet rooms for actual conversation, The best solo-dining counters, Search, Hold the table, Show up
- Interactables: `1` buttons, `23` links, `4` inputs
- Notable controls:
  - clickable:a:Tablerose
  - clickable:a:Discover
  - clickable:a:Cities
  - clickable:a:For restaurants
  - clickable:a:Help
  - clickable:a:My reservations
  - clickable:a:Sign in
  - typeable:input:WHERE

### Reserved! — Tablerose

- Page: `confirmation.html`
- Headings: You're booked., Add to calendar, Confirmation sent, Modify or cancel, Before you go, You might also like
- Interactables: `6` buttons, `3` links, `0` inputs
- Notable controls:
  - clickable:a:Tablerose
  - clickable:a:Help
  - clickable:button:Apple
  - clickable:button:Google
  - clickable:button:Outlook
  - clickable:button:Resend email
  - clickable:button:Modify
  - clickable:button:Cancel

### Guest details — Tablerose

- Page: `guest.html`
- Headings: Who's coming?, Your reservation
- Interactables: `1` buttons, `3` links, `18` inputs
- Notable controls:
  - clickable:a:Tablerose
  - clickable:a:Help
  - typeable:input:First name
  - typeable:input:Last name
  - typeable:input:Phone
  - typeable:input:Email
  - clickable:input:Vegetarian
  - clickable:input:Vegan

### Hold the table — Tablerose

- Page: `payment.html`
- Headings: Hold the table, Add anything?, Reservation
- Interactables: `1` buttons, `4` links, `10` inputs
- Notable controls:
  - clickable:a:Tablerose
  - clickable:a:Help
  - clickable:input:Card 💳
  - clickable:input:Apple Pay
  - clickable:input:Google Pay G
  - typeable:input:Card number
  - typeable:input:Expiry
  - typeable:input:CVC

### Restaurant — Tablerose

- Page: `restaurant.html`
- Headings: Bella Suora, What people are talking about, About, Highlights, Sample menu, To start, Pasta, From the oven, Make a reservation
- Interactables: `15` buttons, `8` links, `1` inputs
- Notable controls:
  - clickable:a:Tablerose
  - clickable:a:Discover
  - clickable:a:Cities
  - clickable:a:For restaurants
  - clickable:a:Help
  - clickable:a:My reservations
  - clickable:a:Sign in
  - clickable:button:Save

### Restaurants — Tablerose

- Page: `restaurants.html`
- Headings: FILTER, Bella Suora, Tonari, Field & Hearth, Lupinus & Roma, Old Pier Smokehouse, Saffron & Stone, Siam Floating Cart, Hot Numb Wok, Olivewood
- Interactables: `31` buttons, `7` links, `25` inputs
- Notable controls:
  - clickable:a:Tablerose
  - clickable:a:Discover
  - clickable:a:Cities
  - clickable:a:For restaurants
  - clickable:a:Help
  - clickable:a:My reservations
  - clickable:a:Sign in
  - clickable:button:Edit

