# UXAgent Exploration Plan

## Goal

Explore and critique the primary hotel booking funnel from home search through Tokyo/Shinjuku listings, hotel detail, room selection, reservation, and confirmation, while also validating adjacent flows such as sign-in/register, help, trips management, and related business-line pages.

## Plan Summary

Start with the main stay-search path on index.html and drive into the Tokyo/Shinjuku listing pages to validate search, filters, sort/map entry points, and property navigation. Then follow at least one full property journey through hotel detail, reviews, room selection, reservation, and confirmation, checking that back links and cross-links to trips/help remain coherent. After the core funnel, sweep the adjacent pages and business-line pages to confirm secondary flows, and repeat critical interactions on mobile to surface tap-target and label issues already hinted by prescan warnings.

## Coverage Targets

- pages: `Visit all known HTML pages in the prescan, with full-depth coverage on the booking funnel pages and at least one interaction on each adjacent/business/support page.`
- features: `Exercise most visible controls on the core funnel pages: search fields, filters, sort/filter chips, property/detail links, reserve CTA, booking form fields, trip-management actions, and support/auth entry points.`
- mobile: `Repeat the homepage search, one listing filter or sort interaction, one hotel-detail reserve path, and the reservation form on mobile viewport, focusing on tap-targets and missing-label issues.`

## Planned Phases

### Home search and entry navigation

- Objective: Validate the start page search experience and the main entry points into the booking funnel and adjacent business areas.
- Target pages: index.html
- Key checks:
  - Enter or confirm Tokyo as the destination, inspect the check-in/check-out and guest fields, and use Search to reach tokyo.html.
  - Open at least one trending destination and one footer or header navigation item to confirm the global nav works.
  - Check that Sign in, Register, List your property, Flights, Car rentals, Attractions, and Airport taxis are reachable from the homepage.
- Exit criteria:
  - Search successfully navigates to a listing page.
  - At least two non-search nav links have been exercised.
  - No unexpected console or navigation errors appear from the home entry path.

### Listing pages and filter behavior

- Objective: Validate the Tokyo and Shinjuku result pages, including search criteria persistence, filter panels, sorting, and empty-state handling.
- Target pages: tokyo.html, shinjuku.html
- Key checks:
  - Inspect the visible filter groups on both pages: budget, popular filters, star rating, neighbourhood, property type, and review score.
  - Toggle a representative filter or sort option and verify the property list/state changes or the no-results message appears appropriately.
  - Use the property cards and location/breadcrumb links to open a hotel detail page.
  - Verify the show-on-map or map-related entry point if present without assuming a full map experience.
- Exit criteria:
  - Both listing pages are visited.
  - At least one filter/sort interaction has been tested on each or representative listing page.
  - A property card has been opened into the detail flow.

### Hotel detail and social proof

- Objective: Check property detail content, review surfaces, breadcrumb/back links, and reserve-related calls to action for the main hotel path.
- Target pages: hotel-detail.html, reviews.html, hotel-detail-granbell.html
- Key checks:
  - From Park Hyatt Tokyo, validate the property summary, location, review score, and 'Reserve' or equivalent CTA.
  - Open guest reviews and test sort/filter controls such as Most relevant, Most recent, and audience segments.
  - Visit the alternate hotel detail page for Shinjuku Granbell Hotel to compare structure and breadcrumb behavior.
  - Confirm cross-links from detail pages to home, Tokyo, Shinjuku, and reviews behave consistently.
- Exit criteria:
  - At least one hotel detail page and the reviews page are fully exercised.
  - The reserve/review-related path is confirmed navigable.
  - Breadcrumb or back navigation does not trap the user.

### Room selection and booking checkout

- Objective: Validate the core booking handoff from room selection to reservation details and the final confirmation state.
- Target pages: room-selection.html, reservation.html, confirmation.html
- Key checks:
  - Inspect the selected room, price summary, cancellation policy, and 'Continue to booking details' CTA on room-selection.html.
  - Complete or partially complete the reservation form, including name, email, country/region, phone, booking-for toggles, and special requests.
  - Check the arrival/payment/cancellation information blocks for clarity and consistency.
  - Confirm that confirmation.html shows booking status, booking reference, trip summary, and links to My trips / Manage your booking / Back to home.
- Exit criteria:
  - The flow reaches the confirmation page.
  - Booking reference and trip details are visible on confirmation.
  - Form fields and booking policy text have been checked for obvious usability issues.

### Post-booking management and support

- Objective: Validate account/trips/support recovery paths that surround the booking journey.
- Target pages: my-trips.html, help.html, signin.html, register.html
- Key checks:
  - Open My trips and test tabs or segment controls like Upcoming, Completed, and Cancelled.
  - Exercise booking actions such as View details, Cancel booking, Modify dates, Write a review, and Book again.
  - Use Help Center search plus Chat with us / Call us buttons to confirm support entry points.
  - Check Sign in and Register forms for field presence, submit buttons, and alternate login/sign-up methods.
- Exit criteria:
  - Trips management actions are reachable.
  - Help and auth entry points are verified.
  - No dead-end or broken recovery path is encountered.

### Adjacent business-line pages and mobile sanity pass

- Objective: Cover the non-stays pages and repeat critical interactions at mobile viewport to catch layout/tap-target regressions.
- Target pages: flights.html, car-rentals.html, attractions.html, airport-taxis.html, deals.html, list-property.html
- Key checks:
  - On each adjacent page, inspect the primary search form or promotion module and one representative CTA such as Search, Book, View deal, or Get started now.
  - Confirm header navigation consistency across these pages, especially Flights/Car rentals/Attractions/Airport taxis and Sign in.
  - Repeat the most important booking-flow checks on mobile viewport: homepage search, one listing page filter interaction, hotel reserve path, and reservation form usability.
  - Record whether the known small tap targets become materially problematic on mobile.
- Exit criteria:
  - All known HTML pages have been visited at least once.
  - Key adjacent pages each have at least one meaningful interaction tested.
  - Critical booking-path checks have been repeated in mobile viewport.

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

