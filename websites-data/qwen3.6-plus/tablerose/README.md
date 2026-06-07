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

- **Confirmation buttons actually do something now.** The Apple, Google, and Outlook calendar buttons each show a brief "Added" confirmation, instead of doing nothing when clicked.
- **Resend email shows progress.** Clicking "Resend email" briefly shows "Sending…", then confirms with a green "Sent" state and a small message slides up from the bottom of the screen.
- **Modify and Cancel open a friendly dialog.** "Modify" now opens a small pop-up explaining what you can change, and "Cancel" asks you to confirm before releasing the table, with a clear note about the 90-minute window.
- **Help link works.** Clicking "Help" in the top navigation now opens a small dialog with a support email, phone number, and hours.
- **Tap targets are bigger on phones.** Filter checkboxes, price pills, time slots, dietary toggles, restaurant tabs, and top-nav links are all easier to tap with a thumb.
- **Pages no longer scroll sideways on small screens.** Restaurant, results, checkout, and confirmation pages now have proper side padding on phones and images can't overflow the screen.
- **Better labels for screen readers.** The search fields on the home page and the party-size picker on the restaurant page now have proper labels so assistive tech can announce them.

## How to test the changes

1. Open `index.html`, search for any city, pick a restaurant and time, fill in guest details, complete the card hold, and land on `confirmation.html`.
2. Click Apple, Google, and Outlook in the "Add to calendar" card — each button should briefly turn green with a check, and a short message should slide up from the bottom saying the event was sent.
3. Click "Resend email" — it should say "Sending…", then "Sent", with another bottom-of-screen confirmation.
4. Click "Modify" — a pop-up should explain what you can change, with "Keep as is" and "Change time / party" buttons. Then click "Cancel" — a confirm dialog should appear; confirm it and the page should show "Canceled" with a toast.
5. Click "Help" in the top nav — a small dialog should appear with a support email and phone number.
6. Shrink the browser to phone width and walk through the flow — filter checkboxes, time-slot pills, and tabs should all be comfortably tap-sized, and no page should scroll sideways.
