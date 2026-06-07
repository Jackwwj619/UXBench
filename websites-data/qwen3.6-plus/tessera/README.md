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

- **Reference tables scroll instead of overflowing on phones.** Wide data tables (parameter tables, result tables, operator and data-type tables) now sit inside a horizontally scrollable frame on narrow screens, with a small "← scroll →" hint so it's clear the table can be panned.
- **The search dialog has a visible close button.** A small × in the top-right of the search box closes the dialog, so you don't have to press Escape or hunt for the close gesture.
- **The "Get started" button on the home page actually scrolls somewhere.** Clicking it now jumps you to the Quick start section further down the home page instead of doing nothing.
- **Quick-start cards lead to real pages.** The Install card jumps to the Quick start anchor on the same page, and the Connect and Your first query cards link to the SELECT reference page so you have somewhere to land.
- **Bigger, easier-to-tap top bar.** The brand logo, top-nav links, version switcher, search box, and theme toggle all have larger tap areas (around 44 pixels tall), making the header comfortable to use on a phone.
- **Cleaner labels for screen readers and tooltips.** The version switcher and the theme toggle now have descriptive titles and screen-reader labels (e.g. "Toggle light/dark theme", "Select documentation version"), so it's clearer what each control does.

## How to test the changes

1. Open `function-date-trunc.html` and shrink the browser to phone width. The parameter and result tables should stay readable, sit inside a scrollable frame, and show a small "← scroll →" hint in the corner. Drag them sideways to confirm they scroll.
2. On `index.html`, press ⌘K (or Ctrl+K) to open the search dialog. A × button should now be visible in the top-right corner — click it to close the dialog.
3. On `index.html`, click the **Get started →** button in the hero. The page should scroll down to the Quick start section instead of staying put.
4. Still on `index.html`, click each Quick start card (Install / Connect / Your first query) — Install should scroll to the Quick start section, and the other two should take you to the SELECT reference page.
5. Resize the browser to phone width and try tapping the version switcher, the theme toggle, and the top-nav links — each should feel comfortably large and easy to hit.
6. Hover the version switcher or the theme toggle to see the new descriptive tooltip text.
