# UXAgent Exploration Plan

## Goal

Exhaustively explore and critique the UX of the privacy dashboard, validating all primary privacy controls, data management flows, destructive actions, and responsive layout behavior.

## Plan Summary

The exploration will systematically traverse the dashboard's primary sections using the left navigation, starting with the Overview and Privacy Checkup. It will then validate the core privacy toggles and data deletion flows within Activity History and Data Controls, followed by Ad Personalization and App Access. Finally, it will test destructive and high-risk actions like Export Data and Account Deletion, ensuring modals and confirmations behave correctly, before re-verifying critical interactions on a mobile viewport.

## Coverage Targets

- pages: `visit all known HTML pages (single page app: ensure all left-nav sections are loaded)`
- features: `exercise all left-nav sections, all toggles, all 'Delete my data' buttons, export flow, and privacy checkup`
- mobile: `repeat navigation, a core toggle, and a destructive modal flow on mobile viewport`

## Planned Phases

### Overview & Privacy Checkup

- Objective: Validate the initial dashboard state, privacy score, and the guided privacy checkup flow.
- Target pages: index.html
- Key checks:
  - Verify privacy score and recommendation count are visible on load.
  - Click 'Start' on Privacy Checkup and validate progression through checkup steps.
  - Interact with the 'Search Ctrl K' button to verify search overlay/behavior.
  - Click 'Open help' and 'Account menu' to ensure dropdowns/overlays open and close correctly.
- Exit criteria:
  - Privacy checkup flow initiated and completed/closed.
  - Global controls (Search, Help, Account) verified.
  - Overview state fully captured.

### Activity & Data Controls

- Objective: Test the core privacy toggles and data management settings for activity history and data controls.
- Target pages: index.html
- Key checks:
  - Navigate to 'Activity history' and toggle activity saving settings off/on.
  - Verify 'Auto-delete' settings interaction (e.g., changing from 18 months to 3 months).
  - Navigate to 'Data controls' and interact with available toggles.
  - Click 'Delete my data' buttons within these sections and validate the second-confirmation modal.
  - Cancel and confirm the deletion modal to check both recovery paths.
- Exit criteria:
  - Activity saving toggles flipped and state changes observed.
  - Auto-delete setting adjusted.
  - Delete confirmation modal successfully triggered, cancelled, and confirmed.

### Ad Personalization & App Access

- Objective: Validate adjacent privacy settings for ad preferences and third-party app permissions.
- Target pages: index.html
- Key checks:
  - Navigate to 'Ad personalization' and toggle settings, verify interests/sensitive categories UI.
  - Navigate to 'App access' and review the list of connected apps.
  - Revoke access for an app with broad permissions and verify UI update.
  - Navigate to 'Devices & locations' and verify device list and location history controls.
- Exit criteria:
  - Ad personalization toggled and interests reviewed.
  - App access revoked/inspected successfully.
  - Devices & locations section explored.

### High-Risk Actions & Export

- Objective: Test the prominent danger zones and data export functionality to ensure safe UX patterns.
- Target pages: index.html
- Key checks:
  - Navigate to 'Export data' and trigger the data export mock submission.
  - Validate form submission feedback (e.g., status indicators, success message).
  - Navigate to 'Settings' and locate the 'Delete account' danger zone.
  - Initiate account deletion and verify the presence and behavior of the final confirmation modal.
  - Ensure cancellation is easy and default-focused to prevent accidental deletion.
- Exit criteria:
  - Data export initiated and status indicator observed.
  - Delete account modal triggered, validated for safe UX, and successfully aborted.

### Mobile Viewport Validation

- Objective: Re-test critical flows and layout stability on a mobile viewport, addressing prescan tap target warnings.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport and verify sidebar navigation behavior (hamburger menu or collapsible).
  - Validate top navigation tap targets (Account, Privacy, Data controls, Apps, Devices) for usability.
  - Repeat a toggle interaction (e.g., Activity history) to ensure controls are accessible and not obscured.
  - Trigger a delete confirmation modal on mobile to check layout and scrolling behavior.
- Exit criteria:
  - Mobile navigation fully functional.
  - Tap target issues validated and documented.
  - Critical interaction (toggle + modal) successfully completed on mobile.

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

