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

- Picking a different version from the top-right dropdown no longer pops up a generic browser alert. Instead, the version badge in the page hero updates and a small green confirmation appears at the bottom: "Version updated to v2.3".
- The search dialog (⌘K / Ctrl+K) now has a clear close button (✕) in the top-right corner, and pressing Escape, clicking outside, or picking a result reliably closes it.
- Search now puts your keyboard focus back where it was before you opened it.
- The "Version history" section on function pages is now a proper toggle button: the chevron rotates as it opens, and you can open or close it with Enter / Space from the keyboard.
- The "Copy" button on code examples is now always faintly visible (not invisible until hover), so it's obvious you can copy a snippet — and tapping it on touch devices works.
- Buttons in the top bar (search, version picker, theme toggle) and the "Edit on GitHub" link now have visible focus outlines and bigger tap targets, so they're easier to reach with the keyboard or on a phone.

## How to test the changes

1. Open `index.html`. In the top right, change the version dropdown from "v2.4 (latest)" to "v2.3". Instead of a popup, the small badge in the hero updates to "v2.3 docs" and a green "Version updated to v2.3" toast briefly slides up at the bottom.
2. Press Ctrl+K (or ⌘K on Mac). The search dialog opens with a clear ✕ button in the top-right corner. Press Escape — the dialog closes. Open it again and click outside the search box — it also closes. Open it again, click any result link — it closes before navigating.
3. Open `function-date-trunc.html` and scroll down to "Version history". Click the row to collapse it — the chevron rotates and the entries hide. Use Tab to focus it and press Enter or Space to open it again.
4. On the same page, hover or tap any of the dark SQL example blocks — the "Copy" button is faintly visible by default and brightens on hover. Click it.
5. Use Tab to step through the top bar. Each button (search, version, theme) shows a clear green outline when focused.
6. Resize to phone width. The top bar buttons, "Edit on GitHub" link, and code "Copy" buttons all grow to be comfortably tappable.
