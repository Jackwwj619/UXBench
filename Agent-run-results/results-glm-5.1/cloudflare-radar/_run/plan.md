# UXAgent Exploration Plan

## Goal

Exhaustively explore and critique the UX of the Cloudflare Radar single-page dashboard, validating navigation, filter coordination, chart interactions, and responsive layout across all major sections.

## Plan Summary

The exploration will proceed through five phases, starting with global controls and navigation, moving through the primary dashboard cards, validating secondary sections, testing search and dialogs, and finally verifying mobile responsiveness. The run will focus on how filter changes propagate across charts, the usability of interactive elements like tooltips and tabs, and the layout's adaptability to different viewports.

## Coverage Targets

- pages: `100% of known HTML pages (index.html)`
- features: `Exercise all main navigation links, global filters, chart tabs/tooltips, sidebar links, and dialogs`
- mobile: `Repeat critical checks from phases 1-4 on mobile viewport, focusing on layout adaptation and touch target usability`

## Planned Phases

### Global Controls & Navigation

- Objective: Validate the functionality of the top navigation bar, global filters, and primary view controls.
- Target pages: index.html
- Key checks:
  - Click each main nav link (Overview, Traffic, Security, Connectivity, Routing, DNS, Reports) and verify it scrolls to or displays the correct section.
  - Interact with the Location filter ('Worldwide') and Date Range filter ('Last 24 hours') to confirm they open and apply changes.
  - Click the 'Add filter' and 'Reset' buttons to ensure they modify and clear filters appropriately.
  - Toggle the theme using the 'Toggle theme' button and verify visual updates.
- Exit criteria:
  - All main navigation links have been clicked and their corresponding sections verified.
  - Global filters have been changed and reset successfully.
  - Theme toggle functions without layout breakage.

### Primary Dashboard Cards & Charts

- Objective: Deeply validate the primary dashboard sections (Traffic, Security, Adoption, Rankings) and their interactive elements.
- Target pages: index.html
- Key checks:
  - Interact with the 'Internet traffic' chart: switch between HTTP requests/Bytes/Latency tabs and Hourly/Daily/Weekly views.
  - Hover over chart data points to trigger and read tooltips.
  - In 'Traffic by type', click 'Inspect' and verify detailed views or state changes.
  - In 'Domain popularity', switch between category tabs (All, AI, Social, Video) and click a domain to see selection effects.
  - Click 'Details' links on summary cards (HTTP requests, Mitigated attacks, etc.).
- Exit criteria:
  - Chart tabs and time range switches function and update the chart visually.
  - Tooltips display correctly on hover.
  - Domain ranking tabs and selections work as expected.
  - Summary card links navigate or expand correctly.

### Secondary Sections & Left Sidebar

- Objective: Explore the left sidebar navigation and remaining content sections (Outages, BGP, 1.1.1.1, etc.).
- Target pages: index.html
- Key checks:
  - Use the left sidebar 'Filter navigation' input to search for a section (e.g., 'Outages').
  - Click secondary sidebar links (Bot traffic, AI crawlers, Layer 3/4 attacks, Attack map, Email security, Quality, Outages, Speed).
  - Verify that clicking these links scrolls to or highlights the appropriate card on the dashboard.
  - Check the '1.1.1.1 resolver' and 'Quality and outages' sections for specific interactive elements.
- Exit criteria:
  - Sidebar filter input successfully highlights or filters navigation items.
  - All secondary sidebar links have been clicked and their targets verified.
  - Secondary sections display their expected content and controls.

### Dialogs, Search & Edge Cases

- Objective: Test modal dialogs, search functionality, and other overlay states to ensure they open, close, and function correctly.
- Target pages: index.html
- Key checks:
  - Click 'Search Radar' button and type a query into the search input, verifying suggestions or results.
  - Trigger the 'Share' and 'Export' dialogs and verify their content and close mechanisms.
  - Click 'API' and 'EN' buttons to check for dialogs or dropdowns.
  - Click 'View more' or 'View all' links within cards to see if they trigger navigation or expand content.
- Exit criteria:
  - Search Radar input accepts text and shows feedback.
  - Share and Export dialogs open and close cleanly.
  - API and EN interactions do not cause errors.
  - View more/all links function as expected.

### Mobile Responsiveness & Touch Targets

- Objective: Validate the dashboard layout and usability on a mobile viewport, paying special attention to the previously identified small tap targets.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport and verify the overall layout adapts (e.g., cards stack vertically, sidebar collapses or becomes a menu).
  - Re-test the main navigation and global filters on mobile to ensure they are accessible.
  - Verify chart interactivity (tooltips, tabs) works with touch events.
  - Assess the usability of small tap targets (DNS, Routing, API, EN) and check for overlapping elements.
- Exit criteria:
  - Dashboard renders correctly on mobile viewport without horizontal scroll.
  - Navigation and filters are accessible and functional on mobile.
  - Charts respond to touch interactions.
  - Small tap target usability has been evaluated and documented.

## Prescan Summary

### Cloudflare Radar

- Page: `index.html`
- Headings: Internet insights for every network, Internet traffic, Traffic by type, Protocol usage, Attacks and mitigations, Domain popularity, 1.1.1.1 resolver, Quality and outages, BGP and AS Rank, Data Explorer
- Interactables: `135` buttons, `39` links, `19` inputs
- Notable controls:
  - clickable:a:Cloudflare Radar home
  - clickable:a:Overview
  - clickable:a:Traffic
  - clickable:a:Security
  - clickable:a:Connectivity
  - clickable:a:Routing
  - clickable:a:DNS
  - clickable:a:Reports

