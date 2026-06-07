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

- The card fields on `payment.html` now actually validate. The "Confirm reservation" button shows inline red errors next to invalid card number, expiry, CVC, or postal code, and jumps focus to the first bad field instead of silently failing.
- Inline card-field errors clear themselves as soon as you fix the value, so the page doesn't keep complaining after you've corrected it.
- The Apple Pay / Google Pay "wallet" copy on `payment.html` now shows the real hold amount (e.g. "$100 card hold") that scales with your party size, instead of always saying "$0".
- The "Modify" and "Cancel" buttons on `confirmation.html` are now wired up. Each opens a confirmation modal with details about the action — Cancel releases the table and confirms the hold will be released, Modify takes you back to the time picker with your details preserved.
- The confirmation modal closes with the Escape key, a click on the backdrop, or the "Keep reservation" button.
- The dietary, occasion, payment-method, and add-on labels on `guest.html` and `payment.html` now have 44px tap areas with hover highlights, so checkboxes and radios are easy to tap on a phone.
- Emoji-only occasion icons (cake, flowers, heart) have been replaced with text symbols wrapped in a span with `aria-hidden`, so screen readers announce just "Birthday", "Anniversary", etc.
- On phone-width windows the checkout pages reflow: the row-of-two card fields stack, the sticky summary card becomes static, the long step bar is hidden, and the action buttons wrap rather than overflowing.
- All card inputs now declare `autocomplete` hints (`cc-number`, `cc-exp`, `cc-csc`, `postal-code`), so browsers and password managers can fill them in.

## How to test the changes

1. Open `payment.html` (or walk through from `index.html`). Pick "Card" and click "Confirm reservation" without filling anything in — red inline errors appear under each card field and focus jumps to "Card number". Type a valid number and the error clears as you go.
2. On `payment.html` for a party of 2, switch the payment method to Apple Pay or Google Pay — the wallet message reads "$100 card hold" instead of "$0".
3. Open `confirmation.html`. Click "Cancel" — a modal opens explaining the cancellation and that the hold will be released. Click "Cancel reservation" inside the modal and the message changes to a confirmed-cancelled state.
4. Reopen `confirmation.html` and click "Modify" — the modal explains the modify action, and clicking "Continue to edit" returns you to `restaurant.html` with your guest details still saved.
5. With any modal open, press Escape or click outside it — the modal closes.
6. Shrink the browser to phone width and open `guest.html` and `payment.html` — checkbox and radio labels (dietary, occasion, payment methods, add-ons) all have comfortable tap areas, the two-column card fields stack into one column, and the action buttons wrap onto the next line cleanly.
7. With a screen reader, navigate the occasion radios — each option reads just "Birthday", "Anniversary", etc., not the icon character.
