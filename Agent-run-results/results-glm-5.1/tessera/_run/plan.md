# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the full Tessera documentation site, focusing on the primary onboarding flow, reference navigation, interactive controls, and responsive layout states.

## Plan Summary

The exploration will proceed in four phases: validating the homepage onboarding and global controls, navigating the deep reference structure and three-column layouts, testing interactive elements like search and version switching, and finally verifying responsive mobile behavior and layout warnings. The run will prioritize the primary user flow from landing to function reference, while deeply validating high-risk areas like the version switcher and search modal.

## Coverage Targets

- pages: `Visit all 9 known HTML pages, with deep interaction on index, reference, and at least 2 function detail pages`
- features: `Exercise all global controls (theme, version, search), TOC tree interactions, and canonical page elements (collapsible panels, code copy)`
- mobile: `Repeat critical navigation and layout checks on mobile viewport, focusing on three-column collapse and tap targets`

## Planned Phases

### Homepage & Onboarding Flow

- Objective: Validate the primary landing experience, hero section, and quick-start navigation.
- Target pages: index.html
- Key checks:
  - Click 'Get started →' and verify scroll or navigation behavior
  - Click 'View reference' to ensure it navigates to reference.html
  - Click Quick start cards (Install, Connect, Your first query) and verify behavior
  - Click Documentation section cards (Architecture, SQL Syntax, Functions, Data Types, Storage, Extensions) and verify routing
- Exit criteria:
  - All hero and card links have been clicked and their destinations/scroll behaviors verified
  - Initial layout and content rendering validated on desktop

### Reference Navigation & Detail Pages

- Objective: Validate the three-column reference layout, TOC tree interactions, and canonical function page structure.
- Target pages: reference.html, function-date-trunc.html, sql-select.html, data-types.html, operators.html
- Key checks:
  - Expand and collapse nodes in the left-side deep TOC tree on reference.html
  - Navigate from reference.html popular links to function-date-trunc.html
  - Verify three-column layout integrity and right-side on-this-page outline on function detail pages
  - Check collapsible version-history panel and error-case callouts on function-date-trunc.html
  - Validate syntax highlighting and copy buttons on sql-select.html
- Exit criteria:
  - TOC tree expand/collapse functions correctly
  - Three-column layout renders without overlap on desktop
  - At least 3 function/detail pages deeply scrolled and validated

### Global Controls & Interactive States

- Objective: Test global interactive elements: theme toggle, version switcher, and search.
- Target pages: index.html, reference.html
- Key checks:
  - Toggle dark/light theme (🌓 button) and verify persistence across page navigation
  - Change version using the select dropdown (e.g., switch to v2.3) and check for content/UI updates or errors
  - Open search modal via ⌘K button, type a query, and verify results display and keyboard navigation
  - Verify focus management when opening and closing the search modal
- Exit criteria:
  - Theme toggle successfully switches themes and persists
  - Version switcher alters visible state without breaking layout
  - Search modal opens, accepts input, and closes cleanly

### Mobile Responsive & Accessibility Checks

- Objective: Validate mobile viewport behavior, layout collapses, and tap target accessibility.
- Target pages: index.html, reference.html, function-date-trunc.html
- Key checks:
  - Switch to mobile viewport and verify hamburger menu or responsive nav behavior
  - Check three-column layout collapse on reference.html and function-date-trunc.html (ensure TOC is accessible)
  - Validate tap target sizes for nav links, quick-start cards, and version switcher
  - Check for horizontal scrolling or overflow issues on mobile
  - Verify accessibility of the version switcher select element on mobile
- Exit criteria:
  - Mobile navigation is fully functional
  - No critical layout overlaps or horizontal scrolling on mobile
  - Tap target warnings revisited and contextualized for mobile UX

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

