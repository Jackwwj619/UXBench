# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full aeroiq system, prioritizing the primary dashboard flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

Across AeroIQ’s dashboard-to-alerts-to-endpoints flow, the primary investigation drill-down behaviors (endpoint cards/rows to endpoint detail, and alert row tap to Assign/Silence) frequently fail to produce visible state change or navigation. On mobile, the Alerts center shows filters and an alerts table, but row-level recovery affordances are not discoverable/triggerable, while global search and filters often provide little to no visible feedback. Overall, hierarchy and investigative navigation exist in layout, but interaction wiring/feedback is inconsistent, creating confusion during incident triage.

## Issues (5)

### [HIGH] endpoint-drill-down-from-the-endpoints — goal completion
- **Page**: `endpoints.html drill-down attempts in trajectory chunks steps-07-18 and steps-13-30; timeouts waiting for `data-uxagent-id="ux-16"` / `checkout-api`.`
- **Problem**: Endpoint drill-down from the Endpoints page (and intended endpoint card click) does not reliably trigger navigation or any visible state change.
- **Evidence**: Multiple attempts to click endpoint-related controls on `endpoints.html` did not result in a page transition (URLs remained `endpoints.html`) and one action explicitly timed out while waiting for a target (`Locator.click: Timeout 4000ms exceeded` for `data-uxagent-id="ux-16"`, plus another for `checkout-api`). The agent also reports 'Agent selected action click without a target_id' when trying to click rows/entries, and no evidence was captured for endpoint-row → `endpoint-detail.html` behavior.
- **Suggested fix**: Make endpoint rows/cards explicitly clickable with a clear visual affordance (hover/active states, cursor change, disclosure chevrons) and ensure consistent client-side navigation to `endpoint-detail.html` with the correct method/path carried into the destination (and show a loading/progress indicator). Add automated focus/keyboard support and stable click targets larger than the current small regions.

### [HIGH] on-mobile-tapping-alert-related-controls — feedback
- **Page**: `Recent trajectory steps agentic-77-select_option (mobile), agentic-78-scroll, agentic-79-type_text, agentic-80-click; mobile screenshots: `_run/screenshots/agentic-77-select_option-mobile.png`, `agentic-78-scroll-mobile.png`, `agentic-79-type_text-mobile.png`, `agentic-80-click-mobile.png`.`
- **Problem**: On mobile, tapping alert-related controls does not reveal any Assign/Silence UI, and filters/search changes often show no obvious table updates or recovery-action discovery.
- **Evidence**: In the mobile `alerts.html` flow, selecting status filters (e.g., 'All status Open Assigned Resolved') produced 'No obvious URL or visible-text change was detected after the action.' Scrolling did not reveal hidden per-row recovery controls. Typing into the global search field also produced 'No obvious URL or visible-text change' and the visible alert rows remained the same in screenshots. A tap intended to target the row/control yielded no visible change and the screenshot continued to show only filters and the table columns (Time/Rule/Endpoint/Severity/Status/Owner) with no Assign/Silence buttons or drawer.
- **Suggested fix**: Ensure row-level actions are visibly discoverable on mobile (e.g., a consistently visible action menu per row or an obvious chevron/expand interaction that opens a drawer with Assign/Silence). Provide immediate visual confirmation when filters/search are applied (row count/changed rows, loading shimmer, and a selected state). If actions are conditional, make the condition explicit (e.g., 'Assign available' badges) and keep targets within the viewport (avoid overflow hiding actions).

### [MEDIUM] filter-search-controls-appear-interactable-but — clarity
- **Page**: `trajectory chunks steps-43-54, steps-67-72, and recent mobile steps agentic-77-select_option / agentic-79-type_text.`
- **Problem**: Filter/search controls appear interactable but provide weak or non-obvious results, making it unclear whether the interaction worked.
- **Evidence**: On `alerts.html`, clicking 'All rules' showed no obvious dropdown opening or table update ('changed=false'). Typing in Search did not narrow results ('table still shows the same multi-endpoint rows'). On mobile, the status dropdown changed selection but produced no obvious visible update, and subsequent screenshots still show the same set of alerts (e.g., POST /v1/payments and POST /v1/webhooks/stripe entries) despite the filter selection attempt.
- **Suggested fix**: Add explicit visual feedback for each filter/search action: a 'filter applied' toast/snackbar, updated active filter pills, and an alert count indicator that changes. Consider debounced search with a loading state, and ensure the table re-renders immediately so the user can see narrowed results and which rows match.

### [MEDIUM] multiple-selects-inputs-are-missing-accessible — accessibility
- **Page**: `alerts.html mobile interactables in final_observation (ux-9, ux-12); accessibility warnings noted in trajectory chunks steps-43-54 and steps-13-18.`
- **Problem**: Multiple selects/inputs are missing accessible labels, which reduces usability and accessibility compliance.
- **Evidence**: Tool warnings show `missing_input_label` for `Acme Cloud Org` and for `All severities` on `alerts.html` (mobile screenshot/DOM interactables: ux-9 and ux-12 flagged as missing labels/aria-label/placeholder). Similar accessibility warnings were also noted on `endpoints.html` for selects (org switcher/service filter).
- **Suggested fix**: Add explicit visible labels or ARIA labels for all selects and inputs (especially org switcher and filter dropdowns). Ensure the label associates with the control and that the control is reachable and understandable in tab order.

### [LOW] navigation-tap-targets-and-key-controls — mobile usability
- **Page**: `final_observation layout_warning_count on mobile for alerts.html; warnings for small tap targets and horizontal overflow.`
- **Problem**: Navigation tap targets and key controls appear small, increasing mis-taps risk.
- **Evidence**: Mobile layout warnings indicate multiple left-rail items (e.g., '🚨 Alerts 8', '📊 Dashboard', '🔗 Endpoints') have tap targets around 39x58px and 'AeroIQ' 39x45px, below the 44px mobile guidance. There is also horizontal overflow on mobile (page width 679px > viewport 390px), which can hide content or push controls off-screen.
- **Suggested fix**: Increase hit areas for nav items and ensure responsive layout avoids horizontal overflow. Use sticky/expanded action areas or reflow tables so critical controls remain visible without horizontal scrolling.
