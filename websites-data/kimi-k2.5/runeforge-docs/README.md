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

- The examples gallery now shows a count next to each filter tag (like "Beginner (4)"), so you can see at a glance how many examples are in each category before clicking.
- When a filter or search has no matches, the gallery now shows a clear "No examples match this filter." message instead of just an empty grid.
- The search box on the examples page updates its placeholder text to show how many examples are currently visible (e.g. "Filter 3 examples…").
- Filtering or searching the examples now smoothly scrolls the grid into view, so you don't lose your place after clicking a tag.
- On phones and narrow windows, the docs layout is much friendlier: the top nav wraps properly, wide tables and code blocks scroll sideways instead of pushing the page off-screen, and tap targets (icon buttons, tag pills, navigation items) are at least 44 pixels tall for easier finger taps.
- The version dropdown in the top nav now has a proper screen-reader label, so assistive tech can announce what it is.

## How to test the changes

1. Open `examples.html`. Look at the row of filter tags — each one now shows a count in parentheses (e.g. "All (12)", "Beginner (4)").
2. Click "Advanced" — only matching cards appear, the grid scrolls into view smoothly, and the search box placeholder reads "Filter N examples…".
3. Type a nonsense word like "zzz" into the search box — the grid clears and a "No examples match this filter." message appears in its place.
4. Resize the browser to a phone-width window. Open any docs page — the top nav should wrap cleanly, the API reference tables scroll sideways without breaking the layout, and buttons feel large enough to tap.
5. Use a screen reader (or inspect the page) on any docs page — the version selector in the top nav now announces itself as "Documentation version".
