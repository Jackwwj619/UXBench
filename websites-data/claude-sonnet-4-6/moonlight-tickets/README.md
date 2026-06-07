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

- The "Continue to checkout" button on an event page now shows a clear "Select at least one ticket above to continue" hint while it's disabled, instead of just being greyed out with no explanation.
- The three audio-snippet boxes on the event page now show real track names and durations and behave like proper play buttons, rather than looking like raw filenames.
- The favorite heart on the event page now visibly toggles between "Add to favorites" and "Remove from favorites" when you click it.
- The reservation countdown at the top of the checkout page has a hover tooltip explaining what happens when it runs out.
- The payment section on checkout now hides the credit-card fields and shows a "you'll confirm with your wallet on the next step" note when you pick Apple Pay or Google Pay (previously it still demanded card details).
- The fee preview now reads "Estimated fees / Estimated total" with a hover tooltip listing what's included, so people aren't surprised by the final number.
- Buttons, ticket steppers, the favorite/share icons, and other tap targets have been enlarged for easier clicking on phones and tablets.
- The home page footer has a new "Already have an order? View your tickets" link, and the confirmation page can now be reached directly by order number (so you can land back on a receipt if you re-open the page).

## How to test the changes

1. Open `index.html`. Click into any event.
2. On the event page, click a track in the "Listen" section and hover the heart and share icons — both now have proper labels and the heart's state changes when clicked.
3. Without picking a tier, scroll to the right-hand summary: the "Continue to checkout" button is greyed out with the new explanation hint. Use the + button on any tier and the button becomes active.
4. Hover the "Estimated fees" line for the tooltip; click Continue to enter checkout.
5. On the checkout page, hover the "Reservation" timer at the top for its tooltip, then switch the payment method between Credit/debit, Apple-Pay-like, and Google-Pay-like — the card form should hide and a wallet note should appear for the two wallet options.
6. Try a promo code (`DOORS5` or `TONIGHT10`) to see the new green confirmation pill.
7. Back on the home page, click the new "Already have an order?" footer link to see the order-lookup receipt view.
