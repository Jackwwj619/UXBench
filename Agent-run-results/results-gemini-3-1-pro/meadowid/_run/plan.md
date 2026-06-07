# UXAgent Exploration Plan

## Goal

Exhaustively explore and evaluate the MeadowID identity dashboard, focusing on navigation, security alerts, session/app management, and data export flows.

## Plan Summary

The exploration will start on the Overview dashboard to validate alert dismissals and summary links. It will then proceed to manage connected apps and active sessions, testing filtering and revocation flows. Following that, authentication settings (passkeys, recovery, freezing) and data export will be examined. Finally, critical pages will be re-tested in a mobile viewport to assess the impact of identified small tap targets and table responsiveness.

## Coverage Targets

- pages: `Visit all 6 HTML pages listed in the prescan.`
- features: `Exercise filtering/sorting, simulated security/revocation actions, and form toggles across all pages.`
- mobile: `Validate navigation menu, tables, and lists on index, connected apps, and devices pages.`

## Planned Phases

### Dashboard Overview & Alerts

- Objective: Validate the primary dashboard widgets, alert interactions, and navigation entry points.
- Target pages: index.html
- Key checks:
  - Click 'Run security check' to see if it triggers an evaluation state.
  - Interact with 'Things to look at' items (e.g., click 'Review', 'Dismiss all').
  - Verify links in 'Latest sign-ins' and 'Recovery readiness' components navigate correctly.
- Exit criteria:
  - All alert actions and primary dashboard links have been clicked and their resulting states or navigations recorded.

### App & Session Management

- Objective: Explore the connected apps and active sessions lists, focusing on filtering, sorting, and revocation.
- Target pages: connected-apps.html, devices.html
- Key checks:
  - On connected-apps.html, test the search input and sort/category dropdowns.
  - Click 'Revoke' on an app and observe if a confirmation dialog appears.
  - On devices.html, interact with specific session rows and click 'End all other sessions'.
- Exit criteria:
  - Filtering/sorting controls are exercised and at least one revocation/end session flow is attempted.

### Authentication & Account Security

- Objective: Evaluate the passkey management, backup factors, and account freeze functionalities.
- Target pages: passkeys.html, freeze.html
- Key checks:
  - On passkeys.html, click '+ Add a passkey' and test 'Remove' / 'Reveal & download' actions.
  - Interact with the recovery email input and 'Send verification'.
  - On freeze.html, locate and toggle the freeze switch or perform the freeze action.
- Exit criteria:
  - Passkey addition/removal flows and account freeze interactions are documented.

### Data Export

- Objective: Walk through the data export configuration flow.
- Target pages: data-export.html
- Key checks:
  - Toggle various data category checkboxes (e.g., Account profile, Sign-in history).
  - Click 'Continue' or 'Save as draft' to progress the export flow.
- Exit criteria:
  - Data export form inputs are manipulated and submission buttons are tested.

### Mobile Viewport Validation

- Objective: Assess usability on small screens, specifically focusing on navigation and complex layouts.
- Target pages: index.html, connected-apps.html, devices.html
- Key checks:
  - Switch to mobile viewport.
  - Verify how the sidebar navigation adapts (e.g., hamburger menu).
  - Check horizontal scrolling or wrapping on the 'Latest sign-ins' table and 'Connected apps' list.
  - Re-evaluate the accessibility of the small tap targets identified in the prescan.
- Exit criteria:
  - Mobile layout adaptations are captured via screenshots and any overflow or tap target issues are logged.

## Prescan Summary

### MeadowID — your identity dashboard

- Page: `index.html`
- Headings: Overview, Things to look at, Latest sign-ins, Recovery readiness
- Interactables: `1` buttons, `15` links, `0` inputs
- Notable controls:
  - clickable:a:◐ Overview
  - clickable:a:⇄ Connected apps
  - clickable:a:▢ Active sessions
  - clickable:a:⌘ Passkeys & 2FA
  - clickable:a:↓ Export your data
  - clickable:a:❄ Freeze account
  - clickable:a:⚙ Profile
  - clickable:a:⚙ Billing

### Connected apps — MeadowID

- Page: `connected-apps.html`
- Headings: Connected apps
- Interactables: `10` buttons, `6` links, `3` inputs
- Notable controls:
  - clickable:a:◐ Overview
  - clickable:a:⇄ Connected apps
  - clickable:a:▢ Active sessions
  - clickable:a:⌘ Passkeys & 2FA
  - clickable:a:↓ Export your data
  - clickable:a:❄ Freeze account
  - typeable:input:Search apps…
  - selectable:select:All categories Productivity Developer tools Media Finance

### Export your data — MeadowID

- Page: `data-export.html`
- Headings: Export your data, What should we include?, Format and filters, How often?, Review
- Interactables: `3` buttons, `6` links, `16` inputs
- Notable controls:
  - clickable:a:◐ Overview
  - clickable:a:⇄ Connected apps
  - clickable:a:▢ Active sessions
  - clickable:a:⌘ Passkeys & 2FA
  - clickable:a:↓ Export your data
  - clickable:a:❄ Freeze account
  - clickable:input:Account profile Name, email, recovery contacts. ~4 KB
  - clickable:input:Connected apps & tokens 10 apps · ~12 KB

### Active sessions — MeadowID

- Page: `devices.html`
- Headings: Active sessions, Chrome 124 on macOS
- Interactables: `1` buttons, `6` links, `0` inputs
- Notable controls:
  - clickable:a:◐ Overview
  - clickable:a:⇄ Connected apps
  - clickable:a:▢ Active sessions
  - clickable:a:⌘ Passkeys & 2FA
  - clickable:a:↓ Export your data
  - clickable:a:❄ Freeze account
  - clickable:button:End all other sessions

### Freeze account — MeadowID

- Page: `freeze.html`
- Headings: Freeze account, What freezing does, What freezing does not do, Freeze switch, Need something more permanent?
- Interactables: `0` buttons, `7` links, `1` inputs
- Notable controls:
  - clickable:a:◐ Overview
  - clickable:a:⇄ Connected apps
  - clickable:a:▢ Active sessions
  - clickable:a:⌘ Passkeys & 2FA
  - clickable:a:↓ Export your data
  - clickable:a:❄ Freeze account
  - clickable:a:Request deletion

### Passkeys & 2FA — MeadowID

- Page: `passkeys.html`
- Headings: Passkeys & 2FA, Your passkeys, Backup factors, Recovery
- Interactables: `7` buttons, `7` links, `2` inputs
- Notable controls:
  - clickable:a:◐ Overview
  - clickable:a:⇄ Connected apps
  - clickable:a:▢ Active sessions
  - clickable:a:⌘ Passkeys & 2FA
  - clickable:a:↓ Export your data
  - clickable:a:❄ Freeze account
  - clickable:button:+ Add a passkey
  - clickable:button:Remove

