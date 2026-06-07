# UXAgent Exploration Plan

## Goal

Explore and critique the UX of the OrbitRide booking system, focusing on the primary flow (search → routes → seats → payment → confirmation) and adjacent pages/states, including mobile responsiveness and error recovery.

## Plan Summary

Start at index.html, validate the search form and popular routes. Proceed to routes.html to test filters and trip selection. Then explore seats.html for seat selection, followed by payment, passengers, extras, and confirmation pages. Repeat critical steps in mobile viewport, checking for layout issues and small tap targets.

## Coverage Targets

- pages: `Visit all 8 known HTML pages (index, routes, seats, passengers, payment, confirmation, extras, and re-visit index for mobile).`
- features: `Exercise all visible controls: search form, popular routes, routes filters, trip selection, seat selection, passenger form, payment form, confirmation details, and extras (if present).`
- mobile: `Repeat critical checks (search, routes, seats, payment) in mobile viewport, focusing on tap targets, layout, and form usability.`

## Planned Phases

### Landing Page & Search

- Objective: Validate the index.html search form, popular routes, and header links. Check mobile tap targets.
- Target pages: index.html
- Key checks:
  - Interact with FROM, TO, DATE, PASSENGERS inputs and Find rides button.
  - Tap popular route cards (e.g., Cedar Plains → Falconer).
  - Check header links (OrbitRide, Routes, Help, Sign in) for responsiveness and tap target size on mobile.
  - Verify form validation (e.g., empty fields, invalid dates).
- Exit criteria:
  - Successfully interact with all search form elements.
  - Popular route cards are clickable and navigate to routes.html (or relevant page).
  - Header links have improved tap targets or are flagged for issues on mobile.

### Routes & Filters

- Objective: Test routes.html filters (time, price, amenities) and trip selection buttons. Validate layout and responsiveness.
- Target pages: routes.html
- Key checks:
  - Interact with departure time, max price, and amenities filters (Wi-Fi, Power outlet, etc.).
  - Tap 7-day date carousel (if present) to change dates.
  - Select trip rows via 'Select' buttons and verify navigation to seats.html (or next step).
  - Check filter state persistence and visual feedback (e.g., selected amenities, price slider).
  - Test mobile layout of filters and trip list for usability.
- Exit criteria:
  - All filters are interactive and provide visual feedback.
  - Trip 'Select' buttons navigate to the next page (seats.html).
  - Mobile layout of routes page is usable (filters accessible, trip list readable).

### Seat Selection

- Objective: Validate the seats.html SVG seat map, legend, selected list, and Continue button. Check mobile usability of the seat map.
- Target pages: seats.html
- Key checks:
  - Interact with seat map: select seats (matching passenger count), check occupied/selected/standard/priority states.
  - Verify legend on the right (occupied, selected, standard, priority) matches seat states.
  - Check selected seats list and price box for accuracy.
  - Tap Continue button to navigate to passengers.html (or next step).
  - Test mobile view of the SVG seat map (tap targets, zoom, and selection on small screens).
- Exit criteria:
  - Successfully select seats (matching passenger count) and see visual feedback (selected state).
  - Legend accurately represents seat states.
  - Continue button navigates to the next page (passengers.html).
  - Mobile seat selection is usable (tap targets, visibility of seat states).

### Passengers, Payment, Confirmation

- Objective: Validate the flow through passengers.html, payment.html, confirmation.html, and extras.html (if applicable). Check form usability and confirmation state.
- Target pages: passengers.html, payment.html, confirmation.html, extras.html
- Key checks:
  - Interact with passengers.html (e.g., add/remove passengers, enter details).
  - Proceed to payment.html and test payment form (card details, etc.) – note: simulate interactions, not real payments.
  - Verify confirmation.html shows trip details, price, and refund info.
  - Check extras.html (if present) for add-ons (e.g., luggage, insurance) and interaction.
  - Test mobile layout of these pages for form usability and readability.
- Exit criteria:
  - Successfully navigate through passengers → payment → confirmation pages with accurate state.
  - Extras.html (if present) has usable add-on interactions.
  - Mobile forms (passengers, payment) are usable with large tap targets and clear labels.

### Mobile Viewport Validation

- Objective: Repeat critical checks (search, routes, seats, payment) in mobile viewport. Focus on tap targets, layout, and usability.
- Target pages: index.html, routes.html, seats.html, passengers.html, payment.html
- Key checks:
  - Re-test search form, header links, and popular routes on mobile (small tap target fixes, if any).
  - Re-test routes.html filters and trip selection on mobile.
  - Re-test seats.html SVG seat map and selection on mobile (tap target size, visibility).
  - Re-test passengers.html and payment.html forms on mobile (tap targets, label visibility).
  - Verify all pages have responsive layouts with readable text and accessible controls.
- Exit criteria:
  - Critical interactions (search, routes, seats, payment) are usable on mobile.
  - Small tap target issues are documented or fixed (e.g., header links, buttons).
  - Mobile layouts of all key pages are readable and interactive.

## Prescan Summary

### OrbitRide — Same orbit, half the price

- Page: `index.html`
- Headings: Same orbit. Half the price., Wi-Fi onboard, USB-C at every seat, Free refund up to 24h, Popular routes
- Interactables: `1` buttons, `4` links, `4` inputs
- Notable controls:
  - clickable:a:OrbitRide
  - clickable:a:Routes
  - clickable:a:Help
  - clickable:a:Sign in
  - typeable:input:FROM
  - typeable:input:TO
  - typeable:input:DATE
  - selectable:select:PASSENGERS 1 2 3 4 5 6 7 8

### OrbitRide — Same orbit, half the price

- Page: `index.html`
- Headings: Same orbit. Half the price., Wi-Fi onboard, USB-C at every seat, Free refund up to 24h, Popular routes
- Interactables: `1` buttons, `4` links, `4` inputs
- Notable controls:
  - clickable:a:OrbitRide
  - clickable:a:Routes
  - clickable:a:Help
  - clickable:a:Sign in
  - typeable:input:FROM
  - typeable:input:TO
  - typeable:input:DATE
  - selectable:select:PASSENGERS 1 2 3 4 5 6 7 8

### OrbitRide — Same orbit, half the price

- Page: `index.html`
- Headings: Same orbit. Half the price., Wi-Fi onboard, USB-C at every seat, Free refund up to 24h, Popular routes
- Interactables: `1` buttons, `4` links, `4` inputs
- Notable controls:
  - clickable:a:OrbitRide
  - clickable:a:Routes
  - clickable:a:Help
  - clickable:a:Sign in
  - typeable:input:FROM
  - typeable:input:TO
  - typeable:input:DATE
  - selectable:select:PASSENGERS 1 2 3 4 5 6 7 8

### OrbitRide — Same orbit, half the price

- Page: `index.html`
- Headings: Same orbit. Half the price., Wi-Fi onboard, USB-C at every seat, Free refund up to 24h, Popular routes
- Interactables: `1` buttons, `4` links, `4` inputs
- Notable controls:
  - clickable:a:OrbitRide
  - clickable:a:Routes
  - clickable:a:Help
  - clickable:a:Sign in
  - typeable:input:FROM
  - typeable:input:TO
  - typeable:input:DATE
  - selectable:select:PASSENGERS 1 2 3 4 5 6 7 8

### OrbitRide — Same orbit, half the price

- Page: `index.html`
- Headings: Same orbit. Half the price., Wi-Fi onboard, USB-C at every seat, Free refund up to 24h, Popular routes
- Interactables: `1` buttons, `4` links, `4` inputs
- Notable controls:
  - clickable:a:OrbitRide
  - clickable:a:Routes
  - clickable:a:Help
  - clickable:a:Sign in
  - typeable:input:FROM
  - typeable:input:TO
  - typeable:input:DATE
  - selectable:select:PASSENGERS 1 2 3 4 5 6 7 8

### Routes — OrbitRide

- Page: `routes.html`
- Headings: FILTERS
- Interactables: `8` buttons, `1` links, `6` inputs
- Notable controls:
  - clickable:a:OrbitRide
  - selectable:select:Departure time Any time Morning (5-12) Afternoon (12-18) Evening (18-24)
  - clickable:input:Max price $120
  - clickable:input:Wi-Fi
  - clickable:input:Power outlet
  - clickable:input:Restroom
  - clickable:input:Express (≤1 stop)
  - clickable:button:Select

### OrbitRide — Same orbit, half the price

- Page: `index.html`
- Headings: Same orbit. Half the price., Wi-Fi onboard, USB-C at every seat, Free refund up to 24h, Popular routes
- Interactables: `1` buttons, `4` links, `4` inputs
- Notable controls:
  - clickable:a:OrbitRide
  - clickable:a:Routes
  - clickable:a:Help
  - clickable:a:Sign in
  - typeable:input:FROM
  - typeable:input:TO
  - typeable:input:DATE
  - selectable:select:PASSENGERS 1 2 3 4 5 6 7 8

