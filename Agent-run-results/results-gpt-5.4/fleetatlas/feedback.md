# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full fleetatlas system, prioritizing the primary dashboard flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

FleetAtlas gives a strong desktop information architecture for fleet monitoring—dashboard, alerts, analytics, and vehicles are easy to reach and the core pages surface useful KPI and filter context. However, several high-value task flows break down in interaction: oversized sidebar hit areas block table actions on desktop, multiple filters apply the wrong option or give weak confirmation, and the mobile experience relies on overflowing desktop tables with clipped content and undersized targets. Coverage reached all pages and both viewports, but only about half of visible features were exercised, so some secondary controls remain unverified.

## Issues (7)

### [HIGH] critical-row-actions-are-effectively-unusable — goal completion
- **Page**: `vehicles.html and alerts.html / sidebar overlay over table actions`
- **Problem**: Critical row actions are effectively unusable on desktop because the left sidebar captures clicks over the main content area.
- **Evidence**: Repeated failures occurred on vehicles.html and alerts.html when clicking visible, enabled row actions: 'Details' and 'Assign' timed out because '<aside class="sidebar">' or sidebar links like '⚙️ Settings' and '🚛 Vehicles' intercepted pointer events. Chunk summaries also note sidebar links had very large hit areas (e.g. 1255x41px) extending across the page.
- **Suggested fix**: Constrain the sidebar hit area to the visible rail only and verify row actions remain clickable across scroll states. Add a clear hover/focus/click response on row actions so users can tell the action is available.

### [HIGH] mobile-pages-are-not-adapted-to — mobile usability
- **Page**: `alerts.html and vehicles.html mobile views`
- **Problem**: Mobile pages are not adapted to the viewport; they present wide desktop tables that overflow horizontally, pushing important columns and actions off-screen.
- **Evidence**: Mobile observations report horizontal overflow on alerts.html (page width 638px vs 390px viewport) and vehicles.html (page width 916px, later 892px, vs 390px viewport). The mobile vehicles 'Details' button was positioned far off-screen at x=791, and screenshot /Users/timchef/UXBench/results-gpt-5.4/fleetatlas/_run/screenshots/agentic-80-click-mobile.png shows a clipped multi-column table with the bottom nav also crowded.
- **Suggested fix**: Use mobile-specific layouts for tables: stack key fields into cards or prioritized rows, freeze only the most important columns, and keep actions visible within the viewport without horizontal scrolling.

### [HIGH] several-select-filters-apply-a-different — clarity
- **Page**: `alerts.html filter selects; vehicles.html mobile status select`
- **Problem**: Several select filters apply a different option than the one chosen, making filter state unreliable and confusing.
- **Evidence**: The trajectory shows multiple mismatches: requesting 'Offline' in alerts type selected 'Speeding'; requesting 'Assigned' in alerts status selected 'Open'; requesting 'Warning' in severity selected 'Critical'; requesting 'Alert' in mobile vehicles status selected 'Running'. In each case visible content changed, but to the wrong subset.
- **Suggested fix**: Ensure the selected value always matches the resulting dataset and show explicit active-filter state near the results, such as chips or a summary line ('Showing Critical + Open + Speeding alerts').

### [MEDIUM] search-and-filtered-result-feedback-is — feedback
- **Page**: `index.html search; alerts.html search fields; vehicles.html results summary`
- **Problem**: Search and filtered-result feedback is often weak or inconsistent, so users have to infer whether controls worked.
- **Evidence**: Typing plate TX-5SH71 into the dashboard search produced no visible filtering: the page still showed 'All 25' and 'Vehicle list (25)'. Typing into alerts search produced no visible row count change or confirmation. On vehicles.html, search narrowed to one row but the page still said '25 vehicles', so the summary did not reflect filtered results.
- **Suggested fix**: Update counts and result summaries dynamically, show empty/no-match states, and indicate whether search is live or requires Enter. Keep the header aligned with the filtered dataset.

### [MEDIUM] several-navigation-items-look-available-but — navigation
- **Page**: `sidebar and bottom-nav placeholder links across index.html, alerts.html, analytics.html, vehicles.html`
- **Problem**: Several navigation items look available but are placeholder links that only change the URL hash and provide no destination or feedback.
- **Evidence**: Clicking '⚙️ Settings', '🔧 Maintenance', and '🛣️ Routes' changed pages like analytics.html or alerts.html to the same URL with a trailing '#' and no visible content change. This behavior was observed on both desktop and mobile.
- **Suggested fix**: Hide or disable unfinished destinations, or label them as coming soon. If they must remain visible, provide clear feedback instead of a silent hash change.

### [MEDIUM] important-form-controls-lack-labels-and — accessibility
- **Page**: `all pages; especially mobile alerts and vehicles controls`
- **Problem**: Important form controls lack labels, and many interactive targets are too small for comfortable mobile use.
- **Evidence**: Layout warnings repeatedly flagged missing labels on the org switcher and filters across pages, plus unlabeled checkboxes in vehicles. Mobile target sizes were below guidance: profile button 36x36px, status chips around 30px high, mobile alert actions 'Assign' 55x24px and 'Details' 57x26px, row checkboxes 13x13px.
- **Suggested fix**: Add visible or programmatic labels to all selects and checkboxes, increase touch targets to at least 44px in height, and give compact actions more generous hit areas.

### [MEDIUM] the-dashboard-detail-panel-can-enter — goal completion
- **Page**: `index.html vehicle detail panel / button #dpClose`
- **Problem**: The dashboard detail panel can enter a broken scroll/viewport state where the panel shell is visible but content or the close control is inaccessible.
- **Evidence**: Chunk summaries note only the 'Vehicle details' heading and close button were visible after scroll, with no actual detail content revealed. Attempts to click the close button failed because it was 'outside of the viewport,' and reload did not restore a clean baseline; several top controls had negative Y positions afterward.
- **Suggested fix**: Keep the panel close control pinned within the viewport, prevent the panel from opening in an empty state, and ensure reload or reset returns users to a stable dashboard layout.
