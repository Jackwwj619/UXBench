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

- The Date / Genre / Venue / Price filters on the discovery page now actually filter the event lists. Picking a value highlights the dropdown in yellow, and if nothing matches you see a friendly "No events match these filters" message.
- On checkout, every attendee form is now expanded by default — not just the first ticket — so you can see the fields you still need to fill at a glance. Tickets that are missing a first or last name show a red "Action required" badge in the header.
- The "Copy buyer info from ticket 1" link is now a proper outlined button instead of a plain text link, making it more obvious you can tap it.
- Cancelling your reservation now drops you back on the home page with a clear confirmation toast that says "Your reservation has been successfully cancelled."
- The +/- ticket steppers, payment method radio buttons, filter dropdowns, and the favorite/share icon buttons are all bigger and easier to tap on phones.
- The card form on checkout now uses proper autofill hints, so your browser's saved card details can pre-fill name, number, expiry, CVC, and ZIP in one go.
- All inputs across the site show a yellow outline when focused, so it's clearer which field your keyboard is on.
- Screen reader users now get useful announcements on every form field and filter, including labels like "Ticket 2 first name" and "Filter by date".

## How to test the changes

1. Open `index.html`. Pick "Indie rock" from the Genre dropdown — the event lists should narrow down and the dropdown should glow yellow. Pick a combination that returns nothing (for example Genre "Jazz" + Price "$80+") to see the empty-state message.
2. Click into any event, add a couple of VIP tickets, and continue to `checkout.html`. All attendee forms should be open by default. Leave a name blank on Ticket 2 — its header should show a red "Action required" badge.
3. On checkout, the "Copy buyer info from ticket 1" control should now look like a bordered button rather than plain blue text.
4. Click "Cancel reservation" and confirm. You should land back on the home page with a toast at the bottom saying the reservation was cancelled.
5. Shrink the browser to phone width on the event page — the +/- ticket steppers and the heart/share buttons should be noticeably larger and easy to tap.
6. On the checkout card form, click in the Cardholder name field — if your browser has saved cards, it should now offer to autofill the whole card.
