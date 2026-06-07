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

- Placeholder links in the top navigation and footer (Docs, Customers, Sign in, Book demo, Architecture, etc.) now show a small "soon" badge and, when clicked, briefly say "coming soon" instead of jumping to a dead page.
- Clicking the current page's link in the top nav (e.g., "Pricing" while on the pricing page) now smoothly scrolls back to the top instead of reloading.
- On phones, the pricing matrix shows a hint at the top reading "Scroll to see all data-volume columns", and the seat-tier labels stay frozen on the left as you swipe sideways.
- The "How this is calculated" panel in the quote card now looks like a proper purple button you can tap, with a chevron that rotates when you open it.
- The add-on checkboxes are larger and a row of them lights up when you hover over it, so they're easier to tick on phones.
- The plan-comparison table below the matrix now scrolls sideways inside its own frame on small screens instead of squashing.
- FAQ rows show clearer plus/minus icons that line up neatly on the right.
- Top-nav links have bigger tap targets and a subtle purple background on hover, and the page headings shrink to fit better on small screens.

## How to test the changes

1. Open `index.html` and look at the top-right links — each placeholder link (Docs, Customers, Sign in, Book demo) shows a small "soon" tag. Click one and it briefly changes to "Docs — coming soon" without navigating away.
2. On `index.html`, click the "Platform" link in the top nav while you're scrolled down the page — the page should smoothly scroll back to the top.
3. Open `pricing.html` and shrink the browser to phone width. A hint reading "Scroll to see all data-volume columns" appears above the matrix, and the row labels stay pinned to the left as you scroll sideways.
4. On `pricing.html`, click any matrix cell, then click the "How this is calculated" bar in the quote card on the right — it should expand with a rotating chevron, styled as a clear purple button.
5. Tick a few add-on checkboxes on the pricing page — the rows are taller and the hovered row lightly tints purple.
6. Scroll down to the plan comparison table on `pricing.html` and shrink the window — the table scrolls horizontally inside a framed box rather than overflowing the page.
7. Click any FAQ row at the bottom — the "+" turns into a "−" sitting flush on the right.
