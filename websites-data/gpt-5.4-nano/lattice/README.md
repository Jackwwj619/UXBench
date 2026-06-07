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

- The top-nav links **Docs**, **Customers**, **Sign in**, and **Book demo** (and the footer links in the same family) no longer just sit there doing nothing — clicking any of them now pops up a small "Demo — this link would open here in the live product" notice.
- The **How we got this number** expander on the pricing page now has a friendlier look: a clear chevron arrow that rotates open, a soft purple background on the expanded panel, and a smooth open-and-close animation. On smaller screens it also scrolls itself into view when you open it.
- The add-on checkboxes are now much bigger and easier to tap, with a faint purple background on hover so it's obvious which row your cursor is on.
- The FAQ items on the pricing page have a more polished open/close interaction (clearer +/− switch and a coloured border under the open question), and the entire question row is tappable.
- The pricing matrix now shows a soft gradient hint on the right edge when it's wider than the screen, so you can tell you can swipe sideways on phones.
- The footer **Overview** link now actually points at the home page instead of going nowhere.
- Buttons, nav links, checkboxes, and form fields are sized for comfortable tapping on phones, with visible outlines when you tab to them with a keyboard.

## How to test the changes

1. Open `index.html`. Click **Docs**, **Customers**, **Sign in**, or **Book demo** in the top-right — a small dark pop-up should appear at the bottom of the screen confirming it's a demo link.
2. Open `pricing.html`. Pick any cell in the matrix, then click **How we got this number** under the quote — it should expand smoothly with a coloured panel and a rotated chevron arrow.
3. Tick a few add-on checkboxes on the right — the entire row should highlight on hover, and the checkbox itself should be comfortably tappable.
4. Click any FAQ question further down the page — the + should turn into a −, and the question text should turn purple.
5. Shrink the browser to phone width. Scroll sideways on the matrix — you should see a soft fade on the right edge hinting that there's more to see.
6. Scroll to the footer and click **Overview** — you should land on the home page. Click any other footer link (Docs, Architecture, About, etc.) to see the demo pop-up.
