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

- The discovery-page filters (Date / Genre / Venue / Price) now actually narrow the "This week" grid. The grid re-renders as you change a select, the page shows a "12 events" count above it, and an empty-state with a "Clear filters" link appears when nothing matches.
- On the event page, the share button now does something — it copies the event link to your clipboard and shows a "Link copied!" toast. The favorite button also confirms with a toast and toggles between an outline heart and a filled heart with the correct screen-reader state.
- Picking Apple Pay or Google Pay on checkout now hides the credit-card form and shows a short wallet panel explaining you'll confirm with that wallet at checkout, instead of leaving the credit-card fields visible. The "Cardholder name" field is no longer required when a wallet is selected.
- The "terms" link in the small print under "Place order" now opens an actual modal explaining the demo's refund and transfer policy, instead of jumping back to the top of the page.
- The ticket stepper buttons now disable themselves at 0 and at the per-tier max, so you can't keep clicking "−" below zero or "+" past the cap, and the quantity announces changes to screen readers.
- When you have 3 or fewer tickets, all attendee accordions are now expanded by default so you can fill them in without hunting for the next one. The "Copy buyer info from ticket 1" link has been moved into the accordion header for tickets 2+, so you can copy without expanding first.
- The top-nav links in the discovery header that used to dead-end (Calendar / Venues / Artists) have been pruned to the ones that actually scroll to sections of the page.
- Payment-method labels read "Apple Pay" and "Google Pay" instead of the awkward "Apple-Pay-like" / "Google-Pay-like" placeholders.
- Touch targets are bigger throughout — payment method tiles, checkboxes, attendee fields, and the favorite/share buttons are all easier to tap on a phone.

## How to test the changes

1. Open `index.html` and change the "Genre" or "Price" select — the "This week" grid filters live and a small "X events" count updates above it. Pick combinations that match nothing to see the empty-state with the "Clear filters" link.
2. Open any event page (e.g. click a Tonight card). Click the share (↗) button — a toast says "Link copied!" and the URL is in your clipboard. Click the heart — it flips between outline and filled with an "Added to favorites" / "Removed from favorites" toast.
3. Add a ticket on an event page, click Continue to `checkout.html`, then switch the payment method to "Apple Pay" — the card form vanishes and a panel appears explaining you'll confirm with Apple Pay. Switch back to "Credit / debit" to bring the form back.
4. On checkout, click the underlined "terms" link in the small print under "Place order" — a modal opens with the refund policy. Close it with the Close button.
5. Add 1 ticket of the Early Bird tier on an event page. The "−" button starts disabled (quantity is 0 — actually since you added 1, "−" works); push "+" to the tier max and confirm the "+" button greys out.
6. Reserve 2 or 3 tickets, then go to checkout — every attendee accordion is expanded by default, and tickets 2+ show a "Copy from ticket 1" button right in the header.
7. Shrink the browser to phone width on `checkout.html` — payment-method tiles, attendee fields, and checkboxes all get bigger, comfortable tap targets.
