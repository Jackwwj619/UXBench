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

- The "Complete booking" button on the reservation page is no longer permanently greyed-out. You can now click it at any time; if required fields are missing, it shows a clear red summary at the top listing exactly which fields need filling and scrolls to the first missing one.
- Required-field error messages now name the field properly (e.g. "Please enter your first name") and inline errors clear as soon as you finish typing.
- The "My trips" tabs (Upcoming / Completed / Cancelled) now actually filter the trip list. Clicking a tab shows only that group, and a friendly empty-state appears if the category has nothing in it.
- The social-login buttons on the sign-in page now have labels (Google, Facebook, Apple) next to the icon instead of just a single letter, and they're large enough to tap reliably on a phone.
- The date picker and guest picker modals now close when you press Escape.
- Buttons, breadcrumb links, filter checkboxes, and radio buttons throughout the site are now large enough to tap easily on a phone (44px touch targets).
- Search inputs across the site now have proper labels, so screen readers and autofill know what each field is for.
- Small wording fix on the date picker — "Apply" is now "Apply dates", which is clearer.

## How to test the changes

1. Open `reservation.html`. Without filling anything in, scroll down and click "Complete booking" — a red summary appears at the top listing every required field, the page scrolls to the first one, and each empty field gets its own red message underneath it. Fill them in and the errors disappear.
2. Open `my-trips.html`. Click "Upcoming", "Completed", and "Cancelled" — the trip cards filter to match. Cancelled shows an empty-state card because there are no cancelled trips in the demo data.
3. Open `signin.html`. Scroll down to "Or sign in with" — the three buttons now read "G Google", "f Facebook", and " Apple" instead of being icon-only.
4. On `tokyo.html`, click the date input at the top, then press Escape — the date picker closes. Same with the guests picker.
5. Open any page on a phone-width window — filter checkboxes, radio buttons, breadcrumb links, and the social-login buttons all have a comfortable tap area.
