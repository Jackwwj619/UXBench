# UXAgent Exploration Plan

## Goal

Critique the UX of the Tessera docs system by validating the primary docs/tutorial flow, the reference navigation patterns, and recovery/variant states (version switcher, search, theme).

## Plan Summary

Start on index.html to validate global navigation, version switching, search entry, and theme toggle. Then traverse the primary adjacent docs pages (sql-select.html and reference.html) to verify the multi-column reference layout, left TOC behavior, and on-page outline. Finally, validate a representative set of function/operator detail pages (DATE_TRUNC, JSON_EXTRACT, REGEXP_MATCH, ROW_NUMBER, plus operators.html) including version history expansion and example navigation.

## Coverage Targets

- pages: `Visit all known HTML pages listed in prescan (9 total).`
- features: `Exercise most visible controls per key page: version switcher, ⌘K search, theme toggle, reference left TOC expand/collapse, popular link navigation, and function version history collapsibles; additionally validate example result tables and error callouts.`
- mobile: `Repeat critical checks on mobile for index.html, reference.html, and function-date-trunc.html (header controls, TOC access, and collapsible/table rendering).`

## Planned Phases

### Index: global navigation, versioning, search, and theme

- Objective: Validate the primary entry experience and global controls from index.html, including variant selection and UI state changes.
- Target pages: index.html
- Key checks:
  - Use version switcher (v2.4 / v2.3 / v2.2 / v2.1) and confirm the page content updates to the selected release (or clearly indicates it does not).
  - Trigger ⌘K Search and verify it opens/closes correctly and returns relevant results/links within the local doc set.
  - Toggle dark/light theme via 🌓 and confirm syntax highlighting and contrast remain readable on code blocks.
  - Verify primary CTAs: 'Get started →' and 'View reference' navigate to the intended pages/sections without dead ends.
- Exit criteria:
  - Version switcher interaction is repeatable and results in either visible content/version callout changes or an explicit no-op explanation.
  - Search overlay/interaction opens, accepts input (if applicable), and navigates to at least one known target page (e.g., DATE_TRUNC, Operators, SELECT).
  - Theme toggle changes styling without breaking layout (code blocks remain readable).
  - Both CTAs navigate successfully to reference.html and/or the correct start section.

### Reference hub: 3-column navigation and browsing by category

- Objective: Validate reference.html's navigation model (left TOC tree, center content, right outline) and ensure category browsing works as expected.
- Target pages: reference.html
- Key checks:
  - Expand/collapse left TOC nodes (e.g., Functions → subgroups; Operators → categories) and confirm the active node highlights correctly.
  - Use popular links in the center section (e.g., DATE_TRUNC, REGEXP_MATCH, JSON_EXTRACT, ROW_NUMBER, Operators, Data types, SELECT statement) and confirm they load the corresponding function/operator/sql pages.
  - Verify right-side 'on-this-page' outline updates as the user scrolls or as content changes (if it is interactive).
  - Confirm version callout 'What’s new in v2.4' is visible and consistent with the current version selection from the header.
- Exit criteria:
  - Left TOC expand/collapse works without losing scroll position or causing broken states.
  - At least 3 center popular links successfully navigate to the expected detail pages among the target set.
  - Right-side outline is present and either updates with scroll or provides reliable anchor navigation.

### Tutorial/detail path: SELECT statement and core syntax flow

- Objective: Validate sql-select.html as the main tutorial/reference bridge, including readability of clauses and example navigation.
- Target pages: sql-select.html
- Key checks:
  - Verify clause order and explanations are readable; confirm there are no broken code blocks or missing sections (Syntax through Examples).
  - Test any in-page navigation (section jumps if present via outline anchors).
  - Check 'WITH' (CTE) section content for clarity and whether example code/results render correctly.
- Exit criteria:
  - All major sections listed in prescan headings are visible and accessible via scrolling/anchors.
  - Any available on-page navigation behaves consistently and does not misalign with content.

### Representative function pages: structure, examples, errors, version history

- Objective: Deep-validate the shared function detail pattern using DATE_TRUNC as the canonical example and cross-check two other function types.
- Target pages: function-date-trunc.html, function-json-extract.html, function-regexp-match.html, function-row-number.html
- Key checks:
  - For function-date-trunc.html: confirm signature and parameter table correctness; expand/collapse 'Version history'; validate 'Errors' content is clearly separated.
  - Verify examples (3 cases on DATE_TRUNC) show corresponding SQL and result tables and that tables are readable and not horizontally clipped.
  - Cross-check JSON_EXTRACT: ensure it communicates auto-parsing behavior and JSONPath usage clearly; confirm examples include extract/indexing cases.
  - Cross-check REGEXP_MATCH: confirm it clearly states RE2 syntax and truthiness behavior; ensure flags parameter description is readable.
  - Cross-check ROW_NUMBER: confirm it distinguishes ties (vs RANK) and that the signature shows required OVER clause parts.
  - Validate 'Edit this page on GitHub' link presence and that it is not misleading (even if external).
- Exit criteria:
  - DATE_TRUNC: version history collapsible works; errors section present; example result tables render cleanly.
  - Each other function page loads fully with signature/parameters/return value/examples visible and no layout breakage in result tables.

### Operators and data types: browse depth and table clarity

- Objective: Validate two non-function reference pages for navigation and content density handling.
- Target pages: operators.html, data-types.html
- Key checks:
  - operators.html: verify category sections (Arithmetic/Comparison/Logical/String/JSON/Array) and that operator precedence description is readable.
  - Confirm operator tables show example/result consistently and are not truncated on mobile widths.
  - data-types.html: validate presence of storage size/value ranges table and that numeric type aliases and defaults are readable.
  - Use left TOC interactions (if present) to jump between categories (from global navigation/within layout).
- Exit criteria:
  - Operator and data-type tables are readable with no major clipping and section headers are clearly distinguishable.
  - At least one intra-page browsing interaction works (e.g., scroll/outline/anchors) or category headings can be reliably found.

### Mobile viewport repeat: critical paths only

- Objective: Repeat the most failure-prone interactions from desktop on mobile to validate tap targets and layout.
- Target pages: index.html, reference.html, function-date-trunc.html
- Key checks:
  - index.html: verify tap targets for Tessera/Docs/Reference, version select, ⌘K Search, and 🌓 remain usable; ensure the header does not overlap content.
  - reference.html: verify left TOC (expand/collapse) remains accessible and does not obscure the center content.
  - function-date-trunc.html: verify version history collapsible and example tables are usable without horizontal scrolling issues.
- Exit criteria:
  - No critical controls become unusable (can open search, switch version, and toggle theme).
  - Reference navigation remains operable on mobile and detail sections remain readable.

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

