# UXAgent Exploration Plan

## Goal

Exhaustively explore and critique the UX of the Solstice Bank freelancer onboarding flow, including the landing page, the 8-step application, recovery paths, and confirmation state across both desktop and mobile viewports.

## Plan Summary

The run will start by assessing the landing page and its mobile layout warnings, then proceed through the 8-step apply flow as a freelancer. It will deliberately trigger validation errors, test the step navigation, interact with the floating help drawer, and attempt recovery paths like 'Save & continue later' and 'Cancel'. Finally, it will complete the application to reach the confirmation page and verify the end-state.

## Coverage Targets

- pages: `visit all 3 known HTML pages (100%)`
- features: `exercise all 8 onboarding steps, modals, navigation, and error states per key page`
- mobile: `repeat critical checks and form interactions on mobile viewport to validate responsive behavior`

## Planned Phases

### Landing Page Evaluation

- Objective: Assess the first impression, value proposition clarity, and mobile layout of the index page.
- Target pages: index.html
- Key checks:
  - Verify hero section layout and decorative credit card rendering
  - Check 'Materials to prepare' checklist visibility and clarity
  - Click top nav 'Open an account' and hero 'Start application' to ensure they route to apply.html
  - Evaluate mobile viewport for small tap target severity on nav links
- Exit criteria:
  - Both CTA links clicked and verified
  - Mobile viewport layout assessed for tap target warnings

### Onboarding Steps 1-4

- Objective: Navigate the initial eligibility, personal info, contact, and employment steps as a freelancer, testing validation and progress indicators.
- Target pages: apply.html
- Key checks:
  - Attempt to continue Step 1 without checking consent boxes to trigger validation error
  - Fill Step 2 personal info (name, DOB, masked SSN)
  - Fill Step 3 contact and US address
  - Select 'freelance / self-employed' in Step 4 employment and fill income
  - Verify progress bar updates and completed step dots are clickable to go back
- Exit criteria:
  - Validation error triggered and resolved on Step 1
  - Steps 1-4 completed successfully
  - Step navigation (clicking completed dots) verified

### Onboarding Steps 5-8 & Review

- Objective: Complete the high-risk ID verification, risk questionnaire, funding, and review steps, testing complex interactions and soft warnings.
- Target pages: apply.html
- Key checks:
  - Interact with Step 5 front/back photo upload mock and trigger liveness 3-2-1 countdown modal
  - Answer Step 6 risk questionnaire to intentionally trigger the soft warning compared against income
  - Use Step 7 mock OAuth to link an external bank from the 4 fictional options
  - Use Step 8 Review 'Edit' buttons to jump back to a previous section and change data
  - Verify floating Help drawer opens and displays step-specific copy
- Exit criteria:
  - Liveness modal triggered and dismissed
  - Risk soft warning observed
  - Mock bank linked in funding step
  - Edit from Review step verified
  - Help drawer contextual copy verified

### Recovery & Interruption Paths

- Objective: Test the 'Save & continue later' and 'Cancel application' flows to ensure graceful handling of user abandonment.
- Target pages: apply.html
- Key checks:
  - Click 'Save & continue later' and observe the resulting state or modal
  - Click 'Cancel application' and verify the second-confirmation dialog appears
  - Dismiss the cancel confirmation to ensure the application state is preserved
- Exit criteria:
  - Save & continue later behavior observed
  - Cancel second-confirmation triggered and dismissed without losing current progress

### Submission & Confirmation

- Objective: Complete the application and validate the success state, animation, and reference number.
- Target pages: apply.html, confirmation.html
- Key checks:
  - Submit the completed application from the Review step
  - Verify animated checkmark plays on confirmation.html
  - Check that a random application number (SOL-2026-XXXX-XX) is displayed
  - Click 'Back to home' link to ensure it routes to index.html
- Exit criteria:
  - Application submitted successfully
  - Confirmation page fully validated including animation and reference number
  - Navigation back to home verified

### Mobile Viewport Deep Dive

- Objective: Re-run critical checks on a mobile viewport to identify responsive design issues, especially forms and modals.
- Target pages: index.html, apply.html, confirmation.html
- Key checks:
  - Re-evaluate index.html nav tap targets on mobile
  - Walk through apply.html steps 1-8 on mobile to check form input usability, modals (liveness, cancel), and the help drawer
  - Verify confirmation page layout and animation on a smaller screen
- Exit criteria:
  - Mobile viewport checks completed for all three pages
  - Form factor issues documented

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

