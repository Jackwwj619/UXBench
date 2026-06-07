# UXAgent Report

## Target

- Site: `civicport`
- Page type: `form/onboarding`
- Target: `file:///Users/timchef/UXBench/websites/civicport/index.html`
- Run directory: `/Users/timchef/UXBench/results-gpt-5.4/civicport/_run`

## Explored User Goal

Autonomously explore and critique the UX of the full civicport system, prioritizing the primary form/onboarding flow plus adjacent pages, states, and recovery paths.

## Exploration Summary

CivicPort gives users good high-level orientation in the permit wizard through numbered steps, autosave status, and a dynamic checklist/fee panel, but the flow repeatedly undermines trust by marking steps complete and allowing submission without required information or files. Adjacent pages are easy to scan, yet key promises are not fulfilled: tracking lacks actionable next steps, and submission ends with little confirmation. Coverage is substantial across desktop and mobile, though some conditional branches remain untested.

## Execution Plan

Begin from the home page to confirm the three primary entry points and whether the information scent matches each destination. Spend most of the run in apply.html, exercising forward progress, backtracking, conditional steps, dynamic checklist/fee updates, cancel/recovery behavior, and final review/submit states. Finish by validating the simpler adjacent pages (fees and my applications) and repeating the highest-risk navigation and form checks on a mobile viewport, with special attention to the small nav tap targets already flagged in prescan.

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

## Exploration Coverage

- Status: `substantial`
- Confidence: `medium`
- Page coverage: `100%`
- Feature coverage: `58%`
- Action success rate: `100%`
- Viewports exercised: `desktop, mobile`

Coverage gaps:
- Only directly exercised 58% of visible interactive feature signatures.

Visible but not directly exercised:
- `apply.html`: Removal of any tree >6" caliper
- `apply.html`: Work will alter stormwater runoff for >500 sq ft of surface
- `apply.html`: Kitchen
- `apply.html`: No
- `apply.html`: Other
- `apply.html`: Plumbing
- `apply.html`: Unknown
- `apply.html`: date
- `apply.html`: Signed on
- `apply.html`: number
- `apply.html`: Owner name
- `apply.html`: Avalon Bay

## Top UX Feedback

1. **[HIGH] The wizard gives misleading completion signals by letting users advance past missing required data and uploads while still marking steps as completed.** (feedback)
2. **[HIGH] The system appears to allow final submission even when required materials and attestations are incomplete, with no blocking review or readiness warning.** (goal completion)
3. **[HIGH] The 'Track an application' entry point promises more than the destination delivers.** (clarity)
4. **[MEDIUM] Many critical controls are below recommended mobile tap size, including radios, checkboxes, nav links, and action buttons.** (mobile usability)
5. **[MEDIUM] Several inputs rely on nearby text instead of proper field labels, leaving important fields unlabeled programmatically.** (accessibility)

## High Severity Findings

### The wizard gives misleading completion signals by letting users advance past missing required data and uploads while still marking steps as completed.

- UX area: `feedback`
- User goal: Understand whether their permit application is truly complete and ready to submit
- Evidence: Across multiple steps, Save and continue advanced without validation: empty Project scope and Start/end dates advanced (steps 55-60), Contractor license advanced despite incomplete information (steps 61-66), required Site plan and Floor plan steps also advanced without upload (steps 37-42 and 61-66). The left step tree then showed green checkmarks while the right 'WHAT YOU'LL NEED' checklist still showed those same items incomplete.
- Why it matters: Users may believe they have satisfied requirements when they have not, leading to incorrect submissions, rework, and loss of confidence in the portal's status cues.
- Suggested change: Make completion states honest and consistent across the step tree and checklist. Block progression on truly required items, or clearly mark skipped items as incomplete/pending review instead of complete.
- Source hint: `apply.html - step tree and right rail checklist`

### The system appears to allow final submission even when required materials and attestations are incomplete, with no blocking review or readiness warning.

- UX area: `goal completion`
- User goal: Submit an application with confidence that the portal checked readiness
- Evidence: Clicking 'Submit application' navigated directly from apply.html to my-applications.html with no visible inline validation, warning, or confirmation (steps 49-54). On mobile, the same immediate redirect occurred (steps 73-78). The destination page showed only the pre-existing application rows and no visible newly added application or success message.
- Why it matters: Submitting without clear readiness checks can cause users to think they successfully filed a valid permit when the record may be incomplete or ambiguous. The lack of confirmation also creates anxiety about whether submission actually worked.
- Suggested change: Before submission, show a review state that lists missing items and prevents submit until required content is complete. After successful submit, show a strong confirmation page/message with application ID, status, and next steps.
- Source hint: `apply.html submit flow to my-applications.html`

### The 'Track an application' entry point promises more than the destination delivers.

- UX area: `clarity`
- User goal: Track an existing application to see status, inspector notes, and next steps
- Evidence: From the homepage, the 'Track an application' card says 'See status, inspector notes, next steps,' but my-applications.html only shows a summary table with App ID, Type, Address, Submitted, and Status. Session notes confirm there were no row-level links, buttons, inspector notes, or next-step details, and the only interactable elements were top nav links.
- Why it matters: Users arriving to monitor progress are likely to feel stuck or misled because they cannot drill into an application or see the promised actionable information.
- Suggested change: Add row-level affordances on My applications such as 'View details' or clickable rows, and include inspector notes, next required action, or latest status detail directly in the list or detail view.
- Source hint: `index.html action card -> my-applications.html table`

## Medium Severity Findings

### Many critical controls are below recommended mobile tap size, including radios, checkboxes, nav links, and action buttons.

- UX area: `mobile usability`
- User goal: Complete and navigate the permit flow comfortably on a phone
- Evidence: Repeated layout warnings flagged 13x13px radios for project type, 13x13px checkboxes for expedited review and disclosures, a 56x17px Cancel control, 80x35px Look up button, and 42px-tall Back/Save buttons. Top nav links were also reported as small tap targets on multiple pages, and my-applications.html overflowed to 477px on a 390px viewport.
- Why it matters: Small targets increase input errors, slow down completion, and make critical choices harder to trust on touch devices, especially in a long, form-heavy civic workflow.
- Suggested change: Increase hit areas to at least mobile guidance, make entire option rows tappable, enlarge top-nav links, and fix horizontal overflow on My applications.
- Source hint: `apply.html mobile controls; my-applications.html mobile layout`

### Several inputs rely on nearby text instead of proper field labels, leaving important fields unlabeled programmatically.

- UX area: `accessibility`
- User goal: Understand and complete form fields accurately, including with assistive technology
- Evidence: Observations repeatedly flagged missing labels on apply.html inputs, including the Project scope textarea and numeric fields on mobile (final observation), the contractor license field (steps 19-24), date fields (steps 55-60), and earlier generic warnings that a form field had no label, aria-label, or placeholder.
- Why it matters: Unlabeled fields make the form harder to understand for screen reader users and can also create general ambiguity for sighted users when fields are revisited or errors occur.
- Suggested change: Provide explicit labels tied to each input, not just section text above the field, and ensure required/optional state is conveyed programmatically.
- Source hint: `apply.html form fields across Project scope, dates, contractor license`

### Parcel lookup works, but the success state is subtle and the error state lingers during recovery, making verification feel less trustworthy than it could.

- UX area: `trust`
- User goal: Trust automated parcel verification and understand what happened after lookup
- Evidence: Typing a parcel number alone produced no feedback until 'Look up' was clicked (steps 13-18). Successful lookup then populated fields and checked 'Parcel verified,' but there was no explicit success label or explanation of data source. In recovery testing, the prior 'Parcel not found' error remained visible after a valid parcel was entered until another action was taken (steps 31-36).
- Why it matters: Users need confidence that parcel data came from a reliable source and that the current state is valid; lingering stale errors and subtle success cues can create doubt.
- Suggested change: Show a clear success message after lookup, explain that city records were used, and clear stale error messages as soon as the user edits or retries with a valid value.
- Source hint: `apply.html parcel lookup step`

### Some key toggles change state with very limited visible feedback, especially when their downstream effects are not yet available.

- UX area: `feedback`
- User goal: Know the consequences of selecting options like expedited review or compliance disclosures
- Evidence: On mobile, expedited review could be checked before project type was selected, but the fee card still said 'Pick a project type first' and 'Total estimated $0' with no explanation of how the checked option would apply later (recent step 77). Environmental and attestation checkboxes also toggled with only the checkmark changing and no broader page-state feedback (steps 67-78).
- Why it matters: Subtle feedback makes important selections feel fragile or easy to miss, especially in a regulated form where users expect strong confirmation of legal/compliance choices.
- Suggested change: Add inline confirmation text or state summaries when important toggles are selected, and explain deferred effects when pricing cannot yet be calculated.
- Source hint: `apply.html expedited review and disclosure checkboxes`

## Low Severity Findings

### After selecting a project type, the next form step often remains generic rather than giving branch-specific guidance.

- UX area: `clarity`
- User goal: Understand what information is needed for a specific permit type
- Evidence: For Roof, the Project scope step showed generic fields with no roof-specific helper text (steps 25-30). For Bathroom on mobile, the follow-up Project scope screen again showed only generic description, exterior changes, cost, and area fields with no bathroom-tailored guidance in the main form or checklist (steps 79-79 and final observation).
- Why it matters: Users choosing a specific permit type expect tailored guidance; generic follow-up screens make the form feel less helpful and can increase uncertainty about what details matter.
- Suggested change: Add branch-specific prompts, examples, and field hints on Project scope based on the selected project type, not just in the fee card or materials list.
- Source hint: `apply.html Project scope after Roof/Bathroom selection`

## Screenshots and Evidence

- `/Users/timchef/UXBench/results-gpt-5.4/civicport/_run/screenshots/initial-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/civicport/_run/screenshots/initial-responsive-screenshots-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/civicport/_run/screenshots/initial-responsive-screenshots-mobile.png`
- `/Users/timchef/UXBench/results-gpt-5.4/civicport/_run/screenshots/initial-after-responsive-check-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/civicport/_run/screenshots/post-plan-reset-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/civicport/_run/screenshots/agentic-01-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/civicport/_run/screenshots/agentic-02-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/civicport/_run/screenshots/agentic-03-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/civicport/_run/screenshots/agentic-04-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/civicport/_run/screenshots/agentic-05-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/civicport/_run/screenshots/agentic-06-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/civicport/_run/screenshots/agentic-07-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/civicport/_run/screenshots/agentic-08-check-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/civicport/_run/screenshots/agentic-09-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/civicport/_run/screenshots/agentic-10-check-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/civicport/_run/screenshots/agentic-11-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/civicport/_run/screenshots/agentic-12-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/civicport/_run/screenshots/agentic-13-type_text-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/civicport/_run/screenshots/agentic-14-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/civicport/_run/screenshots/agentic-15-click-desktop.png`

## Suggested Fix Priorities

1. Make completion states honest and consistent across the step tree and checklist. Block progression on truly required items, or clearly mark skipped items as incomplete/pending review instead of complete.
2. Before submission, show a review state that lists missing items and prevents submit until required content is complete. After successful submit, show a strong confirmation page/message with application ID, status, and next steps.
3. Add row-level affordances on My applications such as 'View details' or clickable rows, and include inspector notes, next required action, or latest status detail directly in the list or detail view.
4. Increase hit areas to at least mobile guidance, make entire option rows tappable, enlarge top-nav links, and fix horizontal overflow on My applications.
5. Provide explicit labels tied to each input, not just section text above the field, and ensure required/optional state is conveyed programmatically.
6. Show a clear success message after lookup, explain that city records were used, and clear stale error messages as soon as the user edits or retries with a valid value.
7. Add inline confirmation text or state summaries when important toggles are selected, and explain deferred effects when pricing cannot yet be calculated.
8. Add branch-specific prompts, examples, and field hints on Project scope based on the selected project type, not just in the fee card or materials list.

## Claude Remediation

_Claude Code fix pass was not requested for this run._

## Trace Summary

- Trace entries: `79`
- Full trace: `trace.json`
- Structured report: `report.json`
