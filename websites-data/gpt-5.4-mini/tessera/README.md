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

- The version switcher in the top bar now has a "Version" label next to it, and changing it no longer pops a blunt browser alert. Instead, a small green pill at the bottom of the screen confirms ("Now viewing v2.3 docs"), the page title gets a "[v2.3]" prefix, the address bar updates with the chosen version, and the green release badge at the top of the home page turns amber to flag "archived version".
- Your chosen version is remembered as you click between pages (no more snapping back to v2.4 every time you navigate).
- The "Tutorials" link in the top nav, which had no destination, is now clearly marked with a grey "SOON" badge and shows a "Tutorials are coming soon" message when clicked, instead of jumping to the top of the page.
- The four Quick start / Documentation cards on the home page that used to be dead links ("Install", "Connect", "Architecture", "Storage", "Extensions") now actually go somewhere: Install and Connect scroll down to two new copy-paste code blocks just below the cards, "Your first query" jumps to the SELECT reference, and the remaining cards land you on the Reference index.
- The ⌘K search dialog now has a visible "×" close button in the top right, a footer hint showing "Esc close · ↵ open", and when the box is empty (or finds no matches) it shows a tidy grid of "Popular pages" so you always have somewhere to go.
- Wide tables on the function, operators, and data types pages now sit inside a horizontally scrollable frame with a subtle right-edge fade, so they no longer overflow the page on narrow windows.
- On phones, the top bar (logo, version switcher, search, theme toggle) and the wide reference tables all reflow cleanly, and every header button has a much larger tap area.

## How to test the changes

1. Open `index.html`. Use the version switcher in the top bar and pick "v2.3" — a green pop-up at the bottom confirms the switch, the browser tab title gains a "[v2.3]" prefix, the address bar URL gets a `#v=v2.3` at the end, and the green "v2.4 · 2026-04 release" badge under the hero turns amber and says "viewing archived version". Click any of the section cards — the version stays selected on the new page.
2. Click the "Tutorials" link in the top nav. It should show a "SOON" badge and a brief "Tutorials are coming soon" message at the bottom of the screen, without jumping to the top.
3. Back on the home page, click the "Install" quick-start card — it should scroll down to a new "1 · Install" section with a copy-paste curl command. The "Connect" card does the same for a Python snippet. Click "Your first query" — it should take you to the SELECT reference page.
4. Click "Architecture", "Storage", or "Extensions" under the Documentation heading — each now takes you to the Reference index page instead of doing nothing.
5. Press ⌘K (or Ctrl+K) to open search. The dialog should show a "Popular pages" grid when empty, an "×" close button in the top right, and a "Esc close · ↵ open" footer. Type "zzz" — you should see "No results for 'zzz'" plus the same Popular pages grid. Press Esc or click the × to close.
6. Open `function-date-trunc.html` (or operators / data-types) and narrow the browser window — the wide tables should sit inside a horizontally scrollable frame with a subtle fade on the right edge.
7. Resize to phone width: the top bar should wrap neatly, the version switcher, search, and theme buttons should all be larger and easier to tap, and the reference tables should still scroll sideways.
