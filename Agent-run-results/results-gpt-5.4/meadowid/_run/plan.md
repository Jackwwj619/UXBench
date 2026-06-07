# UXAgent Exploration Plan

## Goal

Exhaustively explore MeadowID’s identity dashboard with emphasis on the settings/privacy journey: triage security issues from the overview, inspect active sessions and connected apps, validate passkey/recovery setup, and review sensitive actions like data export and account freeze.

## Plan Summary

Start from the overview and use its issue-driven shortcuts to follow the product’s most likely user flow into sessions, passkeys, and connected apps. Then cover the two highest-risk settings surfaces directly: data export and account freeze, exercising visible controls and checking whether destructive or security-sensitive actions are explained and gated clearly. Finish with a mobile pass across the critical privacy/security pages because the prescan already showed multiple small tap targets and some compact controls likely to be harder on mobile.

## Coverage Targets

- pages: `Visit all 6 known HTML pages, with repeat visits to index.html, devices.html, passkeys.html, connected-apps.html, data-export.html, and freeze.html as needed to compare cross-page consistency.`
- features: `Exercise nearly all visible controls on the main privacy/security pages: overview shortcuts and primary CTA, session inspection and global sign-out, passkey/factor management, connected-app search/filter/sort/revoke, export wizard progression, and freeze control state.`
- mobile: `Repeat critical checks on mobile viewport for every known page, prioritizing controls already flagged as undersized and the most security-sensitive actions.`

## Planned Phases

### Overview triage and entry points

- Objective: Validate the dashboard as the control center for identity/privacy management and use its issue list as the primary path into deeper pages.
- Target pages: index.html
- Key checks:
  - Confirm sidebar navigation reaches all known settings/privacy pages from overview
  - Exercise Run security check and observe whether it changes trust score, issue list, status text, or gives feedback
  - Use issue shortcuts: Review -> devices.html, Add passkey -> passkeys.html, Open -> connected-apps.html
  - Check whether Dismiss all changes the Things to look at list and whether the action is reversible or clearly scoped
  - Inspect overview-only summary areas for coherence: stat tiles, latest sign-ins, and recovery readiness
  - Probe placeholder links Configure and verify now for visible response, dead-end behavior, or missing affordance
- Exit criteria:
  - All overview shortcuts have been followed at least once
  - Observed whether primary CTA and placeholder links provide state change, navigation, or no feedback
  - Captured any inconsistencies between overview summaries and destination pages

### Session security review

- Objective: Validate how MeadowID helps users inspect suspicious sign-ins and manage active sessions safely.
- Target pages: devices.html
- Key checks:
  - Open Active sessions from sidebar and via overview shortcuts to compare entry context
  - Click rows or pins if available to verify session-detail switching, especially the unfamiliar Reykjavík session
  - Check whether the selected session detail panel updates for different devices/apps/locations
  - Exercise End all other sessions and verify presence of confirmation, exception handling for current device, and post-action messaging
  - Assess whether 'This device' and unfamiliar session labels are easy to distinguish and actionably explained
- Exit criteria:
  - At least one familiar and the unfamiliar session have been inspected in detail
  - End all other sessions control has been tested through its visible gating/confirmation path
  - Known session counts and warning cues have been compared against overview indicators

### Authentication and recovery controls

- Objective: Inspect passkeys, backup factors, and recovery setup for clarity, risk communication, and completeness.
- Target pages: passkeys.html
- Key checks:
  - Use + Add a passkey and note whether it launches a flow, modal, inline state, or placeholder behavior
  - Test Remove actions on an active passkey and on risky SMS backup factor; verify warning and confirmation quality
  - Use Re-pair on authenticator app and check whether the user gets clear next-step guidance
  - Exercise Reveal & download backup codes and observe exposure controls, warnings, and any persistence of revealed secrets
  - Edit recovery email and trusted contact inputs, then use Send verification if applicable to understand save/submit mechanics
  - Compare the recovery status shown here to overview recovery-readiness messaging
- Exit criteria:
  - All visible security factor action types have been exercised at least once: add, remove, re-pair, reveal/download, send verification
  - Observed whether editable recovery fields have explicit save behavior or implicit state handling
  - Documented any mismatch between factor risk labels and available safer alternatives

### Connected apps and token governance

- Objective: Validate discovery, filtering, and revocation of third-party access.
- Target pages: connected-apps.html
- Key checks:
  - Use the Search apps input with matching and non-matching terms to verify filtering behavior
  - Try category filter options and each sort mode to ensure list order and result counts change coherently
  - Inspect app cards with sensitive scope chips and stale activity messaging for readability and prioritization
  - Initiate Revoke on at least one recently used app and one older/stale app to validate confirmation language and post-action state
  - Check whether search/filter/sort controls remain understandable without explicit labels, since prescan flagged missing labels
- Exit criteria:
  - Search, category filter, and sort have each been exercised and produced observable list changes or lack thereof
  - At least one revoke path has been tested through confirmation/state change
  - Captured whether stale or high-scope apps are surfaced clearly enough for decision-making

### Sensitive export and freeze flows

- Objective: Deeply validate the two most consequential privacy actions: requesting a data archive and freezing the account.
- Target pages: data-export.html, freeze.html
- Key checks:
  - On data-export.html, step through the wizard using Back, Continue, and Save as draft to see whether progression and review states work
  - Toggle a representative mix of export categories, especially security audit log and app-held data, and verify size estimates/help text remain clear
  - Inspect format/filter/schedule options that appear in later export steps and confirm review accuracy before request
  - On freeze.html, identify and operate the freeze switch/input, checking whether prerequisites and consequences are visible before activation
  - Validate whether freeze distinguishes reversible freeze from deletion and whether Request deletion is a separate, clearly secondary path
  - Look for confirmations, warning language, and any recovery requirements tied to unfreezing
- Exit criteria:
  - Export flow has been advanced beyond the first step and exercised in both forward and backward directions
  - Observed the freeze control's state behavior and any warning/confirmation affordances
  - Documented whether both flows communicate irreversible vs reversible consequences clearly

### Mobile-critical regression pass

- Objective: Repeat the most important privacy/security interactions on mobile where the prescan already indicates tap-target risk.
- Target pages: index.html, devices.html, passkeys.html, connected-apps.html, data-export.html, freeze.html
- Key checks:
  - Recheck sidebar/navigation access and whether nav collapses or remains usable on mobile
  - Attempt key issue-entry actions from overview: Review, Add passkey, Open, Run security check, and Dismiss all
  - On connected-apps, test search/filter/sort and Revoke with attention to cramped controls and label discoverability
  - On passkeys, test Add a passkey, Remove, Reveal & download, and recovery field editing for touch usability
  - On data-export, verify checkbox selection and wizard buttons remain easy to use without accidental taps
  - On freeze, verify the freeze switch and explanatory sections are readable without hidden consequences below the fold
- Exit criteria:
  - Critical flows have been replayed on mobile for all six known pages
  - Tap-target and layout issues have been confirmed or cleared for the highest-risk controls
  - Any desktop/mobile behavior differences affecting security decisions have been captured

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

