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

- The **Activity** tab now actually opens a screen of its own, with seven sample transactions grouped by date (Yesterday, May 12, May 10, May 6) and four filter chips at the top (All / Received / Sent / Card).
- Tapping the Received / Sent / Card chips on the Activity screen narrows the list to just those transactions, hides empty date headings, and shows a friendly "No activity in this view" panel with a "Show all activity" button if nothing matches.
- Tapping any transaction row now shows a small confirmation toast at the bottom of the phone (e.g. "Sent — details (fixture)") instead of being silently unresponsive.
- On the Send screen, the **Continue** button is now greyed out until you've both entered an amount and picked a recipient. A small helper line above it tells you what's still missing ("Enter an amount...", "Pick a recipient to send $48.00", "Ready to send $48.00 to Theo").
- The five recipient avatars on the Send screen now actually respond to a tap — the chosen contact gets a green highlight and the helper line updates with their name.
- Tapping a quick-amount chip ($20 / $50 / $100 / Max) on the Send screen now leaves that chip highlighted in green so you can see which one you used.
- Pressing **Continue** with a valid amount and recipient now shows a toast like "Reviewing $48.00 to Theo…" instead of a browser alert.
- The four small buttons that previously did nothing — the bell icon, the Swap and Top up quick actions, the Activity filter, and the Account gear — now each show a short toast explaining what they would do.
- Settings rows on the Account screen now show the name of the row you tapped in a "X — coming soon" toast, instead of a generic browser alert.
- Sign out now slides up a proper confirmation sheet from the bottom of the phone ("Sign out of Harbor?") with a red **Sign out** button and a **Cancel** button, instead of doing nothing.
- The Receive segment tabs (In-app / Bank / Crypto) now actually swap the content underneath: each tab shows the matching identifier (handle, last-4 routing number, or BTC address) and the bottom note changes to explain that channel's timing.
- The **Send link** and **Save image** buttons on the Receive screen now flash a green "✓ Link copied" / "✓ Saved to Photos" confirmation when tapped.
- All the small icon buttons (bell, back, head-action gear, quick-amount chips, segment tabs, share buttons) have grown to at least 36-44 pixels tall so they're easier to tap on a real phone, and the settings rows are taller and more comfortable to reach.

## How to test the changes

1. Open `index.html`. Tap **Activity** in the bottom tab bar — a new screen opens listing seven sample transactions grouped under "Yesterday", "May 12", "May 10", and "May 6".
2. On the Activity screen, tap **Received**, then **Sent**, then **Card** in the row of filter chips — the list shrinks each time, date headers hide if their group is empty, and an empty-state panel appears if no items match. Tap **All** to bring everything back.
3. Tap any transaction row — a small dark pill appears at the bottom saying e.g. "Sent — details (fixture)".
4. Tap **Send** in the bottom tab bar. The **Continue →** button is greyed out and the line above it reads "Enter an amount and pick a recipient to continue."
5. Tap a few digits on the dialpad — the line updates to "Pick a recipient to send $1.23." Tap one of the five circle avatars (Theo / Priya / Maren / Rosa / More) — that avatar gets a green highlight and the line changes to "Ready to send $1.23 to Theo." The Continue button is now fully colored.
6. Tap **$50** in the quick-amount chips — the chip turns green and the amount jumps. Tap **Continue** — a toast says "Reviewing $50.00 to Theo…" instead of a browser alert.
7. Tap **Home**, then the small bell icon in the top right — a toast appears ("No new alerts since this morning"). Tap **Swap** and **Top up** on the balance card — each shows its own toast.
8. Tap **Receive** in the bottom tab bar, then tap **Bank** — the handle box now shows "Routing · last 4" and "****-7421", and the small print at the bottom changes to mention ACH timing. Tap **Crypto** to see a BTC address and confirmation-time note. Tap **Send link** — the button briefly turns green and reads "✓ Link copied".
9. Tap **Account**, then any row in the settings list — a toast names the row ("Linked cards — coming soon"). Tap the gear in the top right — another toast appears.
10. Scroll to the bottom of the Account screen and tap **Sign out** — a confirmation sheet slides up from the bottom with a red Sign out button and Cancel. Tap Cancel (or the dimmed background) to close.
