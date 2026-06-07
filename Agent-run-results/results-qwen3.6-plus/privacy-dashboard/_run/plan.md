# UXAgent Exploration Plan

## Goal

Validate the UX of the Privacy Dashboard, focusing on the clarity of data controls, the effectiveness of the 'Privacy Checkup' flow, and the safety mechanisms around destructive actions (Delete Account/Data).

## Plan Summary

The run will proceed by first auditing the Overview dashboard for information hierarchy and mobile responsiveness. It will then drill down into specific activity categories (Search, Location) to test toggle states and detail views. Finally, it will simulate high-risk flows like Data Export and Account Deletion to verify confirmation modals and error handling.

## Coverage Targets

- pages: `Full coverage of index.html states (Overview, History, Settings, Checkup).`
- features: `All toggles, modals, and sidebar navigation items exercised.`
- mobile: `Critical paths (Nav, Toggles, Modals) repeated on mobile viewport.`

## Planned Phases

### Dashboard Overview & Responsiveness

- Objective: Verify the initial layout, privacy score visibility, and mobile navigation integrity.
- Target pages: index.html
- Key checks:
  - Check visual hierarchy of 'Saved items', 'Controls active', and 'Auto-delete' cards.
  - Switch to mobile viewport: Verify sidebar collapses into a hamburger menu or drawer.
  - Test tap targets for top-level nav items (noted as small in prescan).
  - Hover over 'Privacy score' to check for tooltips explaining the metric.
- Exit criteria:
  - Mobile menu opens/closes correctly.
  - All dashboard cards are visible and legible on desktop and mobile.

### Activity Controls & Toggles

- Objective: Test the interaction design of privacy toggles and detailed history views.
- Target pages: index.html
- Key checks:
  - Navigate to 'Activity history' via sidebar.
  - Interact with 'Web & App Activity' toggle: Verify immediate visual feedback (color change).
  - Click 'Manage' or 'Details' on Search/Location history: Validate the list view layout.
  - Test 'Delete' buttons on individual activity items (mock action).
  - Verify 'Auto-delete' settings modal opens and allows selection of timeframes.
- Exit criteria:
  - Toggles provide clear On/Off state indication.
  - Detail views load without layout shift.
  - Mock delete actions trigger expected success/error toasts or modals.

### Privacy Checkup Flow

- Objective: Evaluate the guided experience for improving privacy settings.
- Target pages: index.html
- Key checks:
  - Click 'Start' on the Privacy Checkup card.
  - Step through at least two recommendations (e.g., 'Review activity saving', 'Ad personalization').
  - Verify progress indicator updates as steps are completed.
  - Check if the 'Privacy score' on the dashboard updates after completion.
- Exit criteria:
  - Checkup flow is linear and easy to follow.
  - Completion state is clearly communicated.

### High-Risk Actions & Safety

- Objective: Ensure destructive paths have adequate friction and clarity.
- Target pages: index.html
- Key checks:
  - Navigate to 'Settings' or 'Data controls' to find 'Delete Account'.
  - Trigger 'Delete Account': Verify the presence of a blocking modal.
  - Test the 'Cancel' vs 'Confirm' path in the modal.
  - Initiate 'Export Data': Check form fields for file format selection and email confirmation.
  - Verify warning colors (red/yellow) are used appropriately for these sections.
- Exit criteria:
  - Cannot accidentally delete account without explicit multi-step confirmation.
  - Export form validates input before submission.

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

