# UXAgent Exploration Plan

## Goal

Critique and validate the end-to-end UX of the Cloudflare Radar dashboard (single-page app) including global filters, chart interactions/tooltips, search/lookup, export/share, and major adjacent sections (Traffic, Security, Connectivity, Routing, DNS, Reports) across desktop and mobile viewports.

## Plan Summary

Start at the main dashboard (index.html) and verify the core global filters (location, date range, lookup search, add filter/reset, comparison) and that the displayed cards and mini-metrics update coherently. Then validate the primary drill-down interactions: section navigation, chart tabs/options (e.g., HTTP requests/Bytes/Latency/Anomalies, hourly/daily/weekly), tooltips, and the ‘Details’ / ‘View more’ / ‘Inspect’ entry points. Finally, exercise the Share/Export/Search Radar/API/Language/Theme controls and repeat the most important interactions on mobile, focusing on small tap-target risks.

## Coverage Targets

- pages: `Visit all known HTML pages (index.html only).`
- features: `Exercise most visible controls per key page: top nav, sidebar links, theme toggle, global filter bar (location/date/lookup/add/reset/comparison), chart metric tabs, chart granularity, tooltips, and at least 2–3 card CTAs (Details/Inspect/View more), plus Share/Export/Search Radar/API/EN.`
- mobile: `Repeat critical checks on mobile viewport: top nav + one sidebar link, filter bar interactions (date range, add filter, reset), and at least one chart interaction to confirm tooltips/tabs remain usable.`

## Planned Phases

### Baseline load + global navigation/section anchoring

- Objective: Confirm the single-page dashboard loads correctly and that primary section navigation and sidebar/top links move the user to the intended card groups without losing filter context unexpectedly.
- Target pages: index.html
- Key checks:
  - Verify initial scroll/anchor state: Overview section is present and ‘GLOBAL VIEW’ and ‘OVERVIEW’ sidebar sections are visible.
  - Click each top nav link (Overview, Traffic, Security, Connectivity, Routing, DNS, Reports) and confirm the relevant card set becomes visible (URL hash changes to match: #overview/#traffic/#security/#connectivity/#routing/#dns/#reports).
  - Use the left sidebar quick links (e.g., Global Internet trends, Latest reports, HTTP requests, Traffic by type, Domain rankings, Internet outages, Bot traffic, AI crawlers, HTTP DDoS attacks, Layer 3/4 attacks, Attack map, Email security, Quality, Outages) and confirm expected in-page scrolling/section changes.
  - Toggle theme using the theme control (prescan indicates a toggle theme button) and confirm charts/cards remain readable and not clipped.
- Exit criteria:
  - All 7 top nav items (Overview through Reports) successfully navigate to their corresponding sections (hash + visible content match).
  - At least 8 representative sidebar links scroll to their expected card group locations without wiping active filter selections.
  - Theme toggle updates styling without breaking layout or chart rendering.

### Global filters: location, lookup, date range, add/reset, comparison

- Objective: Validate that the global filter bar controls update displayed metrics/cards consistently and that state changes are understandable and reversible.
- Target pages: index.html
- Key checks:
  - In the filter bar, change Location from ‘Worldwide’ to another option (and back) and confirm key metric cards (HTTP requests/Mitigated attacks/Median latency/IPv6 traffic) update.
  - Use Date range dropdown (Last 24 hours) to switch ranges (at least two different options) and confirm charts and the ‘Data updated’/metrics reflect changes coherently.
  - Use ‘Lookup’ input (placeholder: Domain, IP, ASN, or report) to enter a valid example-like value (e.g., google.com, an ASN-like number, or a report keyword). Confirm resulting search behavior (e.g., updates relevant cards/search results area).
  - Click ‘Add filter’ and validate that a new filter condition appears and affects the dashboard output; then use ‘Reset’ to clear and confirm a return to baseline.
  - Toggle ‘Comparison Previous period’ and verify deltas (+%/-%) and/or charts/labels update accordingly.
- Exit criteria:
  - Each control (Location, Date range, Lookup, Add filter, Reset, Comparison) produces a visible and consistent state change in the metrics/cards or chart data.
  - Reset returns the dashboard to a baseline state equivalent to the starting configuration (or clearly documented defaults).

### Chart interactivity: metric tabs, time granularity, tooltips, chart syncing

- Objective: Exercise the main chart interaction patterns: switching chart metric tabs, time granularity, and validating tooltips/legend behavior with current filters.
- Target pages: index.html
- Key checks:
  - For the Traffic card/chart, switch between metric tabs (HTTP requests / Bytes / Latency / Anomalies) and confirm chart visualization and any headline values/labels change.
  - Switch time granularity (Hourly/Daily/Weekly) and confirm the x-axis/aggregation changes.
  - Hover (desktop) over chart points/segments to trigger tooltips and verify tooltip content is plausible and not stale after filter changes.
  - Repeat one metric/tab interaction after applying a different Date range to ensure tooltip/chart data remains synchronized.
- Exit criteria:
  - All visible chart metric tabs and time granularity options can be selected without rendering glitches.
  - Tooltips appear and reflect current filter settings (no stale/incorrect tooltip values after at least one filter change).

### Card CTAs: Details/View more/Inspect + dialogs

- Objective: Validate that primary drill-down CTAs open the correct overlays or states, and that modal/dialog usability (open/close, focus) is sound.
- Target pages: index.html
- Key checks:
  - Click ‘Details’ on at least two metric cards (e.g., HTTP requests card and Mitigated attacks card) and confirm a dialog/overlay opens with additional breakdown.
  - Click ‘Inspect’ on the Traffic by type card and verify it leads to the correct inspection view/state (or modal) and can be exited cleanly.
  - Click at least one ‘View more’ entry inside a card (if present) and confirm it navigates or expands content appropriately.
  - In each opened dialog, verify close behavior (X/escape/backdrop), and that returning to dashboard restores the prior scroll position or active section.
- Exit criteria:
  - At least 2–3 CTAs open the expected overlays/states and can be closed reliably.
  - No broken UI states after closing dialogs (charts still render; cards remain visible).

### Share/Export/Search Radar/API/Language controls + mobile regression

- Objective: Validate utility controls and repeat critical UX on mobile to catch tap-target and interaction issues.
- Target pages: index.html
- Key checks:
  - Click ‘Share’ and confirm link creation/copy UI or share dialog appears (and can be dismissed).
  - Click ‘Export’ and verify that an export action initiates correctly (download or export dialog).
  - Use ‘Search Radar’ input and attempt to submit; confirm it routes to the correct results/state (or filters) and handles empty/invalid input gracefully.
  - Click API and EN controls (language), and verify they don’t break layout or get stuck in menus.
  - On mobile viewport: repeat Phase 1 (top nav + one sidebar link) and Phase 2 (Date range + Add filter + Reset) interactions; specifically verify tap targets are usable and not mis-tapped.
- Exit criteria:
  - Share and Export flows each produce an expected outcome (dialog/confirmation/download or clear error handling).
  - Search Radar handles at least one valid submission and one invalid/empty submission without UI breakage.
  - Mobile: all repeated critical controls activate successfully (no persistent misnavigation or overlays blocking the page).

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

