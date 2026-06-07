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

- The quick-pill suggestions ("Pasta", "Sushi", "Sichuan", etc.) and the editor guide cards on the home page now actually pre-filter your results — Sushi opens the results page with Japanese already ticked, Quiet rooms ticks the Quiet feature, and Brunch tomorrow bumps the date forward and sets a morning time.
- When a suggestion or guide pre-filters your results, a coloured chip appears in the summary bar showing what's filtered, with an X to clear it in one click.
- "Edit" in the results summary bar now opens an inline edit panel right on the results page (Where / Party / Date / Time + Update results) instead of bouncing you all the way back to the home page.
- Each restaurant row's time slots are now centred on the time you actually searched for, with your originally requested time highlighted in gold and labelled "Your time".
- On the restaurant detail page, the booking card's time slots are also centred on your requested time, so a brunch search shows morning slots and a dinner search shows dinner slots.
- Changing the party size on the restaurant detail page now refreshes the hold-amount note ("Estimated card hold for 4 guests: $200") and shows a small toast confirming the change.
- Tapping the heart to favorite a restaurant now shows a "Saved to favorites" toast (or "Removed").
- Switching tabs (Overview / Menu / Photos / Reviews) on a phone now smoothly scrolls the new section into view so you can see the change.
- The guest details form (step 2) now shows a red error banner listing every missing or invalid field at once when you submit incomplete details, and highlights each one — instead of relying on a single browser tooltip.
- On the confirmation page, the calendar buttons (Apple / Google / Outlook), Resend email, Modify, and Cancel buttons now actually do something — each shows a brief "Adding…" / "Sending…" state followed by a green confirmation line and a toast.
- On phones, the bottom action buttons on the payment page stack into a full-width column, the inline edit panel collapses to two columns, and horizontal scrolling on small screens is prevented.
- Tap targets across slot buttons, filter checkboxes, dietary checkboxes, the heart button, header links, and tabs are noticeably larger.

## How to test the changes

1. Open `index.html`. Click the "🍣 Sushi · 9 nearby" pill — the results page opens with the Japanese cuisine filter already ticked, and a "Filtered: Sushi" chip is visible in the summary bar. Click the chip's X — it clears.
2. Back on `index.html`, click the "☕ Brunch tomorrow" pill — the results page opens with the date set to tomorrow, the time around 10:30 am, and each restaurant row shows morning slots.
3. From the home page, click the "Quiet rooms" editor guide card — results open with the Quiet feature filter ticked.
4. On `restaurants.html`, click "Edit search" in the summary bar — an inline edit panel slides down with Where / Party / Date / Time fields. Change the party to 5 and click "Update results" — the summary line updates and a toast appears (no page reload).
5. Search for 7:00 pm in the original card on the home page, look at any restaurant row in the results — one of the slot buttons is outlined in gold with a "Your time" badge.
6. Open any restaurant detail page. Change the Party dropdown from 2 guests to 6 — the hold-amount note below updates to "$300" and a toast confirms the change.
7. On the restaurant detail page, tap the heart icon — a toast says "Saved to favorites". Tap again — "Removed from favorites".
8. Resize to phone width on a restaurant detail page and tap between Overview / Menu / Photos / Reviews — the new tab section smoothly scrolls into view.
9. On `guest.html`, clear the First name and Email fields and click Continue — a red banner lists "First name, Email", both fields are highlighted, and the page scrolls to the banner. Fix the fields and continue.
10. Reach `confirmation.html`. Click "Google" under Add to calendar — the button briefly says "Adding…", then turns to "✓ Google" with a green confirmation line below. Click "Resend email" and "Cancel" too; each gives feedback instead of doing nothing.
