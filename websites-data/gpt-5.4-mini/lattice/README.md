# Lattice DB

Lattice DB is a demo marketing site for a fictional hosted columnar database. The interesting page is the pricing one: instead of fixed plans, you pick a row (number of seats) and a column (how much data you have), and the matrix tells you what you'd pay.

> Fictional product — pricing and features are illustrative.

## What you can do

- **Read the pitch.** The home page has a short technical paragraph, a SQL example showing what queries look like, three features, and a link down to pricing.
- **Pick a cell in the pricing matrix.** Six seat tiers across the rows, six data-volume tiers down the columns. Click a cell to highlight that row and column and update the quote card on the right.
- **See how the price is built up.** The sticky quote card lists the cell's base price, classifies which tier you fall into, and has an expandable **How this is calculated** section.
- **Add features you need.** Nine add-on checkboxes adjust the quote — some as percentages of the base price, some as flat amounts.
- **Compare in detail.** Below the matrix, a 15-row feature table shows what's in each tier, and an 8-question FAQ answers common pricing questions.

## How to use it

Open `index.html` in any modern browser. Click any cell in the pricing matrix; the row and column highlight, the quote card updates, and the right tier auto-highlights below. Tick add-ons to see the monthly total move in real time.

## What was changed in this version

- Top-nav links that previously went nowhere (Docs, Customers, Sign in) now show a small "(soon)" label so it's clear they're not live yet, and clicking them does nothing instead of jumping to the top of the page.
- The **Book demo** button in the top nav now takes you to a real "Book a demo" panel at the bottom of the pricing page, where you can email the team instead of clicking into nothing.
- After you pick a cell in the pricing matrix, a short plain-English description of the tier you landed in (e.g. "Team — 5–40 seats, 50 GB–5 TB. SSO, SOC 2, 99.5% SLA included.") now appears under the quote card.
- The **How we got this number** breakdown now spells out the actual base price ($89) and the multiplied result, so the math is easy to follow.
- The add-on checkboxes are bigger and easier to tap, the whole row highlights when you hover, and the boxes themselves are larger with the brand colour.
- On a phone, the quote card moves to the top so you see your price first, the pricing matrix gets a "← swipe →" hint at the bottom showing it scrolls sideways, and the feature comparison table also scrolls horizontally without breaking the page layout.
- Footer links to Overview, Architecture, Benchmarks, Security, About, Blog and Careers are now consistent with the top nav: the Overview link works, and unfinished ones show "(soon)".

## How to test the changes

1. Open `index.html`. Hover over **Docs**, **Customers**, or **Sign in** in the top nav — each shows a "(soon)" hint and clicking does nothing.
2. Click **Book demo** in the top nav. You should land on `pricing.html` and scroll down to a new "Book a demo" card with an email-the-team button.
3. On `pricing.html`, click any cell in the matrix. Under the price quote on the right, a coloured panel should appear naming the tier (Developer / Team / Scale / Enterprise) and describing who it fits.
4. Open the **How we got this number** dropdown — the explanation should now include "Base $89 × …" and the resulting price.
5. Tick a few add-ons; the row should highlight as you hover, and the checkboxes themselves should be large and easy to click.
6. Shrink the browser window narrow (or open on a phone). The quote card should appear above the matrix, the matrix should show a "← swipe →" hint and scroll sideways, and the feature comparison table further down should also scroll sideways instead of overflowing the page.
