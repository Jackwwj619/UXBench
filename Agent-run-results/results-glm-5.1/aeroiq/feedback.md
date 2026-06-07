# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full aeroiq system, prioritizing the primary dashboard flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

AeroIQ provides a strong desktop observability experience with comprehensive triage data and interactive error breakdowns, but its mobile implementation suffers from severe responsiveness issues and inaccessible tap targets. Several critical interactive controls, such as alert filters and the notification bell, are non-functional, creating trust gaps and blocking user goals. Additionally, missing form labels across the app pose significant accessibility barriers.

## Issues (7)

### [HIGH] the-layout-does-not-adapt-to — mobile usability
- **Page**: `endpoint-detail.html, alerts.html (layout_warnings: horizontal_overflow)`
- **Problem**: The layout does not adapt to mobile viewports, causing severe horizontal overflow and rendering the app unusable on phones.
- **Evidence**: On the endpoint detail page, the page width is 617px while the viewport is only 390px. The same horizontal overflow (699px width vs 390px viewport) occurs on the alerts page, caused by tightly packed top bar controls and filter bars that do not wrap or collapse.
- **Suggested fix**: Implement a responsive layout that stacks KPIs vertically, collapses the left rail into a hamburger menu, and wraps or horizontally scrolls the filter bar and environment tabs.

### [HIGH] primary-navigation-items-in-the-left — mobile usability
- **Page**: `index.html, endpoint-detail.html (layout_warnings: small_tap_target for ux-1 to ux-8, ux-10 to ux-12)`
- **Problem**: Primary navigation items in the left rail have critically narrow tap targets, making mobile navigation frustrating and error-prone.
- **Evidence**: Left rail navigation links (Dashboard, Endpoints, Alerts, etc.) are only 39px wide on mobile, failing the 44px minimum mobile tap target guidance. Environment tabs (Production, Staging, Dev) also have insufficient heights (28px).
- **Suggested fix**: Increase the tap target size of navigation items to at least 44x44px. On mobile, consider converting the left rail to a full-screen hamburger menu with larger, stacked touch targets.

### [HIGH] the-alert-filter-dropdowns-for-rules — goal completion
- **Page**: `alerts.html (ux-13, ux-14)`
- **Problem**: The alert filter dropdowns for 'Rules' and 'Assignees' do not filter the alert list, failing the core user goal of triaging alerts.
- **Evidence**: Selecting 'Error rate > 5%' from the 'All rules' dropdown and 'Sofia Vetrov' from the 'All assignees' dropdown resulted in no visible change to the alert table, with the tool confirming 'No obvious URL or visible-text change was detected'.
- **Suggested fix**: Implement client-side or server-side filtering logic so that selecting a rule or assignee immediately updates the visible alert rows.

### [MEDIUM] clicking-the-alert-bell-icon-8 — feedback
- **Page**: `index.html (ux-19)`
- **Problem**: Clicking the alert bell icon (🔔 8) provides no visual feedback or dropdown, confusing users who expect a summary popup.
- **Evidence**: Clicking the 🔔 8 button on the dashboard produced no visible change or dropdown. While an 'Active Alerts' panel exists on the page, the bell icon itself lacks interaction feedback.
- **Suggested fix**: Either open a notification dropdown summarizing the 8 alerts when the bell is clicked, or provide a tooltip/visual indicator that the panel below serves as the alert center.

### [MEDIUM] several-left-rail-navigation-links-settings — navigation
- **Page**: `alerts.html, endpoint-detail.html (⚙️ Settings, 📜 Logs, 🔌 Integrations)`
- **Problem**: Several left rail navigation links (Settings, Logs, Integrations) are dead-end placeholders that only append '#' to the URL, misleading users.
- **Evidence**: Clicking the ⚙️ Settings link only appends '#' to the URL (alerts.html -> alerts.html#) with no visible content change. Logs and Integrations also point to '#'.
- **Suggested fix**: If these features are not yet available, disable the links visually (grayed out) and add a tooltip indicating 'Coming soon', or remove them from the navigation entirely until implemented.

### [MEDIUM] the-organization-switcher-and-several-filter — accessibility
- **Page**: `index.html, alerts.html, endpoint-detail.html (ux-9, filter selects)`
- **Problem**: The organization switcher and several filter dropdowns lack associated labels, making them inaccessible to screen reader users.
- **Evidence**: The 'Acme Cloud Org' select element (ux-9) and alert filter selects (severity, rules, assignees) are flagged with 'missing_input_label' severity medium, having no label, aria-label, or placeholder.
- **Suggested fix**: Add visible <label> elements or aria-label attributes to all select and input elements (e.g., aria-label="Organization", aria-label="Filter by severity").

### [LOW] clicking-the-staging-or-dev-environment — feedback
- **Page**: `services.html, endpoint-detail.html (ux-11, ux-12)`
- **Problem**: Clicking the Staging or Dev environment tabs does not update the active state or data, leaving the user unsure if the switch occurred.
- **Evidence**: Clicking the 'Staging' tab on the Service Map and the 'Dev' tab on the endpoint detail page produced no visible text, active state, or URL change.
- **Suggested fix**: Implement an active state style (e.g., bold text, highlighted background) for the selected environment tab and ensure the data refreshes to reflect the selected environment.
