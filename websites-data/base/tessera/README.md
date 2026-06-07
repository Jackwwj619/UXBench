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
