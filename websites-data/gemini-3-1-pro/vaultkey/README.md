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

- The "Billed yearly" line on the Family card now switches to "Billed monthly" when you flip the toggle, instead of always saying "Billed yearly" regardless of cycle.
- Typing into the seats number input is now more forgiving: empty or non-numeric values no longer reset to 3 mid-edit, and the field only clamps to the 3-200 range when you commit the change (blur or Enter).
- Pressing Enter in the seats number input commits the value and updates the price, instead of triggering a form submit or doing nothing.
- The feature comparison table now lives in a horizontally scrollable wrapper, so on a narrow screen it scrolls within its own container instead of overflowing the page.
- The FAQ accordion is now properly accessible: each toggle is a real button with `aria-expanded`, and the chevron is an inline SVG so the rotation animation no longer relies on a unicode arrow.
- The seat slider and number input both expose an `aria-label` ("Number of seats"), so screen readers describe them rather than reading "seats" twice.
- On phones the top-nav login / "Get Vaultkey" CTA buttons no longer get hidden — only the secondary nav links collapse, and the remaining buttons get 44px tap areas. The Monthly / Yearly toggle is also enlarged for touch.

## How to test the changes

1. Open `pricing.html`. Click the Monthly / Yearly toggle — the Family card's price updates and its sub-line switches between "Billed yearly" and "Billed monthly".
2. Click into the seats number input next to the slider, select all, and delete the contents — the input stays empty while you're editing (no jittery snap-back to 3). Type "350" and press Enter; the value clamps to 200, the slider updates, and the price recalculates.
3. Drag the seat slider — the number input mirrors the value live, the tier label below updates ("25–49 seats · 8% discount", etc.), and the monthly/yearly totals re-price.
4. On a phone-width window, scroll to the "Compare every feature" table — it scrolls horizontally inside its own card rather than pushing the page wider than the viewport.
5. Click the FAQ chevrons — each row opens and closes, the chevron rotates, and a screen reader announces "expanded" / "collapsed".
6. Shrink the browser to phone width on `pricing.html` — the "Log in" and "Get Vaultkey" buttons stay visible in the top nav with comfortable tap areas, and the Monthly / Yearly buttons are easier to hit.
