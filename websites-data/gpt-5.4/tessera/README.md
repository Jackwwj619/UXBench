# Tessera

Tessera is the demo documentation site for a fictional embedded SQL database — the kind of docs you'd read while learning to use PostgreSQL or DuckDB. It's structured like a real reference: a docs home, a reference index, function pages, an operators page, data types, and a complete SELECT page.

> Fictional database — every example, function name, and version note is illustrative.

## What you can do

- **Get started.** The docs home has a hero with a real syntax-highlighted SELECT example, three quick-start cards (Install / Connect / Your first query), six docs section cards (Architecture / SQL Syntax / Functions / Data Types / Storage / Extensions), and a version switcher (v2.4 / v2.3 / v2.2 / v2.1).
- **Browse the reference.** The reference index has a deep table of contents on the left covering schemas, tables, views, indexes, functions (broken down by category — Aggregate, String, Numeric, Date-Time, JSON, Window), and operators. The center shows popular links and a v2.4 new-features callout.
- **Read a function page.** `DATE_TRUNC` is the canonical example: signature, parameter table, return value, three SQL examples with result tables (basic, GROUP BY, nested EXTRACT), error-case callouts, a collapsible version history (added v1.0, microsecond unit added v2.1, timezone bug fixed v2.3, performance improved v2.4), and six related-function links. `REGEXP_MATCH`, `JSON_EXTRACT`, and `ROW_NUMBER` follow the same shape.
- **Read operators and data types.** Operators have per-category tables (Arithmetic / Comparison / Logical / String / JSON / Array) with symbol, description, example, result, and precedence. Data types are grouped (Numeric / String / Boolean / Date-Time / Composite) with name, aliases, storage bytes, range, default, and notes.
- **Read the SELECT reference.** A complete SELECT page with a railroad-style syntax diagram, every clause broken down (WITH / FROM / WHERE / GROUP BY / HAVING / ORDER BY / LIMIT), multiple worked examples, and a performance callout.
- **Search everything.** Hit ⌘K (or Ctrl+K) to open the search dialog with grouped results across functions, types, operators, and pages.

## How to use it

Open `index.html` in any modern browser. Use the left TOC to navigate; the node matching the current page auto-expands. The right outline scroll-spies as you read. Code blocks show a copy button on hover; the light/dark theme toggle is in the top bar.

## What was changed in this version

- Pages and links that don't actually exist yet (Tutorials, Download, GitHub, Architecture, Storage, Extensions, the "Install / Connect / Your first query" quick-start cards, most function pages in the left tree like SUM/AVG/LENGTH) are now clearly marked with a small grey "soon" tag and a "Coming soon" tooltip. Clicking one no longer takes you to a blank page — it shows a small dark toast at the bottom that says it's not available yet.
- The "Get started →" button on the home hero now actually goes to the reference page instead of going nowhere.
- The version switcher (v2.4 / v2.3 / v2.2 / v2.1) now updates a visible "Viewing docs for vX.X" badge under the top bar and shows a small toast confirming the choice, instead of popping a browser alert. Your selection is also remembered the next time you open the docs.
- The light/dark theme toggle now remembers your choice between visits and shows a sun/moon icon that matches the current state. A confirmation toast appears each time you toggle.
- Copy buttons on every code example are now always visible (not only on hover), are bigger and easier to tap, and show "✓ Copied" with a confirmation toast when they actually copy. If copy fails, the button switches to "Try again".
- The ⌘K / Ctrl+K search dialog now supports keyboard navigation — Up/Down arrows highlight results, Enter opens the highlighted one, Escape closes the dialog. A keyboard hint strip ("↑ ↓ navigate · Enter open · Esc close") sits at the bottom, and there's an explicit × close button at the top.
- The search dialog and the left-rail tree both label "coming soon" entries — picking one shows the toast instead of navigating to a dead page.
- The "Version history" section on function pages is now keyboard-accessible — you can focus its header and press Enter/Space to collapse it.
- All wide tables (parameter tables, operator tables, data-type tables, result tables) now sit inside a horizontal scroll area, so they no longer overflow the page or break the layout on narrow screens.
- On phone-sized screens, the layout adjusts: the top-bar wraps onto multiple rows with bigger tap targets, the hero CTAs stack into full-width buttons, the quick-start and resource-card grids become single-column, code blocks shrink slightly, and all buttons / links / tree rows get larger so they're easier to tap.

## How to test the changes

1. Open `index.html`. In the top bar, click "Tutorials", "Download", or "GitHub" — each is marked with a "soon" pill and clicking shows a "Coming soon" toast at the bottom of the page instead of doing nothing.
2. Click "Get started →" in the hero — it now takes you to the reference page (previously a dead link).
3. Under "Quick start", each of the three numbered cards is marked "soon" and shows the toast on click. Same for "Architecture", "Storage", and "Extensions" under Documentation.
4. Change the version switcher in the top bar from v2.4 to v2.3 — the green badge under the top bar updates to "Viewing docs for v2.3", a toast confirms the change, and reloading the page keeps your selection.
5. Click the moon icon in the top bar — the page flips to dark mode, the icon becomes a sun, and a "Dark theme enabled" toast appears. Reload — your choice is remembered.
6. Open the DATE_TRUNC page (from the left-rail tree or via the reference page). Click the "Copy" button on any code example — it turns green and reads "✓ Copied", and a toast confirms the copy.
7. Press ⌘K (or Ctrl+K). The search dialog opens. Type "date", press Down arrow to move through results, press Enter to open the highlighted one. Press Escape to close. Try clicking the × button to close instead.
8. In the search dialog, type "SUM" — the result is labeled "soon"; click it and you get the coming-soon toast instead of a broken navigation.
9. In the left-rail tree on a reference page, expand the Functions category and click any function not marked with a link (e.g. SUM, AVG, LENGTH) — you'll see the coming-soon toast.
10. Resize the browser narrow to phone width — the top bar wraps, the quick-start cards become single-column, code blocks shrink, and wide tables can be scrolled sideways without breaking the page layout.
