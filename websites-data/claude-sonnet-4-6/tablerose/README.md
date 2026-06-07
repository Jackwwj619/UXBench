# Tablerose

Tablerose is a demo restaurant reservation platform — the kind of site you'd use to discover restaurants, pick a time, and book a table. The booking flow runs across six pages, with your reservation carrying through each step.

> Fictional product — restaurants, time slots, and the card hold are illustrative.

## What you can do

- **Search for a table.** The discovery page has a five-field search card (city autocomplete, party size, date, time), five quick-pill suggestions, six trending restaurants, four editor guides, and a three-step "how it works."
- **Browse results.** Ten restaurants per page with photo, name, stars, blurb, tags, and per-row time slots (slots within ±30 min of your search are highlighted; others are muted). Filter by cuisine, price, neighborhood, and features, and sort by relevance, rating, price, or distance.
- **Read a restaurant.** Each detail page has a split hero (photo and info with stars, dress code, and hours), four tabs (Overview, Menu, Photos, Reviews), a sticky right-hand booking card with date / party / time slots, and a mini-map of the location. Favorite by tapping the heart.
- **Enter guest details.** First/last/phone/email, six dietary checkboxes, a 240-character note, and an occasion picker. The summary card on the right shows the computed cancel-by time (90 minutes before).
- **"Hold" your reservation.** The card-hold banner shows the held amount ($50 × party). Pick a payment method (card, Apple Pay, Google Pay), and add cake, a rose, or prosecco from three add-ons. Add-ons update the summary live.
- **See your confirmation.** An animated check, a `TR-XXXXXX` reference code, three action cards (calendar / resend / modify), a "before you go" with your dietary notes pulled through, and three "you might also like" suggestions.

## How to use it

Open `index.html` in any modern browser. Search for a city to start. The whole flow — Discover → Results → Restaurant → Guest → Payment → Confirmation — carries your reservation between pages in this browser.

## What was changed in this version

- Time slots throughout the site now show "pm" (or am) next to the number, so it's no longer ambiguous whether "6:30" means morning or evening.
- Time slots that are fully booked now look properly disabled (greyed out, with a strike-through) and show a tooltip explaining why you can't pick them, instead of just sitting there inert.
- On the guest details page, your name fields no longer come pre-filled with "Milena Harlowe" — they're now empty with proper placeholder hints, so you don't have to delete the default text first.
- On a phone, the restaurant detail page gets a "Book a table" bar that sticks to the bottom of the screen, so you don't have to scroll back up to find the booking card.
- On the confirmation page, the action buttons (Resend email, Modify, Cancel, calendar buttons) now actually do something visible when clicked: Cancel asks you to confirm and then disables itself, Resend email shows a confirmation, and the others pop up a toast.
- The price filter on the search results page now spells out each tier ("$ Casual", "$$ Mid", "$$$ Upscale", "$$$$ Fine dining") so you know what each one means.
- Checkboxes and pill buttons in the booking flow (dietary restrictions, occasion, payment methods, add-ons) are bigger and easier to tap.
- The "Edit" link on the results page is now a proper button you can spot.

## How to test the changes

1. Open `index.html` and start a search.
2. On the results page, look at the time slots in each row — they now read like "6:30 pm". Check the price filter on the left for the new tier labels. Find the new "Edit" button near the top.
3. Click a restaurant. On a narrow window or phone, you should see the new sticky "Book a table" bar at the bottom of the screen. Try picking the disabled "9:30 pm" slot — it's clearly struck through and shows a "fully booked" tooltip.
4. Continue to the guest details page — the name fields are now empty placeholders, not pre-filled.
5. Complete a booking through to `confirmation.html`. Click "Resend email" (shows confirmation), an Apple/Google/Outlook calendar button (shows a toast), or "Cancel" (shows a confirm dialog, then disables the button on confirm).
