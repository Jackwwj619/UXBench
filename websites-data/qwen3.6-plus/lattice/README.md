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

- **Cleaner top navigation.** The header links are now focused on what the demo actually contains — Features and FAQ jump to the relevant sections on the pricing page, instead of pointing at empty placeholder links like Docs, Customers, or Sign in.
- **Footer links go somewhere.** The footer links now lead to real sections of the site (Overview, Pricing, Features, FAQ) instead of dead links, and the Company column makes it clear this is a fictional demo.
- **Easier scrolling on phones for the pricing matrix.** On narrow screens the seat-tier labels stay pinned to the left as you swipe through the data columns, and a small "Swipe sideways to view higher data tiers" hint shows up so you know the table extends further.
- **The price breakdown is open by default.** The "How we got this number" panel on the quote card starts already expanded, so you can see how the price is built up without an extra click. The toggle itself is now styled as a clear button.
- **Larger, easier-to-tap add-on checkboxes.** The nine add-on rows in the quote card now have bigger checkboxes, more spacing, and rows that highlight when you hover over them, making them much easier to use on a phone.
- **Better layout on small screens.** The page title shrinks, the pricing matrix cells get tighter, and the add-on rows reflow so the description sits under the name instead of being squeezed sideways.

## How to test the changes

1. Open `index.html` and check the navigation bar — the links should be Features, FAQ, and Book demo. Clicking Features or FAQ should take you to the matching section on the pricing page.
2. Scroll to the footer on either page; every link should land on a real section (Overview, Pricing, Features, FAQ), and the Company column should note this is a fictional demo.
3. Open `pricing.html` on a phone-width browser window. Try swiping the pricing matrix sideways — the seat-tier labels on the left should stay visible, and you should see a "Swipe sideways" hint above the table.
4. On `pricing.html`, click any cell in the matrix and look at the quote card on the right. The "How we got this number" panel should already be open, showing the breakdown.
5. Tick a few add-on checkboxes — they should feel noticeably larger and the row should highlight as you hover. The monthly total should update each time.
