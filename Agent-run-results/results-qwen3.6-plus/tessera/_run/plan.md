# UXAgent Exploration Plan

## Goal

Evaluate the UX of the Tessera documentation site, focusing on information architecture, navigation consistency, and the usability of technical reference pages (SQL/Functions) across desktop and mobile viewports.

## Plan Summary

The run will start at the homepage to validate global navigation and theme/version controls. It will then traverse the primary 'Reference' flow, testing the deep-linking TOC and specific function pages (`DATE_TRUNC`, `JSON_EXTRACT`) for content layout and readability. Finally, it will verify SQL syntax pages and repeat critical checks on mobile to address known tap-target risks.

## Coverage Targets

- pages: `Visit all 9 identified HTML files.`
- features: `Exercise Theme Toggle, Version Switcher, Search Modal, TOC Expand/Collapse, Collapsible Panels.`
- mobile: `Repeat Phase 1, 2, and 3 checks on mobile viewport (width < 768px).`

## Planned Phases

### Homepage & Global Controls

- Objective: Validate entry point clarity, global navigation persistence, and utility controls (Search, Theme, Version).
- Target pages: index.html
- Key checks:
  - Verify 'Get Started' and 'View Reference' CTAs lead to expected destinations.
  - Toggle Dark/Light theme and observe visual state change and persistence.
  - Interact with Version Switcher (v2.4/v2.3/etc) to check dropdown behavior.
  - Trigger Command-K Search modal to verify overlay and input focus.
- Exit criteria:
  - Theme toggle visually updates the UI.
  - Search modal opens and accepts input.
  - All main nav links are clickable.

### Reference Architecture & Navigation

- Objective: Assess the usability of the three-column reference layout and deep-linking TOC.
- Target pages: reference.html
- Key checks:
  - Expand/Collapse nodes in the left-hand TOC (e.g., Functions > Aggregate).
  - Click a popular link (e.g., 'DATE_TRUNC') to test deep linking.
  - Scroll the center content pane to verify if the right-hand 'On this page' outline updates active state.
  - Check responsiveness of the three-column layout when resizing window.
- Exit criteria:
  - TOC nodes expand/collapse without layout shift errors.
  - Internal links navigate correctly to specific function pages.
  - Right-hand outline highlights current section on scroll.

### Technical Content & Function Details

- Objective: Critique the presentation of complex technical data (signatures, params, examples) on specific function pages.
- Target pages: function-date-trunc.html, function-json-extract.html, function-row-number.html
- Key checks:
  - Validate code block syntax highlighting and copy-to-clipboard functionality (if present).
  - Interact with 'Version History' collapsible panel at the bottom of the page.
  - Verify table readability for 'Parameters' and 'Return Value' sections.
  - Check breadcrumb navigation ('> FUNCTIONS > DATE / TIME') for correct hierarchy and clickability.
- Exit criteria:
  - Code blocks are legible and distinct from body text.
  - Version history panel toggles open/closed smoothly.
  - Breadcrumbs allow upward navigation.

### SQL Syntax & Data Types

- Objective: Ensure consistent styling and navigation for broader concept pages compared to specific function pages.
- Target pages: sql-select.html, data-types.html, operators.html
- Key checks:
  - Review 'SELECT' statement syntax diagram/table for horizontal overflow handling.
  - Check 'Data Types' table for responsive behavior (stacking vs scrolling).
  - Verify that 'Edit this page on GitHub' links are present and consistent.
  - Test back-navigation to Reference home via sidebar or breadcrumbs.
- Exit criteria:
  - Wide tables/code blocks do not break mobile layout (horizontal scroll available).
  - Navigation back to parent categories works intuitively.

### Mobile Validation & Accessibility

- Objective: Re-run critical flows on mobile viewport to address prescan warnings regarding tap targets and layout.
- Target pages: index.html, reference.html, function-date-trunc.html
- Key checks:
  - Verify header hamburger menu (if applicable) or horizontal scroll behavior for nav links.
  - Attempt to tap small header controls (Theme, Version) to assess error rate/usability.
  - Check if the left-hand TOC collapses into a drawer or remains visible on narrow screens.
  - Validate font sizes for code blocks and parameter tables on mobile.
- Exit criteria:
  - No critical layout breakage on mobile viewport.
  - Identification of specific 'fat finger' issues in the header and TOC.

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

