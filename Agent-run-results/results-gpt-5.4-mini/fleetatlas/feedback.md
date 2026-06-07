# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full fleetatlas system, prioritizing the primary dashboard flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

FleetAtlas’s core dashboard, alerts, and analytics flows are generally functional, but several interactions feel inert because they provide little or no visible state feedback. The biggest UX risks are in mobile: horizontal overflow, clipped tables, and undersized/unnamed controls make the app harder to use on touch screens. There are also a few placeholder-style branches in the shared shell (e.g., Drivers/Routes/Settings) that don’t clearly confirm where they go, which can undermine trust in navigation.

## Issues (7)

### [HIGH] several-primary-controls-change-state-without — feedback
- **Page**: `index.html / analytics.html search, status filters, org select`
- **Problem**: Several primary controls change state without any obvious visible confirmation, making the interface feel unresponsive even when the control is technically working.
- **Evidence**: On index.html, typing into the search box showed no visible filtering/highlighting after Enter; clicking the "All 25" status filter produced no visible change; selecting the org switcher retained the value but did not change the page content. On mobile analytics, typing "Hill" and "Chen" into Search… produced no obvious visible filtering or echoed value change.
- **Suggested fix**: Show explicit result-count changes, loading/filtered-state chips, row highlighting, or an empty-state message after search/filter actions. For org switching, update a visible scope label or dashboard content so the change is unmistakable.

### [HIGH] the-mobile-analytics-layout-exceeds-the — mobile usability
- **Page**: `analytics.html mobile screenshot / layout warnings`
- **Problem**: The mobile analytics layout exceeds the viewport width and clips content, so important data is partially off-screen and the bottom navigation/header crowd the view.
- **Evidence**: The mobile observation reports page width 527px vs 390px viewport, horizontal overflow warnings, and a lower Driver Performance table clipped on the right. The screenshot path for the mobile analytics scroll state shows the bottom nav still visible while content is cut off.
- **Suggested fix**: Rework the mobile analytics layout into stacked cards or collapsible rows, and ensure tables degrade gracefully with fewer visible columns. Avoid fixed-width containers that overflow the viewport.

### [HIGH] some-shared-shell-navigation-items-behave — goal completion
- **Page**: `analytics.html / alerts.html nav items`
- **Problem**: Some shared-shell navigation items behave like dead ends or hash-only placeholders instead of clear destinations.
- **Evidence**: Clicking Drivers on analytics.html only changed the URL to analytics.html# with no visible view change. On alerts.html, clicking Routes similarly only changed the URL hash and kept the Alerts section selected. Settings also changed URLs to a hash state rather than opening a distinct settings view.
- **Suggested fix**: Either route these items to dedicated pages/views or visually mark them as disabled/coming soon. If they are intentional placeholders, label them clearly so users know they are not actionable.

### [MEDIUM] a-core-organization-account-switcher-is — accessibility
- **Page**: `global shell / org selector / 👤 button`
- **Problem**: A core organization/account switcher is unlabeled, and the avatar/profile button is below the recommended mobile tap target size.
- **Evidence**: Across pages, the org selector is reported as a form field with no label/aria-label/placeholder. On mobile analytics, the profile button is 36x36px, and the mobile observations repeatedly flag small tap targets in the nav.
- **Suggested fix**: Add visible labels or accessible names to the org switcher, and increase the profile button and compact nav targets to at least 44x44px on mobile.

### [MEDIUM] the-alerts-and-vehicles-experiences-can — visual hierarchy
- **Page**: `vehicles.html / alerts.html`
- **Problem**: The alerts and vehicles experiences can appear visually broken or empty in some states, which makes it hard to tell whether content is missing or just hidden offscreen.
- **Evidence**: The vehicles page initially rendered as a blank main content area even though the DOM still exposed search/filter controls; scrolling later revealed the hidden table. Alerts repeatedly appeared with an empty or collapsed main content area in some desktop/mobile observations, even when navigation remained visible.
- **Suggested fix**: Give these pages stronger above-the-fold content cues, such as visible section headers, counts, or a preview of the table/filter strip. If content is below the fold, make that more obvious with layout spacing or a “scroll for table” affordance.

### [MEDIUM] multiple-select-controls-are-missing-accessible — forms
- **Page**: `shared select controls on index.html / vehicles.html / alerts.html / analytics.html`
- **Problem**: Multiple select controls are missing accessible labels, which makes the filter set harder to interpret and use consistently.
- **Evidence**: The session repeatedly reports missing-label warnings for the org switcher select on index.html, vehicles.html, alerts.html, and analytics.html. Vehicles also has an unlabeled fleet/status-related select, and Alerts/Analytics mobile views show the same issue in the compact shell.
- **Suggested fix**: Add clear visible labels or aria-labels for each select, especially org scope, fleet scope, and any status filters. Keep labels visible in the mobile layout so the purpose of each control remains obvious.

### [LOW] several-sidebar-nav-targets-are-smaller — navigation
- **Page**: `global sidebar / bottom nav`
- **Problem**: Several sidebar/nav targets are smaller than mobile guidance, making the shell harder to tap accurately.
- **Evidence**: Layout warnings repeatedly flagged 41px-tall nav items and a 36x36px user button, including in the mobile analytics observation and broader desktop/mobile coverage notes.
- **Suggested fix**: Increase tap target height/spacing for sidebar and bottom-nav items on compact screens and ensure rows have generous hit areas.
