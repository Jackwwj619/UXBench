# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full aeroiq system, prioritizing the primary dashboard flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

AeroIQ’s strongest UX is its investigation depth once a user reaches an endpoint detail or full alerts view: the app surfaces meaningful metrics, error breakdowns, and consistent page identity. However, several high-visibility controls on the dashboard and shell feel untrustworthy because they appear interactive but do not change state or give feedback. Mobile usability is the biggest cross-page weakness, with horizontal overflow, very narrow sidebar tap targets, and unlabeled form controls making triage harder on small screens. Coverage is substantial across all pages and both desktop/mobile, but some navigation affordances—especially direct clickability of dashboard endpoint cards—were only partially validated.

## Issues (9)

### [HIGH] several-prominent-global-controls-appear-to — trust
- **Page**: `index.html and endpoint-detail.html top-bar time/environment controls`
- **Problem**: Several prominent global controls appear to switch context but do not update the dashboard or detail context coherently, making users question whether they are looking at the right data.
- **Evidence**: On index.html, clicking 7d and 5m changed the selected-looking control state, but visible labels still read "Total Requests · 1h" and "Global latency (p50 / p95 / p99) · 1h". Clicking Dev also produced no detectable state change and KPIs stayed the same. On endpoint-detail.html, clicking 24h left chart axes and values in the same 1h context.
- **Suggested fix**: Ensure each scope control triggers an obvious and synchronized update across headers, charts, KPI labels, and selected-state styling. If a control is not functional yet, disable it or label it as unavailable rather than making it appear live.

### [HIGH] inline-alert-actions-open-modal-flows — feedback
- **Page**: `index.html Active Alerts panel and modal dialogs`
- **Problem**: Inline alert actions open modal flows that do not provide clear success or cancellation feedback, and the user can get stuck in a blocked state.
- **Evidence**: On index.html, clicking Assign opened an "Assign alert" modal. Clicking Confirm produced no visible success message, no owner update, and the same row actions remained visible. Escape did not dismiss the modal. Clicking Silence while a modal was open did not recover the state. Clicking Cancel also showed no visible change in multiple checks, and the dashboard sometimes required a full reload to recover.
- **Suggested fix**: Add explicit success feedback after confirm, visibly update the affected alert row, and guarantee reliable dismissal via Cancel, close icon, and Escape. Prevent overlapping modal/action states and return focus to the originating alert row after dismissal.

### [HIGH] core-mobile-pages-overflow-horizontally-and — mobile usability
- **Page**: `alerts.html and endpoints.html mobile screenshots/viewport warnings`
- **Problem**: Core mobile pages overflow horizontally and rely on extremely narrow sidebar targets, so scanning tables and navigating between sections feels cramped and error-prone.
- **Evidence**: Mobile layout warnings reported page widths of 680px on alerts.html and 971–978px on endpoints.html against a 390px viewport. The visible endpoint table only exposed early columns while later triage fields were off-screen. Sidebar nav targets on mobile were repeatedly only 39px wide (for Dashboard, Endpoints, Alerts, Service Map, Logs, Integrations, Settings), and the avatar button was 34x34px.
- **Suggested fix**: Replace wide tables with mobile-optimized stacked cards or progressive disclosure, and widen or collapse the left rail into a proper mobile navigation pattern. Prioritize key triage fields in the first visible viewport and keep tap targets at or above mobile guidance.

### [MEDIUM] the-sidebar-mixes-real-destinations-with — navigation
- **Page**: `sidebar links on index.html, alerts.html, endpoints.html`
- **Problem**: The sidebar mixes real destinations with placeholder links that behave like silent no-ops, so users cannot tell which navigation items are actionable.
- **Evidence**: Clicking Logs and Integrations on alerts.html left the user on the same page, with URLs only changing to alerts.html# or not changing visibly at all. Clicking Settings on index.html and mobile endpoints.html also produced only a # URL state with no new page or panel. These items are presented in the same primary sidebar as working links like Endpoints and Alerts.
- **Suggested fix**: Remove unfinished destinations from primary nav, disable them with explanatory messaging, or route them to clear placeholder pages that state availability. Differentiate unavailable items visually instead of styling them like active app sections.

### [MEDIUM] several-important-selects-rely-on-visible — forms
- **Page**: `alerts.html and endpoints.html filter bar/select controls`
- **Problem**: Several important selects rely on visible value text without proper labels, which weakens clarity and accessibility—especially when multiple filters appear together.
- **Evidence**: Repeated missing_input_label warnings were recorded for the org switcher across pages and for filters such as severity on alerts.html. The final mobile alerts observation shows unlabeled selects for org, severity, rules, assignees, and status; the mobile endpoints/org switcher was also flagged with no label.
- **Suggested fix**: Add persistent visible labels or accessible names for all selects and search fields, and make active filter context more explicit with chips or a summary row.

### [MEDIUM] the-global-search-field-often-accepts — feedback
- **Page**: `global ⌘K search on index.html, services.html, alerts.html`
- **Problem**: The global search field often accepts typing but gives no suggestions, results, or visible effect, making it feel like a dead end.
- **Evidence**: Typing "payments" into the top-bar search on services.html, index.html, and mobile alerts.html produced no visible suggestion panel, no navigation, and no content change beyond the text remaining in the input. The tool repeatedly reported no obvious URL or visible-text change.
- **Suggested fix**: Provide immediate search feedback such as suggestions, recent items, result counts, or a clear empty state. If it is meant to open a command palette, trigger a modal/panel on focus and communicate supported query types.

### [MEDIUM] some-filters-do-not-give-trustworthy — clarity
- **Page**: `alerts.html filter bar; endpoints.html list summary`
- **Problem**: Some filters do not give trustworthy or explicit feedback, so users cannot tell whether the list changed because of their input or because it already matched.
- **Evidence**: On desktop alerts.html, selecting All rules after attempting "Error rate > 5%" stayed at "All rules" with no list change. Assignee filtering also failed to apply visibly. On mobile alerts.html, changing status to Open updated the control value, but visible rows still included mixed OPEN and ASSIGNED states. On endpoints.html, the service filter successfully reduced rows to 3 checkout-api results, but the summary still said "32 monitored endpoints across all environments."
- **Suggested fix**: Show active filter chips and a live result count, and update summary text to match the narrowed dataset. When a filter cannot be applied, provide an inline error or reset confirmation instead of silently keeping the old value.

### [LOW] the-service-map-page-promises-node — affordance
- **Page**: `services.html service map area`
- **Problem**: The Service Map page promises node interaction through instructional text, but the interface does not provide supporting hover or clickable affordances in the tested state.
- **Evidence**: On services.html, hover over Production produced no visible contextual feedback, and the page relied on static text reading "Click a service node to view details." The interactables list exposed nav, search, org select, avatar, and environment buttons, but no service-node targets were available during testing.
- **Suggested fix**: Add visible hover states, cursor changes, node highlights, and contextual previews/tooltips so the map signals interactivity directly. Provide a selected-state side panel when a node is chosen.

### [LOW] the-deeper-investigation-pages-are-strong — goal completion
- **Page**: `index.html endpoint health grid; endpoint-detail.html header`
- **Problem**: The deeper investigation pages are strong once reached, but the dashboard-to-detail affordance itself remains somewhat unproven and the detail page lacks an obvious local back-to-results pattern.
- **Evidence**: Endpoint-detail.html loaded with strong hierarchy and diagnostic context for POST /v1/payments, and returning via the left rail worked. However, the detail page was opened directly rather than by clicking a dashboard health card, and session notes explicitly state that click affordance of unhealthy cards was not fully validated; no breadcrumb or clear back-to-results control was observed.
- **Suggested fix**: Make endpoint cards visibly clickable with stronger hover/focus affordance and add a local breadcrumb or "Back to endpoints/dashboard" link on the detail page.
