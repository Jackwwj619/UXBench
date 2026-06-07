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

- Picking an Enterprise-tier "Contact us" cell in the matrix no longer breaks the quote card. The base, line items, and grand total all read "Contact us" or "Custom" instead of falling back to a misleading $0 figure, and the headline price number shrinks slightly to fit.
- Dead navigation links — Docs, Customers, and Sign in in the top bar, plus Overview/Docs/Architecture/Benchmarks/Security/About/Blog/Careers in the footer — have been removed or pointed to real targets, so you no longer click through to a `#` page that does nothing. The footer now has a working FAQ jump-link and a `mailto:` contact link.
- The **Book demo** button opens your mail client with a pre-filled "Lattice DB demo request" subject line instead of leading to a dead link.
- The feature-comparison table is now horizontally scrollable on narrow windows, so the columns don't crush together to the point of being unreadable on a phone.
- The add-on checkbox rows in the quote card are now full-width tap rows with proper 44px height and larger checkboxes, so it's much easier to toggle each option with a thumb.
- A new mobile layout drops the tier cards to a single column, collapses the footer to one column, lets the matrix scroll sideways with momentum, and gives the top-nav links proper tap targets.

## How to test the changes

1. Open `pricing.html` and click a cell in the bottom-right of the matrix labeled "Contact us" — the quote card on the right shows "Contact us" for both the headline price and the grand total, and any ticked add-ons are listed as "Custom" instead of dollar figures.
2. Hover or click around the top nav and footer — every visible link now goes somewhere real (Platform, Pricing, the FAQ anchor, or a `mailto:` contact). The standalone Docs / Customers / Sign-in dead links are gone.
3. Click **Book demo** in the top nav — your default mail client opens with the subject line pre-filled.
4. Resize the browser to phone width and scroll down to the feature-matrix table — you can swipe sideways to see the Developer / Team / Scale / Enterprise columns instead of them squashing.
5. Tick a few add-on checkboxes in the right-hand quote card on a small screen — each row is comfortably tall, and the checkbox itself is bigger and easier to hit.
