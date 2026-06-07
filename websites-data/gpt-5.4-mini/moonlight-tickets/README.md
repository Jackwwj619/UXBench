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

- The filters at the top of the discovery page now actually filter the "This week" grid. Picking a genre, venue, or price range trims the list, and an empty state appears when nothing matches.
- Each active filter now shows as a removable pill under the dropdowns, alongside a count like "7 events" and a "Clear all" button to reset everything at once.
- On an event page, the heart and share buttons now have visible "Save" / "Share" labels next to the icons, and clicking "Save" toggles a filled heart and shows a "Added to favorites" / "Removed from favorites" toast. Clicking Share shows "Link copied to clipboard".
- Clicking one of the audio-snippet rows in the artist bio now highlights it in yellow and shows a "Playing preview: ..." toast, so you get visible feedback for the play action.
- On checkout, the "Cancel order" link is renamed to "Cancel order and clear cart" to be honest about what it does, and the helper text under "Place order" now starts with a plain-English warning that clicking will charge your card and email tickets.
- Trying to place an order with a missing attendee name or cardholder name now shows a red inline error under the Place order button (and a toast), instead of a browser-default popup alert.
- The confirmation page now starts with a green "Tickets confirmed" success block, lists a "What's next" checklist (save to wallet, doors info, email delay), and has a clear "Back to events" button. If you land there without an order in this session you now see a friendly "No recent order found" message instead of being silently redirected away.
- All the +/- steppers, top-nav links, and action buttons are larger, with proper hover and focus rings. On a phone the top nav now scrolls sideways instead of disappearing.

## How to test the changes

1. Open `index.html`. Change the Genre dropdown to "Folk" — the "This week" grid should shrink to just the folk events, a "Genre: Folk" pill appears under the filters with an X, and a count like "3 events" shows on the right. Click "Clear all" to reset.
2. Click into any event. The Save and Share buttons now show labels; click Save and a "Added to favorites" toast appears at the bottom and the heart fills. Click Share for "Link copied to clipboard".
3. Scroll to "About" and click one of the audio-clip rows — the row highlights and a "Playing preview: ..." toast confirms.
4. Pick a tier, raise the quantity with the + button (it's bigger now), Continue to checkout. Without filling anything click "Place order" — a red inline error appears under the button instead of a browser alert.
5. Look at the Cancel link below the form — it should now say "Cancel order and clear cart". The helper text under the Place order button should mention the card will be charged and tickets emailed.
6. Fill in valid attendee and card details, place the order, and on the confirmation page you should see the green success block, a "What's next" list, and a "Back to events" button.
7. Open `confirmation.html` directly in a fresh tab (no order in session) — you should see "No recent order found in this session" with a "Browse events" button, not a silent redirect.
8. Shrink the browser to phone width — the top nav becomes a sideways-scrolling strip; on the event page the +/- buttons should feel comfortably big.
