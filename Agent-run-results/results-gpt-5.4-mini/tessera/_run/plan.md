# UXAgent Exploration Plan

## Goal

Exhaustively explore Tessera’s documentation/tutorial UX, with emphasis on the primary onboarding path from home to SQL/reference content, while validating adjacent navigation, version switching, search/theme controls, and mobile usability risks.

## Plan Summary

Start on the docs home page and verify the main onboarding path: hero CTA, quick-start cards, and the key documentation categories that branch into SQL syntax, reference, data types, and function detail pages. Then spend most of the run in the reference and function pages, checking category navigation, deep links, example blocks, and collapsible/versioned content for consistency and recoverability. Finally, repeat the most important interactions in a mobile viewport to confirm the known small tap targets and unlabeled select/search controls do not break navigation.

## Coverage Targets

- pages: `Visit all 9 known HTML pages, with deeper interaction on the 5 content-heavy docs pages plus home and reference entry.`
- features: `Exercise the visible global controls, at least one navigation interaction per major page, and most visible section/expand/collapse controls on reference and function pages.`
- mobile: `Repeat the critical onboarding, reference browsing, and dense-content reading checks in a mobile viewport, prioritizing the small-tap-target and unlabeled-select risks.`

## Planned Phases

### Home page onboarding and global controls

- Objective: Validate the first impression flow and the global controls that should be available across docs pages.
- Target pages: index.html
- Key checks:
  - Open the hero CTA and confirm whether it routes anywhere meaningful or behaves as a dead end
  - Open View reference and confirm it lands on the reference overview
  - Interact with the version selector and verify the visible versions can be selected without layout breakage
  - Open the ⌘K Search button and observe whether it triggers a dialog, overlay, or no-op
  - Toggle theme and confirm the page visually updates and remains readable
  - Check top-nav and quick-start/documentation cards for consistent link behavior
- Exit criteria:
  - Hero, global controls, and at least 4 distinct home-page links/cards have been exercised
  - Any placeholder or no-op links are identified
  - A baseline desktop state is captured for later comparison

### Reference entry and category navigation

- Objective: Validate the main documentation browser and how users move through the deep reference hierarchy.
- Target pages: reference.html
- Key checks:
  - Open the left TOC tree and verify categories expand/collapse cleanly
  - Check that the center overview links to popular pages such as DATE_TRUNC, REGEXP_MATCH, JSON_EXTRACT, and ROW_NUMBER
  - Inspect the right-side on-this-page outline for usability and anchor behavior
  - Verify the v2.4 new-features callout is visible and scannable
  - Follow at least one link from each major category group if available
- Exit criteria:
  - Primary TOC sections and popular links have been exercised
  - At least one deep-reference navigation path has been validated end to end
  - No major clipping/overlap issues prevent browsing the page

### Core syntax and type reference path

- Objective: Cover the foundational learning path for SQL syntax and data types, since these underpin most adjacent docs.
- Target pages: sql-select.html, data-types.html, operators.html
- Key checks:
  - Review SELECT syntax ordering and check any code-copy or example affordances
  - Verify section anchors or in-page navigation for clauses like FROM, WHERE, GROUP BY, HAVING, ORDER BY, and LIMIT/OFFSET
  - Inspect data type tables for readability, row alignment, and cross-links to related functions/types
  - Inspect operators tables for precedence and category separation
  - Confirm links from these pages into function/reference pages are consistent
- Exit criteria:
  - Each foundational page is visited and scannability of tables/code blocks is confirmed
  - At least one internal link or anchor interaction is tested on each page
  - Any overly dense table or syntax presentation issues are recorded

### Function detail pages and example validation

- Objective: Deeply validate the most content-rich function pages and their example/error/version states.
- Target pages: function-date-trunc.html, function-json-extract.html, function-regexp-match.html, function-row-number.html
- Key checks:
  - On DATE_TRUNC, verify signature, parameter table, return value, all three examples, error callouts, and version history panel
  - On JSON_EXTRACT, verify JSONPath description, examples, and any table/result formatting
  - On REGEXP_MATCH, verify RE2 guidance, flags parameter, and filtering example clarity
  - On ROW_NUMBER, verify window clause explanation, examples, and the tie-vs-rank distinction
  - Test page-local links and edit-on-GitHub affordances where present
  - Check that collapsed/expanded or example-heavy sections remain usable after interaction
- Exit criteria:
  - All four function pages have their key sections inspected
  - At least one expandable or stateful control on the function pages has been toggled if present
  - Example/code/result presentation is confirmed readable and consistent

### Mobile viewport regression pass

- Objective: Recheck the highest-risk navigation and reading flows on mobile, with focus on tap targets and layout stability.
- Target pages: index.html, reference.html, sql-select.html, data-types.html, function-date-trunc.html, function-json-extract.html, function-regexp-match.html, function-row-number.html, operators.html
- Key checks:
  - Repeat the home-page version selector, search, theme toggle, and primary CTAs on mobile
  - Verify the reference TOC can be expanded and used without accidental taps or clipping
  - Check that dense tables, code blocks, and example sections remain legible and scrollable
  - Confirm small tap targets flagged in the prescan are still usable or note exact failures
  - Ensure no horizontal overflow or broken sticky nav behavior blocks reading
- Exit criteria:
  - Critical controls have been tested at mobile size on the home and at least two content-heavy pages
  - Any tap-target or label issues are confirmed with mobile evidence
  - Layout remains navigable across the main docs flow

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

