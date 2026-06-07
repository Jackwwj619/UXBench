# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the full booking system, prioritizing the primary checkout/booking flow plus adjacent pages, states, and recovery paths.

## Plan Summary

The exploration will start by walking through the core hotel booking funnel from the homepage to confirmation, ensuring data passes correctly between steps. It will then evaluate the adjacent travel verticals (flights, cars, attractions, taxis) and user account management pages (trips, login, support). Finally, it will validate mobile responsiveness, paying special attention to the numerous small tap targets identified in the prescan.

## Coverage Targets

- pages: `Visit all 19 HTML pages identified in the prescan.`
- features: `Exercise the primary search form, checkout form, and search filters.`
- mobile: `Test index.html, tokyo.html, and reservation.html specifically for mobile tap target and layout issues.`

## Planned Phases

### Core Booking Funnel

- Objective: Traverse the primary user journey from homepage search to booking confirmation.
- Target pages: index.html, tokyo.html, hotel-detail.html, room-selection.html, reservation.html, confirmation.html
- Key checks:
  - Interact with the main search bar on index.html
  - Click through a hotel listing on tokyo.html
  - Select a room and proceed to checkout
  - Fill out required fields in reservation.html and submit
- Exit criteria:
  - Successfully reached confirmation.html with a simulated booked state.

### Discovery & Evaluation Features

- Objective: Validate hotel filtering, sorting, and review reading experiences.
- Target pages: shinjuku.html, hotel-detail-granbell.html, reviews.html
- Key checks:
  - Toggle various budget, star rating, and neighbourhood filters on shinjuku.html
  - Navigate to hotel reviews and interact with review sorting/filtering options
- Exit criteria:
  - Filter checkboxes and review sort dropdowns have been interacted with.

### Adjacent Travel Verticals

- Objective: Verify the layout and primary search inputs for other business lines.
- Target pages: flights.html, car-rentals.html, attractions.html, airport-taxis.html
- Key checks:
  - Interact with flight type selectors (Round trip, One way)
  - Fill out pick-up/drop-off locations for cars and taxis
  - Check search button triggers across all vertical pages
- Exit criteria:
  - All four vertical pages visited and their primary search forms exercised.

### Account, Support & Marketing

- Objective: Ensure user account pages, trip management, and informational pages render correctly.
- Target pages: signin.html, register.html, my-trips.html, help.html, deals.html, list-property.html
- Key checks:
  - Attempt form entry on login/register pages
  - Interact with trip management actions (Cancel booking, Modify dates) on my-trips.html
  - Use the search input on the help.html page
- Exit criteria:
  - Trip management actions and authentication forms have been evaluated.

### Mobile Usability Validation

- Objective: Re-evaluate critical paths on mobile viewport to assess tap targets and responsive layout.
- Target pages: index.html, tokyo.html, reservation.html
- Key checks:
  - Check top navigation menu accessibility on mobile
  - Verify if filter sidebars stack or collapse on tokyo.html
  - Ensure form inputs on reservation.html are usable on small screens
- Exit criteria:
  - Mobile-specific screenshots captured for the homepage, search results, and checkout form.

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

