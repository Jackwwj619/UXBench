# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full solstice-bank system, prioritizing the primary form/onboarding flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The Solstice Bank flow has a strong overall structure: the landing-to-apply handoff works, the 8-step progress framing is visible, autosave gives reassurance, and save-later messaging is understandable. The biggest UX problem is form recovery feedback: across multiple steps, corrected fields continue to display errors until a later submit, which makes the form feel broken or untrustworthy. Mobile usability also needs attention because many core controls and recovery links are below recommended touch size, and some interruption/navigation moments return users home without warning about in-progress state.

## Issues (8)

### [HIGH] validation-feedback-stays-visible-after-users — error recovery
- **Page**: `apply.html form validation across steps 1-4`
- **Problem**: Validation feedback stays visible after users fix fields, so the form keeps looking invalid even when entries have been completed.
- **Evidence**: This happened repeatedly across the flow: after checking eligibility boxes, inline errors and the top summary still said 'This must be checked'; after entering About you fields, errors like 'First name is required' and 'Last name is required' remained visible; after selecting Citizenship, Contact fields, residence type, and Employment selections, their corresponding errors still persisted until a later Continue action advanced the step.
- **Suggested fix**: Clear field-level errors as soon as the field becomes valid, and update the summary in sync. If validation is intentionally deferred until submit, visually distinguish 'resolved' vs 'unresolved' states so users can see progress while correcting the form.

### [HIGH] many-primary-and-recovery-controls-are — mobile usability
- **Page**: `apply.html mobile controls; final observation target sizes`
- **Problem**: Many primary and recovery controls are undersized for touch on mobile, including required checkboxes, radios, navigation buttons, save-later, and error-summary links.
- **Evidence**: Observed mobile/size warnings include eligibility checkboxes at 18x18px, residence radios at 13x13px, 'Save & continue later' at 154x18px, 'Continue' at 97x37px, 'Back' at 71x39px, 'Start liveness check' at 175x39px, and the 'Front of ID is required' error link at 143x17px. These warnings appeared repeatedly in both recent and earlier mobile observations.
- **Suggested fix**: Increase tappable areas to at least 44px high/wide for all primary actions, consent controls, radio options, and error links. Expand the hit area to the whole label row for checkboxes/radios rather than only the tiny control.

### [MEDIUM] the-eligibility-validation-copy-is-too — clarity
- **Page**: `apply.html step 1 eligibility error summary`
- **Problem**: The eligibility validation copy is too generic: all error messages read 'This must be checked,' which forces users to scan the page to figure out which consent item each error refers to.
- **Evidence**: When Continue was clicked with no boxes checked, the top summary listed four identical 'This must be checked' links, and inline messages beside all four checkboxes used the same wording. Session notes explicitly call the summary copy generic and repetitive.
- **Suggested fix**: Use field-specific error text in both places, such as 'Confirm you are a US resident' or 'Agree to the Deposit Account Agreement and Terms of Service,' so the summary itself identifies the missing action.

### [MEDIUM] the-verify-id-step-gives-mixed — feedback
- **Page**: `apply.html step 5 Identity verification`
- **Problem**: The Verify ID step gives mixed signals by showing a completed '✓ Verified' liveness state while still blocking progress for missing document upload, and the liveness completion appears abrupt.
- **Evidence**: After the liveness countdown modal, the page showed '✓ Verified' next to 'Start liveness check.' Clicking Continue then stayed on step 5 and showed 'Please fix the following: Front of ID is required.' Notes also mention the modal disappeared without an in-view transition message or success toast, and the 'Start liveness check' button remained visible even after verification.
- **Suggested fix**: Separate liveness from document-upload status more explicitly, show a step checklist or status chips for each requirement, and replace or relabel the liveness CTA after success (for example, 'Retake selfie' only if repeat is allowed).

### [MEDIUM] anchor-based-recovery-works-but-the — error recovery
- **Page**: `apply.html mobile error summary to Front of ID anchor`
- **Problem**: Anchor-based recovery works, but the experience is weak on mobile because the error link itself is tiny and the jump can leave users without the summary context that explained the issue.
- **Evidence**: Tapping 'Front of ID is required' changed the URL to #err-anchor-0 and moved the missing field into view, but the summary link target was only 143x17px and later observations note the summary/link ended up offscreen after the jump (e.g. y = -223 / partially offscreen), leaving the user mid-step with no added focus treatment.
- **Suggested fix**: Make summary items full-width tap targets, preserve a little summary context after scrolling, and add a stronger destination cue such as focused styling or a brief highlight around the errored field.

### [MEDIUM] the-brand-link-acts-as-an — trust
- **Page**: `apply.html header brand link to index.html on mobile`
- **Problem**: The brand link acts as an immediate home escape hatch from mid-application, but there is no warning or explicit reassurance on the landing page about whether progress was preserved.
- **Evidence**: On mobile, tapping 'Solstice' from apply.html navigated directly to index.html. The landing page then showed only fresh-entry CTAs like 'Open an account' / 'Start application.' Progress was in fact recoverable after re-entering, but that reassurance was not communicated at the moment users left the form.
- **Suggested fix**: Either warn before leaving an in-progress application or show a clear saved-state message on the landing page, such as 'Resume your application,' so interruption recovery feels intentional and trustworthy.

### [LOW] the-mobile-landing-page-has-horizontal — mobile usability
- **Page**: `index.html mobile viewport`
- **Problem**: The mobile landing page has horizontal overflow, which can make the page feel less polished before users even begin onboarding.
- **Evidence**: Session memory and recent reflection note that index.html width was 428px against a 390px viewport on mobile. The landing page observation also reported layout warnings after returning home.
- **Suggested fix**: Remove horizontal overflow on the landing page so the hero/cards and supporting content fit cleanly within the mobile viewport.

### [LOW] the-confirmation-page-suggests-app-download — affordance
- **Page**: `confirmation.html post-submission next steps`
- **Problem**: The confirmation page suggests app-download next steps, but those store references do not appear to be actual interactive links in the observed UI.
- **Evidence**: The confirmation page clearly showed next-step copy including checking email and downloading the mobile app, but observations report that only 'Back to home' was detected as an actual link/button while 'App Store' and 'Google Play' appeared as visible text rather than interactable targets.
- **Suggested fix**: Make any referenced app-store actions clearly clickable buttons or links, or remove the affordance styling/text that implies interactivity if downloads are not available.
