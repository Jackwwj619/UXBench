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

- The top-nav **Sign in** and **Start free** buttons (and the matching hero and pricing-teaser buttons) used to do nothing — they now scroll you to a sensible part of the page (pricing teaser, the live builder, or the customers section) instead of jumping to the top.
- When you add, delete, or change the type of a block in the builder, a small "Block added / removed / changed" message slides out under the toolbar so you can see what just happened.
- A newly added block now briefly flashes teal and scrolls into view, and deleted blocks fade out instead of disappearing abruptly.
- If your integrations search matches nothing, the grid dims and a clear "No integrations match your search" panel appears under it, telling you to try a different keyword or clear the search. The "0 of 24" counter also turns red.
- The integration search box, SDK tabs, builder buttons, block-type dropdowns and delete buttons are all bigger and easier to tap on a phone, and the search box no longer triggers iOS auto-zoom.
- The copy button on the SDK code example now reads "Copied!" to screen readers as well as showing it on screen.

## How to test the changes

1. Open `index.html`. Click **Sign in** or **Start free** in the top nav — both should now smooth-scroll you to the pricing teaser near the bottom rather than doing nothing. The hero's **Start free** and **Book a demo** buttons should also scroll to pricing and to the customers section respectively.
2. Scroll to the live builder. Click **+ Heading** — a new block should appear at the bottom, flash teal for a moment, and a "Heading block added" message should slide out under the toolbar.
3. In any block, change the block-type dropdown — you should see a "Block N changed to …" message. Click the × on a block — it should fade out and you should see "Block removed".
4. Scroll to the Integrations section and type something nonsense like `zzzz` in the search box. The card grid should dim, the counter should read "0 of 24" in red, and a panel underneath should say "No integrations match your search." Clear the search to bring the cards back.
5. Click **Copy** on the SDK code box — the label should change to "Copied!" and back to "Copy" a moment later.
6. Resize the browser narrow (or open on a phone). The builder buttons, block dropdowns and delete buttons should all be comfortably tappable, and tapping the integrations search box should not cause the page to zoom in.
