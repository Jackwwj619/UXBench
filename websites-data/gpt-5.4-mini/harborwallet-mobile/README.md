# Harbor Wallet

Harbor Wallet is a demo iOS-style mobile wallet app — the kind of consumer wallet you'd use to check your balance, send money, receive payments, and view your transaction history. The layout simulates a phone (390 × 844) on a desktop, and goes edge-to-edge on a real phone.

> Fictional product — balances, contacts, and transactions are sample data. Nothing is sent or received.

## What you can do

- **Check your balance.** The home screen shows your USD balance with four quick actions (Send / Receive / Swap / Top up), your assets across USD, BTC, and ETH, and recent activity color-coded by direction (incoming, outgoing, card spend).
- **Send money.** Pick a wallet, type an amount on the on-screen dialpad, use quick chips ($20 / $50 / $100 / Max), or search for a recipient. The amount auto-formats as you type.
- **Receive money.** Switch between in-app, bank, and crypto using the segmented tabs. A QR code is drawn for you; the **Copy** button copies your `@milena.harlowe` handle.
- **Manage your account.** The profile screen shows your tier (Harbor Plus), seven settings rows, and a sign-out button.
- **Get notified.** The bell icon shows three unread notifications.

## How to use it

Open `index.html` in any modern browser. Use the bottom tab bar (Home / Send / Receive / Activity / Account) to move between screens. The dialpad on the Send screen builds the amount character by character — backspace removes a digit, **Max** fills your full balance. The status bar clock at the top updates as you watch.

## What was changed in this version

- The gear icon at the top of the Account screen is now a clearly labeled "Settings" button. Tapping it scrolls down to the settings list and briefly highlights it, so the icon no longer looks like a dead end.
- Tapping a row in the settings list (Personal info, Security, Linked cards, etc.) now shows a small "fixture only" message at the bottom of the screen naming the row you tapped, instead of a generic browser pop-up that interrupts the flow.
- Each settings row now visibly responds to the tap — it briefly highlights green and the little arrow on the right nudges sideways, so you can see your tap registered.
- Settings rows can now be reached and activated with the keyboard (Tab to move between them, Enter or Space to open one).
- The new Settings button, the settings rows, and the Sign-out button are now taller, giving thumbs a bigger target on a phone.
- A clear green outline now appears around buttons and rows when you focus them with the keyboard, so it's easy to see where you are.

## How to test the changes

1. Open `index.html` and tap the **Account** tab in the bottom bar.
2. Tap the new **Settings** button in the top-right of the Account screen — the page should smoothly scroll to the settings list and the list should briefly glow green.
3. Tap any row in the settings list (for example **Security & passkeys**). A small dark toast should appear near the bottom of the phone that reads "Security & passkeys — fixture only" and then fade away — no browser alert should pop up.
4. Watch the row you tapped — it should briefly turn pale green and the small chevron on the right should slide slightly to the right.
5. Click anywhere on the page, then press Tab repeatedly until focus lands on a settings row; press Enter and confirm the same toast appears.
6. Resize the browser narrow or open on a phone — confirm the Settings button, each settings row, and the Sign-out button are all easy to hit with a thumb.
