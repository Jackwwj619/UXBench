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

- The **Blog** and **Community** links in the top nav are now clearly marked "coming soon" so you don't expect them to lead anywhere real.
- Changing the version dropdown in the header now shows a brief green "Switched to v3.x" badge and updates the version pill next to the Runeforge logo, instead of looking like nothing happened.
- The version dropdown also has a clear "VERSION" label next to it so it's obvious what the menu controls.
- On the Examples page, the search and filter controls now sit in a tidy "Filter examples" card, the search box has a clear-all (✕) button, and a status line tells you something like "Showing 4 of 12 matching 'todo' in Beginner".
- Examples that don't match are now hidden completely instead of just being dimmed, and if nothing matches you see a clear empty-state message.
- Arrow keys in the ⌘K search dialog now stay locked to the dialog — pressing Down/Up no longer accidentally scrolls or jumps the page behind it — and the highlighted result auto-scrolls into view.
- On a phone or narrow window, the top nav now collapses behind a ☰ menu button you can tap to expand, and the rest of the header (search, version, theme, GitHub) stacks below in tap-friendly rows.

## How to test the changes

1. Open `index.html` and hover the **Blog** or **Community** links in the top nav — they should look dimmed with a small "↗" hint and a tooltip saying "Coming soon".
2. Open the **Version** dropdown and pick v3.3 — a small green "Switched to v3.3" badge should appear next to the menu for about two seconds, and the version pill beside the Runeforge logo should change to "v3.3".
3. Open `examples.html`. Type "todo" into the filter box — the status line should update to something like "Showing 1 of 12 matching 'todo'", non-matching cards should disappear, and an ✕ button should appear inside the search box. Click it to reset.
4. On `examples.html`, click **Beginner**, then **Intermediate**, then a tag with no matches in combination with a strange search term — you should see the clear empty-state card.
5. Press **⌘K** (or **/**) anywhere to open the search dialog. Type a query, then tap Down and Up arrow keys — the selection should move within the dialog without scrolling the page behind it, and the highlighted row should scroll into view if the list is long. Press Escape to close.
6. Shrink the browser to phone width — the top nav should collapse behind a ☰ button. Tap it to reveal the Docs / API / Examples links stacked vertically.
