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

- Each cell in the pricing matrix now announces itself properly to screen readers — e.g. "10–24 seats, 1–10 GB: $99, Starter tier" — instead of just reading out the dollar number.
- You can now press **Space** as well as **Enter** to pick a matrix cell with the keyboard, and the focused cell has a clear outline so you can see where you are.
- The selected cell now has a stronger highlight (a thicker inner border) so it's more obvious which one you picked.
- On phones and narrow screens, the matrix scrolls sideways smoothly with a "← Swipe to see all data volumes →" hint above it. The first column (seat tiers) sticks in place as you scroll, so you don't lose track of which row you're on.
- The "Enterprise" cells in the matrix now have a soft purple background, making it visually obvious that those need a sales conversation instead of a self-serve price.
- Add-on rows on the right are now bigger and easier to tap (taller hit area, hover highlight, larger checkboxes), so checking add-ons on mobile is much more forgiving.
- Top nav links, the brand, and other tap targets are all at least 44 pixels tall on phone screens.

## How to test the changes

1. Open `pricing.html`. Tab into the matrix and use arrow keys to focus a cell — a clear purple outline shows where focus is. Press Space (or Enter) — the cell selects and the right-side quote card updates.
2. Click a cell in the right two columns (the "Contact us" cells) — they have a soft purple background to set them apart from the priced cells.
3. Click any normal cell, then click another — the previously selected cell loses its highlight and the newly selected one gains a thicker inner border so it's clearly the active one.
4. Shrink the browser to phone width. A "← Swipe to see all data volumes →" hint appears above the matrix. Scroll the matrix sideways — the seat-tier column on the left stays fixed while the price columns slide.
5. On the same narrow window, tick a couple of add-ons in the right-hand list — the rows feel taller and easier to tap, and the checkbox itself is larger.
6. Use a screen reader (or hover) over any cell — you should hear/see a description like "100–249 seats, 100–500 GB: $999, Growth tier".
