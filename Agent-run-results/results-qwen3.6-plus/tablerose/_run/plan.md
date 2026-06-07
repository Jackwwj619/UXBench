# UXAgent Exploration Plan

## Goal

Execute a comprehensive UX audit of the Tablerose reservation flow, validating the end-to-end booking journey from discovery to confirmation, while identifying usability friction points and mobile responsiveness issues.

## Plan Summary

The run will simulate a user booking a table at 'Bella Suora' for a party of 2. It begins with search validation on the homepage, moves through filtering and selection on the results page, inspects details on the restaurant page, and completes the multi-step checkout (Guest Info -> Payment -> Confirmation). Finally, it will repeat critical path checks on a mobile viewport to address known tap-target risks.

## Coverage Targets

- pages: `100% of HTML files visited`
- features: `All form inputs, dropdowns, and filter checkboxes exercised at least once`
- mobile: `Primary booking flow repeated on iPhone SE/12 viewport`

## Planned Phases

### Discovery & Search Validation

- Objective: Validate the entry point, search widget functionality, and quick-link navigation.
- Target pages: index.html
- Key checks:
  - Verify 'Find tables' button triggers navigation to results.
  - Test 'Party' dropdown including edge case '9+ (request)'.
  - Click 'Pasta' quick pill to verify filtered results load.
  - Check layout stability of the hero section.
- Exit criteria:
  - Successfully navigated to restaurants.html via both main search and quick pills.

### Results & Filtering

- Objective: Assess the usability of the filter rail and result cards.
- Target pages: restaurants.html
- Key checks:
  - Apply multiple filters (e.g., Italian + $$$) and observe list updates.
  - Test 'Sort' dropdown functionality.
  - Verify 'Edit' link in the top summary bar returns to search state.
  - Select 'Bella Suora' from the list.
- Exit criteria:
  - Filters applied successfully; navigated to restaurant.html.

### Restaurant Detail Inspection

- Objective: Evaluate information architecture and the sticky booking widget.
- Target pages: restaurant.html
- Key checks:
  - Toggle tabs: Overview, Menu, Photos, Reviews.
  - Interact with the sticky booking card: change date/party size.
  - Attempt to select a disabled time slot (e.g., 17:00 or 21:30) to check error handling.
  - Click 'Favorite' heart toggle.
- Exit criteria:
  - All tabs viewed; valid time slot selected; navigated to guest.html.

### Checkout Flow Execution

- Objective: Complete the reservation transaction and validate form UX.
- Target pages: guest.html, payment.html, confirmation.html
- Key checks:
  - Fill Guest Details: Test dietary restriction checkboxes and special request char limit.
  - Payment Page: Select an add-on (e.g., Cake +$8) and verify total updates.
  - Submit 'Hold the table' and verify transition to Confirmation.
  - On Confirmation: Check 'Add to calendar' buttons and 'Modify/Cancel' links.
- Exit criteria:
  - Full booking completed; confirmation details visible.

### Mobile Responsiveness Audit

- Objective: Re-validate critical flows on mobile viewport to catch layout breaks.
- Target pages: index.html, restaurants.html, restaurant.html
- Key checks:
  - Check header nav collapse/hamburger menu behavior.
  - Verify filter rail on results page becomes a modal or drawer.
  - Ensure sticky booking card on detail page does not obscure content.
  - Measure tap targets for 'Sign In' and 'Discover' against 44px standard.
- Exit criteria:
  - Critical mobile usability issues documented.

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

