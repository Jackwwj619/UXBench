# Booking Clone

A practice clone of the Booking.com hotel funnel, from searching a destination all the way through to a fake confirmation screen. You can browse cities, filter results, pick a room, fill in your details, and "book" a stay — none of it is real.

> Front-end demo only — no real hotels, no payment, no email. The confirmation screen stops before any real transaction.

## What you can do

- **Search and discover.** Pick a destination, dates, and how many guests on the home page. Browse recommended destinations and recent searches.
- **Find hotels in a city.** The Tokyo and Shinjuku list pages show hotel cards with prices, ratings, review counts, distance, and free-cancellation tags. Filter by price, stars, rating, amenities, or neighborhood, and sort the results.
- **Look closely at a property.** Hotel detail pages show the photo gallery, ratings, amenities, location map, room overview, policies, and review summary.
- **Choose a room and book.** Pick the room you want (bed type, occupancy, breakfast, cancellable), enter contact and arrival details, and reach a confirmation page with a fake booking number and itinerary.
- **Explore other travel categories.** Flights, car rentals, airport taxis, attractions, and deals each have their own landing pages, plus help, sign-in, register, my trips, list-your-property, and reviews sections.

## How to use it

Open `index.html` in any modern browser. Start with the search bar to follow the booking flow (home → Tokyo or Shinjuku list → hotel detail → room selection → reservation → confirmation), or jump directly into any travel category from the top nav. Nothing is sent over the network — the whole funnel runs in your browser.

## What was changed in this version

- Typing in the "Where are you going?" box on the home page now opens a dropdown of suggested cities (Tokyo, Shinjuku, Osaka, Kyoto, and more) that you can pick with the mouse or the arrow keys.
- On narrow screens, the blue top navigation now collapses behind a hamburger button you can tap to open and close the menu.
- The "Complete booking" button on the reservation page is no longer greyed out at the start — you can click it any time, and it tells you exactly which fields are missing instead of staying silently disabled.
- Submitting the reservation form with missing or invalid fields now shows a clear message at the top, jumps to the first problem field, and highlights it in red. Email typos like "alice@" are caught.
- Filters on the Tokyo list page now apply correctly when you tick boxes under headings like "Your budget" — previously some sections didn't register your choices.
- On the airport-taxis page, clicking "Book" on a vehicle now takes you to the reservation page to finish checkout, instead of just showing a small message.
- Checkboxes and radio buttons on filter and form sections are noticeably larger and easier to tap, with bigger clickable rows.
- The whole site adapts better to phones and tablets — content stacks into a single column, the photo gallery rearranges, and the booking summary no longer sticks awkwardly to the side.
- Screen readers now have proper labels for every search box, form field, and button, so the site is more usable with assistive technology.

## How to test the changes

1. Open `index.html`. Click into the "Where are you going?" box and start typing "to" — a list of city suggestions should drop down. Use the arrow keys to highlight one and press Enter to jump to it.
2. Shrink the browser window to phone width (or open on a phone). The blue navigation bar should collapse into a hamburger icon; tap it to expand and collapse the menu.
3. Go to `tokyo.html`, expand the "Your budget" filter section, and tick a budget range — the result list should update. Try a few other filter sections to confirm they all respond.
4. From any hotel, choose a room to reach `reservation.html`. Without filling anything in, click "Complete booking" — you should see a banner at the top, get scrolled to the first empty field, and see the missing fields outlined in red.
5. On the reservation page, type "alice@" into the email field and try to submit — it should be rejected as invalid.
6. Open `airport-taxis.html` and click "Book" on any vehicle card — you should be taken to the reservation page after a short confirmation message.
