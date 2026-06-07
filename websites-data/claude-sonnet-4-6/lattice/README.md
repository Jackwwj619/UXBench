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

- The "Book demo" button in the header now opens a working pop-up with a contact email and phone number, instead of doing nothing.
- The "Docs", "Customers", and "Sign in" nav links (and the footer links) now open a friendly "Coming soon" pop-up so you know they're not broken.
- The add-on checkboxes on the pricing page are now grouped under clear headings — "Percentage of base", "Flat monthly", and "Usage-based" — so you can see at a glance how each one affects the price.
- When you land on the pricing page, an example cell is pre-selected with a small hint and a "Clear" button, so the quote card is no longer empty until you click.
- If you pick a cell in the Enterprise tier, a new "Email sales / Book a call" panel appears in the quote card with a realistic starting price.
- A small summary bar appears at the bottom of the screen on narrow windows, showing the selected price and tier as you scroll.
- The wide pricing matrix and feature comparison table now scroll sideways cleanly on smaller screens, with a hint arrow so it's obvious you can swipe.

## How to test the changes

1. Open `index.html`. Click **Book demo** in the top-right corner — a pop-up should appear with contact details. Click **Docs** or **Sign in** to see the "Coming soon" pop-up.
2. Open `pricing.html`. Notice the pre-selected example cell and the **Clear** button above the matrix.
3. Look at the **Add-ons** card on the right — the checkboxes are split into three labelled groups.
4. Click a cell in the bottom-right of the matrix (Enterprise tier) — the quote card should reveal an "Email sales" button.
5. Shrink the browser window narrow (or open on a phone). A small summary strip appears at the bottom, and you can scroll the matrix sideways with the hint arrow visible.
