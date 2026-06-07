# UXAgent Report

## Target

- Site: `solstice-bank`
- Page type: `form/onboarding`
- Target: `file:///Users/timchef/UXBench/websites/solstice-bank/index.html`
- Run directory: `/Users/timchef/UXBench/results-gpt-5.4/solstice-bank/_run`

## Explored User Goal

Autonomously explore and critique the UX of the full solstice-bank system, prioritizing the primary form/onboarding flow plus adjacent pages, states, and recovery paths.

## Exploration Summary

The Solstice Bank flow has a strong overall structure: the landing-to-apply handoff works, the 8-step progress framing is visible, autosave gives reassurance, and save-later messaging is understandable. The biggest UX problem is form recovery feedback: across multiple steps, corrected fields continue to display errors until a later submit, which makes the form feel broken or untrustworthy. Mobile usability also needs attention because many core controls and recovery links are below recommended touch size, and some interruption/navigation moments return users home without warning about in-progress state.

## Execution Plan

Begin on the marketing landing page to validate the handoff into application start, then spend most of the run inside apply.html exercising each visible step, navigation rule, and recovery path. Prioritize states explicitly indicated in the prescan: validation errors, save-later, cancel confirmation, help drawer behavior, step-progress navigation, ID verification modal, funding options, and review-step edits. Finish by confirming successful submission to confirmation.html and repeat the highest-risk path on mobile, especially areas already flagged for small tap targets.

### Landing page and entry validation

- Objective: Confirm the marketing page communicates prerequisites clearly and provides a reliable entry into the application flow on desktop before deep form testing.
- Target pages: index.html
- Key checks:
  - Verify both primary entry CTAs ('Open an account' and 'Start application') navigate to apply.html
  - Check whether header links with '#' behave inertly, scroll, or create confusing dead interactions
  - Review above-the-fold clarity of value proposition, required materials checklist, and timing expectations before form start
  - Note mobile-relevant risks already flagged by prescan for small nav/CTA tap targets
- Exit criteria:
  - At least one CTA successfully enters apply.html
  - Header interaction behavior is understood and documented
  - Initial desktop UX issues and mobile tap-target concerns on landing are captured

### Early-step gating and validation behavior

- Objective: Test the start of the onboarding flow for required-consent gating, validation messaging, and baseline usability of the first half of the form.
- Target pages: apply.html
- Key checks:
  - Attempt Continue on step 1 with incomplete eligibility/consent selections to trigger and inspect the error summary and field-level cues
  - Complete step 1 and validate progress indicator updates appropriately
  - Exercise step 2 personal information inputs, including DOB and masked SSN behavior
  - Exercise step 3 contact/address fields with a mix of empty and completed states to verify validation and recovery
  - Exercise step 4 employment/income selections, including freelance/self-employed-relevant paths where visible
  - Check that Auto-saved messaging is credible by moving between steps and confirming entered data persists
- Exit criteria:
  - Steps 1 through 4 have been completed at least once
  - Validation behavior has been observed on at least two distinct steps
  - Data persistence across back/forward movement is confirmed or failure is documented

### Identity, risk, and contextual assistance

- Objective: Probe the highest-complexity interactive states in the middle of the application, especially modal flows, warnings, and assistance.
- Target pages: apply.html
- Key checks:
  - Open and complete or dismiss the ID verification front/back upload mock states
  - Launch the liveness check modal and observe the 3-2-1 countdown sequence, close behavior, and return-to-form state
  - Complete the risk questionnaire and intentionally create a mismatch scenario to surface the soft warning tied to income
  - Open the floating Help drawer on multiple steps and confirm the copy changes contextually without blocking form completion
  - Check keyboard/focus or interaction continuity after closing dialogs if practical within the run
- Exit criteria:
  - ID verification and liveness modal behavior has been directly observed
  - At least one soft warning state in the risk step has been triggered or ruled out
  - Help drawer behavior has been sampled on multiple different steps

### Funding, review, and recovery paths

- Objective: Validate decision-heavy late-flow behavior, especially choice switching, review/edit loops, and explicit interruption controls.
- Target pages: apply.html
- Key checks:
  - Exercise each visible funding choice: external bank mock OAuth, mailed check, and fund later
  - If bank linking exposes the four fictional banks, verify selection feedback and ability to switch or back out
  - Reach the review step and use Edit links to jump back into earlier sections, then return to review with prior data intact
  - Test Save & continue later and record resulting feedback/state even if it is mock-only
  - Test Cancel application and the second-confirmation safeguard, including backing out of cancellation
- Exit criteria:
  - All visible funding options have been visited
  - Review/Edit loop has been exercised for at least two earlier sections
  - Both save-later and cancel-confirmation interruption paths have been observed

### Submission, confirmation, and mobile regression pass

- Objective: Complete the application to success, then rerun the most critical path on mobile to catch responsive and tap-target issues.
- Target pages: apply.html, confirmation.html, index.html
- Key checks:
  - Submit from review and verify navigation to confirmation.html
  - Confirm presence and formatting of the generated application reference and clarity of next-step messaging
  - Use 'Back to home' to verify return path to index.html
  - On mobile viewport, repeat landing-to-apply entry, first-step consent interactions, help drawer access, progress navigation, one modal interaction, and final CTA/tap-target usability
  - Pay special attention on mobile to the already flagged small header/link targets and any overlap from the floating Help control
- Exit criteria:
  - End-to-end submission reaches confirmation.html
  - Confirmation content and return-home path are validated
  - A focused mobile pass covers landing, start of form, one complex modal, and one late-stage action

## Exploration Coverage

- Status: `substantial`
- Confidence: `medium`
- Page coverage: `100%`
- Feature coverage: `41%`
- Action success rate: `100%`
- Viewports exercised: `desktop, mobile`

Coverage gaps:
- Only directly exercised 41% of visible interactive feature signatures.

Visible but not directly exercised:
- `apply.html`: Citizenship is required
- `apply.html`: City is required
- `apply.html`: Date of birth is required
- `apply.html`: Email is required
- `apply.html`: Employment status is required
- `apply.html`: Estimated annual income (USD) is required
- `apply.html`: First name is required
- `apply.html`: Industry is required
- `apply.html`: Last name is required
- `apply.html`: Phone is required
- `apply.html`: Select one
- `apply.html`: Social Security Number is required

## Top UX Feedback

1. **[HIGH] Validation feedback stays visible after users fix fields, so the form keeps looking invalid even when entries have been completed.** (error recovery)
2. **[HIGH] Many primary and recovery controls are undersized for touch on mobile, including required checkboxes, radios, navigation buttons, save-later, and error-summary links.** (mobile usability)
3. **[MEDIUM] The eligibility validation copy is too generic: all error messages read 'This must be checked,' which forces users to scan the page to figure out which consent item each error refers to.** (clarity)
4. **[MEDIUM] The Verify ID step gives mixed signals by showing a completed '✓ Verified' liveness state while still blocking progress for missing document upload, and the liveness completion appears abrupt.** (feedback)
5. **[MEDIUM] Anchor-based recovery works, but the experience is weak on mobile because the error link itself is tiny and the jump can leave users without the summary context that explained the issue.** (error recovery)

## High Severity Findings

### Validation feedback stays visible after users fix fields, so the form keeps looking invalid even when entries have been completed.

- UX area: `error recovery`
- User goal: Correct missing fields and feel confident the application is ready to continue.
- Evidence: This happened repeatedly across the flow: after checking eligibility boxes, inline errors and the top summary still said 'This must be checked'; after entering About you fields, errors like 'First name is required' and 'Last name is required' remained visible; after selecting Citizenship, Contact fields, residence type, and Employment selections, their corresponding errors still persisted until a later Continue action advanced the step.
- Why it matters: Users rely on immediate feedback to know whether they successfully fixed a problem. Persistent stale errors can make a financial onboarding flow feel buggy, increase hesitation around submitting sensitive information, and cause extra rescanning of the page before retrying.
- Suggested change: Clear field-level errors as soon as the field becomes valid, and update the summary in sync. If validation is intentionally deferred until submit, visually distinguish 'resolved' vs 'unresolved' states so users can see progress while correcting the form.
- Source hint: `apply.html form validation across steps 1-4`

### Many primary and recovery controls are undersized for touch on mobile, including required checkboxes, radios, navigation buttons, save-later, and error-summary links.

- UX area: `mobile usability`
- User goal: Complete or recover from the application comfortably on a phone.
- Evidence: Observed mobile/size warnings include eligibility checkboxes at 18x18px, residence radios at 13x13px, 'Save & continue later' at 154x18px, 'Continue' at 97x37px, 'Back' at 71x39px, 'Start liveness check' at 175x39px, and the 'Front of ID is required' error link at 143x17px. These warnings appeared repeatedly in both recent and earlier mobile observations.
- Why it matters: This is an 8-step onboarding flow with lots of required actions, so small targets directly increase mistaps, slow completion, and make recovery harder when users are already dealing with errors or sensitive identity tasks.
- Suggested change: Increase tappable areas to at least 44px high/wide for all primary actions, consent controls, radio options, and error links. Expand the hit area to the whole label row for checkboxes/radios rather than only the tiny control.
- Source hint: `apply.html mobile controls; final observation target sizes`

## Medium Severity Findings

### The eligibility validation copy is too generic: all error messages read 'This must be checked,' which forces users to scan the page to figure out which consent item each error refers to.

- UX area: `clarity`
- User goal: Understand exactly what needs to be fixed on the eligibility step.
- Evidence: When Continue was clicked with no boxes checked, the top summary listed four identical 'This must be checked' links, and inline messages beside all four checkboxes used the same wording. Session notes explicitly call the summary copy generic and repetitive.
- Why it matters: Repeated generic errors create avoidable cognitive load, especially in a trust-sensitive banking flow where each consent item has different legal meaning.
- Suggested change: Use field-specific error text in both places, such as 'Confirm you are a US resident' or 'Agree to the Deposit Account Agreement and Terms of Service,' so the summary itself identifies the missing action.
- Source hint: `apply.html step 1 eligibility error summary`

### The Verify ID step gives mixed signals by showing a completed '✓ Verified' liveness state while still blocking progress for missing document upload, and the liveness completion appears abrupt.

- UX area: `feedback`
- User goal: Finish identity verification and understand what remains before continuing.
- Evidence: After the liveness countdown modal, the page showed '✓ Verified' next to 'Start liveness check.' Clicking Continue then stayed on step 5 and showed 'Please fix the following: Front of ID is required.' Notes also mention the modal disappeared without an in-view transition message or success toast, and the 'Start liveness check' button remained visible even after verification.
- Why it matters: Users may reasonably assume 'Verified' means the whole identity step is complete. Mixed completion/blocking cues are especially risky in regulated onboarding because people may not know what evidence the bank still needs.
- Suggested change: Separate liveness from document-upload status more explicitly, show a step checklist or status chips for each requirement, and replace or relabel the liveness CTA after success (for example, 'Retake selfie' only if repeat is allowed).
- Source hint: `apply.html step 5 Identity verification`

### Anchor-based recovery works, but the experience is weak on mobile because the error link itself is tiny and the jump can leave users without the summary context that explained the issue.

- UX area: `error recovery`
- User goal: Use the error summary on mobile to jump back to the problem field and fix it quickly.
- Evidence: Tapping 'Front of ID is required' changed the URL to #err-anchor-0 and moved the missing field into view, but the summary link target was only 143x17px and later observations note the summary/link ended up offscreen after the jump (e.g. y = -223 / partially offscreen), leaving the user mid-step with no added focus treatment.
- Why it matters: Recovery links are most important when users are already blocked. If they are hard to tap and remove context after jumping, users have to re-orient instead of simply fixing the problem.
- Suggested change: Make summary items full-width tap targets, preserve a little summary context after scrolling, and add a stronger destination cue such as focused styling or a brief highlight around the errored field.
- Source hint: `apply.html mobile error summary to Front of ID anchor`

### The brand link acts as an immediate home escape hatch from mid-application, but there is no warning or explicit reassurance on the landing page about whether progress was preserved.

- UX area: `trust`
- User goal: Leave the application temporarily without worrying about losing progress.
- Evidence: On mobile, tapping 'Solstice' from apply.html navigated directly to index.html. The landing page then showed only fresh-entry CTAs like 'Open an account' / 'Start application.' Progress was in fact recoverable after re-entering, but that reassurance was not communicated at the moment users left the form.
- Why it matters: In banking onboarding, unexpected exits can feel risky. Even if state is technically preserved, users may not trust that and may hesitate to leave or may think they have lost work.
- Suggested change: Either warn before leaving an in-progress application or show a clear saved-state message on the landing page, such as 'Resume your application,' so interruption recovery feels intentional and trustworthy.
- Source hint: `apply.html header brand link to index.html on mobile`

## Low Severity Findings

### The mobile landing page has horizontal overflow, which can make the page feel less polished before users even begin onboarding.

- UX area: `mobile usability`
- User goal: Browse the landing page comfortably on mobile and start the application confidently.
- Evidence: Session memory and recent reflection note that index.html width was 428px against a 390px viewport on mobile. The landing page observation also reported layout warnings after returning home.
- Why it matters: Early layout instability can reduce confidence in a financial product and make important content like value props or the CTA feel less controlled on smaller screens.
- Suggested change: Remove horizontal overflow on the landing page so the hero/cards and supporting content fit cleanly within the mobile viewport.
- Source hint: `index.html mobile viewport`

### The confirmation page suggests app-download next steps, but those store references do not appear to be actual interactive links in the observed UI.

- UX area: `affordance`
- User goal: Understand what actions are available after submitting the application.
- Evidence: The confirmation page clearly showed next-step copy including checking email and downloading the mobile app, but observations report that only 'Back to home' was detected as an actual link/button while 'App Store' and 'Google Play' appeared as visible text rather than interactable targets.
- Why it matters: If users are told to take a next step but cannot act on it directly, the page feels less helpful at the moment they are most ready to continue.
- Suggested change: Make any referenced app-store actions clearly clickable buttons or links, or remove the affordance styling/text that implies interactivity if downloads are not available.
- Source hint: `confirmation.html post-submission next steps`

## Screenshots and Evidence

- `/Users/timchef/UXBench/results-gpt-5.4/solstice-bank/_run/screenshots/initial-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/solstice-bank/_run/screenshots/initial-responsive-screenshots-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/solstice-bank/_run/screenshots/initial-responsive-screenshots-mobile.png`
- `/Users/timchef/UXBench/results-gpt-5.4/solstice-bank/_run/screenshots/initial-after-responsive-check-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/solstice-bank/_run/screenshots/post-plan-reset-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/solstice-bank/_run/screenshots/agentic-01-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/solstice-bank/_run/screenshots/agentic-02-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/solstice-bank/_run/screenshots/agentic-03-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/solstice-bank/_run/screenshots/agentic-04-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/solstice-bank/_run/screenshots/agentic-05-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/solstice-bank/_run/screenshots/agentic-06-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/solstice-bank/_run/screenshots/agentic-07-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/solstice-bank/_run/screenshots/agentic-08-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/solstice-bank/_run/screenshots/agentic-09-type_text-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/solstice-bank/_run/screenshots/agentic-10-type_text-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/solstice-bank/_run/screenshots/agentic-11-type_text-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/solstice-bank/_run/screenshots/agentic-12-type_text-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/solstice-bank/_run/screenshots/agentic-13-select_option-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/solstice-bank/_run/screenshots/agentic-14-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/solstice-bank/_run/screenshots/agentic-15-click-desktop.png`

## Suggested Fix Priorities

1. Clear field-level errors as soon as the field becomes valid, and update the summary in sync. If validation is intentionally deferred until submit, visually distinguish 'resolved' vs 'unresolved' states so users can see progress while correcting the form.
2. Increase tappable areas to at least 44px high/wide for all primary actions, consent controls, radio options, and error links. Expand the hit area to the whole label row for checkboxes/radios rather than only the tiny control.
3. Use field-specific error text in both places, such as 'Confirm you are a US resident' or 'Agree to the Deposit Account Agreement and Terms of Service,' so the summary itself identifies the missing action.
4. Separate liveness from document-upload status more explicitly, show a step checklist or status chips for each requirement, and replace or relabel the liveness CTA after success (for example, 'Retake selfie' only if repeat is allowed).
5. Make summary items full-width tap targets, preserve a little summary context after scrolling, and add a stronger destination cue such as focused styling or a brief highlight around the errored field.
6. Either warn before leaving an in-progress application or show a clear saved-state message on the landing page, such as 'Resume your application,' so interruption recovery feels intentional and trustworthy.
7. Remove horizontal overflow on the landing page so the hero/cards and supporting content fit cleanly within the mobile viewport.
8. Make any referenced app-store actions clearly clickable buttons or links, or remove the affordance styling/text that implies interactivity if downloads are not available.

## Claude Remediation

_Claude Code fix pass was not requested for this run._

## Trace Summary

- Trace entries: `79`
- Full trace: `trace.json`
- Structured report: `report.json`
