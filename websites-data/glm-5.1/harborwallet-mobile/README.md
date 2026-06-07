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

- The Receive screen's Bank and Crypto tabs now actually show something. Bank shows account holder, routing, and account numbers with their own Copy buttons; Crypto lets you pick a network (Bitcoin, Ethereum, Solana) and copy a wallet address. Previously only the In-app QR code was visible no matter which tab you picked.
- Copy buttons now show a brief "Copied to clipboard" message at the bottom of the screen and a check-mark on the button itself, so you can tell the copy actually worked.
- The bell, Swap, Top up, QR-scan, and Settings buttons used to do nothing. Each now opens a small bottom sheet explaining what that area does, with a "Got it" button to dismiss.
- Tapping Sign out no longer does nothing — it opens a confirmation sheet asking "Sign out of Harbor Wallet?" with Cancel and Sign out buttons.
- Tapping any row in the settings list now opens an in-app sheet with the section's name, instead of a generic browser pop-up alert.
- Send link, Save image, and Share buttons on the Receive screen now show a friendly confirmation toast when you tap them.
- Buttons, icons, header pills, and tab targets throughout the app are noticeably larger and easier to tap with a thumb on a real phone.
- Screen readers now announce meaningful names for the back, settings, share, QR scan, and notifications icons, and the In-app / Bank / Crypto tabs are properly recognized as a tab group.

## How to test the changes

1. Open `index.html` and go to the **Receive** tab (bottom bar). Click the **Bank** tab — you should see account-holder details and Copy buttons. Click any **Copy** button and watch for the small "Copied to clipboard" message near the bottom.
2. Still on Receive, click the **Crypto** tab. You should see a network selector (Bitcoin / Ethereum / Solana) and a copyable wallet address.
3. Go to **Home** and click the bell icon in the top right — a sheet should slide up listing your three unread notifications. Tap "Got it" to dismiss. Try the same with **Swap**, **Top up**, and the **QR** button on the Send screen.
4. Go to the **Account** tab and click **Sign out** at the bottom. A confirmation sheet should ask if you're sure, with Cancel and Sign out buttons. Tapping Cancel closes the sheet; tapping Sign out shows a "Signed out" message.
5. Still on Account, tap any settings row (e.g., Notifications, Security). A sheet with that section's name should slide up instead of a browser alert popup.
6. Shrink your browser to phone width — the larger buttons (Send / Receive / Swap / Top up, the dialpad, the tab bar icons) should all be comfortably tap-sized.
