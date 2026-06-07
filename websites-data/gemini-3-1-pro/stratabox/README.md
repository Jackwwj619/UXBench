# Stratabox

Stratabox is a demo marketing site for a fictional headless content platform (in the Contentful / Sanity family). The interesting part is a working block-builder that lets you reorder, add, delete, and edit content blocks live on the page.

> Fictional product — SDK keys, customer logos, and integrations are illustrative.

## What you can do

- **Read the pitch.** The hero has an editor-vs-live-preview split panel that periodically swaps blocks. Below it: a trusted-by logo strip, a count-up stat row that animates when it scrolls into view, and three feature cards.
- **Try the block builder.** A two-pane editor on the left, live render on the right. Drag blocks to reorder them, switch the block type, add or delete blocks; an "auto-saved" status updates in the background as you edit.
- **See what calling the API looks like.** Code tabs for JavaScript, Python, Ruby, and curl share the same example, with a copy button on each.
- **Browse integrations.** A 24-card grid you can search; matches by name and category, with a live count.
- **Read customer quotes and pricing.** Three customer quote cards and a gradient pricing teaser further down the page, plus a dark four-column footer.

## How to use it

Open `index.html` in any modern browser. Try dragging blocks around in the live builder, switching block types, and watching the right pane re-render. Click the SDK tabs to swap languages, and use the integrations search to filter the 24-card grid.

## What was changed in this version

- The block-builder's controls now work reliably. Clicking the block-type dropdown, typing into the text input, or pressing the delete "x" no longer triggers the drag behaviour of the parent row, so editing a block actually lands in the right place.
- Changing a block's type now also swaps in a sensible placeholder when the row is empty, so a fresh "Quote" or "Image" block looks like what it should be.
- The integrations search now hides non-matching cards instead of just dimming them, so the grid reflows to only show what actually matched your query.
- "Coming soon" links across the page (the placeholder anchors that pointed nowhere) now show a small toast at the bottom of the screen instead of silently jumping you to the top of the page.
- All the block-builder controls have proper screen-reader labels (block type, block content, delete block), and the integrations search input is announced correctly too.
- On a phone-width window the block-builder rows now stack: the dropdown and delete button sit on top, the text field wraps onto its own line with full width, so editing on mobile is no longer cramped.
- Nav links, footer links, and primary buttons across the page now meet a 44px tap-target minimum on small screens.

## How to test the changes

1. Open `index.html` and scroll to the "Block Builder" section. Click the block-type dropdown on any row and pick a different type — the row updates without jumping or starting a drag. Type into the text input and press the "x" to delete; both work cleanly.
2. Scroll to the "Integrations" section and type "auth" or "analytics" into the search box. Non-matching cards disappear from the grid and the "X of 24" counter updates.
3. Click any "Docs", "Pricing", or footer link whose href is still a placeholder — a small dark toast pill appears at the bottom saying "<label> — coming soon" instead of scrolling you to the top of the page.
4. Tab through the builder controls with the keyboard — each dropdown, text input, and delete button is reachable and has a clear label announced by a screen reader.
5. Shrink the browser to phone width and re-edit a block — the dropdown sits above a full-width text input, the delete button is large enough to tap, and all nav and footer links have comfortable touch targets.
