# UXAgent Exploration Plan

## Goal

Exhaustively explore the single-page Cloudflare Radar dashboard, validating the main insight-consumption flow (global filters → cards/charts → drill-in controls) plus adjacent in-page navigation, search/filter, dialogs, and responsive behavior.

## Plan Summary

This run should focus on the SPA nature of the site: most visible navigation appears to be anchor- or section-based within index.html, so coverage should emphasize section transitions, filter coordination, and card-level interactions rather than expecting separate HTML pages. Start by establishing the baseline dashboard state and verifying that top-level controls update or reposition the same page consistently, then work through major content sections and their visible actions such as tabs, time-range switches, tooltips, share/export, and 'View more' style entries. Finish with mobile validation of the highest-value flows because the prescan already shows multiple undersized tap targets in the top navigation and utility controls.

## Coverage Targets

- pages: `Visit the only known HTML page, index.html, and traverse all major in-page sections reachable from top nav, left nav, and card drill-ins.`
- features: `Exercise most visible controls on the dashboard: global location/date/search/filter/reset, top utility controls, section navigation, chart tabs and time switches, tooltips, rankings category tabs, and representative card actions.`
- mobile: `Repeat the critical dashboard flow and the highest-risk controls in a mobile viewport, with special attention to top-nav tap targets, filter access, chart readability, and dialog handling.`

## Planned Phases

### Baseline and primary dashboard orientation

- Objective: Confirm the default landing state and map how the main dashboard is organized before deep interaction.
- Target pages: index.html
- Key checks:
  - Verify initial default state for Worldwide location, Last 24 hours date range, and visible comparison chips/status text
  - Use top navigation items (Overview, Traffic, Security, Connectivity, Routing, DNS, Reports) to confirm whether they scroll, switch sections, or otherwise update active state on the same page
  - Use left-side section links such as Global Internet trends, HTTP requests, Traffic by type, Domain rankings, Internet outages, HTTP DDoS attacks, and Outages to verify anchor accuracy and active highlighting
  - Check that hero KPIs and first visible cards are readable, aligned, and consistent with the selected filters
  - Record whether any nav action changes URL hash, selected state, or focus/scroll position
- Exit criteria:
  - Primary sections of the dashboard are identified and reachable from both top nav and left nav
  - Default dashboard state is documented with no unexplained broken navigation or missing content
  - The run has evidence about whether navigation is anchor-based, tab-based, or mixed

### Global controls and state coordination

- Objective: Validate the shared controls that likely drive the whole dashboard and test recovery/reset behavior.
- Target pages: index.html
- Key checks:
  - Interact with Worldwide location control and verify menu contents, selection feedback, and whether visible cards update coherently
  - Interact with DATE RANGE and switch to at least one alternate range if available; verify KPI values/charts refresh without layout breakage
  - Use Add filter to inspect available filter affordances and confirm whether applied filters appear as removable chips or visible state
  - Use Reset after making changes and verify all global controls return to the original default state
  - Exercise the in-content LOOKUP search field with a realistic query and verify suggestion, result, or no-result behavior if present
  - Compare behavior of the top Search Radar control against the in-content LOOKUP field to identify duplicated or conflicting search patterns
  - Check share/export utility controls from the main dashboard header for dialog opening, dismissal, and preservation of current filter state
- Exit criteria:
  - At least one non-default global state has been applied and then reset successfully
  - Search and filter controls have been exercised enough to understand whether they are coordinated or independent
  - Any dialogs/menus triggered by header controls can be closed cleanly with state recovery

### Chart cards, tabs, and drill-in actions

- Objective: Test the highest-value analytic interactions inside cards and confirm chart state changes are understandable and stable.
- Target pages: index.html
- Key checks:
  - On Internet traffic, switch among HTTP requests, Bytes, Latency, and Anomalies tabs and verify chart, labels, and selected styling update correctly
  - Switch chart granularity controls such as Hourly, Daily, and Weekly and verify rerender quality, axis legibility, and preserved context
  - Hover or tap chart areas to surface tooltips where available and check content clarity, positioning, and dismissal
  - Use visible actions like Open query, Copy link, Learn more, Share, and overflow menu if present to verify affordance clarity and recovery
  - On Traffic by type, validate category percentages and any Inspect/drill-in behavior
  - On Protocol usage and Attacks and mitigations, test visible drill-in entries such as Explore or View in Data Explorer and note whether they open dialogs, scroll targets, or panels
  - Check KPI mini-cards with Details links to confirm whether they expose deeper context or simply duplicate nearby content
- Exit criteria:
  - The main chart card has been exercised across its major tabs and time granularities
  - At least several card-level drill-in controls have been tested with successful dismissal or return path
  - Tooltip and chart interactions have been observed on both desktop-style pointer interaction and at least one non-hover fallback assumption for mobile planning

### Section-specific adjacent flows

- Objective: Cover the lower-priority but still visible adjacent dashboard sections such as rankings, resolver, outages, BGP/ASN, Data Explorer, reports, and search.
- Target pages: index.html
- Key checks:
  - In Domain popularity, switch category tabs like All, AI, Social, and Video and verify list ordering, movement indicators, and selected-domain detail behavior
  - Check any View all or Details affordances in rankings-style modules for clarity of navigation and return
  - Visit 1.1.1.1 resolver, Quality and outages, BGP and AS Rank, Data Explorer, Latest reports and analysis, and Search Radar sections via left nav or in-page links
  - Validate whether these sections are fully rendered, placeholder-like, or interactive, and test at least one visible action in each if available
  - Inspect long-page scrolling behavior, sticky elements, and whether the left-side navigation remains synchronized with the currently viewed section
  - If dialogs are present in these lower sections, confirm escape/close behavior and focus return
- Exit criteria:
  - All major visible headings/sections from the prescan have been visited at least once
  - At least one interaction has been attempted in each adjacent section that exposes visible controls
  - No major section remains unclassified as interactive, informational, or incomplete

### Mobile and responsive validation

- Objective: Repeat the most important flows on mobile and specifically investigate known tap-target and navigation risks.
- Target pages: index.html
- Key checks:
  - Open the page in mobile viewport and assess whether top navigation collapses, wraps, overflows, or remains directly tappable
  - Retest small-tap-target items called out in prescan: Radar home, Overview/Traffic/Security/Connectivity/Routing/DNS/Reports, API, EN, and theme toggle
  - Verify access to search, global filters, and left-side navigation equivalents on mobile, including whether filters become drawers, accordions, or overflow panels
  - Repeat one end-to-end primary flow on mobile: navigate to a section, change a global filter/date range, interact with a chart tab, and recover/reset
  - Check chart readability and horizontal overflow on cards like Internet traffic and Traffic by type
  - Test dialog/menu behavior on mobile for Share, Export, Add filter, and any search overlay, including dismissal and viewport fit
- Exit criteria:
  - Critical desktop interactions have been replayed on mobile with evidence about usability differences
  - Known tap-target issues have been confirmed, mitigated by responsive design, or documented as genuine problems
  - Mobile navigation and filter access paths are understood well enough to critique the responsive UX

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

