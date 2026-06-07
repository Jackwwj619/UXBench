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

- The Sign in page is now a proper two-step flow. First you enter your email (and get a clear red error message if it's blank or not a valid email), then you're moved to a password page that shows the email you typed and has a **← Back** button to fix it.
- On the reservation page, if you click **Complete booking** with required fields empty, a yellow banner at the top now lists exactly which fields are missing, and the page scrolls and focuses you on the first one — instead of just blocking submission silently.
- The **Cancel booking** button on the My trips page now opens a friendly confirmation dialog explaining what will be cancelled and that free cancellation applies, with **Keep booking** and **Yes, cancel booking** options — instead of the browser's plain confirm popup.
- After confirming a cancellation, you see a short "Cancellation request submitted" toast and the booking card greys out with a red "Cancelled" status.
- Buttons across the site (My trips actions, Complete booking, Sign in) are now bigger and easier to tap with a finger.
- On narrow screens (phone width), the top nav links collapse out of the way, the page no longer scrolls sideways, and images shrink to fit.

## How to test the changes

1. Open `signin.html`. Click **Continue with email** with the box empty — you should see a red error under the field. Type something that isn't an email (e.g. `bob`) and try again — same error. Type a real-looking email (e.g. `bob@example.com`) and click again — you should land on a password step showing your email and a **← Back** link.
2. Click **← Back** to return to the email step, then walk through to the password page and click **Sign in** with the password empty to see the password error.
3. Open `reservation.html`. Without filling anything in, click **Complete booking**. A yellow banner should appear at the top listing the missing fields, and the page should scroll to and highlight the first one.
4. Open `my-trips.html`. Click **Cancel booking** on a trip card — a custom dialog appears explaining what will be cancelled. Click **Keep booking** to dismiss, then try again and click **Yes, cancel booking** — you should see a toast and the card should grey out with a red "Cancelled" label.
5. Shrink the browser window to phone width — the top nav links should hide and the page should still fit without horizontal scrolling.
