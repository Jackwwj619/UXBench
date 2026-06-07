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

- Clicking destination cards for cities without dedicated pages (Osaka, Kyoto, Hakone, Yokohama) no longer silently dumps you on the Tokyo results. They now show a "results coming soon — try Tokyo or Shinjuku" toast and keep you on the homepage.
- The Search button on Attractions, Airport taxis, Flights, and Car rentals no longer hijacks you to the hotel results page. It now shows a toast and stays on the same vertical so you can actually browse what's listed below.
- The country/region required-field check on the reservation page now also catches the empty default value, not just the "Please select" placeholder, so an unselected dropdown is correctly flagged as missing.
- The date picker and guests-and-rooms modals now close when you press Escape, and the guest modal got a visible X close button in the header in addition to the existing Cancel/Done.
- Modals are now announced to assistive tech with `role="dialog"`, `aria-modal`, and `aria-label` (Select dates / Select guests and rooms).
- The guests modal close button is now a comfortable 44px tap target on phones, and so are Cancel and Done.
- Reservation-form fields (first name, last name, email, country, phone) now have proper `<label for="…">` associations and `aria-label`s, so screen readers and autofill know what each field is.
- Search boxes across home, Tokyo, attractions, and airport taxis now have `role="search"` plus per-field `aria-label`s for screen readers.

## How to test the changes

1. Open `index.html`. Click the Osaka or Kyoto destination card — a toast appears reading "Osaka results coming soon — try Tokyo or Shinjuku for now." and the page doesn't redirect. Clicking Tokyo or Shinjuku still navigates to those city pages.
2. Open `attractions.html` (or `airport-taxis.html`). Click the Search button — a toast confirms the search and the page stays put instead of redirecting to the Tokyo hotel list.
3. Open `reservation.html`. Leave the Country/region dropdown at its empty default and click "Complete booking" — the field is flagged as missing alongside the other empty required fields.
4. On `tokyo.html`, click the dates input to open the calendar, then press Escape — it closes. Click the guests input, then click the new X in the header or press Escape — that closes too.
5. On a phone-width window, open the guests modal — the close X, Cancel, and Done buttons are all comfortably sized to tap.
6. With a screen reader active, tab through the reservation form — every input announces its own label (e.g. "Email address, required, edit text").
