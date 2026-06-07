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

- Every block in the live builder now has up (↑) and down (↓) arrows next to the delete (×) button, so you can reorder blocks without dragging — handy on phones, with a keyboard, or if drag-and-drop ever feels finicky. The arrows grey out when a block is already at the top or bottom.
- Dragging a block now shows a clear teal line above or below the row you're hovering over, so you can see exactly where the block will land before you let go.
- All the navigation links, footer links, and "Sign in / Start free / Book a demo" buttons that previously did nothing now give visible feedback — most show a small dark toast at the bottom of the screen, and "See full plans →" opens a proper pricing dialog with Hobby / Team / Enterprise tiers.
- The new pricing dialog can be closed by clicking the ×, clicking outside it, or pressing Escape. Each tier's button shows a confirmation toast.
- Buttons and links now show a clear focus outline (for keyboard users) and a brief "pulse" animation when clicked, so you always know your tap registered.
- The builder controls (block-type selector, text input, drag handle, delete) are all properly labelled for screen readers, and the integrations search announces match counts as you type.
- On phones, the block-builder row reflows so the text input takes the full width, and all the small buttons (drag, ↑, ↓, ×) become 44×44 px — easy to tap. Top-nav and footer links also grow taller for friendlier tapping.

## How to test the changes

1. Open `index.html` and scroll to the block builder. Each block row now has two extra buttons (↑ and ↓) between the text and the ×. Click ↑ to move a block up, ↓ to move it down. The arrows go grey when a block can't move further.
2. In the builder, drag a block over another row — a teal line appears at the top or bottom of the target row depending on where the cursor is, showing where the block will drop.
3. Scroll to the navigation. Click "Sign in" or any footer link that ends in nothing — a small dark toast appears at the bottom (e.g. "Sign-in is on the roadmap for this demo.").
4. Click the "See full plans →" button in the pricing teaser — a proper dialog opens with three tiers. Press Escape, click ×, or click outside the dialog to close.
5. Click any "Start free trial" or "Book a demo" button — you should see a toast and the button briefly pulses.
6. Tab through the page — focused buttons and links now show a clear teal outline.
7. Shrink the browser to phone width. The block-builder rows reflow nicely (text input takes the full row), and all the small buttons become large enough to tap comfortably.
