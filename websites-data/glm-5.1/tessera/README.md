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

- The EXTRACT entry in the left reference TOC and on the DATE_TRUNC "Related functions" list now opens a real function page (`function-extract.html`) instead of going nowhere.
- The new EXTRACT page follows the same shape as DATE_TRUNC — signature, parameters, three SQL examples (year/month, day-of-week rollup, epoch seconds), error notes, version history, and related links.
- Placeholder links (the ones marked with "#" — like Tutorials, Download, GitHub, and several "coming soon" function names) no longer jump to the top of the page; they're now visibly marked as disabled with a "Coming soon" tooltip.
- Following a bad URL no longer dumps you on a generic browser error — a friendly `404.html` page now appears with a "Back to docs home" button and six popular destination cards.
- The Functions and Operators groups in the left TOC no longer start expanded by default, so you see a cleaner top-level tree on first visit and choose which group to open.
- The version switcher, search button, theme toggle, and other top-bar controls have proper labels so screen readers announce what they do (for example, "Toggle dark theme").
- Buttons, top-navigation links, and items in the left TOC are larger and more comfortable to tap on phones (each control is now at least the recommended 44 pixels tall).

## How to test the changes

1. Open `reference.html`. In the left TOC, expand the Functions → Date-Time group and click "EXTRACT" — it should open a full function page (not a dead link).
2. From `function-date-trunc.html`, scroll to the "Related functions" list at the bottom and click EXTRACT — it should land on the same new page.
3. On any page, click a placeholder top-nav link like "Tutorials", "Download", or "GitHub" — the cursor should show "not allowed" and a "Coming soon" tooltip appears, and the page stays put.
4. In your address bar, type `function-does-not-exist.html` after the site path — you should land on the new 404 page with a "Back to docs home" button and a "Popular pages" grid.
5. Open `reference.html` fresh — the Functions and Operators sections in the left TOC should appear collapsed by default; click each header to expand them.
6. With a screen reader (or by hovering), check that the version dropdown, the ⌘K search button, and the 🌓 theme button announce or show meaningful labels like "Documentation version" and "Toggle dark theme".
7. Resize the browser to phone width and confirm that the top-nav links, version switcher, and TOC items all feel comfortably tap-sized.
