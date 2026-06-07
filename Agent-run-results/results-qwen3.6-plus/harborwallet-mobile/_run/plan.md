# UXAgent Exploration Plan

## Goal

Autonomously explore the Harbor Wallet mobile fixture, focusing on the Account/Settings flow (specifically Privacy), validating core transactional paths (Send/Receive), and critiquing UX accessibility issues identified in the prescan.

## Plan Summary

The run will begin by establishing the baseline Home state, then navigate to the 'Account' tab to locate and exercise the Settings/Privacy controls. It will subsequently validate the primary 'Send' and 'Receive' flows to ensure functional consistency. Finally, it will switch to a mobile viewport to re-evaluate tap targets and layout constraints flagged as risks.

## Coverage Targets

- pages: `index.html (all dynamic states/screens)`
- features: `Tab navigation, Privacy toggles, Send/Receive inputs, Notification drawer, Activity list`
- mobile: `Full regression of Phases 1-4 on mobile viewport, specifically targeting touch precision`

## Planned Phases

### Home & Navigation Baseline

- Objective: Validate the initial state, status bar simulation, and global navigation integrity.
- Target pages: index.html
- Key checks:
  - Verify Status Bar elements (time, battery, wifi) are visible and static/simulated correctly.
  - Click each Tab Bar item (Home, Send, Receive, Activity, Account) to ensure screen transitions occur without error.
  - Inspect the 'Total Balance' card for visual hierarchy and clarity.
- Exit criteria:
  - All 5 tabs have been visited and returned to Home.
  - No console errors triggered during navigation.

### Account & Privacy Flow (Primary Goal)

- Objective: Deep dive into the Account section to find and test Privacy/Settings controls.
- Target pages: index.html
- Key checks:
  - Navigate to 'Account' tab.
  - Locate 'Settings' or 'Privacy' menu items.
  - Toggle any available privacy switches (e.g., 'Hide Balance', 'Biometric Login').
  - Validate that state changes persist visually or provide immediate feedback.
  - Check for 'Log Out' or 'Support' adjacent links.
- Exit criteria:
  - Privacy settings located and interacted with.
  - User understands how to modify privacy preferences.

### Core Transactional Paths

- Objective: Exercise the 'Send' and 'Receive' features to check input validation and flow logic.
- Target pages: index.html
- Key checks:
  - Click 'Send': Verify recipient input field and amount entry UI.
  - Attempt to submit empty or invalid data to check for error handling.
  - Click 'Receive': Verify QR code generation or address display.
  - Check for 'Copy Address' functionality.
- Exit criteria:
  - Send and Receive screens rendered successfully.
  - Input fields respond to interaction (focus states, keyboard appearance simulation).

### Activity & Notifications

- Objective: Review transaction history details and notification interactions.
- Target pages: index.html
- Key checks:
  - Click 'See all' in Recent Activity (noting the small tap target risk).
  - Verify the full Activity list loads.
  - Click the Notification Bell (ux-1) to view the 3 pending notifications.
  - Dismiss or interact with a notification item.
- Exit criteria:
  - Full activity log viewed.
  - Notification center accessed and cleared/viewed.

### Mobile Viewport & Accessibility Audit

- Objective: Repeat critical checks on a mobile viewport (e.g., iPhone SE/12 dimensions) to validate prescan warnings.
- Target pages: index.html
- Key checks:
  - Resize viewport to ~390x844.
  - Re-test tapping the Notification Bell (ux-1) and 'See all' (ux-6) to confirm difficulty/usability issues.
  - Check for horizontal scrolling or layout breakage in the 'Your Assets' list.
  - Verify bottom tab bar does not obscure content near the home indicator area.
- Exit criteria:
  - Layout remains intact on mobile width.
  - Usability issues with small tap targets confirmed via manual interaction attempt.

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

