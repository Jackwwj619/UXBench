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

- The "terms" link next to the **Place order** button now actually opens a pop-up with the ticket purchase terms (refund window, ID at the door, resale rules), instead of being a dead link.
- If you click **Place order** with missing details, the page no longer pops a blunt browser alert. A red message appears right above the button explaining what's missing, the offending field gets a red outline, the attendee panel that contains it opens automatically, and the cursor jumps straight to that field.
- The promo code box gives much more useful feedback. If you forget to type a code it now says "Enter a promo code, then tap Apply"; an unrecognised code says "Promo 'XYZ' not recognized. Try DOORS5 or TONIGHT10"; and a working code says "Applied: ... — see fee breakdown below."
- The "Email this ticket directly to the attendee" checkbox in each attendee panel is now on a comfortably tall row with a bigger checkbox, easier to tap on a phone.
- The promo code field and its Apply button are now the same height and sit side-by-side neatly, instead of the button looking smaller than the input.
- The Cancel order link and other small links in the checkout are now tall enough to tap on a phone without missing.
- Every form field in the checkout (cardholder name, card number, expiry, CVC, zip, promo code, attendee names) now has a clearer label that screen readers can announce properly, and important status messages (promo result, place-order error) are announced out loud as they appear.

## How to test the changes

1. Open `index.html`, pick any event, choose a tier (try VIP for an extra attendee field), then click **Continue to checkout**.
2. At the bottom of the checkout right column, click the underlined word **terms** in the small print under **Place order**. A pop-up with the ticket purchase terms should appear. Click **Close** to dismiss it.
3. Without filling in the attendee names, click **Place order**. Instead of a browser alert, you should see a red message above the button, the first/last name fields highlighted in red, the attendee panel popped open if it was collapsed, and the cursor placed in the first empty field.
4. Fill in the attendee names but leave **Cardholder name** empty, then click **Place order** again. You should now see a "Cardholder name is required" message and the cardholder field outlined in red.
5. Scroll to the promo code box. Click **Apply** with the box empty — the message reads "Enter a promo code, then tap Apply." Type `NOPE` and click Apply — the message says it's not recognized and suggests `DOORS5` or `TONIGHT10`. Type `DOORS5` and click Apply — the message turns green and points you to the fee breakdown.
6. In any attendee panel, look at the "Email this ticket directly to the attendee" row — the checkbox is large and the whole row is easy to tap.
7. On a phone (or with a narrow window), the **Cancel order** link in the checkout is now a tall, easy tap target.
