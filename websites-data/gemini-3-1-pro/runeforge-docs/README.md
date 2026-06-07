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

- Placeholder links in the left navigation, the top nav ("Blog", "Community"), and the GitHub star button are now clearly tagged as "Soon", greyed out, and no longer hijack the page to `#` when clicked.
- The Examples filter now removes non-matching cards instead of just fading them. When no example matches, a clear "No examples match your filter." message takes the grid's place.
- Smooth in-page scrolling now lands at the correct heading instead of hiding it under the sticky top bar — the offset accounts for the header height on every anchor jump.
- On the API reference page, scrolling to a sub-section highlights the matching sub-anchor in the left sidebar and quietly drops the static "Overview" highlight, so you don't see two active items at once.
- The site now has a real mobile layout. A hamburger button in the top bar slides the docs sidebar in over a dimmed backdrop on narrow screens; tapping a link, the overlay, or pressing Escape closes it. The hamburger is hidden on the Examples page where there's no sidebar to open.
- Tap targets, code-block padding, and heading sizes were tuned for phones: navigation items hit 44px, brand/version pill and the GitHub star button collapse out of the way on very narrow widths.
- Search trigger, version selector, GitHub link, and theme toggle now expose proper accessible labels for screen readers.
- Wide reference tables on narrow viewports now scroll horizontally inside their card instead of stretching the page and forcing a left-right scroll on the whole document.

## How to test the changes

1. Open `index.html`. In the left sidebar, click any "Soon" item (e.g. "Why Runeforge?" or "Installation") — nothing happens and the URL does not become `#`. The "Blog" and "Community" entries in the top nav behave the same.
2. Open `examples.html`. Type "asdfjkl" in the search box or pick a tag that returns nothing — the grid replaces itself with "No examples match your filter." Clear the filter to bring the cards back.
3. From the docs home, click any item in the right-side "On this page" outline — the target heading is no longer hidden behind the sticky top bar.
4. Open `api-reference.html` and scroll down. As each symbol's heading hits the top, the matching sub-link in the left sidebar highlights and the standalone "Overview" highlight disappears; scroll back to the top and "Overview" lights up again.
5. Shrink the window to phone width. A hamburger button appears in the top bar — tap it to slide the docs TOC in; tap the dimmed backdrop or press Escape to close it. Open `examples.html` at the same width — the hamburger is hidden there because the page has no sidebar.
6. On a narrow window, open any guide page with a wide table (e.g. `guide-stores.html` "Store API") — the table scrolls horizontally inside its card without resizing the rest of the page.
