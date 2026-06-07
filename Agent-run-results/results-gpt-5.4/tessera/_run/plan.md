# UXAgent Exploration Plan

## Goal

Exhaustively explore Tessera’s docs experience by validating the homepage-to-reference journey, the deep reference/navigation model, representative detail pages, and shared utility controls across desktop and mobile.

## Plan Summary

Start on the docs home to confirm the primary entry points into the reference and SQL syntax content, then move into the three-column reference experience where most of the system’s complexity appears to live. From there, traverse a representative set of detail pages spanning SQL syntax, data types, operators, and multiple function categories, while checking shared controls such as search, theme toggle, version switcher, TOC expansion, on-this-page navigation, copy actions, and collapsible history panels. Finish with focused mobile passes on the homepage and the dense reference/detail layouts, since the prescan already shows small tap targets and a missing label on the version selector.

## Coverage Targets

- pages: `Visit all 9 known HTML pages, with deeper repeat passes on index.html, reference.html, sql-select.html, data-types.html, and function-date-trunc.html.`
- features: `Exercise all visible global controls at least once where present, validate major navigation paths from homepage and reference hub, and interact with most visible stateful controls on representative detail pages.`
- mobile: `Repeat critical checks on index.html and reference.html plus at least three dense content pages; prioritize header controls, expandable navigation, code/table readability, and tap-target usability.`

## Planned Phases

### Homepage entry flow and global controls

- Objective: Validate the landing page as the primary docs entry point and confirm whether the main navigation and utility controls provide reliable paths into the system.
- Target pages: index.html
- Key checks:
  - Verify the main header links and identify which routes are real destinations versus '#' placeholders
  - Click 'View reference' and the SQL Syntax/Data Types cards to confirm prominent homepage routes work as expected
  - Test 'Get started →' specifically because it appears prominent but may not navigate
  - Exercise the version switcher and observe whether selection changes page content, URL, or state
  - Open the search control from the homepage and validate whether it launches an overlay, focuses an input, or fails silently
  - Toggle theme and confirm visible styling updates on hero text, code sample, and buttons
- Exit criteria:
  - Primary homepage paths into reference and syntax content are confirmed
  - Non-navigating placeholder links are identified and distinguished from actual UX defects
  - Initial behavior of version switcher, search, and theme toggle is documented

### Reference hub and navigation model

- Objective: Validate the reference landing page as the core browsing experience, with emphasis on deep navigation, category discovery, and orientation aids.
- Target pages: reference.html
- Key checks:
  - Inspect the three-column layout for clear hierarchy between left TOC, center content, and right on-this-page outline
  - Expand and collapse visible nav groups under Functions and Operators, confirming state changes and link reachability
  - Use popular links from the center content to navigate to representative detail pages
  - Check whether the on-this-page outline reflects current sections and supports intra-page navigation
  - Verify the v2.4 new-features callout is readable and does not compete excessively with primary reference navigation
  - Retest theme toggle and search from within the denser docs layout
- Exit criteria:
  - Left nav tree behavior is understood, including expandable states and successful navigation to child pages
  - At least one navigation path from TOC and one from popular links has been validated
  - Reference page orientation aids are assessed for clarity and usefulness

### Representative detail page coverage

- Objective: Cover the full known content model by visiting representative pages across syntax, data types, operators, and multiple function categories, while checking shared page patterns.
- Target pages: sql-select.html, data-types.html, operators.html, function-date-trunc.html, function-json-extract.html, function-regexp-match.html, function-row-number.html
- Key checks:
  - On sql-select.html, validate section navigation, long-form readability, code example presentation, and any copy controls
  - On data-types.html, inspect large tables for scanability, horizontal fit, and consistency of headings/section structure
  - On operators.html, check grouped operator tables and whether category structure is easy to navigate
  - On each function page, confirm signature, parameter table, return value, examples, and error/version sections are complete and visually consistent
  - Use left-nav links to move among function pages from different categories: date/time, JSON, string/regex, and window
  - Check 'Edit this page on GitHub' links for expected behavior where present
- Exit criteria:
  - All known HTML pages have been visited at least once
  - Shared detail-page patterns have been compared across multiple function categories
  - At least one syntax page, one table-heavy page, one operators page, and all four function pages have been exercised

### Interactive states and recovery paths

- Objective: Stress the pages with the highest statefulness to uncover hidden UX issues in collapsibles, copy actions, in-page links, and non-primary controls.
- Target pages: function-date-trunc.html, function-json-extract.html, function-regexp-match.html, function-row-number.html, sql-select.html, reference.html
- Key checks:
  - Open and close the version-history panel on function pages and confirm content visibility/state feedback
  - Interact with any copy buttons on SQL/function pages and verify feedback or copied-state affordance
  - Follow in-page anchor/outline links to examples, errors, and version history, then navigate back and confirm orientation is preserved
  - Check behavior around error-callout sections for readability and emphasis without disrupting flow
  - Retry search from a deep page to verify it behaves consistently outside the homepage
  - Switch theme while on a data-dense page and confirm tables, code blocks, and side rails remain legible
- Exit criteria:
  - Stateful controls on at least two detail pages and one syntax page have been exercised
  - Recovery from deep in-page navigation or repeated control use has been observed
  - Any broken, silent, or inconsistent interactions are captured with page-specific evidence

### Mobile-focused validation of critical paths

- Objective: Repeat the most important checks on mobile to confirm whether the dense docs layouts and small controls remain usable.
- Target pages: index.html, reference.html, sql-select.html, function-date-trunc.html, data-types.html
- Key checks:
  - Revisit the homepage header on mobile and test tappability of nav items, search, theme toggle, and version switcher
  - Confirm whether the three-column reference layout collapses responsibly on mobile and whether navigation remains discoverable
  - Check mobile readability of long code blocks and tables on sql-select.html, function-date-trunc.html, and data-types.html
  - Retest one expandable left-nav or version-history control on mobile for tap reliability
  - Validate that theme toggle and search remain accessible in the mobile viewport
  - Watch for clipping, horizontal scrolling, overlapping rails, or obstructed content on dense pages
- Exit criteria:
  - Critical homepage and reference flows have been repeated on mobile
  - At least one code-heavy page and one table-heavy page have been assessed on mobile
  - Mobile-specific usability findings are collected for the controls already flagged by prescan warnings

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

