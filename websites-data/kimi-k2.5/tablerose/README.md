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

- The **Help** link in the top nav (on every page) now opens a real help dialog with four FAQ answers and a contact email, instead of being a dead link.
- The guest-details form now catches mistakes inline: missing first or last name, an invalid email like "alice@", a phone with too few digits, and so on each highlight the offending field in red with a clear message right below it, and the page jumps to the first problem so you don't have to hunt for it.
- The **Apple / Google / Outlook** calendar buttons on the confirmation page now respond with a "Calendar event downloaded" toast instead of doing nothing.
- The **Resend email**, **Modify**, and **Cancel** buttons on the confirmation page now actually work — Resend shows a confirmation toast, Modify takes you back to the guest details page, and Cancel asks for confirmation first, then sends you to the home page with a "Reservation cancelled" toast.
- The dietary checkboxes and occasion radio buttons on the guest page now sit in tappable pill-shaped boxes that visibly highlight when chosen, instead of being tiny boxes with text beside them.
- Price filter pills, the Help link, the brand logo, and most other small controls are bigger and easier to tap on a phone.

## How to test the changes

1. Open `index.html`. Click **Help** in the top right — a dialog appears with the FAQ. Press Escape, click the X-style "Close" button, or click outside the box to close.
2. Pick any restaurant and continue through to `guest.html`. Without filling anything in, click **Continue to payment** — the first name, last name, phone, and email fields all turn red with messages under them, and the page scrolls/focuses on the first one. Type "alice@" in the email — when you tab away, an "Please enter a valid email" message appears.
3. Complete the guest step properly and continue to `payment.html`, then to `confirmation.html`. Click **Apple**, **Google**, and **Outlook** under "Add to your calendar" — each shows a green "Calendar event downloaded" toast.
4. On the confirmation page, click **Resend email** — a toast says it was resent. Click **Modify** — you're sent back to the guest page after a brief toast. Click **Cancel** — a confirmation pops up; accept it and you're sent home with a "Reservation cancelled" toast.
5. On `guest.html`, tap the dietary check boxes (Vegetarian, Vegan, etc.) and the occasion radios (Birthday, Anniversary, etc.) — selected ones get a coloured background instead of just a checkmark.
