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

- The landing page now actually loads the page's script, so toggles, sliders, and the FAQ work there too.
- Placeholder navigation and footer links (the "#" ones) now show a polite "coming soon" message at the bottom of the screen instead of jumping silently to the top.
- The billing toggle on `pricing.html` now also updates the Family card's small caption to say "Billed yearly" or "Billed monthly", and the Business "Per year" line spells out "(20% off applied)" or "(no discount)" so it's clear what the price reflects.
- The seats slider thumb is larger and easier to grab on a touchscreen, and typing a number outside 3–200 in the seats box now snaps back to a valid value when you finish editing.
- Screen readers now announce updates to the seat count and clearly label the slider and the seats number box.
- The FAQ accordion now flips the arrow between ▼ and ▲ when items open and close, and shows the open/closed state to screen readers and keyboard users.
- Buttons, navigation links, and pricing tabs are bigger and easier to tap on phones, and the long comparison table now scrolls sideways on small screens instead of squishing.

## How to test the changes

1. Open `index.html` and click any of the navigation links at the top, or the small links in the page footer — instead of nothing happening, a small "coming soon" toast should appear at the bottom of the screen.
2. Go to `pricing.html`. Toggle between Yearly and Monthly — watch the small caption under "Family" change to "Billed yearly · for the whole household" vs "Billed monthly · for the whole household", and the Business "Per year" row label change between "(20% off applied)" and "(no discount)".
3. Drag the seats slider on the Business card — it should feel easier to grab. Then type `9999` into the number box next to it and click away — the value should snap down to 200.
4. Use the Tab key to move focus onto the slider; a screen reader should announce the labelled control and the new seat total as you change it.
5. Scroll to the FAQ at the bottom and click a question — the arrow should switch between ▼ and ▲. Tab through with the keyboard to confirm each question is a proper toggle.
6. Resize the browser to phone width — navigation links, buttons, and the billing toggle should all feel comfortably tap-sized, and the long comparison table should scroll sideways within its section rather than overflowing the page.
