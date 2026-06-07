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

- The top-bar links that used to be dead ("Security", "Enterprise", "Help", "Sign in", "Get Vaultkey", "Download free") now actually jump to the matching section on the pricing page or scroll to the plans area instead of doing nothing.
- The "Talk to sales →" button in the enterprise strip now opens an email with a pre-filled "Enterprise inquiry" subject.
- The Family plan's billing note now updates with the toggle — it says "Billed yearly · for the whole household" or "Billed monthly · for the whole household" instead of always saying yearly.
- The Business price box now leads with the matching cadence: yearly billing shows the per-year total on top with the per-month equivalent below it, and monthly billing flips them, so the headline number always matches the selected cycle.
- The Business volume tier line for the largest size now reads "200 seats · max self-serve tier · talk to us for more" and the enterprise strip explains that 200+ seats need a custom quote.
- The feature comparison table is now wrapped in a horizontal scroll area on narrow screens so it no longer overflows the page or breaks the layout.
- The FAQ items now have an open-state highlight (indigo tint, indigo left bar) and a small slide-in animation when you expand a question.
- On phone-sized screens, the yearly/monthly billing toggle stretches across the full width, the plan cards have tighter padding, the enterprise CTA button goes full width, and the comparison table uses smaller text so everything fits.
- Buttons, links, and FAQ rows are noticeably taller, making them easier to tap.

## How to test the changes

1. Open `index.html`. Hover the top navigation — every link now changes color and clicking "Security", "Enterprise", or "Help" jumps to that section on the pricing page instead of doing nothing.
2. Open `pricing.html`. Click the "Monthly" toggle — the Family card's note flips from "Billed yearly" to "Billed monthly". Toggle back and forth a few times.
3. On the Business card, drag the seats slider up to 50. While the toggle is on "Yearly", the bigger number on top is the per-year total ("Per year") with the per-month equivalent below; switch to "Monthly" and the per-month total moves to the top.
4. Push the slider all the way to 200 — the tier note now reads "max self-serve tier · talk to us for more", and the enterprise strip below mentions custom pricing past 200 seats.
5. Click the "Talk to sales →" button in the enterprise strip — your email client opens with a pre-filled "Enterprise inquiry" subject.
6. Scroll to the FAQ section and click any closed question — it highlights with an indigo tint and the answer slides in.
7. Shrink the browser window to phone width — the yellow/monthly toggle now spans the full width as two big buttons, the comparison table can be swiped sideways without breaking the page, and the "Talk to sales" button becomes full width.
