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

- The version selector in the top bar now actually does something — picking an older version updates the version pill next to the logo and pops up a toast explaining you're viewing archived docs.
- The examples gallery on `examples.html` now shows a clear "No examples match" message when your search or category filter has zero results, instead of leaving the grid empty and confusing.
- Examples that don't match your filter are now hidden completely rather than dimmed, so the page feels less cluttered.
- The screen reader announcement on the example search field updates as you type, telling you something like "12 of 12 shown" so people using assistive tech know how many results are visible.
- The theme toggle and version selector now have proper labels and tooltips, so screen readers announce them correctly instead of just reading "button".
- Long code blocks and reference tables no longer push the page wider than the screen on phones — they scroll inside their own box instead.
- On phones and tablets, the top navigation, "On this page" links, example tag pills, theme button, and version selector are all taller and easier to tap.
- Pages stack into a single column more gracefully on narrow screens, with extra breathing room around headings and the previous/next pager.

## How to test the changes

1. Open `index.html`. In the top bar, click the version dropdown and pick "v3.3" or "v2 (legacy)" — the small version pill next to "Runeforge" should update, and a black toast should slide in at the bottom saying the docs are archived. Switch back to "v3.4 (latest)" and the toast confirms you're back on the latest.
2. Open `examples.html`. Type "zzz" (or any nonsense) into the filter box — instead of an empty grid, you should see a dashed-border panel that reads "No examples match — try a different search term or category." Clear the box and the grid returns.
3. On `examples.html`, tap an "Advanced" or "SSR" tag — non-matching cards should disappear entirely rather than just fading out.
4. Open the browser dev tools and shrink the window to phone size (≤640 px) on `api-reference.html`. The long code blocks and the error-code table should scroll horizontally inside their box, not push the whole page sideways.
5. On a phone-width viewport, tap the theme moon icon, the version selector, an example tag pill, or any "On this page" link — each should feel comfortably large under your thumb instead of cramped.
