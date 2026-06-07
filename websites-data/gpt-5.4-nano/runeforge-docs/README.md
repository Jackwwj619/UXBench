# Runeforge

Runeforge is the demo documentation site for a fictional JavaScript state-management library (in the Redux / Zustand family). The whole docs experience is here: quickstart, guides, full API reference, and a gallery of example apps you'd build with it.

> Fictional library — install commands, version numbers, and code snippets are illustrative; nothing is actually published.

## What you can do

- **Get up to speed in 5 minutes.** The quickstart guide builds a counter store, a todo list with derived state, an async fetcher, and shows how to install devtools.
- **Read the guides.** Reference pages for stores, actions and selectors, including the `derive()`, `store.select()`, SSR, testing, and built-in slice helpers like `asyncSlice`, `listSlice`, `formSlice`.
- **Look up the API.** Each symbol has its own reference block — kind tag (function / hook / helper / middleware / component), the version it was added in, signature, parameters, return value, an example, and version history. Seven core symbols, three React hooks, and an error codes table (RF001–RF019).
- **Browse example apps.** A 12-card gallery of examples — counter, todo, async fetcher, multi-step form, optimistic comments, realtime presence, routing, undo/redo, SSR shop, markdown editor, spreadsheet, kanban — each with the adapter it uses and approximate LOC. Filter by tag (All / Beginner / Intermediate / Advanced / SSR) and search.
- **Switch package manager and framework.** Install code tabs swap between npm, pnpm, yarn, and bun; the "Hello, store" snippet swaps between Vanilla, React, Solid, Svelte 5, and Vue 3.
- **Search everything.** Hit ⌘K (or Ctrl+K, or `/`) to open a search dialog with arrow-key navigation.

## How to use it

Open `index.html` in any modern browser. Use the left tree to navigate between guides and API symbols; the on-this-page outline on the right highlights as you scroll. Code blocks each have a copy button that flashes when used; the light/dark theme toggle persists across reloads.

## What was changed in this version

- Clicking a search result that points to the current page now closes the search pop-up and smoothly scrolls to that section. Previously the pop-up sometimes stayed open and blocked further clicks.
- The search pop-up now shows a clear "No results for …" message when nothing matches what you typed, instead of just an empty list.
- You can now close the search pop-up by clicking the dark area around it.
- On the Examples page, each category tag now shows the number of examples it contains (e.g. "Beginner (4)"), and an "All (12)" chip at the start.
- A small "Showing X of 12 examples" line appears under the filter, updating live as you type or pick a tag.
- Examples that don't match are now fully hidden instead of just faded out, so the grid reflows cleanly.
- When a search returns nothing, the grid shows a friendly "No examples match" panel with a one-click "clear the filter" button.
- Pressing Escape in the example filter clears it; pressing Enter applies it explicitly.
- The whole site is much friendlier on phones: bigger tap targets in the top nav, tag chips, and the search trigger; long tables and code blocks scroll sideways instead of pushing the whole page off the edge.

## How to test the changes

1. Open `index.html`. Press ⌘K (Mac) or Ctrl+K (other) to open the search pop-up. Type something nonsensical like `zzzqqq` — you should see "No results for zzzqqq".
2. Type a real query (e.g. `counter`) and click a result that lives on the current page — the pop-up should close and the page should scroll smoothly to that section.
3. Open the search pop-up again, then click the dim area around the white box — the pop-up should close.
4. Open `examples.html`. Look at the tag chips along the top — each non-"All" chip should show a count in parentheses, and there should be an "All (12)" chip.
5. Type `kanb` into the filter box — the grid should narrow to just matching examples (not faded ones), and the line under the filter should read "Showing 1 of 12 examples matching kanb".
6. Type something with no matches like `xyz` — the grid should be replaced with a "No examples match" panel. Click "clear the filter" — the full grid should return.
7. With text in the filter, press the Escape key — the box should clear and the full grid should return.
8. Shrink the window to phone width — the search button, tag chips, and top-nav buttons should all be easier to tap, and the page should not scroll sideways even if a code block is wider than the screen.
