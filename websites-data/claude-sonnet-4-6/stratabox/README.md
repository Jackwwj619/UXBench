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

- Links and buttons that don't lead anywhere ("Sign in", "Book a demo", "Read the API reference", "See full plans", "Start free", and most of the footer links) now show a clear "X is coming soon" pop-up message at the bottom of the screen, instead of silently doing nothing or scrolling you to the top.
- The Stratabox logo in the header now properly takes you back to the top of the page.
- The big animated number stats (teams shipping content, uptime, latency, locales) used to sometimes stay stuck at "0" if you scrolled past them too fast — they now reliably finish counting up, and snap to their final value as a fallback if needed.
- The **Copy** button on the code samples now shows a clear "Copied to clipboard" confirmation message at the bottom of the screen, which is much easier to notice on phones than the in-button flash.
- In the live block-builder, each block now has its own labelled controls so the drag handle, type selector, text field, and delete button are easier to tell apart and use with a keyboard.
- The integrations search now hides non-matching cards instead of showing them dimmed.

## How to test the changes

Open `index.html`. In the top-right, click **Sign in** or scroll down and click **Book a demo** / **See full plans** — you should see a small "coming soon" message appear at the bottom of the screen. Scroll past the stats row ("2,400+ teams shipping content", "99.99% uptime", etc.) and watch the numbers count up. Click the Stratabox logo in the header to jump back to the top. Scroll to the SDK section, pick a tab (JavaScript / Python / Ruby / curl), then click **Copy** to see the confirmation message. Scroll to Integrations and type a name in the search box — non-matching cards should disappear and the count should update.
