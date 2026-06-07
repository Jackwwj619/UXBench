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

- Tapping a row on the Account screen (Personal info, Security & passkeys, Linked cards & banks, etc.) now opens a real **Security & passkeys** detail screen with a "Your account is protected" banner, instead of popping up a plain "Settings open" message box.
- The new Security detail screen has its own sections — Sign-in (Passkeys, App passcode, Face ID, Two-factor), Sessions & devices, and Privacy — and a back arrow at the top to return to the Account screen.
- The gear icon at the top of the Account screen now opens that same Security screen and has a proper label for screen readers.
- A small "Harbor Wallet · v4.2.1 · build 4218" line now appears at the bottom of the Account screen.
- The back button on detail screens is now a larger, rounder tap target and gives a brief press-down animation when tapped.
- Settings rows, the sign-out button, and other action buttons throughout the app are taller and easier to tap with a thumb, with a subtle highlight while you're pressing them.

## How to test the changes

1. Open `index.html` and tap the **Account** tab at the bottom. Tap **Security & passkeys** in the list — instead of a "Settings open" alert, a new screen slides in with a green "Your account is protected · Last security check · 2 days ago" banner.
2. On the new Security screen, scan the three sections (Sign-in / Sessions & devices / Privacy) — each row shows a status like "On," "SMS," or "2 active." Tap the back arrow in the top-left to return to the Account screen.
3. Back on the Account screen, tap the gear icon in the top-right header — it opens the same Security screen.
4. Tap any other row on the Account screen (e.g. **Linked cards & banks** or **Currencies & regions**) — it also opens the Security screen rather than an alert pop-up.
5. Scroll to the bottom of the Account screen — a small grey "Harbor Wallet · v4.2.1 · build 4218" line is visible above the tab bar.
6. Press and hold any settings row or the sign-out button — it visibly dims briefly to confirm the touch.
