# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the Cloudflare Radar single-page dashboard, focusing on navigation flow, data visualization interactivity, filter coordination, and mobile responsiveness.

## Plan Summary

The run will proceed by first validating the global navigation and sidebar structure, then systematically exercising the primary dashboard cards (Traffic, Security) including their internal tabs and tooltips. It will subsequently test the global filtering system (Location, Date Range) to ensure state persistence across widgets, and conclude with a mobile viewport check to address known tap-target risks.

## Coverage Targets

- pages: `Visit index.html and exercise all hash-based views (Overview, Traffic, Security, Connectivity, Routing, DNS, Reports).`
- features: `Interact with at least 3 chart types, 2 global filters, sidebar accordions, and theme toggle.`
- mobile: `Repeat navigation and critical chart interactions on mobile viewport to confirm usability issues.`

## Planned Phases

### Navigation & Layout Structure

- Objective: Validate the primary navigation hierarchy and sidebar accessibility.
- Target pages: index.html
- Key checks:
  - Click each top-nav item (Overview, Traffic, Security, etc.) to verify view switching/hash updates.
  - Expand/Collapse sidebar sections (Overview, Traffic, Bots, Security) to test accordion logic.
  - Verify 'Search Radar' input focus and placeholder visibility.
  - Check 'Toggle theme' button functionality (light/dark mode switch).
- Exit criteria:
  - All top-nav links respond to clicks.
  - Sidebar sections expand and collapse without layout breakage.
  - Theme toggle visually updates the interface.

### Dashboard Card Interactivity (Traffic & Overview)

- Objective: Exercise the core data visualization components and their internal controls.
- Target pages: index.html
- Key checks:
  - Hover over 'Internet traffic' chart to trigger and validate tooltip content.
  - Switch tabs within 'Internet traffic' card (HTTP requests, Bytes, Latency, Anomalies).
  - Change time granularity (Hourly, Daily, Weekly) in the traffic card.
  - Click 'Details' on summary stats (e.g., HTTP requests 42.8M) to check for modal or drill-down behavior.
  - Interact with 'Traffic by type' donut/bar charts (Desktop vs Mobile).
- Exit criteria:
  - Tooltips appear with relevant data on hover.
  - Tab switching within cards updates the chart correctly.
  - Time granularity controls update the visual data representation.

### Security & Ranking Components

- Objective: Validate secondary dashboard sections and list-based data presentations.
- Target pages: index.html
- Key checks:
  - Inspect 'Attacks and mitigations' card interactions.
  - Scroll through 'Domain popularity' list and click specific domains (e.g., google.com) to test selection state.
  - Verify 'Copy link', 'Learn more', and 'Share' buttons on cards for functional feedback (toast/modal).
  - Check 'Export' button behavior in the header.
- Exit criteria:
  - Domain selection highlights the chosen item.
  - Action buttons provide visual feedback or open expected dialogs.
  - Security charts render correctly.

### Global Filtering & State Management

- Objective: Test the coordination between global filters and dashboard data.
- Target pages: index.html
- Key checks:
  - Change 'Location' dropdown from 'Worldwide' to a specific region (if available) or verify dropdown options.
  - Modify 'Date Range' (e.g., Last 24 hours -> Last 7 days) and observe if charts refresh.
  - Use 'Add filter' button to test advanced filtering UI.
  - Click 'Reset' to ensure all filters return to default state.
  - Verify 'Data updated' timestamp reflects current state.
- Exit criteria:
  - Changing global filters triggers visual loading states or data updates in charts.
  - Reset button successfully clears applied filters.
  - Filter inputs maintain state during interaction.

### Mobile Responsiveness & Accessibility

- Objective: Address identified layout warnings and validate mobile UX.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport (e.g., iPhone SE or Pixel 5).
  - Verify hamburger menu or sidebar collapse behavior.
  - Attempt to tap top-nav items (noting difficulty due to <44px targets).
  - Check chart readability and tooltip interaction on touch devices.
  - Verify text legibility and card stacking order.
- Exit criteria:
  - Layout adapts to narrow width without horizontal scroll.
  - Critical navigation remains accessible despite small tap targets.
  - Charts remain interpretable on small screens.

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

