# UXAgent Exploration Plan

## Goal

Explore the full CivicPort permit portal with emphasis on the multi-step permit application flow, then validate adjacent tracking and fee-reference paths plus mobile usability of critical entry points and form progress states.

## Plan Summary

Begin from the home page to confirm the three primary entry points and whether the information scent matches each destination. Spend most of the run in apply.html, exercising forward progress, backtracking, conditional steps, dynamic checklist/fee updates, cancel/recovery behavior, and final review/submit states. Finish by validating the simpler adjacent pages (fees and my applications) and repeating the highest-risk navigation and form checks on a mobile viewport, with special attention to the small nav tap targets already flagged in prescan.

## Coverage Targets

- pages: `Visit all 4 known HTML pages, with the majority of interaction time concentrated on apply.html and at least one revisit to index.html for cross-flow checks.`
- features: `Exercise most visible controls on apply.html including Save and continue, Back, Cancel, expedited toggle, step navigation/backtracking, and representative conditional branches; also click all homepage CTAs and global nav links present on the known pages.`
- mobile: `Repeat critical homepage navigation plus a meaningful subset of the apply flow on mobile, and perform lighter readability/tap-target checks on fees.html and my-applications.html.`

## Planned Phases

### Entry points and orientation

- Objective: Validate the homepage as the portal hub, confirm each primary CTA leads to the expected destination, and assess clarity of navigation and service-alert context.
- Target pages: index.html, fees.html, my-applications.html, apply.html
- Key checks:
  - Verify the three large action cards map cleanly to Apply, Track an application, and Pay fees destinations.
  - Compare card labeling and supporting text against destination page content for expectation-setting accuracy.
  - Check top navigation consistency across pages and whether Help does anything meaningful or behaves like a dead link.
  - Review service alerts for relevance to application decisions, especially historic-district messaging that may later appear in the form flow.
- Exit criteria:
  - All homepage CTAs and global nav items have been clicked at least once and their outcomes recorded.
  - Any mismatch between homepage promises and destination page content has been noted.

### Application baseline and first-step usability

- Objective: Establish how the permit wizard starts, how obvious the first required actions are, and whether progress/save controls are understandable and safe.
- Target pages: apply.html
- Key checks:
  - Inspect initial step layout across left progress tree, center form, and right sticky assistance panel.
  - Validate field labeling, placeholders, defaults, and any missing-label issues on property address inputs.
  - Exercise Back and Save and continue from the opening step with empty, partial, and completed data where possible.
  - Observe auto-save messaging and whether progressing without required data produces clear validation or blocked state.
  - Open the Cancel flow and test whether the confirmation dialog offers clear recovery versus destructive exit.
- Exit criteria:
  - The runner has documented how a new application begins, what data appears required on step 1.1, and how Save/Back/Cancel behave.
  - At least one validation or blocked-progression scenario and one cancel-recovery scenario have been exercised.

### Deep progression through the permit wizard

- Objective: Traverse the main application path while probing dynamic step generation, state persistence, and consistency between selections, checklist, and fee estimate.
- Target pages: apply.html
- Key checks:
  - Progress through major groups listed in prescan: project info, property & ownership, plans & documents, affidavits, and review & submit.
  - Use project-type/scope choices to trigger conditional branches: neighbor step for exterior changes, historic-district step for historic parcel, elevation drawings for Addition/Structural, and energy worksheet for Roof/Electrical/HVAC.
  - Confirm completed steps become click-back-able and locked/current/completed indicators update correctly.
  - Check whether the 'What you'll need' checklist marks items complete as prerequisite selections or uploads are satisfied.
  - Toggle expedited review and verify the estimated fee card updates from its initial '$0' state once project details are selected.
  - Test parcel lookup, ownership proof, contractor/license, and file-upload steps to the extent controls are exposed in the UI.
  - Reach summary, fees, and submit sections to verify the final review reflects prior choices and conditional requirements.
- Exit criteria:
  - At least two materially different conditional application paths have been explored within the wizard.
  - The runner has reached the review/submit area or the deepest accessible end state and confirmed whether prior data persists when navigating backward.

### Adjacent task pages and cross-flow coherence

- Objective: Assess whether supporting pages are useful, understandable, and coherent with the main application flow.
- Target pages: my-applications.html, fees.html, index.html
- Key checks:
  - Review my-applications list readability, status badge clarity, and whether it supports the 'Track everything from one place' claim.
  - Check whether any application rows appear interactive or if the page is only a static summary list.
  - Review fee schedule scanability and whether fee categories align with project types encountered in apply.html.
  - Compare fee surcharges and expedited review language on fees.html with the fee-estimator copy on apply.html.
  - Use navigation between these pages and back to apply/home to confirm orientation is preserved.
- Exit criteria:
  - Both adjacent pages have been fully reviewed and any expectation gaps versus homepage/application language have been captured.
  - Cross-page terminology for statuses, fees, and project types has been compared.

### Mobile critical-path verification

- Objective: Repeat the most important checks on a mobile viewport, focusing on tapability, layout resilience, and usability of the wizard's multi-column information architecture.
- Target pages: index.html, apply.html, fees.html, my-applications.html
- Key checks:
  - Recheck top navigation and homepage cards on mobile, especially the already-flagged small tap targets.
  - Verify whether the three-column apply layout reflows sensibly and whether the step tree, form, and sticky side panel remain understandable on a narrow screen.
  - Confirm key controls on apply.html remain reachable on mobile: Save and continue, Back, Cancel, expedited toggle, and any exposed upload/selection controls.
  - Spot-check one forward progression path and one backtracking path on mobile.
  - Review table/list readability on fees.html and my-applications.html for overflow, clipping, or horizontal scrolling issues.
- Exit criteria:
  - Critical entry points and at least one substantial portion of the apply flow have been re-tested on mobile.
  - Any mobile-specific tap-target, stacking, sticky-panel, or readability problems have been captured.

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

