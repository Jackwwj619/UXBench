# UXAgent Exploration Plan

## Goal

Critique the UX of the cloudflare-radar dashboard, validating primary navigation, filter interactions, chart states, and mobile responsiveness, while checking for layout issues and interaction consistency.

## Plan Summary

Explore the single-page dashboard in phases: validate top navigation and sidebar links, test filter and date-range controls, interact with key cards and charts, check mobile viewport for tap targets and responsiveness, and verify error-free console/network behavior. Prioritize core dashboard flows and layout warnings.

## Coverage Targets

- pages: `100% (only index.html, but explore all sections via JS interactions)`
- features: `Exercise all visible controls (navigation links, filters, date-range, chart interactions, share/export, theme toggle) across desktop and mobile views.`
- mobile: `Replicate critical checks (navigation, filters, charts) in mobile viewport; validate tap targets (despite size warnings) function as intended.`

## Planned Phases

### Top Navigation & Sidebar Validation

- Objective: Verify that top navigation (Overview, Traffic, etc.) and sidebar links (Global Internet trends, HTTP requests) trigger expected UI state changes (e.g., active tab highlighting, content updates).
- Target pages: index.html
- Key checks:
  - Click top nav 'Overview' (verify active state, content matches Overview section)
  - Click top nav 'Traffic' (verify active state, content switches to Traffic cards)
  - Click sidebar 'Global Internet trends' (verify content updates to match the link's purpose)
  - Click sidebar 'HTTP requests' (verify Traffic section's HTTP requests card is highlighted/updated)
- Exit criteria:
  - All tested navigation links trigger visible UI state changes; no console errors from navigation clicks.

### Filter & Date-Range Interactions

- Objective: Validate that filter (Domain, IP, ASN) and date-range (Last 24 hours) inputs work, triggering data updates (e.g., card values, charts) without errors.
- Target pages: index.html
- Key checks:
  - Click date-range dropdown (Last 24 hours) → select a different range (e.g., Last 7 days) → verify card values (e.g., HTTP requests, Mitigated attacks) update
  - Type 'google.com' in the 'Domain, IP, ASN, or report' filter → click 'Add filter' → verify domain-specific data loads (e.g., Domain rankings card updates)
  - Click 'Reset' button → verify filters are cleared and data resets to default (Worldwide, Last 24 hours)
- Exit criteria:
  - Filter/date-range changes update card values/charts; no console errors from filter interactions.

### Chart & Card Interactions

- Objective: Test chart interactions (tooltips, 'Details' links, 'Inspect' buttons) to ensure data visualization and drill-downs work (e.g., tooltips show values, 'Details' opens expanded chart view).
- Target pages: index.html
- Key checks:
  - Hover over 'HTTP requests' card's chart → verify tooltip appears with detailed values
  - Click 'Details' on 'HTTP requests' card → verify expanded chart (e.g., hourly/daily trends) loads
  - Click 'Inspect' on 'Traffic by type' card → verify detailed breakdown (e.g., Desktop/Mobile percentages) appears
  - Click 'Learn more' on 'Internet traffic' card → verify modal or new section with detailed info loads
- Exit criteria:
  - Charts show tooltips on hover; 'Details'/'Inspect' links open expected detailed views; no console errors from chart interactions.

### Mobile Viewport Validation

- Objective: Replicate critical checks (navigation, filters, charts) in mobile viewport to verify responsiveness and fix layout warnings (small tap targets) by testing interactions.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport (e.g., 360x640) → test top navigation links (e.g., Overview, Traffic) for tapability (despite small targets) and state changes
  - Test filter input ('Domain, IP, ASN') in mobile → type 'facebook.com' → click 'Add filter' → verify data updates
  - Test chart tooltips in mobile → hover (or tap) over 'Median latency' chart → verify tooltip appears
  - Check that small tap targets (per layout warnings) are still functional (e.g., top nav 'Overview' link works despite size)
- Exit criteria:
  - Critical interactions (navigation, filters, charts) work in mobile view; no new layout warnings appear (existing ones are noted but functionality is confirmed).

### Edge Case & Recovery Testing

- Objective: Test edge cases (e.g., invalid filter input, rapid navigation) and recovery (e.g., error states, reset after failure) to ensure robustness.
- Target pages: index.html
- Key checks:
  - Type invalid text (e.g., '!@#$') in filter input → click 'Add filter' → verify error handling (e.g., warning message, no data corruption)
  - Rapidly click multiple navigation links (Overview → Traffic → Security) → verify UI stabilizes without crashes
  - Trigger a chart interaction (e.g., tooltip) during a filter update → verify no race condition errors
  - Click 'Share' or 'Export' buttons → verify modal/popup functionality (e.g., share options, export dialog)
- Exit criteria:
  - Edge cases (invalid input, rapid clicks) do not crash the app; recovery actions (Reset, error handling) work; console remains error-free.

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

