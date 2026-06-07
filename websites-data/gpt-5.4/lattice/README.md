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

- The "Docs", "Customers", and "Sign in" links in the top nav (and several footer links) that don't lead anywhere are now visibly greyed out and stay put when clicked, with a tooltip explaining they're inactive in the demo.
- The "Book demo" button in the top nav now jumps to a new "Talk to us" section at the bottom of the Pricing page instead of nowhere.
- When you pick a cell in the pricing matrix, the "How we got this number" panel now opens automatically and shows the math step-by-step (base price × seat multiplier × data multiplier = total) with the seat tier and data tier named in plain English.
- A short one-line formula now also appears just above that breakdown, like "$89 × 3.2 (seats) × 3.6 (data) = $1,026/mo".
- When you pick an Enterprise / "Contact us" cell, a purple panel now appears explaining that pricing is custom, that the add-on numbers are indicative only, and offering a "Talk to sales" button that jumps to the contact section.
- Each percentage add-on row in the final cost list now shows its formula inline (for example "10% × $1,026 ≈ $103"), and a footnote clarifies that percentages are taken from the base only, not stacked.
- The pricing matrix now scrolls sideways on phones, with a small "← scroll for more columns →" hint above it, and the seat-tier names stay frozen on the left as you scroll. Column headers stay frozen at the top.
- The first FAQ entry ("What counts as data volume?") is now expanded by default. FAQ rows are bigger and easier to tap, with a clearer + / − marker.
- Matrix cells can now be triggered with the spacebar (not just Enter) when navigating by keyboard, and have a clear focus outline and a screen-reader-friendly label like "16 – 40 seats, 50 – 250 GB: $1,026 per month".
- Most buttons, links, checkboxes, and the matrix cells themselves are larger and easier to tap on phones; the footer reflows to two columns and the top-nav inactive links are hidden on small screens.

## How to test the changes

1. Open `index.html`. In the top nav, click "Docs", "Customers", or "Sign in" — nothing happens, and they look greyed out. Hover one to see the "Demo site — … is not available" tooltip.
2. Click "Book demo" in the top nav — the page scrolls to a "Talk to us" section at the bottom of `pricing.html`.
3. On `pricing.html`, click any cell in the matrix — the "How we got this number" panel below opens by itself and shows the math line by line ("Base price $89", "× Team size (6 – 15 seats) ×1.8", etc.), with a one-line formula in a purple pill just above it.
4. Click a "Contact us" cell (the dark cells in the bottom-right corner). A purple "Enterprise — custom pricing" panel now appears in the quote card with a "Talk to sales" button that scrolls to the contact section.
5. Tick a percentage add-on like "Advanced security" — the final cost list at the bottom now shows the math inline (for example "10% × $… ≈ $…"), and there's a small note about percentages not stacking.
6. Shrink the browser to phone width on `pricing.html` — a "← scroll for more columns →" hint appears above the matrix. Scroll the matrix sideways and notice the seat-row labels stay pinned on the left while column headers stay pinned to the top.
7. Scroll to the FAQ — the first question is open by default, and each row has a clearer + or − marker.
8. Use Tab to move through the matrix cells; press the Space bar on a cell — it gets selected just like clicking it, with a visible focus outline.
