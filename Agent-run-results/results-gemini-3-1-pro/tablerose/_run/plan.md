# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the full tablerose system, prioritizing the primary checkout/booking flow plus adjacent pages, states, and recovery paths.

## Plan Summary

The exploration will start on the discovery page, testing the search widget and trending links to reach the results page. From there, it will drill into a specific restaurant to test the detail tabs and booking card. Finally, it will walk through the multi-step checkout flow (guest details, payment hold) to the confirmation page, checking form validations and interactive elements along the way.

## Coverage Targets

- pages: `Visit all 6 HTML files.`
- features: `Exercise search inputs, filters, detail tabs, and all form controls in the booking flow.`
- mobile: `Repeat the search and checkout flow on mobile to check responsive layouts.`

## Planned Phases

### Discovery & Search

- Objective: Validate the hero search widget and navigation to search results.
- Target pages: index.html
- Key checks:
  - Interact with WHERE, PARTY, DATE, and TIME inputs.
  - Click 'Find tables' to ensure transition to results.
  - Test quick-pill suggestions (e.g., 'Pasta', 'Sushi').
- Exit criteria:
  - Successfully navigated to restaurants.html via search or quick links.

### Results Filtering & Details

- Objective: Evaluate the results page filters and restaurant detail view.
- Target pages: restaurants.html, restaurant.html
- Key checks:
  - Toggle various filters (Cuisine, Price, Neighborhood) and Sort dropdown on restaurants.html.
  - Click a restaurant card or time slot to enter restaurant.html.
  - Switch between tabs (Overview, Menu, Photos, Reviews) on restaurant.html.
  - Interact with the right-side sticky booking card.
- Exit criteria:
  - Tabs on detail page exercised and a specific time slot selected to start booking.

### Guest Details Form

- Objective: Validate the first step of the checkout flow.
- Target pages: guest.html
- Key checks:
  - Fill out standard text inputs (Name, Phone, Email).
  - Select dietary needs and occasion (checkboxes/radios).
  - Test text area limits ('Special request').
  - Proceed to the next step.
- Exit criteria:
  - Form completed and navigated to payment.html.

### Payment & Confirmation

- Objective: Validate the payment form, add-ons, and success state.
- Target pages: payment.html, confirmation.html
- Key checks:
  - Switch payment methods (Card, Apple Pay).
  - Fill out card details and toggle add-ons (Cake, Rose), noting if totals update.
  - Submit the hold to reach confirmation.html.
  - Verify 'Modify' or 'Cancel' actions and calendar export buttons on confirmation.
- Exit criteria:
  - Reached confirmation.html and verified post-booking actions.

### Mobile Responsiveness

- Objective: Ensure core booking flow is usable on smaller viewports.
- Target pages: index.html, restaurant.html, payment.html
- Key checks:
  - Check how the search widget collapses on index.html.
  - Verify the sticky booking card behavior on restaurant.html (does it become a bottom sheet?).
  - Ensure form inputs on payment.html remain accessible.
- Exit criteria:
  - Critical path verified on mobile viewport without major layout breakage.

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

