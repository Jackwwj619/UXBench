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

- Links that don't actually lead anywhere (Blog, Community, GitHub stars, "Edit this page on GitHub", "Discuss on the forum", and most of the left sidebar entries) are now styled as faded with a small "soon" badge, and clicking them no longer scrolls you to the top of the page.
- A new menu button (☰) appears on small screens to open and close the top navigation, and a new "Show contents" button toggles the left documentation tree on phones and narrow windows.
- The search dialog (opened with ⌘K, Ctrl+K, or /) now has a visible close button (×) in the top-right corner, closes when you click outside it, and returns the cursor back to where you opened it from.
- On the Examples page, cards that don't match your filter are now hidden completely instead of just dimmed, a result counter ("X of 12") appears, and a friendly "No examples match your search" message shows when nothing matches.
- Copy buttons on code blocks now show a checkmark ("Copied ✓") for a slightly longer flash so it's easier to notice.
- Scroll-spy now also highlights matching entries in the left sidebar (not just the right outline) as you scroll through a page.
- The page is more usable on phones overall: the navigation, search trigger, and content tables reflow properly at narrow widths.

## How to test the changes

Open `index.html` in any modern browser. Hover over "Blog" or "Community" in the top nav to see the "soon" badge and confirm clicking them doesn't jump the page. Press **⌘K / Ctrl+K / /** to open search, then click the **×** or click outside the dialog to close it. Open `examples.html` and type something in the filter or click a category tag — non-matching cards should disappear and the counter should update. Click any code block's **Copy** button to see the new checkmark. Resize your browser narrow (or open on a phone) to see the new ☰ and "Show contents" buttons.
