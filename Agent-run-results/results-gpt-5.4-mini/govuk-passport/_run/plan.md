# UXAgent Exploration Plan

## Goal

Explore and critique the full passport application onboarding flow in the local GOV.UK-style prototype, with emphasis on step progression, validation, state persistence, and recovery paths on desktop and mobile.

## Plan Summary

Begin on the landing page by exercising the cookie prompt, Start now entry point, and related-content links to confirm the prototype’s entry states. Then drive the multi-step form end-to-end, checking the primary application path as well as alternate branches like renew/replace, validation errors, back navigation, review, and the stop-before-payment end state. Repeat the critical form and error-handling checks in a mobile viewport, with attention to any small-tap-target or spacing issues already hinted at in the prescan.

## Coverage Targets

- pages: `Visit the only known HTML page, index.html, and cover its start state plus all in-page service steps reachable through the prototype.`
- features: `Exercise the cookie banner, start entry, application type branching, validation/error summary, back navigation, step progression, file upload, review state, and stop-before-payment end state.`
- mobile: `Repeat the landing-entry path and at least one full validation/progression path on mobile, with special attention to the small-tap-target controls flagged in the prescan.`

## Planned Phases

### Landing page and entry controls

- Objective: Validate the public-facing start screen, cookie consent controls, and all visible entry/navigation affordances before entering the form.
- Target pages: index.html
- Key checks:
  - Click Accept analytics cookies and Reject analytics cookies and confirm the banner state changes appropriately.
  - Open View cookies and verify it behaves as a disclosure/help control rather than breaking the page flow.
  - Use Start now › to enter the service flow.
  - Check the top breadcrumb-like links and related-content links for expected anchor navigation or no-op prototype behavior.
- Exit criteria:
  - Cookie prompt behaviors have been exercised at least once.
  - Start now › reliably transitions into the service-start section.
  - No unexpected console or network errors appear from entry interactions.

### Primary application path

- Objective: Walk the main passport application sequence from application type through personal details and address capture using the most likely completion path.
- Target pages: index.html
- Key checks:
  - Choose the default/primary application type and confirm the next step loads correctly.
  - Fill the personal information step with valid inputs and confirm field-level guidance works.
  - Fill the address step and verify progression continues without blocking errors.
  - Confirm step indicator updates and any summary/status text remains consistent.
- Exit criteria:
  - At least one valid end-to-end progression reaches the later steps beyond address.
  - Step transitions are stable and consistent across forward navigation.
  - The visible step indicator matches the current stage.

### Branching and recovery states

- Objective: Stress alternate paths and validation-recovery behavior that are likely to surface UX issues.
- Target pages: index.html
- Key checks:
  - Exercise renew and replace branches if available from the application type step.
  - Submit each step once with missing or invalid values to trigger inline errors and the error summary.
  - Verify error summary focus behavior and that selecting an error returns attention to the relevant field.
  - Use back navigation to confirm previously entered values persist or are restored correctly.
- Exit criteria:
  - At least one invalid submission path has been tested on multiple steps.
  - Error summary and field-level errors were both observed and interacted with.
  - Branch-specific behavior for application type has been checked.

### Evidence, photo, and review steps

- Objective: Validate the later-stage steps that gather passport history, photo evidence, and final review information before payment handoff.
- Target pages: index.html
- Key checks:
  - Complete previous passport information step and confirm any conditional fields or hints behave as expected.
  - Exercise the photo upload step with a valid local file and check for any file validation or label issues.
  - Inspect the review step for completeness, edit-back affordances, and consistency of entered data.
  - Confirm the stop-before-payment endpoint is clearly communicated and does not imply a real transaction.
- Exit criteria:
  - Later steps beyond the core identity/address flow have been reached and validated.
  - File input/photo handling has been exercised at least once.
  - The review and stop-before-payment states are visually and behaviorally clear.

### Persistence, refresh, and mobile verification

- Objective: Confirm state persistence and responsive behavior for the most important interactions, especially where the prescan hinted at mobile usability risk.
- Target pages: index.html
- Key checks:
  - Refresh or re-enter the page after partial progress and verify localStorage-backed state restores appropriately.
  - Repeat cookie consent, Start now, one invalid submission, and one successful forward step in a mobile viewport.
  - Check tap/click usability of the small header links, cookie buttons, and related-content items on mobile.
  - Verify focus visibility and layout stability across the step indicator and form controls on narrower screens.
- Exit criteria:
  - Persistence behavior has been confirmed at least once.
  - Critical interactions were repeated on mobile viewport.
  - Any obvious mobile tap-target or layout regressions are documented.

## Prescan Summary

### Apply for or renew a passport - GOV.UK local demo

- Page: `index.html`
- Headings: Cookies on GOV.UK, Apply for or renew a passport, Before you start, Related content, Services and information, Government activity, Support links
- Interactables: `2` buttons, `24` links, `0` inputs
- Notable controls:
  - clickable:a:GOV.UK local demo home
  - clickable:a:Home
  - clickable:a:Service
  - clickable:a:Demo result
  - clickable:button:Accept analytics cookies
  - clickable:button:Reject analytics cookies
  - clickable:a:View cookies
  - clickable:a:Citizenship and living in the UK

