# MoonlightTickets

MoonlightTickets is a demo ticketing platform for independent live music — the kind of site you'd use to find a show tonight, pick a tier (Early Bird / Standard / VIP), and check out under a countdown. The whole site is in a dark "after-dark" theme.

> Fictional product — events, venues, and the checkout flow are all illustrative; no tickets are actually sold.

## What you can do

- **Find a show.** The discovery page features four big "Tonight" cards across the top, filters for date, genre, venue, and price, and a 12-event grid for the rest of the week.
- **Read about an event.** Each event page has the show time and venue (with doors), a favorite/share row, artist bio with three audio clips, three ticket tier cards with -/+ steppers, a sticky right-hand order summary with fee preview, a venue layout sketch, accessibility notes, and related events. VIP carries a "SELLING FAST" badge.
- **Check out under pressure.** A 10-minute reservation countdown sits across the top of checkout (under a minute, it pulses red). Below: a collapsible cart, one accordion attendee form per ticket (VIP gets an extra "Name for signed poster" field, ticket 2+ can copy buyer info), three payment methods with card-number formatting, promo codes (try `DOORS5` or `TONIGHT10`), and a detailed fee breakdown on the right.
- **See your confirmation.** A large checkmark, an `MT-XXXXXXXX` order number, a fake QR per ticket with attendee name, and Apple Wallet / Google Wallet / Transfer buttons.

## How to use it

Open `index.html` in any modern browser. Browse the tonight cards or the week's grid, click into an event, pick your tier and quantity, then **Continue** through to checkout. The countdown is real — let it expire and you'll be sent back to the event page.

## What was changed in this version

- The discovery filters (date, genre, venue, price) actually work now — picking any option immediately narrows the "This week" grid, and a summary line shows how many shows match.
- Each active filter appears as a chip below the filter row that you can click to remove, plus a "Clear all" link to reset everything at once.
- When no shows match your filters, the grid shows a friendly "No matching shows" panel with a Clear filters button instead of being blank.
- On the event page, the "Continue to checkout" button shows a small hint ("Select at least 1 ticket above to continue") while no tickets are picked.
- The favourite and share buttons on the event page are now slightly bigger and clearly named for screen-reader users.
- The checkout page now has a highlighted "You're buying tickets for…" card at the top showing the artist, time, venue, and doors, so you always know which show you're paying for. The cart count and line items now repeat the artist name too.
- Picking "Apple-Pay-like" or "Google-Pay-like" now hides the card-number form and shows a clear explainer that you'll authenticate on the next step, instead of asking for card details you don't need.
- The "terms" link at the bottom of the order opens a real popup with refund, transfer, entry, and fee rules instead of going nowhere.
- Clicking the MoonlightTickets logo mid-checkout now opens a "Leave checkout?" dialog reminding you that your reservation is saved, instead of silently dropping the cart.
- The confirmation page is restyled with a green circle checkmark, an event header showing the artist/venue/time, a tickets section with a small hint, and extra buttons for calendar download and PDF; refreshing the confirmation page no longer wipes the order.
- Top-nav links have been trimmed and the disabled "Sign in" link is greyed out with a "Coming soon" tooltip, instead of looking active.
- Tier steppers, payment-method rows, attendee form fields, the promo box, and other buttons throughout the flow are noticeably larger and easier to tap on phones.

## How to test the changes

1. Open `index.html`. Use the Genre dropdown — the "This week" grid immediately filters and the line above shows e.g. "3 of 8 shows match" with a removable chip and a "Clear all" link.
2. Pick filter combinations that match nothing (e.g. Venue=Coppergate Hall + Price=Under $20) — a "No matching shows this week" panel appears with a Clear filters button.
3. Click into any event. Notice the small yellow hint under the Continue button: "Select at least 1 ticket above to continue." Use the +/- stepper on a tier — the hint disappears and Continue becomes active.
4. Continue to checkout. The top of the page shows a yellow-accented "You're buying tickets for [Artist]" card with date and venue.
5. In the payment area, switch from Card to Apple-Pay-like or Google-Pay-like — the card-number form disappears and a friendly note explains the wallet flow.
6. At the bottom of the order, click "terms" — a popup opens with refund, transfer, entry, and fee rules. Close it with "Got it".
7. Mid-checkout, click the "MoonlightTickets" logo top-left — a "Leave checkout?" dialog appears with Stay/Leave buttons.
8. Complete the order to reach the confirmation page. Refresh the page — the order and tickets remain visible (instead of bouncing you back to the homepage). Notice the green check badge, event header, and extra calendar/PDF buttons.
9. Resize the browser to phone width — tier steppers, payment options, attendee fields, and the promo Apply button are all clearly bigger and easier to tap.
