# UXAgent Exploration Plan

## Goal

Evaluate the UX, accessibility, and functional integrity of the single-page multi-step passport application form, focusing on state management, validation logic, and mobile responsiveness.

## Plan Summary

The exploration will proceed by first handling the cookie consent banner, then initiating the 'Start now' flow. It will systematically traverse the multi-step form (Application Type -> Personal Info -> Address -> Previous Passport -> Photo), testing both valid inputs and error states to verify inline validation and error summaries. Finally, it will review the summary page and test the 'Cancel' functionality, repeating critical path checks on a mobile viewport.

## Coverage Targets

- pages: `Full coverage of the single HTML file's dynamic states.`
- features: `Exercise all form inputs, validation errors, navigation buttons, and the photo upload control.`
- mobile: `Repeat Phase 1 and Phase 2 key interactions on mobile viewport.`

## Planned Phases

### Entry & Initialization

- Objective: Clear initial overlays and enter the service flow.
- Target pages: index.html
- Key checks:
  - Dismiss cookie banner (Accept/Reject) and verify it disappears.
  - Click 'Start now' and verify transition to Step 1 (Application Type).
  - Verify presence of step indicator/progress bar.
- Exit criteria:
  - Cookie banner is hidden.
  - First form step (Application Type) is visible and interactive.

### Core Form Flow & Validation

- Objective: Traverse the primary data entry steps, testing happy paths and error states.
- Target pages: index.html
- Key checks:
  - Select Application Type (e.g., Renew) and proceed.
  - Enter invalid data in Personal Info (e.g., empty required fields) to trigger inline errors.
  - Verify Error Summary appears and links to specific fields.
  - Correct errors and proceed to Address and Previous Passport steps.
  - Test Photo Upload interaction (select file/cancel).
- Exit criteria:
  - All form steps have been visited.
  - Inline validation and Error Summary behavior confirmed.
  - Data persists when moving back and forth between steps.

### Review, Submission & Recovery

- Objective: Validate the final review screen and test exit/cancellation paths.
- Target pages: index.html
- Key checks:
  - Reach the 'Check your answers' / Review step.
  - Verify all entered data is displayed correctly.
  - Test 'Change' links on the review page to jump back to specific sections.
  - Test 'Cancel' button behavior (does it clear state? confirm dialog?).
  - Attempt final submission (noting it stops before payment).
- Exit criteria:
  - Review page content verified.
  - Cancellation flow tested.
  - Final submission state reached or documented.

### Mobile Responsiveness & Accessibility

- Objective: Repeat critical flows on mobile viewport to check layout and touch targets.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport (e.g., iPhone SE/Pixel 5).
  - Verify step indicator adapts (e.g., becomes horizontal or collapsible).
  - Re-test cookie banner dismissal and 'Start now' clickability.
  - Check that input fields and buttons meet minimum touch target sizes (44px).
  - Verify no horizontal scrolling issues on form pages.
- Exit criteria:
  - Critical path usable on mobile.
  - No major layout breakages observed.

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

