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

- The **Activity** tab in the bottom bar used to be a dead tab — now it has a real screen showing a Money-in / Money-out summary and a date-grouped list of transactions you can scroll through.
- The Receive screen's **In-app / Bank / Crypto** tabs now actually switch content. Bank shows account, routing, and bank-name rows; Crypto shows a wallet address in a monospaced font with appropriate "confirmation" copy.
- The Send screen now lets you tap a recent contact to pick them as the recipient (Theo, Priya, Maren, Rosa). The selected contact gets a green highlight, and the search box filters the recent list as you type, showing a "No matching contacts" message if nothing matches.
- Tapping **Send $X.XX** without picking a recipient or with a zero amount no longer fires a browser `alert()`. A red inline error appears at the bottom of the screen explaining exactly what's missing.
- Successful actions (send, copy handle, settings, sign-out stubs) now show a friendly toast at the bottom of the phone instead of jarring `alert()` dialogs.
- The amount display while you type now keeps the trailing decimal point and partial cents (e.g. `1,234.5`) instead of jumping straight to the rounded number, so it's clearer what's happening.
- All buttons, tabs, and rows are now at least 44px tall, so the bell icon, back button, "$20/$50/$100/Max" chips, Receive tabs, and bottom tab bar are all comfortably tappable.

## How to test the changes

1. Open `index.html` and tap the **Activity** tab at the bottom — you should see a "Money in / Money out" summary and a list of yesterday's and earlier transactions.
2. Go to the **Receive** tab. Click **Bank** — the handle row swaps for account / routing / bank-name details. Click **Crypto** — a long wallet address appears in a monospaced font with crypto-specific copy.
3. Go to the **Send** tab. Tap a contact like "Priya" so they get a green ring, type an amount on the dialpad, then tap the big green send button — a toast confirms "Sent $X.XX to @priya.shah".
4. On the Send tab, clear the amount (or leave it at $0) and tap send without picking a recipient — a red inline error appears at the bottom instead of an alert. Then type in the search box: typing "the" filters the recents to only Theo.
5. On the Receive tab, tap **Copy** — a toast confirms the handle was copied, and the button briefly says "✓ Copied".
6. Type "10.5" on the dialpad — the display reads `10.5` while you're typing instead of jumping to `10`.
