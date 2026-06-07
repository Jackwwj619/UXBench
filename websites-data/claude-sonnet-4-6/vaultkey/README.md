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

- Buttons and nav links that previously went nowhere (Sign in, Get Vaultkey, Download free, Start trial, Get Personal) now pop up a clear "join the waitlist" message instead of silently doing nothing.
- The landing page has a new "Security at a glance" section with four points (AES-256 encryption, SOC 2 audit, passkey support, public bug bounty), and the "Security" link in the top nav now scrolls down to it.
- The "Talk to sales" button on the pricing page is now a working email link that opens your mail app with the subject pre-filled, instead of being a dead button.
- The FAQ at the bottom of the pricing page now behaves like a proper accordion: opening one question closes the others, instead of letting them all pile open.
- On narrow screens (phone or small tablet), the wide feature-comparison table now scrolls sideways with a "Swipe to see every plan" hint instead of squashing or overflowing the page.
- A new hamburger menu (☰) appears on small screens to open and close the top nav.
- The "Help" link on the pricing page now scrolls down to the FAQ.

## How to test the changes

1. Open `index.html`. Click "Get Vaultkey", "Sign in", "Enterprise", or "Download free" — each shows a toast at the bottom of the screen explaining the product is in private beta.
2. Scroll to the bottom of `index.html` to see the new "Security at a glance" section, or click "Security" in the top nav to jump to it.
3. Open `pricing.html`. Click "Talk to sales →" near the bottom — it should open your mail program with the subject filled in. Click "Help" in the top nav to jump to the FAQ.
4. Open the FAQ section and click two different questions in a row — only one should be open at a time.
5. Narrow the browser window. A "☰" button appears top-right; click it to open and close the nav. Scroll the feature-comparison table sideways — you should see a hint about swiping.
