# UXAgent Exploration Plan

## Goal

Exhaustively explore and validate the UX of the Tessera documentation site, focusing on navigation, global controls, reference layout, and responsive design.

## Plan Summary

The exploration will first validate the homepage global controls like the version switcher, search modal, and theme toggle. It will then traverse the main reference documentation, verifying the deep left-side TOC and right-side page outlines. After examining specific content types like functions and operators, the run will conclude with mobile viewport checks to assess the impact of flagged small tap targets and the responsive behavior of the complex 3-column layouts.

## Coverage Targets

- pages: `Visit home, main reference, at least two category pages, and at least two function pages.`
- features: `Exercise search, theme toggle, version select, TOC expand/collapse, and page-specific toggles.`
- mobile: `Validate navigation, layout collapsing, and table/code block overflowing on mobile.`

## Planned Phases

### Homepage & Global Controls

- Objective: Verify the functionality of global header controls and homepage links.
- Target pages: index.html
- Key checks:
  - Toggle the dark/light theme (🌓 button) and verify visual change.
  - Interact with the version switcher (<select>) and check for accessibility issues.
  - Click '⌘ K Search' and verify if a search interface appears.
  - Test primary call-to-action buttons ('Get started', 'View reference').
- Exit criteria:
  - Global header controls have been interacted with and their states/UI changes recorded.

### Reference Structure & TOC

- Objective: Validate the 3-column documentation layout and internal navigation mechanisms.
- Target pages: reference.html, sql-select.html
- Key checks:
  - Navigate using the left-hand Table of Contents.
  - Expand and collapse nodes within the left TOC (Schemas, Tables, Functions, etc.).
  - Click links in the right-side 'On this page' outline to verify smooth scrolling or anchor navigation.
  - Check cross-linking between reference pages.
- Exit criteria:
  - Left TOC expand/collapse functionality and right-side anchor links have been exercised.

### Content Pages & Interactions

- Objective: Examine specific reference pages for layout integrity and interactive components.
- Target pages: data-types.html, operators.html, function-date-trunc.html
- Key checks:
  - Verify readability of large tables (e.g., Data types, Operators).
  - Check syntax highlighting and layout of SQL code blocks and result tables.
  - Interact with the 'Version history' collapsible panel on the DATE_TRUNC page.
  - Verify external links like 'Edit this page on GitHub'.
- Exit criteria:
  - Various content types (tables, code blocks) and page-specific interactions have been validated.

### Mobile Viewport Validation

- Objective: Assess the usability of the documentation on smaller screens, addressing layout warnings.
- Target pages: index.html, function-date-trunc.html
- Key checks:
  - Switch to mobile viewport.
  - Evaluate the usability of header navigation given the 'small_tap_target' warnings.
  - Verify how the 3-column layout on function pages collapses (e.g., does TOC become a hamburger menu?).
  - Check if wide data tables and code blocks scroll horizontally or break layout.
- Exit criteria:
  - Mobile layout adaptations and tap target usability have been documented.

## Prescan Summary

### Tessera — The embeddable SQL engine for fast local analytics.

- Page: `index.html`
- Headings: The embeddable SQL engine for fast local analytics., Quick start, Install, Connect, Your first query, Documentation
- Interactables: `2` buttons, `27` links, `2` inputs
- Notable controls:
  - clickable:a:Tessera
  - clickable:a:Docs
  - clickable:a:Reference
  - clickable:a:Tutorials
  - clickable:a:Download
  - clickable:a:GitHub
  - selectable:select:v2.4 (latest) v2.3 v2.2 v2.1
  - clickable:button:⌘ K Search

### Data types — Tessera

- Page: `data-types.html`
- Headings: Data types, Numeric types, String types, Boolean, Date / Time types, Composite
- Interactables: `2` buttons, `65` links, `2` inputs
- Notable controls:
  - clickable:a:Tessera
  - clickable:a:Docs
  - clickable:a:Reference
  - clickable:a:Tutorials
  - clickable:a:Download
  - clickable:a:GitHub
  - selectable:select:v2.4 (latest) v2.3 v2.2 v2.1
  - clickable:button:⌘ K Search

### DATE_TRUNC — Tessera

- Page: `function-date-trunc.html`
- Headings: DATE_TRUNC, Signature, Parameters, Return value, Examples, 1. Truncate to day, 2. Bucket events by hour for aggregation, 3. Nested with EXTRACT for weekday rollups, Errors, Version history
- Interactables: `5` buttons, `74` links, `2` inputs
- Notable controls:
  - clickable:a:Tessera
  - clickable:a:Docs
  - clickable:a:Reference
  - clickable:a:Tutorials
  - clickable:a:Download
  - clickable:a:GitHub
  - selectable:select:v2.4 (latest) v2.3 v2.2 v2.1
  - clickable:button:⌘ K Search

### JSON_EXTRACT — Tessera

- Page: `function-json-extract.html`
- Headings: JSON_EXTRACT, Signature, Parameters, Return value, Examples, 1. Extract a string field, 2. Extract from JSON column in table, 3. Array indexing, Errors, Version history
- Interactables: `5` buttons, `74` links, `2` inputs
- Notable controls:
  - clickable:a:Tessera
  - clickable:a:Docs
  - clickable:a:Reference
  - clickable:a:Tutorials
  - clickable:a:Download
  - clickable:a:GitHub
  - selectable:select:v2.4 (latest) v2.3 v2.2 v2.1
  - clickable:button:⌘ K Search

### REGEXP_MATCH — Tessera

- Page: `function-regexp-match.html`
- Headings: REGEXP_MATCH, Signature, Parameters, Return value, Examples, 1. Simple match, 2. Case insensitive match with flag, 3. Filter rows matching pattern, Errors, Version history
- Interactables: `5` buttons, `74` links, `2` inputs
- Notable controls:
  - clickable:a:Tessera
  - clickable:a:Docs
  - clickable:a:Reference
  - clickable:a:Tutorials
  - clickable:a:Download
  - clickable:a:GitHub
  - selectable:select:v2.4 (latest) v2.3 v2.2 v2.1
  - clickable:button:⌘ K Search

### ROW_NUMBER — Tessera

- Page: `function-row-number.html`
- Headings: ROW_NUMBER, Signature, Parameters, Return value, Examples, 1. Number all rows by created_at, 2. Top-N per partition, 3. Distinguishes ties (vs RANK), Version history, 2 entries
- Interactables: `5` buttons, `73` links, `2` inputs
- Notable controls:
  - clickable:a:Tessera
  - clickable:a:Docs
  - clickable:a:Reference
  - clickable:a:Tutorials
  - clickable:a:Download
  - clickable:a:GitHub
  - selectable:select:v2.4 (latest) v2.3 v2.2 v2.1
  - clickable:button:⌘ K Search

### Operators — Tessera

- Page: `operators.html`
- Headings: Operators, Arithmetic, Comparison, Logical, String, JSON, Array
- Interactables: `2` buttons, `66` links, `2` inputs
- Notable controls:
  - clickable:a:Tessera
  - clickable:a:Docs
  - clickable:a:Reference
  - clickable:a:Tutorials
  - clickable:a:Download
  - clickable:a:GitHub
  - selectable:select:v2.4 (latest) v2.3 v2.2 v2.1
  - clickable:button:⌘ K Search

### Reference — Tessera

- Page: `reference.html`
- Headings: Reference, Browse by category, What's new in v2.4
- Interactables: `2` buttons, `72` links, `2` inputs
- Notable controls:
  - clickable:a:Tessera
  - clickable:a:Docs
  - clickable:a:Reference
  - clickable:a:Tutorials
  - clickable:a:Download
  - clickable:a:GitHub
  - selectable:select:v2.4 (latest) v2.3 v2.2 v2.1
  - clickable:button:⌘ K Search

### SELECT statement — Tessera

- Page: `sql-select.html`
- Headings: SELECT statement, Syntax, WITH, FROM, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT and OFFSET, Examples
- Interactables: `5` buttons, `69` links, `2` inputs
- Notable controls:
  - clickable:a:Tessera
  - clickable:a:Docs
  - clickable:a:Reference
  - clickable:a:Tutorials
  - clickable:a:Download
  - clickable:a:GitHub
  - selectable:select:v2.4 (latest) v2.3 v2.2 v2.1
  - clickable:button:⌘ K Search

