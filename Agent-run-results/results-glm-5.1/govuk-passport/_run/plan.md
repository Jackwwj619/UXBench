# UXAgent Exploration Plan

## Goal

Exhaustively explore and critique the UX of the GOV.UK passport multi-step form, covering the primary application flow, error handling, state persistence, and responsive layout.

## Plan Summary

The run will start by handling the cookie banner and navigating the landing page, then proceed through the primary multi-step form flow (application type, personal info, address, previous passport, photo upload, review). It will deliberately trigger inline validation errors and the error summary on various steps to assess error recovery. Finally, it will validate localStorage persistence, backward navigation, and mobile responsiveness for critical steps.

## Coverage Targets

- pages: `Cover all virtual steps within the single-page application (Start, Type, Personal, Address, Passport, Photo, Review, Confirmation)`
- features: `Exercise all form inputs, validation triggers, navigation links (Back, Cancel, Header), and cookie consent`
- mobile: `Repeat the start page, a data entry step, and an error state on mobile viewport`

## Planned Phases

### Landing Page & Cookie Consent

- Objective: Validate the initial landing page layout, content, and cookie consent interaction.
- Target pages: index.html
- Key checks:
  - Verify cookie banner is visible and Accept/Reject buttons work
  - Check that 'Start now' button is prominently displayed and clickable
  - Validate breadcrumb and footer links are present (noting small tap targets)
  - Ensure the disclaimer about being a local demo is visible
- Exit criteria:
  - Cookie consent choice has been made and banner dismissed
  - Landing page structure and primary call-to-action validated

### Primary Form Flow - Happy Path

- Objective: Complete the entire multi-step form using valid inputs to reach the review and confirmation pages.
- Target pages: index.html
- Key checks:
  - Navigate through application type selection (new/renew/replace)
  - Fill out personal info and address fields with valid data
  - Complete previous passport info step
  - Handle photo upload step with a valid file
  - Verify review page displays all entered data correctly
  - Reach the 'stop before payment' or confirmation page via the happy path
- Exit criteria:
  - Successfully reached the final review/confirmation step with all valid data entered

### Validation & Error Recovery

- Objective: Test form validation, error summary behavior, and inline error messaging by submitting steps with missing or invalid data.
- Target pages: index.html
- Key checks:
  - Submit a step with all fields empty to trigger the error summary
  - Verify error summary links focus the correct invalid fields
  - Check for red error styling and hint text on invalid fields
  - Test partial errors (e.g., missing email but name filled)
  - Validate recovery: correct the errors and successfully proceed
- Exit criteria:
  - Error summary and inline errors observed on at least two different steps
  - Successful recovery and progression after fixing errors

### Navigation & State Persistence

- Objective: Validate backward navigation, 'Cancel' links, and localStorage state persistence.
- Target pages: index.html
- Key checks:
  - Use the 'Back' link to return to a previous step and verify data is retained
  - Click 'Cancel' on a step and verify the expected exit behavior
  - Refresh the browser mid-flow to check if localStorage repopulates the fields
  - Use the header 'Service' link to see if it resets or preserves state
- Exit criteria:
  - Backward navigation retains data without loss
  - Cancel and refresh behaviors validated

### Mobile Responsiveness & Accessibility

- Objective: Re-evaluate critical flows and layout warnings on a mobile viewport to ensure usability.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport and verify the step indicator adapts (left to top)
  - Re-validate small tap targets (breadcrumbs, footer links) on mobile
  - Check form input usability, focus states (yellow outline), and keyboard navigation on mobile
  - Trigger an error state on mobile to ensure error summary is visible and scrollable
- Exit criteria:
  - Mobile layout verified on start page, a mid-form step, and an error state
  - Tap target and accessibility issues documented for mobile

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

