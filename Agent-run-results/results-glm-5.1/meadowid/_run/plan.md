# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the full meadowid system, prioritizing the primary settings/privacy flow plus adjacent pages, states, and recovery paths.

## Plan Summary

The exploration will systematically traverse the MeadowID dashboard, starting with the overview's security alerts and recovery prompts, then moving through connected apps, sessions, and passkeys to validate interactive controls and risk mitigations. It will then validate the multi-step data export wizard and the high-stakes account freeze flow. Finally, the entire suite of critical paths will be re-evaluated on a mobile viewport to assess responsive layout and tap target issues identified in the prescan.

## Coverage Targets

- pages: `visit all 6 known HTML pages and traverse all wizard steps`
- features: `exercise all visible buttons, dropdowns, search inputs, and inline action links; trigger all destructive action confirmations`
- mobile: `repeat critical checks and layout validations on mobile viewport, specifically auditing the flagged small tap targets`

## Planned Phases

### Dashboard Overview & Alerts

- Objective: Validate the main dashboard layout, security alert interactions, and recovery readiness prompts.
- Target pages: index.html
- Key checks:
  - Click 'Run security check' button and observe feedback.
  - Dismiss individual alerts and the 'Dismiss all' link; verify they disappear.
  - Click inline action links ('Review', 'Add passkey', 'Open') to ensure they navigate correctly to devices.html, passkeys.html, and connected-apps.html.
  - Click 'verify now' and 'Configure' links to check for modal dialogs or navigation.
  - Verify 'See all' navigates to devices.html.
- Exit criteria:
  - All alert dismissals are exercised.
  - All inline action links on the overview are clicked and verified.
  - Navigation to subpages from overview tiles is confirmed.

### App & Session Management

- Objective: Test filtering, searching, and destructive actions for connected apps and active sessions.
- Target pages: connected-apps.html, devices.html
- Key checks:
  - Use the search input and category/sort dropdowns on connected-apps.html.
  - Click 'Revoke' on an app and validate the confirmation dialog and resulting state.
  - Click 'End all other sessions' on devices.html and validate confirmation and state change.
  - Click on a specific session row/pin on devices.html to view its details.
- Exit criteria:
  - Search and filter controls function correctly on connected-apps.html.
  - Revoke confirmation flow is validated.
  - End sessions flow is validated.
  - Session detail view is accessed.

### Security & Recovery Configuration

- Objective: Validate passkey management, 2FA backup factors, and recovery settings interactions.
- Target pages: passkeys.html
- Key checks:
  - Click '+ Add a passkey' and observe the registration flow/dialog.
  - Click 'Remove' on a passkey and validate confirmation.
  - Click 'Re-pair' on the authenticator app and observe behavior.
  - Click 'Reveal & download' for backup codes and verify masking/unmasking.
  - Interact with the recovery email and trusted contact inputs and actions ('Send verification').
- Exit criteria:
  - Add/Remove passkey interactions are exercised.
  - Backup code reveal/download is verified.
  - Recovery email and contact actions are triggered.

### Data Export & Account Freeze

- Objective: Exercise the multi-step data export wizard and the high-stakes account freeze toggle.
- Target pages: data-export.html, freeze.html
- Key checks:
  - Navigate through all 4 steps of the data export wizard using 'Continue' and 'Back'.
  - Toggle checkboxes for export categories and verify estimated size updates.
  - Click 'Save as draft' during the export flow.
  - Toggle the freeze switch on freeze.html and validate warnings/state changes.
  - Click 'Request deletion' and verify it triggers a confirmation or expected behavior.
- Exit criteria:
  - Data export wizard is traversed to the final review step.
  - Draft save functionality is checked.
  - Freeze toggle is switched on and off.
  - Deletion request link is clicked.

### Mobile Viewport Validation

- Objective: Re-test critical flows and layout on a mobile viewport, focusing on tap targets and responsive navigation.
- Target pages: index.html, connected-apps.html, freeze.html
- Key checks:
  - Verify sidebar navigation collapses or adapts for mobile on index.html.
  - Attempt to tap small targets ('Dismiss all', 'Review', 'verify now') to assess usability.
  - Test the connected apps search/filter and revoke flow on mobile.
  - Test the freeze toggle on mobile to ensure it is easily operable.
- Exit criteria:
  - Mobile layout is visually verified for key pages.
  - Small tap targets are interacted with and critiqued.
  - Critical destructive actions (Revoke, Freeze) are validated on mobile.

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

