# UXAgent Exploration Plan

## Goal

Exhaustively explore the Cloudflare Radar single-page dashboard, validating navigation, filtering, data widget interactions, and mobile responsiveness.

## Plan Summary

The run will first map out the global navigation (sidebar, top nav, settings) to understand routing within the SPA. Next, it will exercise the global data filters (location, date range, lookup) to ensure state changes propagate. It will then deep-dive into widget-level controls like tabs and dropdowns on the charts. Finally, it will run targeted mobile checks to evaluate the usability of the dense layout and small tap targets flagged in the prescan.

## Coverage Targets

- pages: `Thoroughly test index.html as it acts as the sole application shell.`
- features: `Exercise navigation, global filters, widget tabs, and modals (share/export/search).`
- mobile: `Validate layout adaptation, navigation menu functionality, and target size accessibility.`

## Planned Phases

### Global & Sidebar Navigation

- Objective: Verify that top header links and sidebar navigation correctly update the view or scroll position.
- Target pages: index.html
- Key checks:
  - Click top nav links (Traffic, Security, etc.) and observe view changes.
  - Use the 'Filter navigation' input in the sidebar to search for a category.
  - Toggle global settings: Theme and Language (EN).
- Exit criteria:
  - Top navigation and sidebar interactions are fully mapped and visually verified.

### Global Data Filtering

- Objective: Test the primary dashboard controls for manipulating data scope.
- Target pages: index.html
- Key checks:
  - Open and select options in the 'Location' and 'Date Range' dropdowns.
  - Interact with the 'Add filter' button and any resulting dialog/popover.
  - Type into the 'Domain, IP, ASN, or report' lookup input.
  - Click the 'Reset' button to clear filters.
- Exit criteria:
  - All global filter controls have been interacted with and their UI state changes observed.

### Data Widget Controls

- Objective: Explore the interactive elements within specific data cards on the dashboard.
- Target pages: index.html
- Key checks:
  - Click 'Details' buttons on the top summary metrics.
  - Switch tabs within the 'Internet traffic' card (HTTP requests, Bytes, Latency, Anomalies).
  - Interact with 'Share', 'Copy link', and 'Export' buttons to trigger dialogs or clipboard actions.
  - Click 'View all' or similar expanders on list-based widgets (e.g., Domain rankings).
- Exit criteria:
  - A representative sample of card-level interactions (tabs, dialogs, expanders) has been successfully exercised.

### Mobile Responsive Checks

- Objective: Evaluate the usability of the dense dashboard UI on a mobile viewport.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport.
  - Attempt to open and use the main navigation (likely collapsed behind a hamburger menu).
  - Interact with the previously flagged small tap targets (e.g., top nav links if visible, or filter dropdowns) to assess touch usability.
  - Verify that chart widgets stack or resize appropriately without horizontal scrolling.
- Exit criteria:
  - Core navigation and filtering flows have been proven functional (or documented as flawed) on a mobile viewport.

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

