# UXAgent Exploration Plan

## Goal

Exhaustively explore and critique the UX of the FRED UNRATE data visualization page, focusing on chart interactions, time-range/frequency toggles, data views, graph editing tools, and responsive mobile behavior.

## Plan Summary

The exploration will proceed by first validating the primary data visualization flow, including chart hover states and time-range toggles. Next, it will test adjacent flows like switching to the data table view and interacting with the graph editing tools (Edit Line, Add Line, Format). It will then validate metadata, download actions, and search functionality. Finally, it will repeat critical checks on a mobile viewport to assess responsive layout and tap target issues identified in the prescan.

## Coverage Targets

- pages: `100% of known HTML pages (index.html)`
- features: `Exercise all time-range toggles, frequency toggles, chart/table views, graph edit tabs, search, and key navigation links`
- mobile: `Verify chart scaling, metadata stacking, and evaluate all prescan-flagged small tap targets on mobile viewport`

## Planned Phases

### Primary Chart Interaction

- Objective: Validate the core data visualization flow, including initial load, hover tooltips, recession shading, and time-range toggles.
- Target pages: index.html
- Key checks:
  - Dismiss the maintenance notice banner
  - Hover over the chart to trigger and validate the tooltip displaying date and value
  - Click the recession shading link to verify its behavior
  - Click each time-range toggle (1Y, 5Y, 10Y, Max) and verify the chart updates accordingly
  - Test the From/To date inputs by typing custom dates and verifying chart response
- Exit criteria:
  - Tooltip successfully appears on chart hover
  - All 4 time-range toggles clicked and chart re-renders without errors
  - Custom date entry attempted

### Data Table & Graph Editing

- Objective: Validate adjacent flows for viewing data in tabular format and using the graph editing/customization tools.
- Target pages: index.html
- Key checks:
  - Click 'View as data table' tab and verify data renders in a table format
  - Switch back to 'Chart' tab
  - Click 'EDIT LINE' tab, interact with the search input and formula input
  - Click 'ADD LINE' tab and observe UI changes
  - Click 'FORMAT' tab and observe UI changes
  - Click 'Download Chart' and other action buttons (Share, Fullscreen)
- Exit criteria:
  - Data table view successfully toggled and visible
  - All three graph editing tabs (Edit Line, Add Line, Format) opened and interacted with
  - Download/Share actions triggered without console errors

### Metadata, Search & Navigation

- Objective: Validate the metadata block, search functionality, and navigation elements.
- Target pages: index.html
- Key checks:
  - Scroll to metadata block and verify Source, Release, Units, Frequency, and Notes are visible
  - Type a query into the 'Search FRED Data' input and submit
  - Click breadcrumb links (Home, Categories, etc.)
  - Click top navigation links (RELEASE CALENDAR, NEWS, BLOG)
  - Scroll to 'Related Data and Content' and 'Data Suggestions' sections, click a suggestion
- Exit criteria:
  - Metadata block fully visible and readable
  - Search input accepts text and submission is attempted
  - At least 3 navigation/breadcrumb links clicked

### Mobile Responsiveness & Tap Targets

- Objective: Repeat critical checks on a mobile viewport to validate responsive layout and assess the severity of small tap target warnings.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport and verify chart scales correctly
  - Check if the metadata block stacks below the chart as indicated by the summary
  - Attempt to tap the time-range toggles (1Y, 5Y, 10Y, Max) to evaluate tap target spacing
  - Attempt to tap breadcrumb links to evaluate small tap target severity
  - Test the main 'Search FRED Data' input on mobile
- Exit criteria:
  - Mobile viewport renders without horizontal scrolling or broken layout
  - Chart interactions (toggling time ranges) work on mobile
  - Small tap target risks assessed via actual interaction attempts

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

