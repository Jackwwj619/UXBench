# UXAgent Exploration Plan

## Goal

Exhaustively explore and critique the FRED Unemployment Rate clone, focusing on data visualization interactions, graph controls, and responsive behavior.

## Plan Summary

The exploration will start by assessing the default page state, including the maintenance banner and overall layout. It will heavily focus on interacting with the main chart, adjusting date ranges, and toggling data views. Subsequent phases will delve into the 'Edit Graph' functionality and validate metadata and footer links. Finally, the run will re-evaluate critical chart controls and navigation on a mobile viewport due to flagged small tap targets.

## Coverage Targets

- pages: `Visit index.html (the sole page).`
- features: `Exercise all chart controls (range, view toggle, edit panel) and global actions (search, download).`
- mobile: `Ensure the chart, date inputs, and 'Edit Graph' controls are functional and readable on a narrow screen.`

## Planned Phases

### Initial State & Global Navigation

- Objective: Verify the default layout, dismiss the maintenance banner, and test basic header navigation/search.
- Target pages: index.html
- Key checks:
  - Click the 'Close maintenance notice' button and ensure it dismisses.
  - Interact with the 'Search FRED Data' input.
  - Verify the breadcrumb links are clickable.
- Exit criteria:
  - Banner is dismissed and header elements are confirmed interactive.

### Chart Controls & Data Views

- Objective: Thoroughly test the main data visualization interactions and range filters.
- Target pages: index.html
- Key checks:
  - Click the '1Y', '5Y', '10Y', and 'Max' buttons to observe chart updates.
  - Enter valid and invalid date formats into the 'From' and 'To' input fields.
  - Hover over the chart area to trigger and observe tooltips.
  - Toggle between 'Chart' and 'View as data table' tabs.
- Exit criteria:
  - All time-range controls are tested, and the data table view is successfully toggled.

### Edit Graph & Actions

- Objective: Explore the 'Edit Graph' panel and other primary action buttons.
- Target pages: index.html
- Key checks:
  - Click the 'Edit Graph' button.
  - Navigate through the 'EDIT LINE', 'ADD LINE', and 'FORMAT' tabs if they appear.
  - Click the 'Download' button and observe the resulting state (dropdown or action).
  - Test the 'Observations' dropdown if interactive.
- Exit criteria:
  - The Edit Graph panel is fully explored and Download options are revealed.

### Metadata & Recommendations

- Objective: Validate the secondary content blocks, metadata accuracy, and footer interactions.
- Target pages: index.html
- Key checks:
  - Scroll to and inspect the 'Notes', 'Release Tables', and 'Related Data and Content' sections.
  - Attempt to interact with tags or suggested series links.
  - Fill out and submit the newsletter subscription email input.
- Exit criteria:
  - Secondary content is reviewed and the newsletter form is tested.

### Mobile Viewport Validation

- Objective: Assess the responsive design, focusing on chart scaling and flagged small tap targets.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport.
  - Verify the main chart scales correctly without horizontal scrolling.
  - Test header navigation and breadcrumbs to evaluate the small tap target warnings.
  - Operate the time-range controls and 'Edit Graph' on mobile.
- Exit criteria:
  - Chart is usable on mobile and tap targets are evaluated for usability.

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

