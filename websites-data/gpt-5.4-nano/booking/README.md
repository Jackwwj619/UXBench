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

- The "Complete booking" button on the reservation page is no longer stuck in a greyed-out state forever. A small yellow message just above the button tells you exactly which required fields are still missing, and it turns into a green "All required info complete" message and lets you click through to the confirmation page as soon as you fill them all in.
- The estimated-arrival-time dropdown now shows a small confirmation underneath ("Selected arrival: 15:00 - 16:00") that turns orange if no time has been picked yet and green once you choose one.
- The "Who are you booking for?" radio buttons now show a confirmation line underneath ("Selected: I'm the main guest" / "Selected: I'm booking for someone else") so you can tell which one is active.
- Radio buttons and checkboxes on the reservation page are now wider, taller rows with a light hover background, so they're easy to tap on a phone.
- Every required field on the reservation form (first name, last name, email, country, phone, arrival time) now has a proper label that screen readers can read out, including a hidden "required" note next to the red asterisk.
- On phone-width screens, the reservation page stacks into a single column, the price summary moves below the form instead of trying to stick to the side, and the buttons stay easy to tap.

## How to test the changes

1. Open `reservation.html`. Scroll down to the bottom. You should see a yellow message above the green button saying "Complete booking available once these are set: First name, Last name, Email address, ...". The big "Complete booking" button is greyed out.
2. Fill in the contact fields one by one. As you fill each one, watch the yellow message shrink — the listed field disappears from it.
3. Pick a value for "Estimated arrival time" — the line underneath turns green and reads "Selected arrival: 15:00 - 16:00" (or whichever slot you picked).
4. Once every required field is filled, the warning above the button turns green and says "All required info complete — you can complete your booking." Click the button — you're taken to `confirmation.html`.
5. Switch the "Who are you booking for?" radio to "I'm booking for someone else." The line underneath updates to reflect the new choice.
6. Resize the browser to a phone-width window. The reservation form drops into a single column, the price summary slides under the form, and the radio buttons and checkboxes are large, easy-to-tap rows.
