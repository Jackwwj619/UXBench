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

- The version switcher at the top right (which used to pop up a fake "switching to v2.3" alert) has been replaced with a clean "v2.4 latest" badge plus a "Changelog" link that jumps to the release-notes section, so it no longer pretends to do something it can't.
- Sections that aren't really written yet — Tutorials, Download, GitHub, Edit-on-GitHub, Architecture, Storage, Extensions, CREATE TABLE, ALTER TABLE — are now clearly marked "Coming soon" instead of looking like broken links that go nowhere.
- Dead links throughout the home page (Get started, Install, Connect, Your first query) now actually navigate to the relevant reference or SQL pages.
- On phones, there's a new "☰" menu button that opens the top navigation, so the nav links are reachable on small screens.
- The "Version history" panel on function pages now starts closed (with a right-pointing arrow) and opens with a click or by pressing Enter when focused — it used to be open by default and not keyboard-friendly.
- Code-example blocks now have a working Copy button that briefly says "Copied!" after you click it.
- Wide tables (parameters, data types, results) scroll sideways on narrow screens instead of breaking the layout.
- The search dialog (⌘K / Ctrl+K) now returns focus to the search button when you close it with Esc.

## How to test the changes

1. Open `index.html`. Look at the top right — you should see a "v2.4 latest" badge and a "Changelog" link instead of a dropdown.
2. Scroll down to the section cards — Architecture, Storage, and Extensions are now greyed-out cards labelled "Coming soon" rather than clickable links.
3. Click "Get started", "Install", or "Your first query" — they go to real pages now.
4. Narrow the browser window — the nav collapses and a "☰" button appears top-left of the nav; clicking it opens the menu.
5. Open `function-date-trunc.html` and scroll to "Version history" — click the header to expand and collapse it. Click any Copy button on a code example to test the copy confirmation.
6. Press Ctrl+K (or ⌘K) anywhere to open search; press Esc — focus returns to the search button.
