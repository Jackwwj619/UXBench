# UXAgent Exploration Plan

## Goal

Explore and critique the UX of the MeadowID identity dashboard, focusing on the primary settings/privacy flow, adjacent pages, states, and recovery paths.

## Plan Summary

The exploration will start with the Overview page, then move to key functional pages (Connected Apps, Active Sessions, Passkeys, Data Export, Freeze Account) to validate interactions, states, and recovery paths. It will also check mobile viewport issues and ensure all known pages are covered.

## Coverage Targets

- pages: `Visit all 6 known HTML pages`
- features: `Exercise all visible controls (buttons, links, inputs) per key page`
- mobile: `Repeat critical checks (revoke, recovery, alerts) on mobile viewport`

## Planned Phases

### Overview Page Exploration

- Objective: Validate Overview page interactions, stats, and alert flows.
- Target pages: index.html
- Key checks:
  - Click 'Run security check' button
  - Interact with 'Review' (unfamiliar session)
  - Interact with 'Add passkey' (SMS backup alert)
  - Check 'Open' (Atlas Notes alert)
  - Verify 'See all' (Latest sign-ins)
  - Check 'Configure' (Recovery readiness)
- Exit criteria:
  - All Overview interactables exercised
  - Stats and alerts validated

### Connected Apps Page

- Objective: Validate app list, filtering, and revocation flow.
- Target pages: connected-apps.html
- Key checks:
  - Use search/filter inputs
  - Interact with 'Revoke' button (check confirmation)
  - Verify sort options
  - Check app scope chips (sensitive highlighting)
- Exit criteria:
  - All Connected Apps interactables exercised
  - Revoke flow validated

### Active Sessions (Devices) Page

- Objective: Validate session list, session ending, and unfamiliar session handling.
- Target pages: devices.html
- Key checks:
  - Click 'End all other sessions' button
  - Interact with session rows (device details)
  - Verify unfamiliar session 'review' flow
- Exit criteria:
  - All Active Sessions interactables exercised
  - Session ending flow validated

### Passkeys & 2FA Page

- Objective: Validate passkey management, backup factors, and recovery paths.
- Target pages: passkeys.html
- Key checks:
  - Click '+ Add a passkey' button
  - Interact with 'Remove' (passkey)
  - Verify 'Re-pair' (authenticator app)
  - Check 'Reveal & download' (backup codes)
  - Verify recovery email verification flow
- Exit criteria:
  - All Passkeys interactables exercised
  - Passkey and recovery flows validated

### Data Export & Freeze Account

- Objective: Validate data export options and freeze account state.
- Target pages: data-export.html, freeze.html
- Key checks:
  - Check data export categories/format options
  - Verify freeze account description and toggle
  - Check 'Request deletion' (Freeze page)
- Exit criteria:
  - All Data Export and Freeze interactables exercised
  - Export and freeze flows validated

### Mobile Viewport Validation

- Objective: Re-validate critical flows on mobile viewport (small tap targets, responsive layout).
- Target pages: index.html, connected-apps.html, devices.html, passkeys.html
- Key checks:
  - Re-exercise critical interactables (Overview alerts, Connected Apps revoke, Passkeys add)
  - Verify small tap targets on mobile
  - Check responsive layout for readability
- Exit criteria:
  - Critical flows validated on mobile
  - Small tap target usability checked

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

