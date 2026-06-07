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

- The big call-to-action buttons (Get Vaultkey, Download free, Get Personal, Start free trial, Talk to sales) now actually do something. Instead of silently going nowhere, each one opens a clear pop-up explaining what would happen next — for example, the trial buttons confirm a 30-day or 14-day trial and mention no card is needed.
- The smaller navigation links (Security, Enterprise, Help, Sign in) now show a small message at the bottom of the screen saying "coming soon — preview in this static demo" so you know the click registered.
- Both the pop-up and the small message can be dismissed: click the **×**, the "Got it" button, the backdrop, or press Escape.
- The Business plan's seats slider and number box now have proper labels for screen readers and assistive tools.
- On phone-sized screens, the top nav and pricing layout no longer overflow sideways. The wide feature-comparison table now scrolls inside its own container instead of pushing the whole page wide.
- Buttons are taller on mobile so they're easier to tap.

## How to test the changes

1. Open `index.html`. Click **Get Vaultkey** in the top right — a pop-up appears welcoming you to Vaultkey. Close it with the **×**, the "Got it" button, or Escape.
2. On the same page, click **Download free** in the hero — a different pop-up appears about the download starting.
3. Click **Security**, **Enterprise**, or **Help** in the top nav — a small toast message appears at the bottom of the screen.
4. Open `pricing.html`. Click **Get Personal**, **Start free 30-day trial**, and **Start 14-day trial** in the plan cards — each opens a pop-up with details specific to that plan.
5. Scroll down on `pricing.html` and click **Talk to sales →** — a pop-up confirms sales will reach out within 1 business day.
6. Shrink the browser window to phone width. The page should not overflow horizontally; the comparison table scrolls sideways inside its own area; buttons should be tall enough to tap.
