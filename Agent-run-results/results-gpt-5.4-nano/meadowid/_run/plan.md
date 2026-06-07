# UXAgent Exploration Plan

## Goal

Exhaustively explore and critique the MeadowID identity dashboard’s primary settings/privacy flow (security/recovery) and adjacent security controls across all known pages, including key interactive states and mobile usability.

## Plan Summary

Start on index.html to validate the end-to-end “security check / recovery readiness” story and how it links into connected apps, active sessions, and passkeys. Then move through connected-apps.html, devices.html, passkeys.html, data-export.html, and freeze.html to validate core actions (search/filter/sort, revoke/end sessions, add/remove/reveal recovery factors, export flow, and freeze behavior). Repeat critical checks on mobile to confirm navigation, tap targets, and multi-step flows remain usable.

## Coverage Targets

- pages: `Visit all known HTML pages: index.html, connected-apps.html, devices.html, passkeys.html, data-export.html, freeze.html.`
- features: `Exercise most visible controls per key page: Overview CTAs/alert controls; Connected apps search/filter/sort + at least one Revoke; Active sessions session detail + End all other sessions; Passkeys add/remove/re-pair/reveal + backup factors + recovery email verification; Export wizard across steps + draft/back/continue; Freeze switch + unfreeze requirement messaging.`
- mobile: `Repeat critical checks on mobile viewport for Overview CTAs, Connected apps search/filter/sort, Active sessions end-other-sessions + session detail, and Passkeys sensitive/recovery actions.`

## Planned Phases

### Overview security & navigation integrity

- Objective: Validate the primary security/recovery narrative on index.html and confirm that key CTAs route to the correct adjacent flows with consistent state.
- Target pages: index.html
- Key checks:
  - Use sidebar links to navigate to Connected apps, Active sessions, Passkeys & 2FA, Export your data, Freeze account; confirm the correct active section styling/consistency after returning to Overview.
  - Click 'Run security check' and verify whether the 'Things to look at' alert list changes (e.g., refreshes, re-renders, or scrolls to results).
  - Interact with 'Dismiss all' and confirm whether it hides alerts and whether alerts can be restored (e.g., by running security check again).
  - Click 'Review' near the unfamiliar session and validate it routes to devices.html with the relevant session context.
  - Click 'Add passkey' near the SMS backup factor warning and validate it routes to passkeys.html.
  - Click 'Open' for 'Atlas Notes hasn't been used...' and validate it routes to connected-apps.html and highlights/filters to the relevant app category (if supported).
  - Click 'verify now' in recovery readiness and confirm whether it brings up the correct verification control on the passkeys page (or an in-page flow).
- Exit criteria:
  - All major CTAs on Overview have been clicked at least once and each lands on the correct target page/section without dead ends.
  - The alert dismissal and security check behaviors are observed and recorded (visible changes or documented lack of change).
  - Navigation consistency is confirmed: returning to Overview preserves or resets state predictably.

### Connected apps: search/filter/sort and revoke safety

- Objective: Validate the connected apps management experience: filtering/sorting/search correctness and the safety/clarity of revocation actions.
- Target pages: connected-apps.html
- Key checks:
  - Use 'Search apps…' input to search by app name (e.g., partial) and confirm results update live or on submit.
  - Change category filter ('All categories' and other visible categories) and confirm the result set updates.
  - Switch sort modes ('Recently used', 'Name A→Z', 'Date added') and validate ordering changes.
  - Verify scope chips display correctly and that sensitive scope chips (highlighted per prescan) are visually distinguishable.
  - Click 'Revoke' for at least one app card; validate confirmation dialog/text and that cancelling does not change state.
  - Confirm revocation path (if possible): after confirming, verify the card/list updates to reflect token removal or a 'revoked' state.
- Exit criteria:
  - Search + category filter + sort each produce observable, correct changes in the app list.
  - Revoke flow has been tested for both cancel and confirm, with safe confirmation behavior.

### Active sessions: session details and ending other sessions

- Objective: Validate session management: discoverability of session detail interaction and the correctness/safety of 'End all other sessions'.
- Target pages: devices.html
- Key checks:
  - Use 'End all other sessions' and validate confirmation messaging and resulting UI state (only other sessions end; current session remains).
  - Click a session row and/or pin (as suggested by text: 'Click a pin or a row to see what it can do') to reveal session capabilities/details; verify expected content appears and is dismissible.
  - Use 'See all' if present and confirm it doesn’t break navigation or duplicate content.
- Exit criteria:
  - At least one session detail interaction is tested and the relevant details panel/expansion is visible.
  - Ending other sessions produces observable UI change consistent with safety expectations.

### Passkeys & recovery: add/remove/reveal and verification

- Objective: Validate passkeys and recovery factor management, especially sensitive actions (Remove, Reveal & download) and recovery email verification.
- Target pages: passkeys.html
- Key checks:
  - Click '+ Add a passkey' and observe whether it initiates a multi-step flow, shows required steps, or at minimum gives a clear next action.
  - For each passkey card: click 'Remove' and validate confirmation; if confirmation proceeds, verify UI updates (count decreases or status changes).
  - Click 'Re-pair' (for the backup key) and validate what information is required and whether errors/guards appear.
  - Click 'Reveal & download' for 'Backup codes' and verify that it requires appropriate confirmation and that the revealed codes area is handled safely (no auto-persistent reveal without confirmation).
  - Test recovery email verification: type into the email input (e.g., current value) and click 'Send verification'; validate success/error feedback.
  - Remove/reorder backup factors where available (e.g., SMS 'Risky Remove') to ensure warnings are clear and actions are reversible/cancelable.
- Exit criteria:
  - Sensitive flows (Remove and Reveal & download) have been tested for cancel/confirm and show safe confirmation and feedback.
  - Recovery email verification shows appropriate success/error UI and remains usable after the action.

### Data export wizard: multi-step completeness and draft/continue

- Objective: Validate the end-to-end export experience: category selection, format & filters, scheduling, and the review/request steps including draft behavior.
- Target pages: data-export.html
- Key checks:
  - Step 1 (Pick categories): select/deselect multiple categories and validate estimated size updates (if shown live).
  - Step 2 (Format & filters): interact with visible filter/format controls (from prescan: multiple inputs) and confirm they change the summary.
  - Step 3 (Schedule): set scheduling options (frequency/when) if available; validate constraints and time-based messaging (if simulated).
  - Use 'Save as draft' and verify the draft state is persisted in UI (e.g., a 'draft' confirmation or ability to continue).
  - Use 'Continue' through steps to 'Review & request' and validate the final request/validation messaging (e.g., link email expiry 48 hours is mentioned).
  - Use 'Back' to ensure step navigation preserves selections.
- Exit criteria:
  - All wizard steps are reached, with selections preserved when moving Back/Continue.
  - Save as draft produces observable feedback and does not break the ability to complete the request.

### Freeze account: freeze semantics and impact on system controls

- Objective: Validate the freeze mechanism and its stated impact (blocking sign-ins, rejecting tokens, reversible unfreeze requirements).
- Target pages: freeze.html
- Key checks:
  - Find and toggle the 'Freeze switch' control (prescan shows 1 input); validate whether freeze enters an active/frozen state with clear labeling.
  - If freeze activates, validate that related controls elsewhere are disabled or show messaging (at least confirm within the freeze page that 'What freezing does' is reflected in UI).
  - Click 'Request deletion' (link present) and confirm it either routes safely or clearly indicates it’s not part of freezing.
  - Attempt to unfreeze (if flow exists) and validate that it requests the required factors (password + passkey or backup code) with clear guidance.
- Exit criteria:
  - Freeze switch produces a clearly observable state change and explains next actions to unfreeze.
  - Unfreeze path is validated for required confirmation/inputs (or an explicit stub state if this is a demo).

### Mobile regression sweep (critical paths only)

- Objective: Ensure the core security flows and navigational CTAs remain usable on mobile viewport, addressing small tap target warnings flagged in prescan.
- Target pages: index.html, connected-apps.html, devices.html, passkeys.html
- Key checks:
  - On mobile viewport, repeat clicking each primary tile/CTA from Overview: 'Run security check', 'Dismiss all', 'Review', 'Add passkey', 'Open', 'verify now'.
  - On connected-apps: use search input and apply a category/sort change; confirm no controls become inaccessible due to tap targets.
  - On devices: tap 'End all other sessions' and confirm no accidental mis-taps; test session detail expansion via row/pin.
  - On passkeys: tap '+ Add a passkey', 'Reveal & download', and recovery email 'Send verification' and verify the flows remain legible and tappable.
  - Check that left rail navigation (or its mobile variant) works without trapping users or hiding content.
- Exit criteria:
  - No critical actions become impossible to trigger on mobile.
  - Key multi-step/sensitive actions are still confirmable and provide visible feedback.

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

