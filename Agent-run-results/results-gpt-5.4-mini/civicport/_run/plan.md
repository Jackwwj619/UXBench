# UXAgent Exploration Plan

## Goal

Exhaustively explore the CivicPort permit onboarding flow, with emphasis on application creation, conditional step progression, fees visibility, and recovery/navigation paths across the known pages.

## Plan Summary

Start from the home page and validate the three primary entry points: Apply, Track/My applications, and Fees, then spend most of the run inside the application wizard. The apply flow should be exercised through its visible steps, especially any conditional branches triggered by project type, parcel location, and document requirements, while checking the right-side materials checklist and fee panel for state changes. End by revisiting the list/fees pages to confirm cross-page navigation and by repeating critical checks in a mobile viewport, since the prescan already shows small tap targets on the header links.

## Coverage Targets

- pages: `visit all known HTML pages and return to apply.html for deeper state coverage`
- features: `exercise the home navigation, application wizard controls, conditional step logic, fee estimate toggle, cancel/recovery dialog, and applications list status display`
- mobile: `repeat the home navigation and at least one meaningful apply-flow progression in mobile viewport, with explicit attention to the small tap targets already flagged`

## Planned Phases

### Home page entry and navigation sanity

- Objective: Validate the portal landing page, primary navigation, and entry points into the three major flows.
- Target pages: index.html
- Key checks:
  - Click the main Apply card and top Apply link to confirm both route to the application flow.
  - Click the My applications entry point and verify it reaches the applications list page.
  - Click the Fees entry point and verify it reaches the fee schedule page.
  - Check the Help control for behavior, even if it is a placeholder link, to see whether it opens anything or remains inert.
  - Note whether the service alerts content is stable and readable, since it provides contextual cues for the portal.
- Exit criteria:
  - All three primary destinations have been reached from the home page.
  - Any non-functional or placeholder behavior on Help has been confirmed.
  - No unexpected console or network errors occur during navigation.

### Application wizard core progression

- Objective: Exercise the main onboarding flow from the initial project information step through early state transitions and persistence cues.
- Target pages: apply.html
- Key checks:
  - Inspect the initial step layout: left step tree, center form, right materials checklist, and estimated fee panel.
  - Fill the visible property address fields and verify the form accepts input without breaking layout or labels.
  - Test Back and Save and continue controls for responsiveness and state retention.
  - Observe whether the application ID and auto-saved indicator remain stable as edits occur.
  - Verify that the 'What you'll need' checklist updates when required fields are completed or selections change.
  - Check that the estimated fee panel starts at $0 and reacts once a project type is selected.
- Exit criteria:
  - At least the initial property-address step has been completed or advanced past.
  - The auto-save/persistence behavior has been observed at least once.
  - The dynamic right-rail checklist or fee panel has shown a state change.

### Conditional branches and document requirements

- Objective: Force the wizard into its higher-risk branches and validate step gating, visibility, and requirement updates.
- Target pages: apply.html
- Key checks:
  - Select a project type that should trigger one of the documented conditional document requirements, such as Addition/Structural or Roof/Electrical/HVAC.
  - Confirm whether elevation drawings or energy worksheet requirements appear when the relevant project type is chosen.
  - If reachable from visible fields, test a condition that would imply exterior changes and see whether the neighbor signature/materials step appears.
  - If parcel/historic status can be set from visible inputs or lookup results, confirm the historic-district step or surcharge messaging appears.
  - Check that locked steps stay locked until prerequisites are satisfied and that completed steps remain click-back-able.
  - Validate the parcel lookup/ownership/contractor/document sections for required-state indicators or blocking behavior.
- Exit criteria:
  - At least one conditional branch has been triggered and its related requirement surfaced.
  - Step gating or lock/unlock behavior has been verified.
  - The sidebar checklist reflects the selected project context.

### Review, fees, and cancellation recovery

- Objective: Test the end-of-flow summary controls, fee implications, and recovery paths such as cancel or backtracking.
- Target pages: apply.html, fees.html
- Key checks:
  - Advance to later wizard sections if possible, including review and submit or the closest reachable summary state.
  - Verify that fee estimates stay consistent with the selected project type and any expedited toggle.
  - Open the cancel confirmation dialog and confirm that recovery/cancel affordances are understandable and safe.
  - Cross-check the advertised fee breakdown against the standalone fee schedule page for consistency.
  - If submit is reachable, inspect its final confirmation affordance without assuming actual transaction completion.
- Exit criteria:
  - The end-state controls or a late-stage summary have been examined.
  - Cancel/recovery behavior has been confirmed.
  - Fee-related language matches between the wizard and the fees page at a high level.

### Applications list and status browsing

- Objective: Validate the account/history page as the adjacent flow for tracking prior permits and status review.
- Target pages: my-applications.html
- Key checks:
  - Review all visible application rows and status badges for clarity and hierarchy.
  - Check whether application IDs, types, addresses, and statuses are legible and scan-friendly.
  - Look for row clicks or links that open details, follow-up notes, or related actions if any are present.
  - Confirm that the page supports the primary 'track' use case implied by the home page messaging.
- Exit criteria:
  - All listed applications have been inspected.
  - Any row-level interaction available has been tested.
  - The tracking/status use case is understandable from the page content.

### Mobile viewport regression pass

- Objective: Repeat the most important navigation and form interactions in mobile viewport, focusing on tap targets and responsive usability.
- Target pages: index.html, apply.html, fees.html, my-applications.html
- Key checks:
  - Recheck the top navigation on the home page for tap target usability and spacing.
  - Repeat the first application step interaction on a narrow viewport to ensure inputs and step navigation remain usable.
  - Verify that the fee panel, sidebar checklist, and any sticky elements do not obscure form content on mobile.
  - Revisit the fees and applications pages to confirm content remains readable and that links/buttons are still practical to tap.
  - Confirm whether the previously observed small tap target issue is still present in mobile mode.
- Exit criteria:
  - Critical flows have been exercised at least once in mobile viewport.
  - Mobile-specific tap target or layout issues have been confirmed or ruled out.
  - No additional mobile-only breakage blocks the primary tasks.

## Prescan Summary

### CivicPort — City of Avalon Bay

- Page: `index.html`
- Headings: Welcome to CivicPort., Apply for a permit, Track an application, Pay fees, Service alerts
- Interactables: `0` buttons, `7` links, `0` inputs
- Notable controls:
  - clickable:a:Apply
  - clickable:a:My applications
  - clickable:a:Fees
  - clickable:a:Help
  - clickable:a:Apply for a permit Residential, electrical, plumbing, roof. ~25 min.
  - clickable:a:Track an application See status, inspector notes, next steps.
  - clickable:a:Pay fees Open invoices, history, refunds.

### Apply for a permit — CivicPort

- Page: `apply.html`
- Headings: APPLICATION, 1.1 Property address, WHAT YOU'LL NEED, ESTIMATED FEES, Cancel this application?
- Interactables: `5` buttons, `0` links, `4` inputs
- Notable controls:
  - clickable:button:Cancel
  - typeable:input:unlabeled control
  - typeable:input:Avalon Bay
  - typeable:input:Zip
  - clickable:button:Back
  - clickable:button:Save and continue
  - clickable:input:Expedited review (+50%, decision in 3 days)

### Fees — CivicPort

- Page: `fees.html`
- Headings: Permit fee schedule
- Interactables: `0` buttons, `3` links, `0` inputs
- Notable controls:
  - clickable:a:Apply
  - clickable:a:My applications
  - clickable:a:Fees

### My applications — CivicPort

- Page: `my-applications.html`
- Headings: My applications
- Interactables: `0` buttons, `3` links, `0` inputs
- Notable controls:
  - clickable:a:Apply
  - clickable:a:My applications
  - clickable:a:Fees

