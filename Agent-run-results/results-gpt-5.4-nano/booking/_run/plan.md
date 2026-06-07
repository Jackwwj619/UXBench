# UXAgent Exploration Plan

## Goal

Critique and validate the UX of the full Booking.com-style booking funnel (search → city list/filters → hotel detail → room selection → reservation details → confirmation) and verify key adjacent flows and recovery points across desktop and mobile.

## Plan Summary

Start from index.html, perform a hotel search, validate navigation into the Tokyo/Shinjuku list pages and their filter UX, then open a specific hotel detail and progress through room selection into reservation details and confirmation. In parallel, validate adjacent business-line entry points (flights, car rentals, attractions, airport taxis) plus supporting pages (deals, help, my-trips, register, signin) for consistency, discoverability, and critical error/empty states. Repeat the most failure-prone parts (search controls, filter selection, guest/details form, and final confirmation) on mobile viewport.

## Coverage Targets

- pages: `Visit all known HTML pages listed in the prescan (run should end having loaded every file in the site's html_files list).`
- features: `Exercise most visible controls per key page: index search inputs + Search; tokyo/shinjuku filter groups + sort + empty state; hotel-detail Reserve + back to results + reviews entry; room-selection Continue to booking details + change selection; reservation required form fields + special requests + policy comprehension; confirmation/manage trip navigation; help topics + chat/call buttons; and each business-line page’s primary search/booking CTA.`
- mobile: `Repeat critical checks on mobile viewport for: index.html search controls + Search; tokyo/shinjuku filter selection + empty state; hotel-detail Reserve; reservation form required-field completion; confirmation to my-trips navigation.`

## Planned Phases

### Homepage search & entry-point validation

- Objective: Validate the primary way users start the journey from index.html: search control clarity, button behavior, and discoverability of major categories and support links.
- Target pages: index.html
- Key checks:
  - Use the three top inputs: type/select a destination, adjust check-in/check-out dates, and change guest count; confirm the resulting Search action is enabled/works as expected.
  - Click Search and verify navigation to the expected list view (tokyo.html) without losing the chosen dates/guests conceptually.
  - Use header/category links visible on index.html (Flights, Car rentals, Attractions, Airport taxis, List your property, Register, Sign in) and confirm each routes to its corresponding HTML page.
- Exit criteria:
  - Successful search action demonstrates consistent state handoff (destination + dates + guests) to a city list page.
  - All visible header/category entry points from index.html reliably navigate to their mapped pages.

### City list filtering & map/sort affordances

- Objective: Validate the browsing experience on tokyo.html and shinjuku.html, focusing on filter comprehension, selection feedback, sorting, and empty-results handling.
- Target pages: tokyo.html, shinjuku.html
- Key checks:
  - On tokyo.html, interact with at least: budget filter, star rating, one popular filter (e.g., Free cancellation or No prepayment), and one neighbourhood/property-type filter; confirm the UI reflects selected state.
  - Verify sorting control behavior (e.g., change “Price (lowest first)” vs other visible sort modes) and that hotel cards update accordingly (even if mocked).
  - On both pages, check “Show on map” (if present via map entry/card) for basic navigation/behavior; ensure no dead-end interactions.
  - Trigger/validate the “No properties match your filters” empty state and ensure it provides a recovery path (e.g., reset/adjust filters) rather than a dead-end.
- Exit criteria:
  - At least one meaningful filter combination is applied and visibly reflected in results.
  - Empty state is reachable and recoverable with clear user guidance.
  - Sorting does not break layout or trap the user.

### Hotel detail → room selection progression

- Objective: Validate the user’s ability to understand hotel content and confidently proceed from hotel detail to selecting a room and booking details.
- Target pages: hotel-detail.html, hotel-detail-granbell.html, reviews.html
- Key checks:
  - From hotel-detail.html (Park Hyatt Tokyo), click “Reserve” and confirm navigation to room-selection.html (or equivalent step) while preserving dates/guest selection context.
  - Use “← Back to results” and verify it returns to the appropriate list context without losing the user’s filtered/browsing state conceptually.
  - Validate guest trust modules: location rating pill, review count link (e.g., 3,847 reviews) and navigation to reviews.html; confirm reviews filtering controls are usable (e.g., Most recent / Most relevant / Couples).
  - Repeat Reserve/CTA progression from hotel-detail-granbell.html to ensure multiple hotel details behave consistently.
- Exit criteria:
  - Reserve action leads forward to room selection with consistent trip summary.
  - Back navigation and review entry work without confusing jumps.

### Room selection summary & booking details entry

- Objective: Validate the critical step that confirms the user’s chosen room and then gathers required booking details accurately.
- Target pages: room-selection.html, reservation.html
- Key checks:
  - On room-selection.html, verify the selected room, dates (check-in/out), duration, and price summary (total + key tax/VAT/city tax lines) are readable and match the values shown in the funnel’s later confirmation.
  - Use “Change your selection” and confirm the user can return to the original selection without losing critical trip context.
  - On reservation.html, complete the required fields: first name, last name, email, country/region, phone number, and booking-for choice (main guest vs someone else).
  - Verify required-field guidance (“Almost done! Just fill in the * required info”) is clear and that missing inputs trigger sensible inline validation/disable behavior (or at least visually indicate requiredness).
  - Confirm understanding sections: payment schedule (“pay at the property / no prepayment”), cancellation policy comprehension, and “special requests” textarea placeholder/wording.
- Exit criteria:
  - A fully completed reservation submission action (or the next-step navigation) succeeds to confirmation.html.
  - Price and policy info remain consistent from room-selection through reservation.

### Confirmation, trip management, and support/recovery

- Objective: Validate end-of-flow clarity, post-booking navigation, and recovery/access to support and account-related pages.
- Target pages: confirmation.html, my-trips.html, help.html, signin.html, register.html
- Key checks:
  - On confirmation.html, verify confirmation number visibility, hotel/address and room details, cancellation/payment important info readability, and presence of a clear next action (e.g., Manage your booking / My trips).
  - Navigate to my-trips.html and validate each tab/state (Upcoming/Completed/Cancelled) and primary actions (View details, Cancel booking, Modify dates, Write a review, Book again) are reachable.
  - Use help.html “Popular topics” (cancel a booking, payment & refunds, change a booking, Genius, transport bookings) and verify topic links/CTAs are usable (chat/call buttons).
  - From header, validate signin.html and register.html navigation; ensure there is an obvious path for users returning to the booking funnel after sign-in (or at least no broken funnel links).
- Exit criteria:
  - Confirmation provides all essential booking details and a plausible path to trip management/support.
  - Help topics are discoverable and actionable.
  - Auth pages load cleanly and do not create navigation dead-ends.

### Adjacent business-line pages (consistency checks)

- Objective: Validate the alternative booking business lines for basic search/booking CTA behavior and consistent header navigation.
- Target pages: flights.html, car-rentals.html, attractions.html, airport-taxis.html, deals.html, list-property.html
- Key checks:
  - Flights: select trip type (Round trip/One way), use origin/destination/date/1 adult, click Search; validate results section presence.
  - Car rentals: use pick-up/drop-off and date inputs, click Search; validate the “View deal” CTA is present and leads to a plausible continuation.
  - Attractions: use the top search controls (destination/date range), click Search and confirm “Book now” CTAs exist for attractions.
  - Airport taxis: fill pick-up, drop-off, date/time, passengers; click Search; validate the list includes “Book” CTAs.
  - Deals: click “Sign in to unlock deals” and “View deal” entries; ensure they route without breaking layout.
  - List your property: click “Get started now” and validate informational sections and header navigation.
- Exit criteria:
  - Each adjacent page supports its primary input-to-CTA loop (Search/Book) without dead ends.
  - Header navigation between business lines remains consistent.

## Prescan Summary

### Booking.com | Official site | The best hotels, flights, car rentals & accommodations

- Page: `index.html`
- Headings: Find your next stay, Get instant discounts, Trending destinations, Browse by property type, Explore Japan
- Interactables: `1` buttons, `33` links, `3` inputs
- Notable controls:
  - clickable:a:Booking.com
  - clickable:a:Stays
  - clickable:a:Flights
  - clickable:a:Car rentals
  - clickable:a:Attractions
  - clickable:a:Airport taxis
  - clickable:button:JPY
  - clickable:a:List your property

### Airport Taxis - Booking.com

- Page: `airport-taxis.html`
- Headings: Book your airport taxi, Available transfers, Why book your airport taxi with us?
- Interactables: `6` buttons, `15` links, `4` inputs
- Notable controls:
  - clickable:a:Booking.com
  - clickable:a:Stays
  - clickable:a:Flights
  - clickable:a:Car rentals
  - clickable:a:Attractions
  - clickable:a:Airport taxis
  - clickable:button:JPY
  - clickable:a:Sign in

### Attractions in Tokyo - Booking.com

- Page: `attractions.html`
- Headings: Attractions, activities and experiences, Top attractions in Tokyo, Experiences & tours, More things to do
- Interactables: `5` buttons, `14` links, `2` inputs
- Notable controls:
  - clickable:a:Booking.com
  - clickable:a:Stays
  - clickable:a:Flights
  - clickable:a:Car rentals
  - clickable:a:Attractions
  - clickable:button:JPY
  - clickable:a:Sign in
  - typeable:input:Where are you going?

### Car Rentals - Booking.com

- Page: `car-rentals.html`
- Headings: Car rentals for any kind of trip, Popular car rental destinations in Japan, Available cars, Why rent with Booking.com?
- Interactables: `5` buttons, `14` links, `4` inputs
- Notable controls:
  - clickable:a:Booking.com
  - clickable:a:Stays
  - clickable:a:Flights
  - clickable:a:Car rentals
  - clickable:a:Attractions
  - clickable:button:JPY
  - clickable:a:Sign in
  - typeable:input:Pick-up location

### Booking Confirmed - Booking.com

- Page: `confirmation.html`
- Headings: Your booking is confirmed!, Park Hyatt Tokyo, Room details, Price breakdown, Important information, Complete your trip
- Interactables: `1` buttons, `21` links, `0` inputs
- Notable controls:
  - clickable:a:Booking.com
  - clickable:a:Stays
  - clickable:a:Flights
  - clickable:a:Car rentals
  - clickable:a:Attractions
  - clickable:button:JPY
  - clickable:a:My trips
  - clickable:a:Manage your booking

### Deals & Offers - Booking.com

- Page: `deals.html`
- Headings: Deals and offers, Unlock Genius discounts worldwide, Limited-time offers in Japan, Summer travel deals, Save 15% or more, Plan ahead and save, Flight + Hotel packages
- Interactables: `3` buttons, `18` links, `0` inputs
- Notable controls:
  - clickable:a:Booking.com
  - clickable:a:Stays
  - clickable:a:Flights
  - clickable:a:Car rentals
  - clickable:a:Attractions
  - clickable:button:JPY
  - clickable:a:Sign in
  - clickable:a:Sign in to unlock deals

### Flights - Booking.com

- Page: `flights.html`
- Headings: Compare and book flights with ease, Popular flights from Tokyo, Flight search results
- Interactables: `6` buttons, `14` links, `8` inputs
- Notable controls:
  - clickable:a:Booking.com
  - clickable:a:Stays
  - clickable:a:Flights
  - clickable:a:Car rentals
  - clickable:a:Attractions
  - clickable:button:JPY
  - clickable:a:Sign in
  - clickable:input:Round trip

### Customer Service - Booking.com

- Page: `help.html`
- Headings: Welcome to the Help Center, Popular topics, Frequently asked questions, Still need help?
- Interactables: `3` buttons, `20` links, `1` inputs
- Notable controls:
  - clickable:a:Booking.com
  - clickable:a:Stays
  - clickable:a:Flights
  - clickable:a:Car rentals
  - clickable:a:Attractions
  - clickable:a:Sign in
  - typeable:input:Describe your issue or search for help...
  - clickable:button:Search

### Shinjuku Granbell Hotel - Booking.com

- Page: `hotel-detail-granbell.html`
- Headings: Shinjuku Granbell Hotel, About Shinjuku Granbell Hotel, Most popular facilities, Guest reviews, Property highlights, Price for 3 nights, Availability
- Interactables: `1` buttons, `30` links, `3` inputs
- Notable controls:
  - clickable:a:Booking.com
  - clickable:a:Stays
  - clickable:a:Flights
  - clickable:a:Car rentals
  - clickable:a:Attractions
  - clickable:a:Airport taxis
  - clickable:button:JPY
  - clickable:a:List your property

### Park Hyatt Tokyo - Booking.com

- Page: `hotel-detail.html`
- Headings: Park Hyatt Tokyo, About Park Hyatt Tokyo, Most popular facilities, Guest reviews, Property highlights, Price for 3 nights, Availability
- Interactables: `1` buttons, `32` links, `4` inputs
- Notable controls:
  - clickable:a:Booking.com
  - clickable:a:Stays
  - clickable:a:Flights
  - clickable:a:Car rentals
  - clickable:a:Attractions
  - clickable:a:Airport taxis
  - clickable:button:JPY
  - clickable:a:List your property

### List Your Property - Booking.com

- Page: `list-property.html`
- Headings: List your property on Booking.com, Why list on Booking.com?, Reach a global audience, No upfront costs, Powerful tools, What can you list?, How it works, Create your listing, Set your prices, Start hosting
- Interactables: `0` buttons, `12` links, `0` inputs
- Notable controls:
  - clickable:a:Booking.com
  - clickable:a:Sign in
  - clickable:a:Get started now
  - clickable:a:List your property
  - clickable:a:Customer Service
  - clickable:a:Partner help
  - clickable:a:Genius loyalty program
  - clickable:a:Deals

### My Trips - Booking.com

- Page: `my-trips.html`
- Headings: My trips, Park Hyatt Tokyo, The Peninsula Tokyo, Saved properties
- Interactables: `8` buttons, `15` links, `0` inputs
- Notable controls:
  - clickable:a:Booking.com
  - clickable:a:Stays
  - clickable:a:Flights
  - clickable:a:Car rentals
  - clickable:a:Attractions
  - clickable:a:My trips
  - clickable:button:JPY
  - clickable:button:Upcoming

### Create Account - Booking.com

- Page: `register.html`
- Headings: Create your account
- Interactables: `4` buttons, `4` links, `3` inputs
- Notable controls:
  - clickable:a:Booking.com
  - clickable:button:Help
  - typeable:input:Enter your email address
  - typeable:input:Create a password (10+ characters)
  - typeable:input:Confirm your password
  - clickable:button:Create account
  - clickable:button:G Sign up with Google
  - clickable:button:f Sign up with Facebook

### Park Hyatt Tokyo - Complete Booking - Booking.com

- Page: `reservation.html`
- Headings: Enter your details, Who are you booking for?, Good to know, Special requests, Your arrival time, Your payment schedule, How much will it cost to cancel?, Your booking is protected by
- Interactables: `2` buttons, `15` links, `12` inputs
- Notable controls:
  - clickable:a:Booking.com
  - clickable:a:Stays
  - clickable:a:Flights
  - clickable:a:Car rentals
  - clickable:a:Attractions
  - clickable:a:Airport taxis
  - clickable:button:JPY
  - clickable:a:Sign in

### Park Hyatt Tokyo - Guest Reviews - Booking.com

- Page: `reviews.html`
- Headings: Guest reviews, All reviews (3,847)
- Interactables: `12` buttons, `17` links, `1` inputs
- Notable controls:
  - clickable:a:Booking.com
  - clickable:a:Stays
  - clickable:a:Flights
  - clickable:a:Car rentals
  - clickable:a:Attractions
  - clickable:button:JPY
  - clickable:a:Sign in
  - clickable:a:Home

### Park Hyatt Tokyo - Room Selection - Booking.com

- Page: `room-selection.html`
- Headings: Your selection, Your room, Price summary, Your booking is protected by
- Interactables: `1` buttons, `17` links, `0` inputs
- Notable controls:
  - clickable:a:Booking.com
  - clickable:a:Stays
  - clickable:a:Flights
  - clickable:a:Car rentals
  - clickable:a:Attractions
  - clickable:a:Airport taxis
  - clickable:button:JPY
  - clickable:a:Sign in

### Hotels in Shinjuku, Tokyo - Booking.com

- Page: `shinjuku.html`
- Headings: Your budget (per night), Popular filters, Star rating, Neighbourhood, Distance from Shinjuku Station, Review score, Shinjuku: 423 properties found, No properties match your filters
- Interactables: `8` buttons, `28` links, `27` inputs
- Notable controls:
  - clickable:a:Booking.com
  - clickable:a:Stays
  - clickable:a:Flights
  - clickable:a:Car rentals
  - clickable:a:Attractions
  - clickable:a:Airport taxis
  - clickable:button:JPY
  - clickable:a:List your property

### Sign in - Booking.com

- Page: `signin.html`
- Headings: Sign in or create an account
- Interactables: `5` buttons, `3` links, `1` inputs
- Notable controls:
  - clickable:a:Booking.com
  - clickable:button:Help
  - typeable:input:Enter your email address
  - clickable:button:Continue with email
  - clickable:button:G
  - clickable:button:f
  - clickable:button:
  - clickable:a:Terms & Conditions

### Hotels in Tokyo, Japan - Booking.com

- Page: `tokyo.html`
- Headings: Filter by:, Your budget (per night), Popular filters, Star rating, Neighbourhood, Property type, Review score, Tokyo: 6,842 properties found, No properties match your filters
- Interactables: `9` buttons, `29` links, `35` inputs
- Notable controls:
  - clickable:a:Booking.com
  - clickable:a:Stays
  - clickable:a:Flights
  - clickable:a:Car rentals
  - clickable:a:Attractions
  - clickable:a:Airport taxis
  - clickable:button:JPY
  - clickable:a:List your property

