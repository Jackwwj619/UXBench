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

- "Coming soon" links across the docs (Tutorials, Download, GitHub in the top nav, several left-TOC entries, and related-function placeholders) are now visibly tagged with a small "Coming soon" pill and disabled, so you no longer click a real-looking link and get bounced to the top of the page.
- The right-hand on-this-page outline now scroll-spies smoothly with a clear active highlight. Clicking a TOC entry smooth-scrolls to the heading with a sticky-header offset, and the bottom heading stays highlighted once you reach the end of the page.
- The Operators page now responds to URL hashes — opening `operators.html#json` lands you on the JSON section with that nav entry pre-highlighted, and the active highlight follows the hash when you click between sections.
- The version switcher no longer pops up an "(mock)" alert. Selecting a different version updates the hero badge label (e.g. "v2.3 (archived)") and writes the choice into the URL so the state survives a refresh.
- The hero "Get started →" button on the docs home now actually navigates somewhere (the SELECT reference) instead of pointing at `#`.
- The block-builder, search dialog, and reference tables now reflow on phone-width screens. Reference tables become horizontally scrollable rather than overflowing the page, and search results stack vertically with 44px tap targets.
- The version switcher and other key controls picked up `aria-label` attributes, so screen-reader users hear "Select documentation version" instead of an anonymous select.
- The "copy" button on code blocks is now visible on touch devices (no hover required) and meets a minimum tap-target size.

## How to test the changes

1. Open `index.html`. Look at the top nav — "Tutorials", "Download", and "GitHub" now show a small "Coming soon" pill and don't navigate when clicked. Same for placeholder entries in the left TOC on `reference.html`.
2. Open `function-date-trunc.html` and scroll down. The right-hand outline highlights the section closest to the top of the viewport. Click a TOC entry — the page smoothly scrolls to that heading with a comfortable offset below the sticky header.
3. Open `operators.html#json` directly in the URL bar — the JSON section is in view and the JSON nav entry is highlighted. Click "Comparison" in the outline; the URL hash updates and the active highlight follows.
4. Open `index.html` and pick "v2.3" from the version switcher — the hero badge updates to read "v2.3 (archived)" and the URL gains `?docsVersion=v2.3`. No alert pops up.
5. Click the hero "Get started →" button on `index.html` — it navigates to `sql-select.html`, not the page top.
6. Shrink the browser to phone width on `function-date-trunc.html` — the parameter and result tables become horizontally scrollable inside the page rather than overflowing it, the copy button on code blocks is visible without hover, and ⌘K results stack into a single column with tappable rows.
7. Use a screen reader to focus the version switcher — it announces "Select documentation version".
