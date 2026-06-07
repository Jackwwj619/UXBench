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

- **All attendee forms now start open.** When you have several tickets, every attendee accordion is expanded by default so it's easy to see every field at once.
- **A new "Collapse all / Expand all" button.** When there's more than one attendee, a small button next to the heading lets you fold every form down at once and pop them all open again.
- **Live "good to go" / "needs fixing" marks on the card form.** As you type your card number, expiry, CVC, and ZIP, a green check appears at the end of each field when it's valid, and a red exclamation appears when something is off (e.g. a 13-digit card number).
- **Bigger tap targets on the payment method picker.** The Card / PayLite / Apple-Pay-style rows are taller and the radio circles are larger, so they're easier to tap on a phone.
- **Bigger checkboxes inside attendee forms.** The "Email this ticket directly to the attendee" tick box has a larger hit area and label.
- **Bigger underlined text links on the side panel.** The "Add promo code", "Cancel order", and other side-panel links are now comfortable to tap, with extra padding around them.

## How to test the changes

1. Open `index.html`, click any event, set the ticket stepper on Early Bird or Standard to 3, then press **Continue** to reach checkout.
2. On checkout, the three attendee cards should all be open. A "Collapse all" button should appear next to the "Attendee details" heading — click it to fold them all, then click again ("Expand all") to open them back up.
3. Scroll to the payment section and pick the Card method. Type a partial card number — you should see a red "!" appear at the right edge of the field. Finish typing a 16-digit number and the mark should turn into a green check. Try the same with expiry (`12/27`), CVC, and ZIP.
4. Tap the "Card / PayLite / Apple-Pay-style" radio rows — each row should feel like a comfortably large tap target.
5. Shrink the browser to phone width. Tap the "Add promo code" link in the side panel — there should be plenty of room around the link to hit it without zooming in.
