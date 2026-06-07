# UXAgent Exploration Plan

## Goal

Exhaustively explore and critique the UX of the Harbor Wallet mobile fixture, focusing on the primary settings/privacy flow and adjacent screens, while validating all interactive states and mobile viewport constraints.

## Plan Summary

The exploration will navigate through the app's primary tab-based screens (Home, Send, Receive, Activity, Account) to validate core wallet flows. It will then dive deep into the Account screen to uncover and test the settings/privacy features. Finally, it will re-run critical checks on a mobile viewport to validate layout warnings and responsive behavior within the simulated device frame.

## Coverage Targets

- pages: `Cover all virtual screens (data-screens) within index.html triggered by the tab bar and actions.`
- features: `Interact with all 39 buttons, 1 link, and 1 input detected in the prescan, focusing on privacy toggles and transaction inputs.`
- mobile: `Validate all layout warnings and complete the primary settings/privacy flow on a mobile viewport.`

## Planned Phases

### Home & Quick Actions

- Objective: Validate the Home screen layout, asset display, and quick action button behaviors.
- Target pages: index.html
- Key checks:
  - Verify '3 🔔' button interaction and any notification panel appearance.
  - Click 'See all' for Recent Activity and verify navigation/transitions.
  - Test quick action buttons: ↑ Send, ↓ Receive, ⇄ Swap, + Top up.
  - Check for dynamic updates in the status bar (time ticking).
- Exit criteria:
  - All Home screen interactables clicked.
  - Quick actions verified to trigger screen transitions or modals.
  - Notification bell behavior observed.

### Core Transaction Screens

- Objective: Explore the Send, Receive, and Activity screens for usability, form validation, and state changes.
- Target pages: index.html
- Key checks:
  - Navigate to Send screen, test input field, and verify available controls.
  - Navigate to Receive screen, check for address/QR code display and copy/share actions.
  - Navigate to Activity screen, verify transaction list and filtering/interaction capabilities.
  - Attempt invalid input in the Send form to check error handling.
- Exit criteria:
  - Send, Receive, and Activity screens fully inspected.
  - Input interactions and validation states tested.
  - All visible buttons on these screens clicked.

### Account & Privacy Deep Dive

- Objective: Locate and thoroughly test the Settings and Privacy controls under the Account tab.
- Target pages: index.html
- Key checks:
  - Navigate to Account screen and identify entry points to Settings/Privacy.
  - Toggle privacy settings (e.g., data sharing, analytics) and verify state retention if possible.
  - Check for clear labels, descriptions, and confirmations on privacy-impacting actions.
  - Explore other Account sub-sections (e.g., profile, security, help).
- Exit criteria:
  - Settings/Privacy screens located and fully interacted with.
  - All toggles/inputs in privacy settings exercised.
  - Navigation back to main Account screen verified.

### Mobile Viewport Validation

- Objective: Re-test critical flows and layout warnings on a mobile viewport to ensure responsive compliance.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport and verify the phone chassis renders edge-to-edge (≤460px).
  - Re-validate tapping the small '3 🔔' and 'See all' targets for usability.
  - Check Account/Settings/Privacy flow for layout overflow or clipping issues on small screens.
  - Verify tab bar accessibility and hit areas on mobile.
- Exit criteria:
  - Mobile viewport renders correctly without horizontal scroll.
  - Small tap targets explicitly tested and critiqued.
  - Primary settings/privacy flow completed successfully on mobile.

## Prescan Summary

### Harbor Wallet — mobile fixture

- Page: `index.html`
- Headings: YOUR ASSETS, RECENT ACTIVITY, Send money, Receive money, Account
- Interactables: `39` buttons, `1` links, `1` inputs
- Notable controls:
  - clickable:button:3 🔔
  - clickable:button:↑ Send
  - clickable:button:↓ Receive
  - clickable:button:⇄ Swap
  - clickable:button:+ Top up
  - clickable:a:See all
  - clickable:button:⌂ Home
  - clickable:button:📊 Activity

