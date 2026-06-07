# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the harborwallet-mobile system, prioritizing the Account/Settings flow and validating simulated mobile interactions across Home, Transaction, and Activity tabs.

## Plan Summary

The run will start on the Home tab, validating the default dashboard layout and identifying tap target issues. It will then prioritize navigating to the Account tab to explore settings and privacy features. Finally, it will verify the core wallet flows (Send, Receive, Swap, Top up) and the Activity history, ensuring the single-page app state updates correctly.

## Coverage Targets

- pages: `Explore all simulated screens (Home, Send, Receive, Activity, Account) within the index.html SPA.`
- features: `Exercise all primary dashboard action buttons and bottom navigation tabs.`
- mobile: `Ensure the simulated phone chassis renders correctly edge-to-edge when tested under a true mobile viewport.`

## Planned Phases

### Dashboard & Layout Validation

- Objective: Verify the initial Home screen rendering, asset list, and interact with small tap targets.
- Target pages: index.html
- Key checks:
  - Check visibility of Total Balance and Assets.
  - Interact with the Notifications '3 🔔' button and observe behavior.
  - Verify scrollability of the Recent Activity list on the Home screen.
- Exit criteria:
  - Home screen elements are confirmed visible and the notification action is tested.

### Account & Privacy Flow

- Objective: Navigate to the Account tab and explore settings/privacy options.
- Target pages: index.html
- Key checks:
  - Click the '◉ Account' bottom tab.
  - Scan for and interact with 'Settings', 'Privacy', or profile management controls.
  - Validate form inputs or toggles if present within the Account screen.
- Exit criteria:
  - Account tab is successfully loaded and all visible settings/privacy controls are interacted with.

### Core Transaction Flows

- Objective: Validate the primary financial actions: Send, Receive, Swap, and Top up.
- Target pages: index.html
- Key checks:
  - Test '↑ Send' action (both from main dashboard buttons and bottom tab).
  - Test '↓ Receive' action.
  - Test '⇄ Swap' and '+ Top up' buttons.
  - Check if simulated modal or screen transitions occur for these actions.
- Exit criteria:
  - All transaction entry points have been clicked and resulting UI states recorded.

### Activity History Exploration

- Objective: Check the detailed transaction history via the Activity tab and shortcuts.
- Target pages: index.html
- Key checks:
  - Click the 'See all' link next to Recent Activity on the Home tab.
  - Click the '📊 Activity' bottom tab.
  - Verify if the view changes to a comprehensive list of transactions.
- Exit criteria:
  - Activity view is reached and transaction history layout is evaluated.

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

