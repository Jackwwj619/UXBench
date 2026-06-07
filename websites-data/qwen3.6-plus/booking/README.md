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

- **Bigger, easier checkboxes and radio buttons.** The smoking, bed-preference, and special-request options on the reservation page now have larger tick boxes with more room around them, so they're easier to tap on a phone.
- **Field labels reliably focus the field.** Tapping a label like "Last name" now puts the cursor in the matching field, which also helps screen-reader users.
- **The "room ready at 15:00" note moved.** It now appears just after you pick your arrival time, instead of before, so it reads as a confirmation of your choice.
- **The whole reservation page reflows on phones.** The booking summary stops floating beside the form and stacks underneath it, and two-column form rows collapse to one column.
- **A scrollable top nav on small screens.** The header bar no longer squashes its links — on a phone you can swipe the nav sideways instead of seeing it wrap awkwardly.
- **No more sideways scrolling.** Pages keep all content inside the screen width, even on narrower phones.
- **Bigger primary "Next" button.** The button at the bottom of the reservation form is taller, with a larger tap area.

## How to test the changes

1. Open `index.html`, search for Tokyo (or pick a recommended destination), open a hotel, and click **Reserve** on a room to reach the reservation page.
2. Tap the "Smoking preference" and "Bed preference" options — the tick circles should be noticeably bigger and the whole row should be tappable.
3. Tap the word "Last name" (the label itself, not the field) — the cursor should jump into that field.
4. Pick an arrival time from the dropdown — the green "Your room will be ready for check-in at 15:00" note should appear just below it.
5. Shrink the browser window to phone width. The booking summary should drop below the form, the form rows should stack into one column, and the top nav should scroll sideways instead of wrapping.
6. Scroll left and right at phone width — there should be no horizontal scroll bar.
