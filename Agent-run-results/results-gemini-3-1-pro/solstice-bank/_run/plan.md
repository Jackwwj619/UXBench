# UXAgent Exploration Plan

## Goal

Exhaustively explore and critique the Solstice Bank application flow, focusing on the 8-step single-page form, form validation, modals, and responsive layout.

## Plan Summary

The run will begin on the landing page to evaluate layout and navigation targets before initiating the account application. It will then methodically step through the 8-stage single-page onboarding flow, testing form validation, modals (liveness, funding), and contextual help. Finally, it will test recovery paths (save for later, edit) before submitting to verify the confirmation page, followed by a mobile responsiveness check.

## Coverage Targets

- pages: `Visit all 3 HTML pages (index, apply, confirmation).`
- features: `Exercise all 8 steps of the application form, trigger at least two modals, test form validation, and use the help drawer.`
- mobile: `Switch to mobile viewport to re-test the landing page header and at least one step of the application form.`

## Planned Phases

### Landing Page & Entry

- Objective: Verify landing page layout, inspect reported small tap targets, and initiate the application flow.
- Target pages: index.html
- Key checks:
  - Check navigation links in the header for size and usability
  - Click 'Open an account' or 'Start application' to transition to apply.html
- Exit criteria:
  - apply.html is loaded and Step 1 (Eligibility) is visible

### Application Flow: Steps 1-4

- Objective: Navigate the first half of the form, testing basic inputs and validation.
- Target pages: apply.html
- Key checks:
  - Trigger a validation error by attempting to continue without checking mandatory eligibility boxes
  - Complete Eligibility, About you, Contact & address, and Employment & income steps
  - Open and close the floating 'Open help' drawer to ensure context updates and doesn't block UI
- Exit criteria:
  - Successfully reached Step 5 (Identity verification)

### Application Flow: Steps 5-7 & Modals

- Objective: Interact with complex form elements including file mockups and modals.
- Target pages: apply.html
- Key checks:
  - Interact with ID verification and trigger the Liveness check modal
  - Complete the Risk questionnaire and observe any soft warnings based on inputs
  - Interact with the Funding step, specifically the 'Connect your bank' modal
- Exit criteria:
  - Successfully closed modals and reached Step 8 (Review)

### Review, Edge Cases & Submission

- Objective: Test editing previous steps, saving progress, and final submission.
- Target pages: apply.html, confirmation.html
- Key checks:
  - Use an 'Edit' button or the progress tracker to jump back to a previous step, then return to review
  - Click 'Save & continue later' to observe the interaction/feedback
  - Submit the final application to reach the confirmation page
- Exit criteria:
  - confirmation.html is loaded and the dynamic reference number is visible

### Mobile Viewport Validation

- Objective: Verify the responsiveness of key components on a mobile screen.
- Target pages: index.html, apply.html
- Key checks:
  - Check landing page navigation menu and CTA layout on mobile
  - Verify form field usability and Help drawer positioning in apply.html on mobile
- Exit criteria:
  - Mobile checks completed for primary navigation and form layout

## Prescan Summary

### Solstice Bank — Banking for the longest day's work

- Page: `index.html`
- Headings: Banking for the longest day's work., $0 monthly, 2-minute decision, Tax-savings vault, What you'll need
- Interactables: `0` buttons, `7` links, `0` inputs
- Notable controls:
  - clickable:a:Solstice Bank
  - clickable:a:Why Solstice
  - clickable:a:Pricing
  - clickable:a:Help
  - clickable:a:Sign in
  - clickable:a:Open an account
  - clickable:a:Start application

### Solstice Bank — Open an account

- Page: `apply.html`
- Headings: Please fix the following:, Before we begin, About you, Contact & address, Employment & income, Identity verification, Liveness check, A few questions to set up your account, How will you fund your account?, Connect your bank
- Interactables: `16` buttons, `1` links, `41` inputs
- Notable controls:
  - clickable:a:Solstice
  - clickable:button:Save & continue later
  - clickable:input:I am a US resident
  - clickable:input:I am 18 years or older
  - clickable:input:I consent to USA PATRIOT Act identity verification
  - clickable:input:I agree to the Deposit Account Agreement and Terms of Service
  - clickable:button:Continue
  - clickable:button:Open help

### Welcome to Solstice

- Page: `confirmation.html`
- Headings: Welcome to Solstice.
- Interactables: `0` buttons, `1` links, `0` inputs
- Notable controls:
  - clickable:a:Back to home

