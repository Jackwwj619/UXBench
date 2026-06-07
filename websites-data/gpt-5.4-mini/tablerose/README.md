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

- The **Help** link in the page header is now a real working button. Tapping it opens a small panel of common questions tailored to the step you're on (guest details, hold, or confirmation), with a support email and phone number at the bottom.
- The dietary and occasion choices on the guest page are now pill-shaped tap targets that clearly fill in with burgundy when selected, instead of plain tiny checkboxes you had to aim for.
- On the results page, if your filters narrow the list down to just one or two restaurants, a friendly banner now offers to **Reset filters** so you can quickly see all matches again.
- The **Apple / Google / Outlook** calendar buttons on the confirmation page used to do nothing — they now change to "Added ✓" and pop up a confirmation message so you know the click registered.
- **Resend email**, **Modify**, and **Cancel** on the confirmation page now give visible feedback (a brief "Sending…" then "Email sent ✓", or a confirmation message), instead of silently doing nothing.
- The phone and email fields on the guest page now arrive pre-filled with a sample value, and your phone keyboard will offer to autofill them.
- On a phone or narrow window, the booking flow now stacks neatly into one column, buttons and checkboxes are larger and easier to tap, and the header no longer overflows the screen.

## How to test the changes

1. Open `index.html`, search for any city, and pick a restaurant to reach the guest details page. Click **Help** in the top-right — a panel about guest details should appear. Press Escape or click outside it to close.
2. On the same guest page, click a few dietary checkboxes and pick an occasion — each pill should fill in with burgundy when selected.
3. Continue to the hold page and confirm the **Help** content now reads about card holds, then go on to the confirmation page where Help mentions modify, cancel, and resend.
4. On the confirmation page, click **Apple** under "Add to calendar" — the button should briefly say "Added ✓" and a toast should appear at the bottom. Then click **Resend email** to see the "Sending… → Email sent ✓" flow.
5. Go back to `restaurants.html`, tick filters until you see only one or two matches — a banner should appear offering "Reset filters". Click it to clear the filters.
6. Shrink the browser to phone width and walk through the flow — the layout should stack, and the form pills, buttons, and checkboxes should be larger and easier to hit.
