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

- The hero's **Start free →** and **Book a demo** buttons (and the "See full plans" button further down) now actually scroll you somewhere useful — to the live builder, the new plans section, or the new demo form.
- There's a brand-new **Plans** section with three plan cards (Hobby / Team / Enterprise), one marked "Most popular".
- There's a brand-new **Book a demo** section with a working form — type a work email and company name, click **Request demo**, and you get a green "Thanks — we'll be in touch" confirmation.
- The auto-swap animation in the hero now politely pauses for a few seconds when you click or hover inside it, so it stops moving things around while you're trying to look.
- Editing a block in the builder now briefly flashes the matching block on the preview side, so you can see exactly what just changed. Adding a new block also flashes it and scrolls it into view.
- The auto-save status now shows a clearer two-state hint — "Saving…" (in amber) while you're typing, then "✓ Saved" (in green) once it settles.
- The **Copy** button on the SDK code samples now shows a small "Copied to clipboard" pop-up under the tabs, and falls back gracefully (with a clear "Copy failed" message) if the browser blocks the clipboard.
- Clicking an in-page link (like jumping to the builder) now briefly highlights the destination with a soft teal glow so you can see where you landed.
- Buttons, the builder toolbar, the SDK tabs, the integrations search, and the footer links are all bigger and easier to tap on phones, with visible focus outlines for keyboard users.

## How to test the changes

1. Open `index.html`. Click **Start free →** in the hero — the page should smoothly scroll down to the live block builder, and the builder area should briefly glow teal.
2. Click **Book a demo** in the hero — the page should scroll to a new contact form and put the cursor in the email field.
3. Type a work email (anything ending in `@something.com`) and a company name, then click **Request demo** — a green "Thanks — we'll be in touch" confirmation appears and the button changes to "✓ Request sent".
4. Scroll back up to the hero and hover or click inside the editor/preview area — the automatic block-swap animation should pause for several seconds.
5. In the live block builder, edit the text in any block — the matching block in the right-hand preview flashes briefly, the status at the top changes to amber "Saving…", and then to green "✓ Saved".
6. Click **+ Add block** at the bottom of the builder — the new block appears, flashes, and scrolls into view.
7. Click the **Copy** button on any SDK code sample — a small "Copied to clipboard" pop-up appears under the tabs.
8. Scroll down to the new **Plans** section to see Hobby / Team / Enterprise cards, with "Most popular" on the Team card.
9. Shrink the window to phone width and confirm all the buttons, builder controls, and form fields stay easy to tap.
