# UXAgent Exploration Plan

## Goal

Exhaustively explore and critique the UX of the full OrbitRide booking flow, including search, filtering, seat selection, passenger details, extras, payment, and confirmation, across both desktop and mobile viewports.

## Plan Summary

The exploration will follow the primary booking flow from landing page search through to final confirmation, validating each step's form inputs, interactive controls, and state transitions. It will then probe edge cases like validation errors, back-navigation, and filter combinations on the routes page. Finally, critical path interactions will be re-validated on a mobile viewport to assess responsiveness and tap-target sizing.

## Coverage Targets

- pages: `visit all 7 known HTML pages in the booking flow sequence`
- features: `exercise all visible filters, form inputs, SVG seat interactions, and navigation links`
- mobile: `repeat the search, route filtering, and seat selection flows on mobile viewport to verify layout warnings`

## Planned Phases

### Landing Page & Search Initiation

- Objective: Validate the search form, popular routes, and header navigation on the landing page.
- Target pages: index.html
- Key checks:
  - Verify autocomplete/datalist behavior for FROM and TO city inputs
  - Test passenger count selector (change to 2 passengers)
  - Select a future date in the DATE picker
  - Click 'Find rides' with empty fields to check validation
  - Click 'Popular routes' cards to verify they navigate to routes.html
  - Click header links (Routes, Help, Sign in) to check for dead ends
- Exit criteria:
  - Search form successfully submitted with valid data (e.g., Cedar Plains to Falconer, 2 passengers)
  - Validation behavior observed for empty inputs
  - Header links clicked and behavior recorded

### Route Selection & Filtering

- Objective: Exercise the trip results, date carousel, and left-hand filters on the routes page.
- Target pages: routes.html
- Key checks:
  - Interact with the 7-day date carousel at the top
  - Apply time-of-day filter (e.g., Morning)
  - Adjust the Max price slider and verify list updates
  - Toggle amenities checkboxes (Wi-Fi, Power outlet, Restroom, Express)
  - Observe 'seats left' warnings on specific trips
  - Click 'Select' on a trip to proceed to seat selection
- Exit criteria:
  - Filters applied and cleared successfully
  - A specific trip selected, transitioning to seats.html

### Seat Selection & Checkout Steps

- Objective: Complete the seat map interaction and advance through the remaining checkout forms.
- Target pages: seats.html, passengers.html, extras.html, payment.html
- Key checks:
  - Select exactly 2 seats on the SVG bus map matching the passenger count
  - Attempt to select an occupied seat to verify it is disabled
  - Verify priority vs. standard seat visual states and price updates
  - Fill out passenger details form with validation checks
  - Add/remove extras on extras.html
  - Enter payment details and submit
- Exit criteria:
  - Correct number of seats selected and continued
  - Passenger and payment forms filled and submitted
  - Arrival at confirmation.html

### Confirmation & Post-Booking

- Objective: Review the confirmation page and test any post-booking actions like 'Free refund up to 24h'.
- Target pages: confirmation.html
- Key checks:
  - Verify booking details match the selections made in previous steps
  - Check for any action buttons (e.g., Cancel/Refund, Download Ticket)
  - Click the OrbitRide logo to return to home
- Exit criteria:
  - Confirmation page fully reviewed
  - Return navigation to index.html executed

### Mobile Viewport Validation

- Objective: Re-run critical path interactions on a mobile viewport to identify responsive design issues.
- Target pages: index.html, routes.html, seats.html
- Key checks:
  - Check layout and tap-target sizes for header nav on index.html
  - Verify filter panel accessibility and layout on routes.html
  - Validate SVG seat map usability and touch interactions on seats.html
  - Ensure no horizontal overflow or clipped elements across pages
- Exit criteria:
  - Search initiated on mobile
  - Filters interacted with on mobile
  - Seats selected on mobile

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

