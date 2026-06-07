# UXAgent Exploration Plan

## Goal

Exhaustively explore and critique the UX of the Tablerose restaurant reservation platform, focusing on the end-to-end booking flow, search and filtering interactions, and responsive layout issues.

## Plan Summary

The exploration will follow the primary user journey from discovery on the homepage through search, restaurant selection, and the multi-step checkout flow to confirmation. It will then validate adjacent features like filtering, restaurant detail tabs, and post-booking actions. Finally, it will assess mobile responsiveness, paying special attention to the numerous small tap targets flagged in the prescan.

## Coverage Targets

- pages: `visit all 6 known HTML pages`
- features: `exercise all visible controls: search fields, filters, sort, tabs, booking widget, form inputs, payment methods, add-ons, and post-booking buttons`
- mobile: `repeat critical checks on mobile viewport, focusing on tap targets and form usability`

## Planned Phases

### Homepage Discovery & Search

- Objective: Validate the search entry points and homepage interactive elements.
- Target pages: index.html
- Key checks:
  - Interact with the 5-field search card (city autocomplete, party size, date, time).
  - Click quick-pill suggestions (Pasta, Sushi, etc.) and verify they navigate to restaurants.html with expected context.
  - Scroll to 'Reserved most this week' and 'Editor guides', clicking through to results.
  - Check navigation links (Discover, Cities, For restaurants, Help, My reservations, Sign in).
- Exit criteria:
  - Search form successfully filled and submitted.
  - At least two quick-pills clicked and navigation verified.
  - All major homepage sections scrolled into view and interacted with.

### Search Results & Filtering

- Objective: Validate the filtering, sorting, and selection interactions on the results page.
- Target pages: restaurants.html
- Key checks:
  - Apply combinations of Cuisine, Price, Neighborhood, and Features filters.
  - Use the 'Reset filters' control.
  - Change sorting options (Relevance, Rating, Price, Distance).
  - Click the 'Edit' button in the summary bar.
  - Select a time slot from a restaurant row to proceed to detail.
- Exit criteria:
  - Filters applied and cleared successfully.
  - Sort order changed and results updated.
  - Navigated to restaurant.html via a result row.

### Restaurant Detail & Booking Initiation

- Objective: Validate the detail page content, tabs, and booking widget.
- Target pages: restaurant.html
- Key checks:
  - Switch between Overview, Menu, Photos, and Reviews tabs.
  - Interact with the sticky booking card (change date, party size).
  - Verify disabled time slots (17:00, 21:30) are unclickable.
  - Select an active time slot to proceed to guest details.
  - Toggle the favorite heart icon.
- Exit criteria:
  - All tabs viewed and content verified.
  - Booking widget state changed and an active time slot selected.
  - Navigation to guest.html triggered.

### Checkout Flow & Form Validation

- Objective: Complete the multi-step booking flow, testing form inputs and payment options.
- Target pages: guest.html, payment.html
- Key checks:
  - Fill out guest details (name, phone, email) and test validation by submitting empty/invalid data.
  - Select dietary needs and occasion checkboxes.
  - Enter special request text and verify character count.
  - On payment page, switch between Card, Apple Pay, and Google Pay.
  - Select add-ons (cake, rose, prosecco) and verify price updates.
  - Complete the hold process.
- Exit criteria:
  - Guest form submitted successfully.
  - Payment method selected and add-ons toggled.
  - Navigation to confirmation.html triggered.

### Confirmation & Post-Booking

- Objective: Validate the confirmation screen and post-booking actions.
- Target pages: confirmation.html
- Key checks:
  - Verify booking details are displayed.
  - Click calendar add buttons (Apple, Google, Outlook).
  - Click 'Resend email'.
  - Click 'Modify' and 'Cancel' buttons.
  - Navigate back to discover via 'You might also like' or 'Back to discover'.
- Exit criteria:
  - All confirmation actions attempted.
  - Post-booking navigation links verified.

### Mobile Responsiveness Check

- Objective: Re-evaluate critical flows and tap targets on a mobile viewport.
- Target pages: index.html, restaurants.html, restaurant.html, guest.html
- Key checks:
  - Verify navigation and search form usability on mobile index.html.
  - Check filter rail behavior (collapse/expand) on restaurants.html.
  - Validate sticky booking card layout on restaurant.html.
  - Test form input scrolling and focus on guest.html.
  - Re-assess small tap targets identified in prescan (navigation, pills, filters).
- Exit criteria:
  - Key pages viewed in mobile viewport.
  - Critical interactions (search, filter, book form) completed on mobile.
  - Tap target issues documented with mobile context.

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

