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
