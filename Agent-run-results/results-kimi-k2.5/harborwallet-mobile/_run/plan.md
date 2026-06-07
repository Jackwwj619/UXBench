# UXAgent Exploration Plan

## Goal

Explore and critique the UX of harborwallet-mobile, focusing on the settings/privacy flow and adjacent pages/states, validating interactables, layout, and responsiveness.

## Plan Summary

Start on the home page, explore key interactables (tabs, buttons, links), validate mobile responsiveness, check for layout issues, and ensure all known pages are covered. Prioritize the Account tab for settings/privacy flow, then adjacent flows like Send/Receive/Activity.

## Coverage Targets

- pages: `Visit index.html (only known page) and explore all states/flows within it.`
- features: `Exercise all visible controls (39 buttons, 1 link, 1 input) per key page (home, send, receive, activity, account).`
- mobile: `Repeat critical checks (interactables, layout) on mobile viewport (≤460px).`

## Planned Phases

### Home Page Exploration

- Objective: Validate home page interactables, layout, and initial state.
- Target pages: index.html
- Key checks:
  - Click '⌂ Home' (validate active state).
  - Click '↑ Send' (validate state change/modal).
  - Click '↓ Receive' (validate state change/modal).
  - Click '⇄ Swap' (validate state change/modal).
  - Click '+ Top up' (validate state change/modal).
  - Check '3 🔔' (validate notification state/modal).
  - Check 'See all' (validate activity list expansion).
  - Validate layout on desktop viewport (initial observation).
- Exit criteria:
  - All home page interactables checked (buttons: '⌂ Home', '↑ Send', '↓ Receive', '⇄ Swap', '+ Top up', '3 🔔', 'See all').
  - Layout issues (small tap targets) noted for follow-up in mobile phase.

### Adjacent Flows (Send/Receive/Activity)

- Objective: Explore adjacent flows (Send, Receive, Activity) to validate state changes and interactables.
- Target pages: index.html
- Key checks:
  - Click '↑ Send' (validate Send flow: form, inputs, cancel/confirm).
  - Click '↓ Receive' (validate Receive flow: address, QR, cancel/confirm).
  - Click '📊 Activity' (validate Activity page: list, filters, 'See all' expansion).
  - Check '⌂ Home' to return to home state.
- Exit criteria:
  - Send, Receive, and Activity flows validated (state changes, interactables).
  - All relevant buttons (Send, Receive, Activity) checked for functionality.

### Account (Settings/Privacy) Flow

- Objective: Explore the Account tab to validate settings/privacy flow depth and interactables.
- Target pages: index.html
- Key checks:
  - Click '◉ Account' (validate Account page: settings, privacy, profile).
  - Check for sub-menus/settings (e.g., privacy, security, profile).
  - Validate back navigation to home/other tabs.
- Exit criteria:
  - Account tab explored (settings/privacy flow validated for depth).
  - All Account tab interactables checked (button: '◉ Account').

### Mobile Responsiveness Check

- Objective: Validate mobile viewport (≤460px) layout, interactables, and accessibility.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport (≤460px).
  - Validate edge-to-edge rendering (chassis, status bar, tab bar).
  - Check small tap targets ('3 🔔', 'See all') for accessibility (tap area, visibility).
  - Re-validate key interactables (Send, Receive, Account, Home) on mobile.
  - Check for layout issues (e.g., overlapping elements, truncated text).
- Exit criteria:
  - Mobile viewport validated (layout, interactables, accessibility).
  - Small tap target issues re-checked on mobile (severity, usability).

### Final Validation & Coverage

- Objective: Ensure all known pages (index.html) are covered, all features exercised, and final checks for console/network errors.
- Target pages: index.html
- Key checks:
  - Re-visit all phases to ensure no interactables missed.
  - Check console/network errors (should be none per prescan).
  - Validate all headings (YOUR ASSETS, RECENT ACTIVITY, etc.) are associated with relevant content.
  - Final check for layout warnings (small tap targets) — document severity and impact.
- Exit criteria:
  - All known pages (index.html) covered.
  - All features (interactables) exercised.
  - Mobile and desktop viewports validated.
  - No new console/network errors.

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

