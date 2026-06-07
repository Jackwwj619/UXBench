# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full civicport system, prioritizing the primary form/onboarding flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

CivicPort gives users good high-level orientation in the permit wizard through numbered steps, autosave status, and a dynamic checklist/fee panel, but the flow repeatedly undermines trust by marking steps complete and allowing submission without required information or files. Adjacent pages are easy to scan, yet key promises are not fulfilled: tracking lacks actionable next steps, and submission ends with little confirmation. Coverage is substantial across desktop and mobile, though some conditional branches remain untested.

## Issues (8)

### [HIGH] the-wizard-gives-misleading-completion-signals — feedback
- **Page**: `apply.html - step tree and right rail checklist`
- **Problem**: The wizard gives misleading completion signals by letting users advance past missing required data and uploads while still marking steps as completed.
- **Evidence**: Across multiple steps, Save and continue advanced without validation: empty Project scope and Start/end dates advanced (steps 55-60), Contractor license advanced despite incomplete information (steps 61-66), required Site plan and Floor plan steps also advanced without upload (steps 37-42 and 61-66). The left step tree then showed green checkmarks while the right 'WHAT YOU'LL NEED' checklist still showed those same items incomplete.
- **Suggested fix**: Make completion states honest and consistent across the step tree and checklist. Block progression on truly required items, or clearly mark skipped items as incomplete/pending review instead of complete.

### [HIGH] the-system-appears-to-allow-final — goal completion
- **Page**: `apply.html submit flow to my-applications.html`
- **Problem**: The system appears to allow final submission even when required materials and attestations are incomplete, with no blocking review or readiness warning.
- **Evidence**: Clicking 'Submit application' navigated directly from apply.html to my-applications.html with no visible inline validation, warning, or confirmation (steps 49-54). On mobile, the same immediate redirect occurred (steps 73-78). The destination page showed only the pre-existing application rows and no visible newly added application or success message.
- **Suggested fix**: Before submission, show a review state that lists missing items and prevents submit until required content is complete. After successful submit, show a strong confirmation page/message with application ID, status, and next steps.

### [HIGH] the-track-an-application-entry-point — clarity
- **Page**: `index.html action card -> my-applications.html table`
- **Problem**: The 'Track an application' entry point promises more than the destination delivers.
- **Evidence**: From the homepage, the 'Track an application' card says 'See status, inspector notes, next steps,' but my-applications.html only shows a summary table with App ID, Type, Address, Submitted, and Status. Session notes confirm there were no row-level links, buttons, inspector notes, or next-step details, and the only interactable elements were top nav links.
- **Suggested fix**: Add row-level affordances on My applications such as 'View details' or clickable rows, and include inspector notes, next required action, or latest status detail directly in the list or detail view.

### [MEDIUM] many-critical-controls-are-below-recommended — mobile usability
- **Page**: `apply.html mobile controls; my-applications.html mobile layout`
- **Problem**: Many critical controls are below recommended mobile tap size, including radios, checkboxes, nav links, and action buttons.
- **Evidence**: Repeated layout warnings flagged 13x13px radios for project type, 13x13px checkboxes for expedited review and disclosures, a 56x17px Cancel control, 80x35px Look up button, and 42px-tall Back/Save buttons. Top nav links were also reported as small tap targets on multiple pages, and my-applications.html overflowed to 477px on a 390px viewport.
- **Suggested fix**: Increase hit areas to at least mobile guidance, make entire option rows tappable, enlarge top-nav links, and fix horizontal overflow on My applications.

### [MEDIUM] several-inputs-rely-on-nearby-text — accessibility
- **Page**: `apply.html form fields across Project scope, dates, contractor license`
- **Problem**: Several inputs rely on nearby text instead of proper field labels, leaving important fields unlabeled programmatically.
- **Evidence**: Observations repeatedly flagged missing labels on apply.html inputs, including the Project scope textarea and numeric fields on mobile (final observation), the contractor license field (steps 19-24), date fields (steps 55-60), and earlier generic warnings that a form field had no label, aria-label, or placeholder.
- **Suggested fix**: Provide explicit labels tied to each input, not just section text above the field, and ensure required/optional state is conveyed programmatically.

### [MEDIUM] parcel-lookup-works-but-the-success — trust
- **Page**: `apply.html parcel lookup step`
- **Problem**: Parcel lookup works, but the success state is subtle and the error state lingers during recovery, making verification feel less trustworthy than it could.
- **Evidence**: Typing a parcel number alone produced no feedback until 'Look up' was clicked (steps 13-18). Successful lookup then populated fields and checked 'Parcel verified,' but there was no explicit success label or explanation of data source. In recovery testing, the prior 'Parcel not found' error remained visible after a valid parcel was entered until another action was taken (steps 31-36).
- **Suggested fix**: Show a clear success message after lookup, explain that city records were used, and clear stale error messages as soon as the user edits or retries with a valid value.

### [MEDIUM] some-key-toggles-change-state-with — feedback
- **Page**: `apply.html expedited review and disclosure checkboxes`
- **Problem**: Some key toggles change state with very limited visible feedback, especially when their downstream effects are not yet available.
- **Evidence**: On mobile, expedited review could be checked before project type was selected, but the fee card still said 'Pick a project type first' and 'Total estimated $0' with no explanation of how the checked option would apply later (recent step 77). Environmental and attestation checkboxes also toggled with only the checkmark changing and no broader page-state feedback (steps 67-78).
- **Suggested fix**: Add inline confirmation text or state summaries when important toggles are selected, and explain deferred effects when pricing cannot yet be calculated.

### [LOW] after-selecting-a-project-type-the — clarity
- **Page**: `apply.html Project scope after Roof/Bathroom selection`
- **Problem**: After selecting a project type, the next form step often remains generic rather than giving branch-specific guidance.
- **Evidence**: For Roof, the Project scope step showed generic fields with no roof-specific helper text (steps 25-30). For Bathroom on mobile, the follow-up Project scope screen again showed only generic description, exterior changes, cost, and area fields with no bathroom-tailored guidance in the main form or checklist (steps 79-79 and final observation).
- **Suggested fix**: Add branch-specific prompts, examples, and field hints on Project scope based on the selected project type, not just in the fee card or materials list.
