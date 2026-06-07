# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the Harbor Wallet (harborwallet-mobile) UX with focus on the settings/privacy experience and adjacent flows from the main fixture UI (send/receive/swap/top up/account/activity).

## Plan Summary

Start on index.html and exercise the primary navigation entry points shown in the prescan: Send, Receive, Swap, Top up, Account, Activity, and Home. Deepen into any Account/settings/privacy-related UI reachable from the visible Account tab and validate key recovery/permission-like states (if present). Repeat critical navigation and form-interaction checks on a mobile viewport to validate responsive behavior and tap-target accessibility.

## Coverage Targets

- pages: `Visit all known HTML pages (index.html only)`
- features: `Exercise most visible controls per key page: 3 🔔, See all, Send, Receive, Swap, Top up, and bottom tab navigation including Activity and Account; also interact with at least one settings/privacy-related control once located`
- mobile: `Repeat the critical path on mobile viewport: notification + See all, one transaction quick action, and Account settings/privacy navigation`

## Planned Phases

### Baseline + home surface validation

- Objective: Verify the main landing screen (index.html) is usable and that key quick actions and content areas behave as expected before entering deeper flows.
- Target pages: index.html
- Key checks:
  - Confirm the home view is the default: observe total balance, assets list, and recent activity section
  - Click/activate "See all" in Recent Activity (ux-6) and validate resulting state (does it reveal a list view, expand/collapse, or open a new section?)
  - Tap the asset rows or any available asset-related controls inside "YOUR ASSETS" (if present/interactive) to confirm there are no misleading affordances
  - Use the notification bell button "3 🔔" (ux-1) and validate whether it opens a notification panel/modal or changes badge/state; ensure it can be dismissed
- Exit criteria:
  - Home screen interaction routes for "See all" and "3 🔔" are validated with clear resulting UI state
  - No console/network errors occur during these interactions

### Primary transaction flows via quick actions

- Objective: Exercise the most visible transaction entry points from the home surface and validate flow entry, cancellation/back behavior, and any error/validation states.
- Target pages: index.html
- Key checks:
  - Activate quick action buttons: "↑ Send" (ux-2), "↓ Receive" (ux-3), "⇄ Swap" (ux-4), "+ Top up" (ux-5)
  - For each flow: validate the initial screen renders, required fields (if any) appear, and there is a clear way to return to Home or to the bottom tab state
  - If there are inputs (prescan shows 1 input overall on the page): type minimally into the input, validate keyboard behavior and any inline validation messaging
  - If any confirmation step exists: validate that cancel/back prevents unintended submission
- Exit criteria:
  - All four quick-action entry points successfully open and can be exited without getting stuck
  - Any input/validation behavior is observed at least once per flow (even with dummy values)

### Bottom tab bar navigation + adjacent sections

- Objective: Validate that the persistent tab bar reliably routes between Home, Send, Receive, Activity, and Account, with correct active states and state persistence.
- Target pages: index.html
- Key checks:
  - Use bottom tab bar buttons: "⌂ Home" (ux-7), "📊 Activity" (ux-10), "◉ Account" (ux-11) and also reach Send/Receive via their tab equivalents (not individually enumerated in prescan, but present in tab bar list)
  - Verify active tab highlighting changes appropriately after each navigation
  - Confirm that navigating away from a transaction flow and returning restores expected state (or resets clearly)
  - Check that the "Recent Activity" region access via "See all" (from Phase 1) aligns with Activity tab content
- Exit criteria:
  - Tab bar navigation works end-to-end across at least Home, Activity, and Account
  - Active-state UI and return behavior are consistent and non-jarring

### Account → Settings/Privacy deep dive

- Objective: Reach and evaluate the settings/privacy experience from the Account area (the primary requested focus), including any toggles, disclosures, and data/security controls.
- Target pages: index.html
- Key checks:
  - Enter Account via "◉ Account" (ux-11) and locate any sections/pages labeled as Settings, Privacy, Security, Preferences, or similar
  - Exercise at least one privacy-related control (e.g., toggles/checkboxes/permission prompts) if present; validate whether changes persist
  - If there are recovery/help links (e.g., seed phrase, device authorization, account recovery), validate the navigation and that dismiss/back works safely
  - Look for any destructive actions (logout/delete/export) and verify confirmation patterns are clear and reversible
- Exit criteria:
  - Settings/privacy section is located and at least one relevant control is interacted with
  - No dead-end navigation occurs; user can return to a stable screen (Home/Account)

### Mobile viewport re-check (critical path only)

- Objective: Repeat critical interactions on mobile viewport to validate responsive layout, tap-target usability, and flow stability under ≤460px conditions.
- Target pages: index.html
- Key checks:
  - On mobile viewport: repeat taps on the small-risk controls ("3 🔔" and "See all") and confirm they remain tappable and correctly targeted
  - Repeat one representative quick-action entry (Send or Receive) and return via back/tab
  - Repeat navigation to Account and back (via bottom tab bar) ensuring no layout overlap/truncation of key controls
- Exit criteria:
  - Critical controls remain functional on mobile viewport
  - No layout breaks or navigation inconsistencies observed on mobile

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

