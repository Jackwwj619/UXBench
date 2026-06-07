# UXAgent Exploration Plan

## Goal

Execute an exhaustive UX exploration of the Booking.com clone, focusing on the end-to-end hotel booking funnel (Search → List → Detail → Room → Checkout → Confirmation) while validating adjacent business lines and mobile responsiveness.

## Plan Summary

The run will proceed through a primary 'Happy Path' booking flow for the Park Hyatt Tokyo to validate the core checkout logic. It will then branch into secondary flows including filtering on list pages, exploring alternative business lines (Flights/Car Rentals), and verifying account management pages. Finally, it will repeat critical path checks on a mobile viewport to address the high volume of small tap targets identified in the prescan.

## Coverage Targets

- pages: `Visit all 19 known HTML files.`
- features: `Exercise search, filtering, sorting, form submission, and tab switching.`
- mobile: `Repeat Phase 1 and Phase 2 key interactions on mobile viewport.`

## Planned Phases

### Primary Booking Funnel (Happy Path)

- Objective: Validate the core user journey from home page search to booking confirmation.
- Target pages: index.html, tokyo.html, hotel-detail.html, room-selection.html, reservation.html, confirmation.html
- Key checks:
  - Verify search bar inputs (destination, dates, guests) on index.html.
  - Navigate to Tokyo list page and select 'Park Hyatt Tokyo'.
  - Validate hotel details, amenities, and review scores on hotel-detail.html.
  - Select 'Deluxe King Room' and verify price summary on room-selection.html.
  - Fill out guest details form on reservation.html (test required field validation if possible).
  - Confirm successful landing on confirmation.html with correct booking reference.
- Exit criteria:
  - Successfully reached confirmation.html.
  - No broken links or console errors during the flow.
  - Price consistency maintained from room selection to confirmation.

### Listing & Filtering Exploration

- Objective: Test discovery mechanisms, sorting, and filtering capabilities.
- Target pages: tokyo.html, shinjuku.html, hotel-detail-granbell.html
- Key checks:
  - Apply filters (Price, Star Rating, Free Cancellation) on tokyo.html.
  - Navigate to Shinjuku specific list via breadcrumb or link.
  - Sort results by 'Price (lowest first)' and 'Review score'.
  - Enter 'Shinjuku Granbell Hotel' detail page to compare layout with Park Hyatt.
  - Test 'Back to results' navigation functionality.
- Exit criteria:
  - Filters visually update the list (or simulate update).
  - Sorting changes order of hotel cards.
  - Alternative hotel detail page loads correctly.

### Adjacent Business Lines

- Objective: Ensure consistency and basic functionality of non-hotel verticals.
- Target pages: flights.html, car-rentals.html, attractions.html, airport-taxis.html
- Key checks:
  - Navigate to Flights: Check trip type toggles (Round/One-way) and search inputs.
  - Navigate to Car Rentals: Verify pick-up/drop-off date inputs and location search.
  - Navigate to Attractions: Browse category cards and detail views.
  - Navigate to Airport Taxis: Verify transfer search form.
  - Check global header consistency across these pages.
- Exit criteria:
  - All business line landing pages load without error.
  - Search forms are present and interactable.
  - Navigation back to Home/Stays works correctly.

### Account & Support Systems

- Objective: Validate user account entry points and support resources.
- Target pages: signin.html, register.html, my-trips.html, help.html, deals.html
- Key checks:
  - Inspect Sign In/Register forms for layout and social login options.
  - View 'My Trips' to check upcoming/completed/cancelled tab switching.
  - Browse Help Center topics and FAQ accordions.
  - Check Deals page for Genius loyalty program visibility.
  - Verify footer links (Privacy, Terms) are accessible.
- Exit criteria:
  - Auth pages render correctly.
  - My Trips tabs switch content visibly.
  - Help center search and topics are accessible.

### Mobile Responsiveness & Accessibility Audit

- Objective: Re-test critical paths on mobile viewport to address prescan warnings.
- Target pages: index.html, tokyo.html, reservation.html
- Key checks:
  - Switch to mobile viewport (e.g., iPhone SE/Pixel 5).
  - Re-run Phase 1 search flow: Check for overlapping elements or hidden inputs.
  - Test filter sidebar on tokyo.html: Ensure it opens/closes correctly and is usable.
  - Verify tap targets on reservation.html: Are inputs large enough? Is the keyboard triggering correctly?
  - Check hamburger menu or mobile nav behavior if present.
- Exit criteria:
  - Core booking flow is completable on mobile.
  - Document any UI breakage or unusable controls due to screen size.
  - Verify if small tap target warnings persist in visual inspection.

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

