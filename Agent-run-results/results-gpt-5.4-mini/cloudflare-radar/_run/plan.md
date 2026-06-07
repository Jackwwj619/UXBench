# UXAgent Exploration Plan

## Goal

Explore the single-page Cloudflare Radar dashboard end-to-end, validating the primary overview flow, key section navigation, filter and search controls, card interactions, and mobile usability issues.

## Plan Summary

Start with the Overview dashboard and validate the main global filters, search, share/export, and summary cards because these are the primary entry points visible in the prescan. Then sweep the in-page section navigation for Traffic, Security, Connectivity, Routing, DNS, and Reports, focusing on tabs, tooltips, and "View more"/detail actions exposed in the cards. Finish with mobile viewport checks on the same critical controls, paying special attention to the small tap targets already flagged by the prescan.

## Coverage Targets

- pages: `Visit the single known HTML page, index.html, and cover all major section anchors and visible control states.`
- features: `Exercise the global filters, search/lookup inputs, header controls, section navigation, chart tabs, tooltip behavior, card actions, and at least one deep-link/report entry point per major dashboard area.`
- mobile: `Repeat the main navigation, filter, search, and one chart/card interaction on mobile viewport, with extra attention to the small tap targets flagged by the prescan.`

## Planned Phases

### Baseline dashboard and global controls

- Objective: Validate the initial Overview experience and the global controls that affect most content.
- Target pages: index.html
- Key checks:
  - Confirm the default landing state shows the Overview dashboard with the global summary cards and first chart row visible.
  - Exercise Location, Lookup, and Date range controls to confirm they are interactive and update the displayed scope/state.
  - Test Add filter and Reset to verify filter application and recovery behavior.
  - Open Share and Export from the main header area to see whether they present dialogs, menus, or download actions.
  - Check that the comparison/scope indicators update or remain consistent after filter changes.
- Exit criteria:
  - Global filters have been changed at least once and then reset.
  - Share/Export behavior has been observed.
  - No obvious broken state remains after applying and clearing filters.

### Primary overview content and chart controls

- Objective: Validate the dashboard’s core cards, chart toggles, and card-level actions.
- Target pages: index.html
- Key checks:
  - Inspect each top summary card for value, trend, and detail affordance: HTTP requests, Mitigated attacks, Median latency, and IPv6 traffic.
  - Interact with the Internet traffic card tabs such as HTTP requests, Bytes, Latency, Anomalies, and time granularity controls like Hourly/Daily/Weekly.
  - Exercise card actions including Copy link, Learn more, Share, Open query, and any overflow/menu controls visible on the traffic cards.
  - Hover or focus on chart elements to verify tooltips or data point labels appear and are readable.
  - Verify the Traffic by type card’s Inspect action and the displayed mix values (Desktop/Mobile, Human/Bot, IPv6) update or at least remain coherent.
- Exit criteria:
  - At least one chart tab/state change has been validated.
  - At least one tooltip or hover/focus data state has been observed.
  - Card actions have been tested on at least two different cards.

### Section navigation sweep

- Objective: Validate the in-page navigation and adjacent section entry points for the major Radar categories.
- Target pages: index.html
- Key checks:
  - Use the top nav and sidebar links to jump to Traffic, Security, Connectivity, Routing, DNS, and Reports anchors.
  - Confirm section headings and anchor targets load the expected content without layout breaks or lost state.
  - Test subsection links under Traffic (HTTP requests, Traffic by type, Domain rankings, Internet outages) and Security (HTTP DDoS attacks, Layer 3/4 attacks, Attack map, Email security) for anchor fidelity.
  - Check that navigating between sections preserves readability and that the active section/selection is understandable.
  - Verify the sidebar and top nav remain usable after deep-link jumps.
- Exit criteria:
  - All major section anchors have been visited at least once.
  - At least one subsection link in Traffic and Security has been validated.
  - Navigation does not trap the user or break the visible state.

### Search, lookup, and discovery paths

- Objective: Validate discovery-oriented controls that support finding data or reports.
- Target pages: index.html
- Key checks:
  - Use the Filter navigation input to see whether sidebar filtering works and whether results narrow or remain stable.
  - Use the Domain, IP, ASN, or report lookup field to check search affordance, submission behavior, and empty/error handling if applicable.
  - Inspect Search Radar and API header controls to determine whether they open search, API info, or navigation surfaces.
  - Visit or trigger Latest reports and Global Internet trends entry points to confirm report discovery flow from the overview page.
  - If any dialogs appear from search or lookup, verify close/dismiss behavior and whether focus returns appropriately.
- Exit criteria:
  - Both search inputs have been exercised.
  - At least one discovery path to reports or search has been confirmed.
  - Any opened overlay/dialog can be dismissed cleanly.

### Mobile viewport validation

- Objective: Repeat the highest-risk interactions on mobile and assess tap-target and layout quality.
- Target pages: index.html
- Key checks:
  - Re-check the top nav, Search Radar, API, language, and theme controls in mobile viewport for tapability.
  - Validate the global filter strip and at least one major chart/card action on mobile.
  - Open at least one section anchor from the sidebar or header to confirm the navigation remains usable in narrower layouts.
  - Confirm that critical content remains readable and that no key controls overlap or become inaccessible.
  - Pay attention to the small tap targets already flagged in the prescan, especially header controls and compact nav items.
- Exit criteria:
  - Critical dashboard actions have been repeated in mobile viewport.
  - The known small tap targets have been exercised and their usability noted.
  - No major responsive breakage or content loss is observed.

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

