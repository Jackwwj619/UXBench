# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full govuk-passport system, prioritizing the primary form/onboarding flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The core desktop flow is generally understandable: entering the service, progressing between steps, and recovering from blank required fields usually provide clear page titles, error summaries, and progress context. However, there are several user-facing issues that would undermine confidence and completion, especially on mobile: some required-step validation is inconsistent, many support/related links behave like misleading loops, and numerous interactive elements fall below comfortable touch-target sizing. Coverage was substantial but not complete, so these findings focus on the main form flow and the most clearly evidenced adjacent navigation states.

## Issues (7)

### [HIGH] mobile-validation-is-inconsistent-across-required — goal completion
- **Page**: `index.html mobile flow: #overseas-country, #applicant-type, #previous-passport, #passport-status`
- **Problem**: Mobile validation is inconsistent across required steps: some blank required questions advance to later steps instead of stopping the user with an error, which can let people move through the form with missing eligibility data.
- **Evidence**: In mobile testing, clicking Continue on blank #overseas-country moved from #overseas-country to #applicant-type, blank #applicant-type advanced to #previous-passport, and blank #previous-passport advanced to #passport-status. By contrast, blank #passport-status did correctly show an error summary and inline validation (steps 67-72).
- **Suggested fix**: Make required-field validation behave consistently on every step and every viewport: block progression on missing answers, keep users on the current step, and show the same error-summary + inline guidance pattern each time.

### [HIGH] many-links-are-labeled-like-real — trust
- **Page**: `index.html start/service-start footer, related links, and support links`
- **Problem**: Many links are labeled like real support or informational destinations, but they actually loop back to #start or #service-start with no relevant content, creating a misleading navigation experience.
- **Evidence**: Observed links including 'Accessibility statement', 'Help', 'Privacy', 'Benefits', 'Departments', 'Citizenship and living in the UK', and 'Births, deaths, marriages and care' either caused no visible change or returned to #start. 'Passport fees' routed to #service-start and showed the generic service intro with no fee-specific information. 'Renew an adult passport' and 'Report a lost or stolen passport' also led to the same generic start flow.
- **Suggested fix**: Either provide distinct content/states for these links or relabel/remove them in the prototype so the interface does not promise help, fees, privacy, accessibility, or alternate routes that are not actually available.

### [MEDIUM] after-users-type-into-previously-errored — feedback
- **Page**: `index.html: parents details and email steps`
- **Problem**: After users type into previously errored fields, the inline error text and error-summary entries remain visible until they resubmit, so the form gives weak immediate feedback during recovery.
- **Evidence**: On the parents' details step, after entering 'Parent or guardian 1 full name', the inline error and top error-summary link remained visible. On the email step, after typing both email fields, the error messages 'Enter an email address' and 'Confirm your email address' stayed visible until the next submit (steps 13-24).
- **Suggested fix**: Clear field-level error styling and summary items as soon as the individual field becomes valid, or at least replace them with neutral/affirming state changes while the user is correcting the form.

### [MEDIUM] branching-and-progress-feedback-are-often — clarity
- **Page**: `index.html: #applying-from, #applicant-type, #previous-passport, #overseas-country`
- **Problem**: Branching and progress feedback are often too generic, so users do not get strong confirmation that choices like child vs adult or inside vs outside UK meaningfully changed their journey.
- **Evidence**: Selecting 'Outside the UK' and 'A child under 16' produced no immediate copy or layout change before Continue. After continuing, the child path went straight to a generic 'Has the applicant had a UK passport before?' step with no child-specific messaging. Earlier in the flow, the progress panel still showed 'Check eligibility' as Current even after the user had advanced into passport-history questions.
- **Suggested fix**: Show stronger branch confirmation after key selections and make progress labels more specific to the current sub-journey, especially for child applications, overseas applications, and passport-history branches.

### [MEDIUM] some-system-state-feedback-is-ambiguous — feedback
- **Page**: `index.html: #confirmation and reset flow from 'Clear demo data'`
- **Problem**: Some system-state feedback is ambiguous or contradictory: resetting data has no confirmation, and the completion screen conflicts with the progress sidebar.
- **Evidence**: Clicking 'Clear demo data' returned the user to #service-start and reset progress, but there was no explicit success message. On the confirmation state, the main content said 'Demo application complete' and 'No application has been submitted', while the sidebar still marked 'Check and pay' as Current rather than completed (steps 31-36 and 55-60).
- **Suggested fix**: Add explicit acknowledgement after clearing data, and align the progress sidebar with the page state so completion screens never show an earlier stage as still current.

### [MEDIUM] a-large-number-of-interactive-elements — mobile usability
- **Page**: `index.html mobile observations and layout warnings across service-start and form steps`
- **Problem**: A large number of interactive elements are undersized on mobile, including key radios, back links, header links, footer links, and some smaller action links.
- **Evidence**: Layout warnings repeatedly flagged mobile tap targets below 44px guidance: radio inputs at 40x40, Continue buttons as small as 88x40 or 100x42 on some steps, Back around 49x20/21, feedback 65x17, Help 33x17, Privacy 52x17, Accessibility statement 162x17, Home 43x20, and Service 53x20. The final mobile observation alone reported 15 layout warnings.
- **Suggested fix**: Increase tap areas for radios, back/navigation links, feedback links, and footer/support items so interactive height consistently meets mobile touch guidance.

### [LOW] some-visible-affordances-appear-actionable-but — affordance
- **Page**: `index.html mobile start page and service-start beta feedback area`
- **Problem**: Some visible affordances appear actionable but do not produce meaningful outcome states, such as page-usefulness links and several support items.
- **Evidence**: On mobile, both 'Is this page useful? Yes' and 'No' linked to #start and produced no URL, text, or visible-state change; the same prompt remained on screen afterward. Earlier, the beta 'feedback' link also did not open a distinct destination and stayed on the current service-start state.
- **Suggested fix**: Provide a visible acknowledgement or follow-up state for feedback actions, or remove/suppress these affordances in prototype mode if they are intentionally non-functional.
