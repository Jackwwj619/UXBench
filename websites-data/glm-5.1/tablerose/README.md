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

- Dinner times on the home page and results page now display correctly as evening times (for example "6:30 pm" instead of an ambiguous "6:30") because the underlying slot data was switched to 24-hour values.
- The cuisine counts in the left-hand filters on the results page now match the actual number of restaurants in each category, instead of inflated numbers like "Italian (12)" when only two exist.
- The phone field on the guest-details page now auto-formats as you type, turning "5035550100" into "(503) 555-0100".
- The card security code (CVC) field on payment is now masked with dots like a password and is labelled for screen readers, so the three digits aren't visible over your shoulder.
- The calendar buttons on the confirmation page actually work — Apple and Outlook download an `.ics` calendar file with a built-in reminder, and Google opens a pre-filled Google Calendar event in a new tab.
- The "Resend email", "Modify", and "Cancel" buttons on confirmation now respond when you click them, with a toast notification and (for Cancel) a "tap again to confirm" safety step.
- The "Help" links in the header and footer no longer go nowhere — clicking them now pops up a toast with the support phone number and email.
- Checkboxes, radio buttons, dietary tags, occasion pills, and payment-method tiles throughout the booking flow are larger and easier to tap on phones. Selected dietary tags and occasions now visibly highlight in burgundy.

## How to test the changes

1. Open `index.html`. Scroll to the trending restaurants — the time chips should read like "6:30 pm", "7:00 pm" etc., not bare numbers.
2. Click the "Help" link in the top navigation or footer — a dark toast appears at the bottom of the screen with a phone number and email.
3. Search any city and continue to `restaurants.html`. Look at the cuisine filters in the left column — the counts in brackets should be small (e.g. "Italian (2)") rather than inflated.
4. Pick a restaurant, then proceed to `guest.html`. Tap a dietary checkbox — the pill should fill with burgundy. Type ten digits into the phone field — it should reformat to "(XXX) XXX-XXXX".
5. Continue to `payment.html`. The CVC box should now show dots as you type, not the actual digits.
6. Complete the booking to land on `confirmation.html`. Click **Apple** under "Add to calendar" — a `tablerose-reservation.ics` file should download and the button briefly flashes green. Click **Google** — a new tab opens to Google Calendar pre-filled. Click **Resend email** — the button shows "Sending…" then "Email sent". Click **Cancel** — it changes to "Tap again to confirm"; click again and it flashes "Cancelled".
