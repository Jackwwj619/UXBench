# UXAgent Exploration Plan

## Goal

Evaluate the UX of the FRED Unemployment Rate (UNRATE) series page, focusing on data visualization interactivity, metadata clarity, and responsive layout stability.

## Plan Summary

The exploration will focus on the single-page application structure of `index.html`. It begins by validating the core chart interactions (time range toggles, tooltips, recession shading), moves to secondary views (data table, graph editing tools), and concludes with a rigorous mobile viewport check to address pre-identified tap target issues. Since no other HTML pages exist, depth is prioritized over breadth.

## Coverage Targets

- pages: `100% of known HTML files (index.html)`
- features: `Exercise all chart toggles, view modes, and action buttons`
- mobile: `Full regression of Phase 1 and 2 checks on mobile viewport`

## Planned Phases

### Core Chart Interaction & State Management

- Objective: Validate the primary data visualization flow, ensuring time-range toggles update the view correctly and tooltips provide accurate context.
- Target pages: index.html
- Key checks:
  - Click '1Y', '5Y', '10Y', and 'Max' toggles; verify chart axis and data points update accordingly.
  - Hover over multiple data points across different eras (e.g., 1980s peak, 2020 drop) to test tooltip accuracy and positioning.
  - Verify recession shading (gray vertical bars) aligns correctly with historical downturns.
  - Test manual date range inputs ('From'/'To') with valid and invalid dates.
- Exit criteria:
  - All time-range toggles visually update the chart.
  - Tooltips appear consistently on hover.
  - No console errors during state transitions.

### Secondary Views & Action Controls

- Objective: Explore adjacent features including the data table view, graph customization, and export options.
- Target pages: index.html
- Key checks:
  - Toggle 'View as data table'; verify tabular data matches the visual chart trends.
  - Click 'Edit Graph' to identify available customization options (line style, colors, etc.).
  - Click 'Download' and 'Share' to verify modal/dialog behavior and copy-to-clipboard functionality.
  - Review the 'Notes' and 'Metadata' section for readability and completeness.
- Exit criteria:
  - Data table renders without layout breakage.
  - Action buttons (Download/Share/Edit) trigger expected UI responses (modals/dropdowns).

### Mobile Responsiveness & Accessibility

- Objective: Address prescan warnings regarding small tap targets and ensure usability on narrow viewports.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport (e.g., iPhone SE/12).
  - Attempt to close the maintenance banner and use main navigation links; measure ease of tapping.
  - Verify chart interactivity on touch devices (tap-to-hover vs. scroll behavior).
  - Check if the 'Edit Graph' and 'Download' buttons remain accessible or collapse into a menu.
  - Validate that text in the metadata section does not overflow or become illegible.
- Exit criteria:
  - Critical controls are tappable without zooming.
  - Chart remains readable on mobile.
  - No horizontal scrolling issues on the main content area.

## Prescan Summary

### Unemployment Rate (UNRATE) | FRED | St. Louis Fed

- Page: `index.html`
- Headings: Unemployment Rate (UNRATE), Chart, Notes, Release Tables, Related Data and Content, Data Suggestions Based On Your Search, Content Suggestions, Other Formats, Related Categories, Releases
- Interactables: `65` buttons, `73` links, `14` inputs
- Notable controls:
  - clickable:button:Close maintenance notice
  - clickable:a:Skip to main content
  - clickable:a:FRED home
  - typeable:input:Search FRED Data
  - clickable:button:Search
  - clickable:button:Explore FRED apps
  - clickable:button:Open account menu
  - clickable:a:RELEASE CALENDAR

