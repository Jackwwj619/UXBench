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

- **The examples filter actually hides cards that don't match.** Previously the filter just greyed-out non-matching cards; now they're removed from the grid so you only see what matches.
- **A live count tells you how many examples are showing.** Above the grid you'll see "X of 12 examples shown", which updates as you type or pick a tag.
- **A "Clear" button appears when filters are active** so you can reset the search and tag in one click.
- **Empty results now show a friendly message** instead of leaving you staring at an empty grid.
- **Search and version controls have proper labels** for screen readers and assistive tech, so the magnifying-glass and version selector announce themselves correctly.
- **Code blocks and tables no longer break the page on phones.** Long code samples scroll sideways inside their own box instead of pushing the whole page wider than the screen.
- **Bigger tap targets on phones.** The theme toggle, GitHub link, version picker, on-this-page outline links, code tabs, and example category pills are all easier to hit with a thumb.

## How to test the changes

1. Open `examples.html`. Type "todo" into the filter box — only matching cards should remain in the grid (not just dim), and the count above should drop from "12 of 12" to a smaller number.
2. Click the "Beginner" pill — only beginner examples should be shown, the count should update, and a small "Clear" button should appear next to the tag pills.
3. Type something that matches nothing (e.g. "zzz") — the grid should show "No examples match your filters." Click "Clear" to reset.
4. Open `index.html` and tab through the top bar with the keyboard — the search button, version dropdown, theme toggle, and GitHub link should each be announced clearly when focused.
5. Shrink the browser to phone width on `api-reference.html` — long signatures and the error-codes table should scroll sideways inside their own boxes; the page itself should never scroll sideways.
