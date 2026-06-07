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

- **Recent recipients are now tappable.** Each face in the "Recent" row on the Send screen is a real button you can pick, and your choice is highlighted with a green ring around the avatar and a bolder name.
- **You must pick someone before sending.** The Send button stays greyed out until you have both typed an amount and chosen a recipient, with a friendly "Choose a recipient to continue" hint shown right under the amount.
- **Insufficient-funds warning.** Type or tap an amount bigger than your balance and the amount turns red, and a red message tells you exactly how much you actually have available.
- **No more empty-amount popup.** The old "Enter an amount" browser alert is gone — the Send button simply stays disabled until the amount and recipient are valid.
- **The confirmation now says who you're paying.** The mock "Sending $X" alert now includes the recipient's name, so it's clear the recipient choice was respected.
- **Bigger, easier-to-tap controls.** The round back button, header action buttons, and the quick-amount chips ($20 / $50 / $100 / Max) are all larger so they're easier to hit with a thumb on a phone.

## How to test the changes

1. Open `index.html` and tap the **Send** tab at the bottom. The big blue **Send** button at the bottom of the screen should start out greyed out.
2. Tap a few digits on the dialpad to enter, say, `25`. The Send button is still greyed out, and a small message under the amount says "Choose a recipient to continue".
3. Tap one of the faces in the Recent row (e.g. Theo). A green ring appears around their avatar and their name turns green/bold. The Send button now lights up.
4. Tap **Send** — the confirmation message should mention the recipient's name (e.g. "Sending $25.00 to Theo").
5. Clear the amount and tap **Max**, or type a number bigger than your balance like `9999`. The big amount should turn red and a red message should appear telling you the available balance. The Send button greys out again.
6. Shrink the browser to phone width — the back button, header actions, and quick-amount chips should all feel comfortably sized for tapping.
