# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full aeroiq system, prioritizing the primary dashboard flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

AeroIQ gives strong at-a-glance operational context, with clear KPI summaries, triage filters, and cross-page navigation between dashboard, endpoints, alerts, and service map. The biggest UX risks are mobile crampedness and weak feedback for some controls: several controls are too small, the layout overflows on small screens, and a few interactions appear inert or fail to communicate state changes. There are also discoverability gaps in drilldown affordances, especially for endpoint cards and some header controls. Coverage is substantial but not complete, so a few auxiliary destinations remain untested.

## Issues (9)

### [HIGH] the-mobile-layout-overflows-the-viewport — mobile usability
- **Page**: `alerts.html / endpoints.html`
- **Problem**: The mobile layout overflows the viewport, making the app feel cramped and harder to scan or operate.
- **Evidence**: On alerts.html mobile, the page width is 699px on a 390px viewport; on endpoints.html mobile it was even wider (978px+), with the left rail and content cut off horizontally.
- **Suggested fix**: Redesign the mobile layout to collapse or stack the left rail and header controls, and ensure the main content fits within the viewport without horizontal scrolling.

### [HIGH] several-primary-nav-and-header-targets — mobile usability
- **Page**: `index.html / alerts.html`
- **Problem**: Several primary nav and header targets are below mobile tap-target guidance, which makes them hard to tap accurately.
- **Evidence**: Observed targets include 39x58px sidebar links, a 34x34px profile button, and compact environment/time controls; the layout warnings repeatedly flagged these as below 44px guidance.
- **Suggested fix**: Increase touch target sizes to at least 44px in both dimensions where possible, and add more spacing between adjacent controls in the rail and top bar.

### [MEDIUM] the-org-switcher-lacks-a-visible — clarity
- **Page**: `header org select`
- **Problem**: The org switcher lacks a visible label/aria-label/placeholder, so its purpose and state are unclear, especially on mobile.
- **Evidence**: Layout warnings repeatedly reported a missing input label for the Acme Cloud Org select on alerts.html and index.html; selecting it also produced no visible state change.
- **Suggested fix**: Add a visible label and stronger selected-state feedback for the org selector, and confirm changes with an explicit context update.

### [MEDIUM] some-top-bar-controls-appear-inert — feedback
- **Page**: `index.html / services.html`
- **Problem**: Some top-bar controls appear inert or provide no visible feedback after interaction, notably the org selector and environment toggle in the captured flows.
- **Evidence**: Clicking the org selector on index.html produced no visible state change; clicking Production on services.html produced no visible state change or content update.
- **Suggested fix**: Make control responses explicit with selected-state styling, text updates, or a brief confirmation of the active scope/environment.

### [MEDIUM] endpoint-cards-read-as-dense-metric — affordance
- **Page**: `index.html endpoint health grid`
- **Problem**: Endpoint cards read as dense metric tiles, but their tappability is not obvious and direct clicks on a visible card target were not successful.
- **Evidence**: On the mobile dashboard, endpoint cards showed method, service/path, RPS, p95, and errors, but no clear card-level affordance was visible; an attempted click on a candidate endpoint card target timed out with no visible change.
- **Suggested fix**: Add a clearer card affordance such as hover/tap feedback, chevrons, or a consistent clickable card styling and press state.

### [MEDIUM] some-filters-update-clearly-but-others — feedback
- **Page**: `alerts.html / endpoints.html`
- **Problem**: Some filters update clearly, but others do not provide enough visible feedback, making filter state ambiguous.
- **Evidence**: Alerts severity filtering to Critical visibly changed the table and selected state, but assignee and status changes did not visibly update rows or control text; on endpoints, health and service filters did narrow results visibly, but selected-state emphasis was weak in the compact filter row.
- **Suggested fix**: Standardize filter feedback with stronger selected-state styling and immediate result-count or row-update confirmation for every filter change.

### [MEDIUM] several-top-level-destinations-are-inert — navigation
- **Page**: `left rail / logo`
- **Problem**: Several top-level destinations are inert dead ends, which weakens the navigation model.
- **Evidence**: The alerts page exposes Logs and Integrations as visible nav items, but their hrefs are '#'; the dashboard logo also did not function as a drilldown entry point in the observed flows.
- **Suggested fix**: Either wire these items to real destinations or visually mark them as unavailable/coming soon so users do not expect functional navigation.

### [LOW] some-controls-are-unlabeled-or-minimally — accessibility
- **Page**: `header controls`
- **Problem**: Some controls are unlabeled or minimally labeled in ways that reduce accessibility clarity.
- **Evidence**: The org select was reported missing a label/aria-label/placeholder, and the profile button is only represented as an icon button with a 34x34px target.
- **Suggested fix**: Add accessible names and descriptive labels to the org selector and icon-only actions, and verify tab order and focus visibility.

### [LOW] several-auxiliary-destinations-were-visible-but — other
- **Page**: `coverage gaps / unvisited controls`
- **Problem**: Several auxiliary destinations were visible but not yet meaningfully tested, leaving uncertainty about deeper workflows.
- **Evidence**: Coverage notes show only 33% of visible interactive feature signatures exercised, with untested items like Settings, Logs, Integrations, and some alert-page controls still remaining.
- **Suggested fix**: Prioritize validation of the remaining auxiliary destinations and any drill-in paths that support incident recovery and configuration workflows.
