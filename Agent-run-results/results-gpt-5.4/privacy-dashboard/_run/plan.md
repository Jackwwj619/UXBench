# UXAgent Exploration Plan

## Goal

Exhaustively explore the single-page privacy dashboard, validating the main privacy-management flow plus adjacent in-page navigation, recommendation shortcuts, destructive/recovery states, and responsive behavior.

## Plan Summary

The run should treat index.html as a rich single-page application with multiple sections and stateful controls rather than a multi-page site. Start by mapping the in-page navigation and recommendation shortcuts, then deeply exercise the privacy controls, activity management, export, and destructive actions, with special attention to dialogs, confirmations, and status changes driven by script.js. Repeat the most critical interactions on mobile because the prescan already shows multiple undersized tap targets in the top nav and left rail.

## Coverage Targets

- pages: `Visit the only known HTML page (index.html) and traverse all major in-page sections, dialogs, and dynamically revealed states reachable from navigation, recommendation cards, manage/details links, export, and destructive actions.`
- features: `Exercise most visible controls on the key page: navigation groups, privacy checkup shortcuts, category Manage/Details affordances, time filters, primary toggles, export flow, and destructive confirmations including cancel and confirm branches where safe.`
- mobile: `Repeat critical checks on mobile viewport for navigation, undersized tap targets, one representative control-change flow, one recommendation shortcut, one export path, and at least one destructive confirmation/modal.`

## Planned Phases

### Map structure and navigation model

- Objective: Confirm how the single page is organized and whether header nav, sidebar nav, and recommendation shortcuts reveal/scroll to distinct sections consistently.
- Target pages: index.html
- Key checks:
  - Use top header items (Privacy, Data controls, Apps, Devices) and verify whether they scroll, highlight, or change visible content without breaking context
  - Use left-rail buttons (Overview, Activity history, Data controls, Ad personalization, App access, Devices & locations, Export data, Settings) and verify each lands on a distinct section/state
  - Open the Privacy checkup Start path and compare it to the recommendation cards to see whether they target the same destinations
  - Check whether active/selected nav state updates correctly when moving among sections
  - Verify that section transitions preserve orientation and do not hide key summary cards or action buttons unexpectedly
- Exit criteria:
  - All visible navigation groups have been exercised at least once
  - The run has identified the major in-page sections and which controls are duplicate entry points
  - Any broken, no-op, or confusing navigation patterns are documented

### Exercise privacy controls and status indicators

- Objective: Validate the core privacy-management flow by changing control states and checking whether summaries, indicators, and explanatory copy stay coherent.
- Target pages: index.html
- Key checks:
  - Find and toggle the visible privacy controls related to activity saving, ad personalization, location/search/device categories, and note any dependent or coordinated behavior
  - Verify whether the 'Controls active' summary updates when controls are changed
  - Inspect any auto-delete setting controls and test whether changing the retention selection updates visible status text
  - Use 'Details' or 'Manage' affordances in category cards such as Search history, Browsing history, Location history, and Voice activity to reveal more granular controls if available
  - Confirm status indicators, completion marks, or badges in the Privacy checkup/recommendations panel reflect updated control states
  - Check whether control labels clearly communicate on/off consequences before any destructive or privacy-reducing change is applied
- Exit criteria:
  - Most primary privacy toggles or control widgets visible in the page have been exercised
  - At least one summary metric or status indicator has been verified to react to control changes, or a lack of reaction has been noted
  - The relationship between detailed controls and dashboard summaries is understood

### Inspect activity history and category management

- Objective: Validate how users review, drill into, and potentially remove sample activity across categories and time ranges.
- Target pages: index.html
- Key checks:
  - Use the activity-by-category time filters (30d, 90d, 1y if present) and verify chart/state changes are visible and understandable
  - Open Manage actions for Search history, Browsing history, Location history, and Voice activity to inspect deeper states or controls
  - Open Recent activity and any visible item-level actions such as Details to verify drill-in behavior
  - Test category-specific delete actions such as 'Delete my X data' if exposed, and confirm scope clarity before confirming
  - Observe whether counts like saved items or category item totals change after deletion or remain static as a mock; document the behavior either way
- Exit criteria:
  - All visible activity categories have been visited or invoked through their Manage/Details entry point
  - Time-range controls and at least one recent-activity drill-in have been exercised
  - At least one category-level deletion workflow has been explored up to and including confirmation/cancel paths

### Validate export and destructive confirmations

- Objective: Stress the highest-risk flows involving data export, deletion, and account removal, with careful attention to safeguards and recovery paths.
- Target pages: index.html
- Key checks:
  - Use the prominent Export data button and the left-rail Export data section to compare entry points and verify any form or mock submission flow
  - If a dialog opens for export, validate required fields/options, submit behavior, completion/status messaging, and cancellation
  - Trigger delete-data actions from category sections and inspect first-confirm and second-confirm steps, wording clarity, and reversibility cues
  - Locate and exercise the danger-zone actions described in the README, especially Download my data and Delete account, without assuming external navigation
  - Verify all dialogs can be dismissed via explicit close/cancel, backdrop, and keyboard if supported
  - Check whether post-action success/error indicators appear and whether the page remains stable after destructive-flow cancellation
- Exit criteria:
  - Export flow has been exercised from at least one entry point through its terminal visible state
  - At least one destructive deletion flow and the account-deletion flow have been tested through both cancel and confirm branches if possible
  - Modal/confirmation usability issues, especially around irreversible actions, are documented

### Responsive and mobile validation

- Objective: Repeat the most important navigation and high-risk interactions on mobile to assess reachability, tap accuracy, and dialog usability.
- Target pages: index.html
- Key checks:
  - Re-check header nav, search, help, account menu, and left-rail or collapsed navigation behavior on mobile viewport
  - Validate the already-flagged small tap targets in top navigation and section navigation for practical usability
  - Repeat one primary control-toggle flow, one recommendation shortcut flow, one export flow, and one destructive confirmation flow on mobile
  - Confirm dialogs fit the viewport, keep primary/secondary actions visible, and do not trap content off-screen
  - Check whether charts, cards, and summary metrics remain readable without horizontal clipping
- Exit criteria:
  - Critical desktop flows have been spot-checked on mobile
  - Known tap-target risks have been confirmed or disproven with interaction evidence
  - Any mobile-only layout, scrolling, or modal issues have been captured

## Prescan Summary

### Account Privacy Dashboard

- Page: `index.html`
- Headings: Privacy dashboard, Privacy checkup, Activity by category, Search history, Browsing history, Location history, Voice activity, Recent activity, Recommendations, 12 activity items
- Interactables: `125` buttons, `5` links, `34` inputs
- Notable controls:
  - clickable:a:Account privacy home
  - clickable:a:Privacy
  - clickable:a:Data controls
  - clickable:a:Apps
  - clickable:a:Devices
  - clickable:button:Search privacy dashboard
  - clickable:button:Open help
  - clickable:button:Account menu

