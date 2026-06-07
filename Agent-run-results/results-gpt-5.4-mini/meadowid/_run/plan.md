# UXAgent Exploration Plan

## Goal

Exhaustively validate MeadowID’s primary identity-security settings flow and adjacent recovery paths across all known pages, with emphasis on risk actions, confirmation states, and mobile usability.

## Plan Summary

Start from the overview dashboard, then follow the strongest security-related prompts into sessions, passkeys, connected apps, export, and freeze flows. Treat the dashboard alerts and recovery readiness widgets as navigation cues to deeper pages, and validate that destructive or high-impact actions require appropriate confirmation. Repeat the critical paths in a mobile viewport to check whether the many small tap targets and compact sidebar links remain usable.

## Coverage Targets

- pages: `visit all known HTML pages: index, connected-apps, devices, passkeys, data-export, freeze`
- features: `exercise most visible controls on each page, including at least one control per major action group and one destructive/high-risk action where available`
- mobile: `repeat critical checks on mobile viewport, prioritizing sidebar navigation, dashboard CTAs, revoke/end-session/freeze actions, and any controls flagged with small tap target warnings`

## Planned Phases

### Dashboard triage and navigation map

- Objective: Validate the overview page as the control center and use its alerts/cards to reach the adjacent security pages.
- Target pages: index.html
- Key checks:
  - Inspect the four summary tiles and confirm the dashboard conveys a coherent security posture (connected apps, sessions, passkeys, trust score, recovery email state).
  - Exercise the primary action 'Run security check' and observe whether it changes state, opens a result, or remains a no-op in the demo.
  - Follow each prominent dashboard CTA at least once: Review, Add passkey, Open, See all, Configure, verify now, and Dismiss all if it is active.
  - Confirm the sidebar navigation routes cleanly to every known page.
- Exit criteria:
  - All dashboard CTAs have been tested or determined to be inert/placeholders.
  - The run has a confirmed route to each of the five adjacent security pages.

### Active sessions review

- Objective: Validate the session-management page, its current-session indicator, and the remediation action for unfamiliar devices.
- Target pages: devices.html
- Key checks:
  - Open the Active sessions page and inspect the list structure, labels, and the selected current device state.
  - Test the 'End all other sessions' control and verify whether a confirmation or state change occurs.
  - Inspect the unfamiliar Reykjavík session and any row/pin affordances to ensure the warning is actionable and understandable.
  - Check whether clicking rows reveals detail such as factor, app, start time, or location.
- Exit criteria:
  - The current-session state and at least one unfamiliar-session remediation path have been validated.
  - Any destructive action has been confirmed to require the appropriate safeguard or is noted as missing.

### Connected apps token management

- Objective: Validate search, category/sort controls, app cards, and token revocation behavior for connected integrations.
- Target pages: connected-apps.html
- Key checks:
  - Exercise the search field with at least one query and confirm results/filtering behavior.
  - Change category and sort controls to verify the list updates and the labels remain understandable.
  - Open several app cards and inspect scope chips, especially sensitive scopes and any highlighted permissions.
  - Use a Revoke action on at least one app and verify confirmation, cancellation, and post-action state if available.
- Exit criteria:
  - Search, filter, sort, and revoke flows have each been exercised at least once.
  - At least one sensitive-scope app card has been inspected in detail.

### Passkeys, backup factors, and recovery setup

- Objective: Validate authentication-strengthening and account-recovery management, including removal and reveal actions.
- Target pages: passkeys.html
- Key checks:
  - Inspect the list of active passkeys and confirm the active/inactive semantics are clear.
  - Test 'Add a passkey' and observe the expected setup entry point or placeholder behavior.
  - Exercise 'Remove' on at least one passkey and verify any warning, confirmation, or irreversible language.
  - Test 'Re-pair' for the TOTP backup factor and 'Reveal & download' for backup codes.
  - Validate recovery email interaction via the visible input and 'Send verification' control, plus the trusted contact field if editable.
- Exit criteria:
  - At least one passkey action, one backup-factor action, and one recovery-action path have been checked.
  - The risk of being locked out by removing factors is clearly represented or flagged if not.

### Export data wizard and consent boundaries

- Objective: Validate the export flow as a multi-step process with category selection, format/filter options, scheduling, and review.
- Target pages: data-export.html
- Key checks:
  - Walk through the multi-step wizard headings in order and confirm the current step is clear.
  - Toggle a representative subset of export categories, including high-volume and sensitive categories such as sign-in history, security audit log, and billing/receipts.
  - Inspect the format/filter and schedule controls for clarity and default safety.
  - Test Back, Save as draft, and Continue to confirm progression and recovery from mistakes.
- Exit criteria:
  - The wizard’s step structure and at least one end-to-end progression path are covered.
  - Sensitive category selection and export size implications have been observed.

### Freeze and account-level escalation

- Objective: Validate the strongest account control, its explanatory copy, and adjacent irreversible actions.
- Target pages: freeze.html
- Key checks:
  - Review the freeze explanation for clarity around what is paused, blocked, or preserved.
  - Inspect the freeze switch behavior and any confirm/cancel pattern if present.
  - Follow the adjacent 'Request deletion' link or entry point and note whether it is clearly distinguished from freeze.
  - Check that the user is warned about unfreezing requirements and third-party side effects.
- Exit criteria:
  - The freeze flow has been inspected for user clarity and safety.
  - Any irreversible or high-risk adjacent path has been identified and separated from reversible freeze state.

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

