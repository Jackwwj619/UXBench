# UXAgent Exploration Plan

## Goal

Evaluate the usability, clarity, and safety of the MeadowID identity dashboard, focusing on the primary security workflows (Connected Apps, Active Sessions) and critical recovery actions (Freeze, Export).

## Plan Summary

The exploration will proceed from the Overview dashboard into high-risk management pages: Connected Apps (token revocation), Active Sessions (session termination), and Passkeys/2FA. It will conclude with destructive/recovery flows like Data Export and Account Freezing to validate confirmation patterns and user guidance.

## Coverage Targets

- pages: `Visit all 6 HTML files identified in prescan.`
- features: `Exercise all 'Revoke', 'End Session', 'Add Passkey', and 'Freeze' controls.`
- mobile: `Full regression of Phases 1, 2, and 4 on mobile viewport.`

## Planned Phases

### Dashboard & Triage

- Objective: Validate the Overview page's ability to surface security issues and guide users to resolution.
- Target pages: index.html
- Key checks:
  - Verify visibility of 'Things to look at' alerts (unfamiliar session, weak factor).
  - Test 'Run security check' button behavior.
  - Check navigation links from alert cards (e.g., 'Review' -> devices.html, 'Add passkey' -> passkeys.html).
  - Inspect 'Recovery readiness' checklist for clarity.
- Exit criteria:
  - All alert links navigate correctly.
  - Security check interaction provides feedback.

### Token & Session Management

- Objective: Assess the clarity and safety of revoking app access and terminating active sessions.
- Target pages: connected-apps.html, devices.html
- Key checks:
  - Filter/Search functionality in Connected Apps.
  - Click 'Revoke' on an app: Verify confirmation modal/dialog appears before action.
  - In Active Sessions, identify the 'unfamiliar location' warning.
  - Test 'End all other sessions' button.
  - Verify visual distinction between current device and remote devices.
- Exit criteria:
  - Confirmation dialogs present for destructive actions.
  - Session list clearly distinguishes trusted vs. untrusted devices.

### Authentication & Recovery Factors

- Objective: Evaluate the management of passkeys, 2FA methods, and backup codes.
- Target pages: passkeys.html
- Key checks:
  - List existing passkeys and hardware keys.
  - Test 'Add a passkey' flow (mocked).
  - Check 'Reveal & download' for backup codes (should require re-auth or clear warning).
  - Verify SMS vs. Authenticator app risk messaging.
  - Test Recovery Email verification input field.
- Exit criteria:
  - Clear distinction between primary factors (passkeys) and backup factors (SMS/Codes).
  - Sensitive actions (revealing codes) have appropriate friction.

### Data Portability & Nuclear Options

- Objective: Validate the complexity and clarity of exporting data and freezing the account.
- Target pages: data-export.html, freeze.html
- Key checks:
  - Walk through Data Export steps: Select categories -> Format -> Schedule.
  - Verify estimated file sizes are shown for transparency.
  - On Freeze page, read 'What freezing does' vs 'does not do' copy.
  - Test the Freeze switch/toggle: Check for immediate confirmation or delay.
  - Verify 'Request deletion' link availability.
- Exit criteria:
  - Export flow feels transparent regarding what data is included.
  - Freeze action clearly communicates reversibility and impact.

### Mobile Responsiveness & Accessibility

- Objective: Repeat critical path checks on mobile viewport to address prescan tap-target warnings.
- Target pages: index.html, connected-apps.html, devices.html
- Key checks:
  - Verify sidebar navigation usability (hamburger menu or scrollable list?).
  - Check tap targets for 'Revoke' and 'End Session' buttons (prescan flagged <44px).
  - Ensure tables/lists (Sign-ins, Apps) remain readable on narrow screens.
  - Verify no horizontal scrolling breaks layout.
- Exit criteria:
  - Critical controls are tappable without zooming.
  - Navigation remains accessible.

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

