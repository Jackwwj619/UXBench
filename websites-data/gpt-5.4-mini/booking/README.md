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

- The reservation page now shows a live "To complete your booking, please:" checklist that ticks off each step as you fill in your first name, last name, email, country, phone, and arrival time. A counter underneath shows "X of 6 complete".
- The "Complete booking" button stays greyed out until every required field is filled. Once everything is done, the helper text turns green and says "All set — you're ready to book." If you try to click while disabled, focus jumps to the first missing field and highlights it in red.
- The country dropdown on the reservation page now starts on "Please select" instead of silently defaulting to Japan, so you have to make an active choice.
- The Help Center search box now actually works. Type a word like "cancel", "refund", "Genius" or "confirmation" and the matching FAQ below expands automatically, scrolls into view, and is briefly highlighted in yellow. If nothing matches, you get a clear "No results for ..." message instead of silence.
- On the Flights page, the cabin-class dropdown now has a visible "Cabin:" label and shows a small confirmation ("Cabin updated to Business") when you change it, so you know the choice registered.
- On phones or narrow windows, the search boxes (hotel, flight, taxi) now stack into a single column with bigger, finger-friendly inputs, and the Search button stretches across the full width.
- On a phone, hotel result cards stack image-above-text, the filter checkboxes are larger, and the footer collapses into one or two columns instead of overflowing sideways.
- All inputs and buttons across the site are now at least 44 pixels tall so they're easier to tap, and form fields properly suggest auto-fill values (your saved name, email, phone).

## How to test the changes

1. Open `index.html`, search for a hotel, drill into Tokyo → a hotel → pick a room → reach `reservation.html`. You should see a blue "To complete your booking, please:" panel at the bottom with six unchecked items and "0 of 6 complete".
2. Type a first name — the first item ticks green and the counter updates to "1 of 6". Fill out every field; once you pick a country (note it now defaults to "Please select") and arrival time, all six are ticked and the big "Complete booking" button turns active. The helper text below turns green.
3. Refresh, leave the first name blank, scroll down and click "Complete booking" — the button is disabled, and the first-name field gets a red border and focus.
4. Open `help.html`. Type "cancel" into the search box and press Enter — the "Can I cancel my booking?" FAQ should expand, scroll into view, and flash yellow. Try "xyzzy" — you should see "No results for xyzzy" instead of nothing.
5. Open `flights.html`. The cabin-class dropdown should now show a "Cabin:" label. Change it to "Business" — a small yellow "Cabin updated to Business" note appears for a couple of seconds.
6. Narrow your browser window to phone width (or open the page on a phone). On `index.html`, `tokyo.html`, `flights.html`, and `airport-taxis.html`, the search boxes should stack vertically with one field per row and a full-width Search button. Hotel cards on the Tokyo page should stack image-on-top, and the footer should collapse to one or two columns.
