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

- The **Help** link in the top bar of the Guest Details page now opens a small help pop-up explaining what you need to fill in, instead of doing nothing.
- The Guest Details form now actually checks what you've entered when you click **Continue to hold**: if anything is missing or your email looks wrong, a red box appears at the top listing the exact problems, and the page scrolls to it.
- As you type into the form, the red error box updates live — fields that become valid drop off the list right away.
- You can close the help pop-up with the X button, by clicking outside it, or by pressing the Escape key.
- The "Party" line on the restaurant booking card now has a proper visible "Party size" label so it's obvious what the dropdown changes.
- On phones, the buttons in the top nav and the booking card are bigger and easier to tap, and the page no longer scrolls sideways by accident.
- Phone and email fields now suggest auto-fill from your saved contacts on supported browsers.

## How to test the changes

1. Open the site and walk through search → results → a restaurant → **Book** to reach `guest.html`.
2. Click **Help** in the top right — a small pop-up should appear explaining what to fill in. Close it with the X, then re-open it and press **Escape** to close it.
3. On the Guest Details page, clear the First name and Email fields, then click **Continue to hold** — a red error box should appear at the top of the form listing "Enter your first name" and "Enter a valid email address" and the page should scroll to it.
4. Start typing your first name back in — the "Enter your first name" line should disappear from the error box as soon as it's valid.
5. Open `restaurant.html` and look at the booking card on the right — the "Party size" label should be clearly visible above the dropdown.
6. Shrink the window to phone size and try tapping the Help link, the Continue button, and the time-slot pills — they should all be noticeably easier to hit, and the page shouldn't scroll sideways.
