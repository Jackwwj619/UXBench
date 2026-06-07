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

- The "Start free", "Book a demo", and "See full plans" buttons now open a tidy pop-up dialog asking for your email instead of doing nothing. Each button shows a slightly different headline matched to what you clicked.
- The email field in the pop-up checks for a real-looking address — typing "alice@" and submitting now keeps you on the form instead of pretending to succeed. A green check mark confirms when it's accepted.
- You can close the new pop-up by clicking the X, clicking the dim area outside, or pressing the Escape key.
- On phones, the top navigation now collapses behind a hamburger button that opens and closes a tidy menu of links.
- Other placeholder links (in the footer, "Sign in", and learn-more arrows) no longer jump to a dead anchor — a small dark "coming soon" toast slides up briefly to acknowledge the click.
- The delete (×) button on each builder block is now a larger, clearly tappable square with a focus ring, easier to use on small screens or with a keyboard.
- The integrations search box now updates its own placeholder live, e.g. "3 matching integrations…", so it's obvious how many results you got.
- The hero call-to-action buttons stack vertically and fill the full width on phones, and the builder rows tighten up so blocks fit comfortably on narrow screens.

## How to test the changes

1. Open `index.html` and click the "Start free →" button in the hero — a pop-up titled "Start your free workspace" appears with an email field. Try clicking "Book a demo" — the same pop-up appears but with a different headline.
2. In the pop-up, type "not-an-email" and click Continue — nothing happens and the field is marked invalid. Now type a proper email like "you@example.com" — a green check appears and the pop-up closes itself.
3. Open the pop-up again, then press the Escape key — it closes. Open it again and click on the dim background — it closes too.
4. Shrink the browser to phone width. The top nav collapses; tap the hamburger button on the right and the menu of links slides open. Tap any link or the hamburger again to close it.
5. Scroll to the dark footer and click any link there (e.g., "Docs", "Status") — a small dark "coming soon" message slides up at the bottom of the screen.
6. Scroll to the live block builder and click the × button on any row — it's noticeably bigger now and has a clear focus ring if you tab to it with the keyboard.
7. Scroll to the integrations section and type "auth" into the search box — the placeholder text changes to something like "3 matching integrations…" while the counter on the right updates.
