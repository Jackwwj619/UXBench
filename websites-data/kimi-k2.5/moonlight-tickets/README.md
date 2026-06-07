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

- When you confirm "Cancel order" on the checkout page, the homepage now shows a clear yellow banner at the top saying "Your order was cancelled" — with a quick "Resume browsing that event" link back to the show you were looking at, and a × to dismiss it. Before, the cart silently emptied and dropped you on the homepage with no explanation.
- The confirmation page no longer dumps you back to the homepage when you reload it. If there's no recent order in the session, it now shows a friendly "No recent order found" message with a link back to tonight's events.
- The -/+ ticket-quantity buttons on event pages are now full 44 × 44 pixel tap targets, much easier to use on a phone. The "SELLING FAST" badge on the VIP card no longer blocks clicks on the buttons underneath.
- The top navigation links have larger tap areas with a subtle hover highlight, and on narrow screens the nav row scrolls sideways instead of disappearing — so you can still reach Discover / Calendar / Venues from a phone.
- Buttons and inputs throughout the checkout flow (promo, primary/secondary actions, icon buttons) now meet a 44-pixel minimum on phone widths.
- The phone layout puts the payment method picker, the card-form columns, the audio snippets, and the attendee First/Last fields all on a single column instead of squashing them side by side.

## How to test the changes

1. Open `index.html`, click into any event, pick a tier and quantity, and continue to checkout.
2. On the checkout page, click **Cancel order** and confirm. You should land back on the homepage with a yellow banner reading "Your order was cancelled." and a "Resume browsing that event" link. Click the × to dismiss the banner.
3. Walk through to a confirmation page, then reload `confirmation.html` directly. Instead of redirecting away, you should see a "No recent order found" message with a button back to tonight's events.
4. Open any event page and tap the - and + buttons on the VIP tier card. They should feel large and easy to hit. The "SELLING FAST" badge should not get in the way.
5. Shrink the browser to phone width. The top nav (Discover / Calendar / Venues / etc.) should still be visible and scrollable sideways, and the checkout form should stack to a single column.
