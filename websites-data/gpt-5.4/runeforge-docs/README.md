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

- Links to pages that don't exist yet (Blog, Community, GitHub, "Why Runeforge?", "Installation", framework adapters, patterns, "Edit this page", etc.) now show a small "soon" badge next to the label, appear greyed out, and no longer jump or scroll when clicked.
- The version dropdown in the top bar now shows the older versions as greyed-out "archived" entries that can't be selected, so it's clear only v3.4 is supported.
- The search dialog (⌘K / Ctrl+K / `/`) now has a visible "Close" button next to the search box, in addition to the existing Escape shortcut.
- Pressing Escape inside the search dialog now reliably closes it without scrolling the page or following any links underneath.
- Clicking outside the search dialog (on the dim backdrop) now closes it.
- The first result in the search list is no longer pre-highlighted when the search box is empty, so pressing Enter on an empty search no longer jumps somewhere unexpected.
- On the Examples page, a status line above the grid now tells you "Showing X of 12 examples", lists which filter and search term are active, and offers a "Clear filters" button.
- When a search or tag filter on the Examples page matches no cards, a friendly empty-state message appears with its own "Clear filters" button, instead of an empty grid.
- Non-matching example cards are now hidden rather than just dimmed, so the grid only shows what actually matches.
- On a phone or narrow window, the top navigation, search, version picker, and table-of-contents items are larger and easier to tap, and long tables or code blocks now scroll inside their own area instead of stretching the whole page sideways.

## How to test the changes

1. Open `index.html`. In the top bar, click "Blog" or "Community" — nothing happens and you'll see a small "soon" badge next to each label. Hover one to see a "coming soon" tooltip.
2. In the left sidebar, click any greyed-out item like "Why Runeforge?" or "Subscriptions" — it stays put with the same "soon" badge instead of scrolling.
3. In the top bar, open the version dropdown — only "v3.4 (latest)" is selectable; the older versions show "(archived)" and are greyed out.
4. Press ⌘K (or Ctrl+K, or `/`) to open search. Click the new "Close" button on the right of the search box — the dialog closes. Reopen it, press Escape — it closes again without the page jumping. Reopen it, click the dim area outside the box — it closes.
5. Open search with an empty box — no result is pre-selected. Type "todo" and use the up/down arrows to move through results, then press Enter to open one.
6. Open `examples.html`. Type "form" in the search box — the status line updates to "Showing N of 12 examples" and a purple chip shows the active search term. Click "Clear filters" to reset.
7. On `examples.html`, click a tag like "Advanced" and type a search that matches nothing — the empty-state message appears with a "Clear filters" button.
8. Resize the browser to phone width on any page — the top bar items wrap and grow taller, sidebar links become bigger tap targets, and wide tables/code blocks scroll inside their own boxes instead of pushing the page sideways.
