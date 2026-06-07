# UXAgent Exploration Plan

## Goal

Explore and critique the Booking.com-style booking experience end to end, with deepest coverage on the hotel booking funnel from home/search through confirmation, while also sampling adjacent travel products, account/support pages, and post-booking management states on desktop and mobile.

## Plan Summary

Start by validating the primary hotel funnel that the prescan clearly exposes: index.html → tokyo/shinjuku results → hotel detail → room selection → reservation → confirmation. Then expand into nearby decision and recovery paths such as reviews, my trips, help, sign-in/register, and the secondary business lines surfaced in the global nav. Because several pages show dense filters, many small tap targets, and some missing input labels, prioritize interaction clarity, state persistence, and mobile usability on search/listing and booking form pages.

## Coverage Targets

- pages: `Visit all 19 known HTML pages, with deepest interaction coverage on index.html, tokyo.html, shinjuku.html, hotel-detail.html, room-selection.html, reservation.html, confirmation.html, my-trips.html, and help.html.`
- features: `Exercise most visible controls on key pages: homepage search, listing filters/sort/map entry, property reserve/reviews links, room-selection onward CTA, reservation form fields/radios/textarea, confirmation next steps, my-trips tabs/actions, help search/topics, sign-in/register forms, and the primary search/booking controls on each secondary product page.`
- mobile: `Repeat critical checks on mobile viewport for the main hotel funnel (index → results → hotel detail → reservation → confirmation) plus my-trips and one secondary product page, with emphasis on navigation collapse/clarity, tap target adequacy, dense filter interaction, and form readability.`

## Planned Phases

### Primary hotel discovery and search entry

- Objective: Validate how a user starts a stay search from the homepage and reaches browseable hotel results, including alternative discovery links.
- Target pages: index.html, tokyo.html, shinjuku.html
- Key checks:
  - Use the home search inputs as presented and activate Search to confirm expected routing into results
  - Compare entry via homepage Search versus Tokyo destination cards/links to see whether the same results context is reached
  - Inspect search-field defaults and whether destination/date/guest context is visible and understandable on results pages
  - Exercise at least several Tokyo/Shinjuku filters and a sort option to check discoverability, feedback, and whether results/empty-state messaging stays coherent
  - If possible, trigger or inspect the visible 'No properties match your filters' state and assess recoverability/reset options
  - Check map entry visibility and usefulness as surfaced in the list pages
- Exit criteria:
  - A repeatable path from index.html to hotel results is confirmed
  - At least one listing page filter interaction and one sort interaction have been exercised
  - Evidence is gathered on whether search context and result counts remain understandable after changes

### Property evaluation and selection

- Objective: Assess how effectively listing pages support comparison and how hotel detail/reviews pages help users decide before booking.
- Target pages: tokyo.html, shinjuku.html, hotel-detail.html, hotel-detail-granbell.html, reviews.html
- Key checks:
  - Open at least two property details from results, including Park Hyatt Tokyo and Shinjuku Granbell Hotel, to compare consistency of layout and CTA prominence
  - Validate breadcrumb/back-to-results behavior and whether users can easily return to browsing without losing context
  - Check that core decision info is easy to find: location score, review count, facilities, highlights, pricing for 3 nights, and availability area
  - Enter or inspect guest reviews from the property flow and exercise review sorting and traveler-type filters
  - Look for mismatches between listing-card promises and property-detail specifics such as free cancellation, breakfast, and pricing framing
- Exit criteria:
  - Two hotel detail pages have been inspected and compared
  - At least one route into reviews.html has been exercised
  - Booking-decision information hierarchy and any inconsistencies between list/detail/reviews have been documented

### Checkout and confirmation funnel

- Objective: Walk the main reservation funnel end to end and validate continuity, clarity, and trust signals from room choice through confirmation.
- Target pages: hotel-detail.html, room-selection.html, reservation.html, confirmation.html
- Key checks:
  - Use the property reserve/availability path to enter room-selection.html and confirm room/date/guest details carry forward
  - Validate price summary structure across room selection, reservation, and confirmation, including taxes, city tax, cancellation timing, and payment timing
  - Complete reservation form interactions using visible fields: first name, last name, email, country/region, phone, booking-for-self/other, and special requests
  - Check required-field signaling, label clarity, placeholder dependence, and whether form sections like arrival time/payment schedule/cancellation are understandable
  - Proceed to confirmation and verify booking reference, property details, dates, room details, and reassurance content are complete and internally consistent
  - Assess whether cross-sell links on confirmation support the user without overwhelming the completed-booking state
- Exit criteria:
  - A full path from hotel detail to confirmation is completed
  - Continuity of selected room, price, and policy information across all checkout pages is verified
  - At least one form-quality issue or success pattern is captured from reservation.html

### Post-booking management, support, and account access

- Objective: Test adjacent flows users rely on after or around booking: trip management, support, sign-in, and registration.
- Target pages: my-trips.html, help.html, signin.html, register.html, confirmation.html
- Key checks:
  - From confirmation and/or global/footer nav, enter my-trips.html and test tabs such as Upcoming, Completed, and Cancelled
  - Exercise visible trip actions including View details, Cancel booking, Modify dates, Write a review, and Book again where available
  - Use help.html search and topic tiles to assess findability of cancellation, payment/refund, change-booking, and account/security help
  - Inspect chat and call CTAs for prominence and expected behavior
  - Review sign-in and registration flows for input clarity, password expectations, alternate auth options, and smooth cross-linking between sign in and create account
- Exit criteria:
  - Trip-management and support pages have each had multiple visible controls exercised
  - At least one recovery-oriented path is validated from booking/confirmation into support or management
  - Sign-in and register pages are both inspected for UX blockers and consistency

### Secondary product lines and mobile verification

- Objective: Sample the non-hotel business lines linked in global navigation and repeat critical checks on mobile for responsiveness and tap usability.
- Target pages: flights.html, car-rentals.html, attractions.html, airport-taxis.html, deals.html, list-property.html, index.html, tokyo.html, hotel-detail.html, reservation.html, my-trips.html
- Key checks:
  - Visit each secondary product page from the nav or direct route and exercise its main search/filter CTA at least once
  - In flights.html, switch among trip types and inspect cabin-class select plus results-to-selection affordance
  - In car-rentals.html, toggle 'Drop car off at different location' and inspect deal-card progression
  - In attractions.html and airport-taxis.html, compare search clarity, card content, and booking CTA prominence
  - Inspect deals.html and list-property.html as promotional/partner-entry experiences for relevance and navigation quality
  - On mobile viewport, repeat the critical hotel flow checkpoints on index, results, hotel detail, reservation, and my-trips, focusing on header nav, tap-target size, filter usability, and form completion
- Exit criteria:
  - All secondary-nav pages discovered in prescan have been visited and at least lightly exercised
  - Critical mobile checks are completed on the main hotel path plus one post-booking page
  - Responsive issues and small-tap-target impacts are documented with concrete examples

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

