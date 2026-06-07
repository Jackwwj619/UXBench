# UXAgent Exploration Plan

## Goal

Explore the privacy-dashboard single-page settings experience end-to-end, validating the main privacy management flow, the supporting privacy checkup and data export/deletion actions, and the recovery/status behavior across desktop and mobile viewports.

## Plan Summary

Start on the Overview dashboard and confirm the main information architecture: left-nav sections, top account controls, privacy score, checkup cards, activity summary, and retention/status indicators. Then systematically open the adjacent flows that are visible in the prescan—activity history, data controls, ad personalization, app access, devices & locations, export data, settings, search, help, and account menu—while watching for modal, form, and status updates. Because this is a single HTML page with many controls, focus on validating a representative set of interactions per section and repeat the critical checks on mobile, especially the small tap targets already flagged by prescan.

## Coverage Targets

- pages: `visit all known HTML pages; prescan shows only index.html, so cover all major in-page sections and states.`
- features: `exercise most visible controls per key section, including nav items, privacy checkup actions, timeframe toggles, app/device settings, export, help/search, and destructive confirmations.`
- mobile: `repeat the primary overview, checkup, export, and delete-confirmation checks in a mobile viewport, with extra attention to small tap targets.`

## Planned Phases

### Baseline overview and information architecture

- Objective: Validate the default dashboard state, major summary metrics, and the primary navigation structure before drilling into actions.
- Target pages: index.html
- Key checks:
  - Confirm the Overview panel shows privacy score, recommendations count, saved items, controls active, auto-delete retention, and connected apps summary.
  - Verify the left navigation and top tabs/controls are all reachable and visually distinct.
  - Check that the privacy checkup card and activity-by-category chart expose the expected timeframe toggles and summary content.
  - Note whether the informational banner about sample activity is persistent and readable.
- Exit criteria:
  - Default desktop state has been inspected end-to-end with no broken layout or missing primary content.
  - All top-level navigation groups are identified and at least one representative control in each group is visible and actionable.

### Privacy checkup and activity review flow

- Objective: Exercise the primary guided privacy workflow and confirm recommendations can be opened, started, and progressed.
- Target pages: index.html
- Key checks:
  - Open Privacy checkup and Start to confirm the checkup entry point behaves as the main guided flow.
  - Inspect each recommendation card: review activity saving, adjust ad personalization, inspect connected apps, and create a data export.
  - Validate that the recommendation states/progress indicators reflect the current profile and are not visually ambiguous.
  - Check any scroll/expand behavior for recommendation details or associated action buttons.
- Exit criteria:
  - Each visible recommendation card has been opened or activated at least once.
  - The checkup flow’s entry, state, and action affordances are understood and no dead controls are encountered.

### Data controls, history, and personalization settings

- Objective: Verify the core privacy-management controls: activity retention, history review, ad personalization, and related summaries.
- Target pages: index.html
- Key checks:
  - Open Data controls and confirm the activity-saving settings and auto-delete behavior are presented clearly.
  - Toggle representative controls and verify any coordination between related settings, especially on/off changes affecting categories.
  - Open Activity history and inspect the sample saved items list for filtering, detail visibility, or category grouping.
  - Open Ad personalization and verify interests/sensitive-category controls or explanations are understandable.
  - Use the 30d/90d/1y timeframe controls in Activity by category and confirm the chart updates without layout breakage.
- Exit criteria:
  - At least one toggle or setting change has been exercised and its visible feedback observed.
  - History/personalization views have been opened and the dashboard remains coherent after state changes.

### Apps, devices, export, and account admin actions

- Objective: Probe adjacent account-risk areas where permissions, portability, and account-level actions can fail or confuse users.
- Target pages: index.html
- Key checks:
  - Open App access and inspect whether connected-app permissions and warning language match the summary that 2 apps have broad permissions.
  - Open Devices & locations and confirm the device/location controls or history are intelligible.
  - Activate Export data and validate the mock submission/status indicator path.
  - Open Settings and account menu to confirm account-level entry points are present and do not conflict with the privacy workflow.
  - Check Help and Search Ctrl K for discoverability and whether they expose a useful overlay or input state.
- Exit criteria:
  - Each adjacent account-management area has been entered at least once.
  - Export/account actions show clear feedback and do not leave the page in an inconsistent state.

### Destructive actions and recovery paths

- Objective: Validate the highest-risk destructive flows and confirm confirmation, cancellation, and second-step safeguards are usable.
- Target pages: index.html
- Key checks:
  - Trigger any visible delete-my-data controls from the section cards and confirm the first-step affordance is clearly labeled as destructive.
  - Open the delete account path and verify the second-confirmation modal appears with clear consequences.
  - Test cancel/close and confirm it restores the prior state without side effects.
  - If the script exposes status indicators after destructive or export actions, verify they reset appropriately after dismissal.
- Exit criteria:
  - At least one destructive path has been taken through confirmation and safely canceled or completed in a controlled way.
  - Recovery from modal/dialog states is verified and leaves the interface usable.

### Responsive and mobile validation

- Objective: Repeat the most important interactions at a mobile viewport, with attention to the small tap-target issues flagged in prescan.
- Target pages: index.html
- Key checks:
  - Confirm the sidebar/top navigation reflows acceptably and remains usable on a narrow viewport.
  - Repeat the overview, privacy checkup, export data, and one destructive-confirmation path on mobile.
  - Test the smallest tap targets flagged by prescan, especially the top nav items, search/help/account controls, and sidebar items.
  - Check whether charts, cards, and dialogs remain readable without overlap or clipped controls.
- Exit criteria:
  - Critical flows have been re-run on mobile without layout-breaking defects.
  - Any mobile-specific usability issues are documented, especially around small tap targets and dialog reachability.

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

