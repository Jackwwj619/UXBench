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

- Each hotel card in the Tokyo and Shinjuku lists now shows a per-night price (for example "JPY 22,000 / night") underneath the larger total, so it lines up with the "per night" budget filter in the sidebar instead of being confusing.
- The hotel photo gallery on the Shinjuku Granbell detail page now labels each placeholder image ("Exterior", "Lounge", "Dining", "Fitness", "City view") and shows a small "Sample illustrations — high-resolution photos coming soon" note above the gallery, so it's clear the colourful tiles are stand-ins.
- The results header on city list pages now has a card background, and when no hotels match your filters the "X properties found" line is hidden so you don't see two conflicting messages at the same time.
- On the reservation form, a checklist now appears just above the **Book** button showing each required field as ticked or unticked, and turns fully green with a "ready to book" message once you've filled everything in. The Book button hovers say "Complete all required fields to enable booking" when it's still disabled.
- Hotel cards now have a more careful click area: only clicking the title, the picture, or the "See availability" button opens the hotel — clicking blank space, the price, or the rating no longer accidentally navigates you away.
- The hotel-card title is now keyboard-accessible — you can tab to it and press Enter or Space to open the hotel.
- Footer and sidebar links like "Manage your booking" and "Contact us" now go where they say they go (My trips and Help, respectively), instead of doing nothing.
- The whole site now adapts to phone-sized screens: the top navigation scrolls horizontally, the search box stacks into one column, hotel cards stack the image above the price block, filters/forms become full-width, the photo gallery rearranges, and the room table turns into easy-to-read blocks.
- Form fields, sort dropdowns, checkboxes, and buttons are noticeably larger on mobile and the form fields are sized to stop iPhones zooming in when you tap them.
- Search boxes, date pickers, guest pickers, and the country dropdown on the reservation form now have proper labels for screen readers.

## How to test the changes

1. Open `index.html` and click any **Tokyo** or **Shinjuku** link to reach a list page. Each hotel card shows the 3-night total in big text and a "JPY .../ night" line just underneath. Hover the total — a tooltip confirms it's a 3-night sum and the budget filter is per night.
2. On the Tokyo list, in the left filter panel, set the price range below the cheapest hotel (or pick stars + amenities that no hotel matches). The "X properties found" line disappears and a single, friendly "No properties match your filters" card is shown instead.
3. Open `hotel-detail-granbell.html`. Above the photo strip you'll see a small "Sample illustrations — high-resolution photos coming soon" note, and each gradient tile now has its own caption ("EXTERIOR (sample)", "LOUNGE (sample)", etc.).
4. From any hotel page, go through to `reservation.html`. Above the **Book** button you'll see a checklist of every required field with an empty circle next to each. Fill them in one by one and watch the circles turn into green ticks; once they're all done, the heading turns green and reads "All required fields complete — ready to book." Hover the **Book** button while fields are missing to see the "Complete all required fields…" tooltip.
5. On a city list page, hover a hotel card — only the title, the picture, and the "See availability" button feel clickable. Click on the empty space of the card or its star rating; you stay on the same page. Click the title (or press Tab until it's focused, then Enter) — you open the hotel detail.
6. Scroll to the footer on the home page and click "Manage your booking" — it opens `my-trips.html`. Click "Contact us" — it opens the Help page's Contact section.
7. Shrink the browser to phone width on any list page. The top nav now scrolls sideways, the search box stacks into one column, each hotel card puts its picture above the price block, the filter panel collapses, and the "See availability" button stretches to full width.
8. On a phone-width window, open `reservation.html`. The form fields are tall and easy to tap, the field labels are properly linked so a screen reader can read them, and the country/region dropdown announces itself when focused.
9. On a phone-width window, open `hotel-detail-granbell.html`. The photo gallery rearranges into a 2-column grid with one wide image on top instead of cramming five into a row. On very narrow widths it collapses to a single image.
