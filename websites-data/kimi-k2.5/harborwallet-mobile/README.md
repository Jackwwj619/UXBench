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

- The **Activity** tab in the bottom bar now actually opens an Activity screen with a full list of recent transactions (sent, received, refunds, card spend), instead of going nowhere.
- The Send screen now lets you pick a recipient. Tapping a face in the "Recent" row highlights it, the Continue button updates to say "Continue → Theo" (or whoever you picked), and the button stays greyed-out until you enter both an amount and a recipient.
- All the buttons across the app that used to pop up an old-school browser alert (Sign out, settings rows, Top up, Swap, the notifications bell) now show a small toast at the top of the phone instead, which is much less disruptive.
- The settings rows on the Account screen are now real buttons with proper hover and focus highlighting, and each shows a toast that names the section you tapped (e.g. "Personal info").
- Buttons, the back arrow, the contact avatars, and the sign-out button are all larger to be easier to tap on a phone.

## How to test the changes

1. Open `index.html`. Tap **Activity** in the bottom tab bar — a list of six transactions appears, with arrows for sent/received and a card icon for card spend.
2. Tap **Send** in the bottom tab bar. The Continue button at the bottom is greyed out. Type an amount on the dialpad — still greyed out. Tap one of the avatars in the "Recent" row (e.g. Theo) — it gets a green ring, a toast says "Recipient: Theo", and the Continue button lights up and reads "Continue → Theo".
3. Go to the **Account** tab. Tap any settings row like "Security & passkeys" — a small dark toast appears at the top with the row's name. Tap "Sign out" — a "Signed out" toast appears.
4. Go back to the **Home** tab. Tap the bell icon in the top right — a "Notifications" toast appears. Tap "Top up" or "Swap" on the balance card — each shows its own toast.
