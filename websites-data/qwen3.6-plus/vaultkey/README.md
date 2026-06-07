# Vaultkey

Vaultkey is a demo marketing landing and pricing page for a fictional password manager. The interesting part is the pricing page: a billing toggle, a Family tier, and a Business seat slider that re-prices live as you change the number of users.

> Fictional product — pricing tiers and feature lists are illustrative.

## What you can do

- **Read a short pitch.** The landing page has a hero with the title and dual CTAs, a faux app screenshot (categorized sidebar plus a searchable item list with passkey / family / 2FA tags), a trust strip, three "why" cards, and a bottom CTA.
- **Pick a plan.** Three cards: Personal ($0 forever), Family ($3.99/mo, featured), and Business (per-seat). Switch between yearly and monthly billing — the toggle re-prices the Family and Business tiers (annual saves 20%).
- **Size a Business plan.** A seats slider (3 to 200) is paired with a number input so you can drag or type. The price classifies into five volume tiers (3–24 / 25–49 / 50–99 / 100–199 / 200+) with up to 26% volume discount as you grow. Monthly and yearly totals show side by side.
- **Reach enterprise.** A contact strip below the calculator.
- **Compare in detail.** A 25-row feature comparison table covers Vault & sync, Sharing, Security, Admin & compliance, and Support.
- **Read the FAQ.** An 8-question accordion (one open by default).

## How to use it

Open `index.html` in any modern browser. Visit `pricing.html` and drag the seats slider; the Business card updates in real time. Toggle yearly/monthly to compare the two cycles.

## What was changed in this version

- **The sign-up and sign-in buttons actually do something.** "Get Vaultkey", "Get Personal", "Start free 30-day trial", "Start 14-day trial", "Sign in", and "Talk to sales" now open a sign-up dialog with email and master-password fields. Before, these were dead links that did nothing.
- **The dialog adapts to which button you clicked.** The dialog's title and helper text change to match the plan ("Start your Family plan", "Free forever for one device", "Includes a free 30-day trial", etc.) or to "Sign in" / "Talk to sales" instead.
- **Form validation with clear errors.** If you submit the dialog with an empty or invalid email, or a password under 10 characters, the form gently flags the problem instead of submitting. A success screen confirms your email on success.
- **Easy ways to dismiss the dialog.** You can close the dialog with the × button, by clicking outside it, or by pressing Escape — and the page underneath stops scrolling while it's open.
- **The Family card's billing note keeps up with the toggle.** When you switch yearly/monthly, the small "Billed yearly · for the whole household" line under the Family price now updates to "Billed monthly" or "Billed yearly" to match.
- **Phone-friendly pricing page.** Plan cards, the seats input, the navigation, the comparison table, and the enterprise strip are tightened up at narrow widths so they don't overflow or feel cramped.
- **Bigger tap targets and clearer focus.** Buttons, the billing toggle pills, "Sign in" links, and the seats number input are larger and easier to tap on a phone, and the form inputs show a clear focus ring.

## How to test the changes

1. Open `pricing.html`. Click "Start free 30-day trial" on the Family card — a dialog should open titled "Start your Family plan" with a note about the 30-day trial. Close it with the × button, then re-open from "Get Personal"; the title and description should change to match the Personal plan.
2. With the dialog open, click Continue without filling anything in — the form should refuse to submit and highlight the missing fields. Fill in a valid email and a password of at least 10 characters and submit; you should see a "You're on the list ✓" screen showing your email.
3. Open the dialog again from "Sign in" in the top nav, then "Talk to sales" in the enterprise strip — the title and helper text should reflect each one. Press Escape to close.
4. On the pricing page, switch the billing toggle between Yearly and Monthly. The Family card's price and the small note below it should both update (from "Billed yearly" to "Billed monthly" and back).
5. Resize the browser to phone width. The plan cards, comparison table, and seats slider/number should all stay readable and tappable, and the top nav should not overflow the screen.
