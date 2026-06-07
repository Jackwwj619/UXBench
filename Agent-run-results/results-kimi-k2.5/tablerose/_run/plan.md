# UXAgent Exploration Plan

## Goal

Critique the UX of the tablerose restaurant reservation system, focusing on the full booking flow (search → results → detail → guest → payment → confirmation) and adjacent discovery/exploration paths.

## Plan Summary

Explore the system in phases: start with the index page's search and discovery, then navigate to restaurants.html (results) and restaurant.html (detail) to test filtering and booking. Proceed through guest, payment, and confirmation pages, validating form flows, interactables, and mobile responsiveness. Check for error states, recovery paths, and consistent UX across pages.

## Coverage Targets

- pages: `Visit all 6 target pages (index, restaurants, restaurant, guest, payment, confirmation).`
- features: `Exercise all visible controls (forms, buttons, links, tabs, filters) on each key page.`
- mobile: `Repeat critical checks (search, booking, form flows) on mobile viewport, focusing on small_tap_target warnings.`

## Planned Phases

### Index Page & Discovery

- Objective: Validate the index page's search functionality, discovery paths, and mobile usability.
- Target pages: index.html
- Key checks:
  - Interact with the search form (WHERE, PARTY, DATE, TIME) and click 'Find tables →'.
  - Test quick-pill suggestions (e.g., '🍝 Pasta · 6 nearby') and 'See all in Portland →'.
  - Check mobile viewport for small_tap_target warnings (header links, quick pills).
  - Verify 'Editor guides' and 'how it works' sections are navigable (if links exist).
- Exit criteria:
  - Successfully navigate to restaurants.html via search or quick pill; mobile viewport checks complete.

### Restaurants Results (restaurants.html)

- Objective: Validate filtering, sorting, and result list interactions.
- Target pages: restaurants.html
- Key checks:
  - Test filter rail (cuisines, price, neighborhoods, features) and 'Reset filters'.
  - Interact with the sort dropdown (relevance, rating, price, distance).
  - Check result list time slots (highlighted/muted availability, disabled slots).
  - Click a restaurant (e.g., 'Bella Suora') to navigate to restaurant.html.
- Exit criteria:
  - Filter/sort functionality works; successfully navigate to restaurant.html from a result.

### Restaurant Detail (restaurant.html)

- Objective: Validate booking card, tabs, and detail page interactions.
- Target pages: restaurant.html
- Key checks:
  - Interact with the booking card (party size, time slots — check disabled slots like 17:00/21:30 for Bella Suora).
  - Test tabs (Overview, Menu, Photos, Reviews) for content switching.
  - Check 'favorite heart toggle' (if present) and SVG mini-map (if interactive).
  - Proceed to 'guest.html' by selecting a valid time slot and party size.
- Exit criteria:
  - Booking card interactions work; successfully navigate to guest.html.

### Guest & Payment Flows

- Objective: Validate guest details, payment, and add-on functionality.
- Target pages: guest.html, payment.html
- Key checks:
  - Complete guest details form (name, phone, email, dietary needs, special request, occasion).
  - Proceed to payment.html and test payment methods (Card, Apple Pay, Google Pay) and add-ons (e.g., '🎂 Have the kitchen plate a slice of cake').
  - Check form validation (e.g., required fields, CVC format) and 'Hold the table' button behavior.
  - Verify reservation details persist from restaurant.html to guest.html to payment.html.
- Exit criteria:
  - Successfully navigate to confirmation.html after 'Hold the table'.

### Confirmation & Recovery

- Objective: Validate confirmation page, recovery paths, and mobile responsiveness.
- Target pages: confirmation.html
- Key checks:
  - Verify reservation details (restaurant, date, time, party) are correct.
  - Test 'Modify' and 'Cancel' buttons (check recovery paths to earlier pages).
  - Check 'Add to calendar' (Apple, Google, Outlook) and 'Resend email' functionality.
  - Validate 'You might also like' suggestions and '← Back to discover' link.
  - Recheck mobile viewport for small_tap_target warnings on confirmation page buttons.
- Exit criteria:
  - Recovery paths (modify/cancel) work; mobile checks complete; all confirmation page interactables are validated.

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

