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

- The **Activity** tab in the bottom bar now opens a real Activity screen with grouped transactions ("Today", "Yesterday", and recent days). Before, this tab was a dead end.
- The **Receive** screen's segmented tabs (In-app / Bank / Crypto) now actually switch the content underneath. "Bank" shows account/routing numbers with copy buttons; "Crypto" shows a wallet address and lets you switch between Ethereum and Bitcoin networks with a warning about sending on the right network.
- The **Send** flow no longer just pops up a fake alert. Picking a recipient (or searching for one) selects them; clicking **Send** now opens a confirmation sheet showing who you're sending to and how much, with a confirm/cancel choice. Sending without an amount or a recipient now shows a friendly inline error instead of silently failing.
- The dialpad on the Send screen now prevents you from entering more than two decimal places and gives a brief shake plus a toast if you try.
- The **bell** icon at the top of the Home screen now opens a notifications panel and clears the unread badge.
- The **Sign out** button now asks "Are you sure?" before signing you out.
- "Copy" buttons throughout the app (your handle, bank account number, crypto address) now show a quick "Copied" confirmation toast.
- Routine actions across the app use a small toast at the bottom of the phone instead of the browser's blocking alert pop-up.

## How to test the changes

Open `index.html` in any modern browser (or resize to a narrow phone width).

- Tap the **Activity** icon in the bottom tab bar — you should see a list of transactions grouped by day.
- Tap the **Receive** tab. Switch between **In-app**, **Bank**, and **Crypto** at the top — the content underneath should change. Inside **Crypto**, switch between **Ethereum** and **Bitcoin** and watch the address and helper text update.
- Tap any of the small **Copy** buttons (your handle, bank fields, crypto address) — a "Copied" toast should appear briefly.
- Tap the **Send** tab. Click **Send** without entering an amount or picking a recipient — an inline error should appear. Pick a recent contact or type a name, type an amount on the dialpad, and click **Send** — a confirmation sheet should appear; **Confirm** completes the send, **Cancel** dismisses it.
- On the Send dialpad, type more than two decimals after the decimal point — the amount flashes and a toast says "Maximum 2 decimal places".
- On the Home screen, tap the bell icon at the top-right — the notifications panel should slide in and the red "3" badge clears.
- Tap **Account** in the bottom bar, then **Sign out** — a confirmation sheet should ask before signing you out.
