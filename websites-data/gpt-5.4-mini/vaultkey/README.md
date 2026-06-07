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

- The big "Get Vaultkey" button in the top nav now takes you to the pricing page instead of going nowhere. On the pricing page itself, it jumps you down to the Personal plan card.
- The "Download free" hero button on the landing page has been renamed to "Get the free plan" and now jumps to the Personal plan on the pricing page (instead of being a dead link).
- The "Get Personal" button on the pricing page now reads "Get Personal — it's free" and scrolls down to the FAQ so you can read the answers before committing. The Family "Start free 30-day trial" button does the same.
- The "Talk to sales →" button at the bottom of the pricing page is now a working email link that opens your mail app instead of being a dead button.
- The "Enterprise" and "Help" links in the top nav of the pricing page now scroll down to the Enterprise strip and the FAQ respectively.
- Top-nav links that don't have a destination yet (Security, Sign in, and Security/Enterprise/Help on the home page) are now shown in a muted grey style with a "Coming soon" tooltip, and clicking them no longer jumps the page to the top.
- The Business seat slider and number box now have clear labels for screen readers, and the number box has a "Seats" placeholder so it's obvious what it expects.
- On phones and narrow tablets the page layout no longer overflows sideways: the billing toggle fills the width with bigger tabs, the seat slider and number box stack neatly, the comparison table can be scrolled sideways, and the Sign-in / Get Vaultkey buttons in the nav have much larger tap targets.

## How to test the changes

1. Open `index.html`. Click "Get Vaultkey" in the top right — it should take you to the pricing page. Back on the home page, click the "Get the free plan" button under the hero — it should land you on the pricing page scrolled down to the Personal card.
2. Hover over "Security", "Enterprise", "Help", and "Sign in" in the top nav of either page — they appear muted and show a "Coming soon" tooltip. Clicking them does nothing (the page no longer jumps to the top).
3. On `pricing.html`, click "Enterprise" in the top nav — it should scroll down to the "Need bigger?" strip. Click "Help" — it should scroll down to the FAQ.
4. Click "Talk to sales →" at the bottom of the pricing page; your email client should open with a message addressed to sales@vaultkey.io.
5. Click "Get Personal — it's free" or "Start free 30-day trial" — both should scroll you down to the FAQ section.
6. Shrink the window to phone width. The billing toggle should fill the row with two roomy tabs, the seat slider and number box should stack one per line, the comparison table should scroll sideways, and the "Sign in" / "Get Vaultkey" buttons should be noticeably larger to tap.
