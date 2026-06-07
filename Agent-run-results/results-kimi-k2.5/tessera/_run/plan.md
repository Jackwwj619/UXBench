# UXAgent Exploration Plan

## Goal

Explore and critique the UX of the Tessera docs system, covering the main docs flow, reference pages, and key interactions across desktop and mobile.

## Plan Summary

Start with the home page (index.html) to validate navigation, theme toggle, and quick-start flows. Then explore the reference page (reference.html) and function detail pages (e.g., function-regexp-match.html, function-row-number.html) to check three-column layout, TOC, and code examples. Finally, verify mobile responsiveness and error-handling for failing pages (e.g., function-date-trunc.html).

## Coverage Targets

- pages: `Visit all known HTML pages (excluding failing ones initially, then re-validate failing pages if possible).`
- features: `Exercise all visible controls (theme, version, TOC, buttons, links) on key pages.`
- mobile: `Repeat critical checks (navigation, theme, version, TOC) on mobile viewport for index.html, reference.html, and one function page.`

## Planned Phases

### Home Page & Core Interactions

- Objective: Validate home page navigation, theme toggle, version switcher, and quick-start flows.
- Target pages: index.html
- Key checks:
  - Click theme toggle (🌓) to switch dark/light.
  - Interact with version selector (v2.4 / v2.3) to check responsiveness.
  - Click 'Get started' and 'View reference' buttons to verify navigation.
  - Test search button (⌘K) for interaction (even if search is dummy).
- Exit criteria:
  - All home page interactables tested, theme toggle works, version selector responds, navigation links to reference/index work.

### Reference & Three-Column Layout

- Objective: Explore reference.html, check TOC, popular links, and three-column layout consistency.
- Target pages: reference.html
- Key checks:
  - Expand/collapse left TOC (e.g., Functions > String sub-group).
  - Click popular links (e.g., DATE_TRUNC, REGEXP_MATCH) to check navigation.
  - Verify right-side 'On this page' outline and center content layout.
- Exit criteria:
  - Left TOC interactable, popular links navigate, three-column layout verified on desktop.

### Function Detail Pages (Valid)

- Objective: Validate function detail pages (e.g., function-regexp-match.html, function-row-number.html) for content, code blocks, and examples.
- Target pages: function-regexp-match.html, function-row-number.html
- Key checks:
  - Check three-column layout (left TOC, center content, right outline).
  - Verify code blocks (signature, examples) and parameter tables.
  - Test 'Edit this page on GitHub' button (if present) for interaction.
- Exit criteria:
  - Function pages load with valid content, code blocks/syntax highlighting (if present) are visible, examples are formatted.

### Other Reference Pages (Operators, Data Types, SQL Select)

- Objective: Explore operators.html, data-types.html, sql-select.html to check content structure and navigation.
- Target pages: operators.html, data-types.html, sql-select.html
- Key checks:
  - Check left TOC structure (e.g., Operators > Arithmetic sub-group).
  - Verify content organization (e.g., SQL SELECT syntax on sql-select.html).
  - Check for consistent three-column layout (if applicable).
- Exit criteria:
  - All target reference pages loaded, content structure verified, TOC interactable.

### Mobile Responsiveness & Error Handling

- Objective: Test mobile viewport for key pages, validate small tap targets, and check error pages (e.g., function-date-trunc.html).
- Target pages: index.html, reference.html, function-regexp-match.html
- Key checks:
  - Switch to mobile viewport, re-test theme toggle, version selector, and navigation.
  - Check small tap targets (e.g., search button, version selector) for usability on mobile.
  - Attempt to load function-date-trunc.html again to check error handling (e.g., 404 or fallback content).
- Exit criteria:
  - Mobile viewport shows responsive layout, critical interactables (theme, version, navigation) work, error page (if any) has meaningful fallback.

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
- Headings: none
- Interactables: `2` buttons, `6` links, `2` inputs
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
- Headings: none
- Interactables: `2` buttons, `6` links, `2` inputs
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

