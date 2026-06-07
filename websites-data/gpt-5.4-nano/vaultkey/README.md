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

- The FAQ questions on the pricing page now have a smooth opening animation and a clearer hover/press effect, so it's easy to see which one you're about to expand.
- When a FAQ item opens, the chevron rotates and the panel slides into view with a small fade, instead of jumping in.
- The seats slider and the seats number box on the pricing page now have proper labels and a placeholder, so screen readers and form-autofill behave correctly.
- Navigation links, buttons, the billing toggle, and the FAQ headers on a phone are now noticeably bigger and easier to tap.
- The currently-open FAQ item gets a subtle background tint so you can tell at a glance which one is expanded.

## How to test the changes

1. Open `index.html` and click "Pricing" in the top navigation (or open `pricing.html` directly).
2. Scroll to the FAQ section. Click any closed question — the chevron rotates from ▶ to ▼ and the answer slides in with a small fade. Click the same question again and it closes.
3. The first FAQ item is open by default; notice it has a lighter background to mark it as expanded.
4. Drag the Business seats slider, then click into the number box next to it and type a value — both update each other and re-price the Business card.
5. Resize the browser to phone width. The top navigation links and the yearly/monthly toggle become noticeably larger, and FAQ headers are taller and easier to tap.
