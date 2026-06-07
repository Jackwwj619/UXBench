# UXAgent Exploration Plan

## Goal

Execute a comprehensive UX audit of the Solstice Bank onboarding flow, validating the 8-step linear application process, error handling, and mobile responsiveness.

## Plan Summary

The run will begin by auditing the landing page for accessibility issues (specifically tap targets), then proceed to execute a full end-to-end application submission through all 8 steps. It will specifically test complex interactions like the ID liveness check and funding selection, followed by a mobile viewport pass to verify layout stability.

## Coverage Targets

- pages: `100% of HTML files (index, apply, confirmation)`
- features: `All 8 application steps, Liveness modal, Risk questionnaire logic, Edit navigation`
- mobile: `Full pass on iPhone SE/12 viewport dimensions`

## Planned Phases

### Landing Page & Entry Audit

- Objective: Validate marketing claims, information architecture, and entry points.
- Target pages: index.html
- Key checks:
  - Verify 'Start application' and 'Open an account' CTAs lead to apply.html.
  - Check readability of 'What you'll need' checklist.
  - Note visual hierarchy of value props ($0 monthly, Tax vault).
- Exit criteria:
  - Successfully navigated to apply.html from primary CTA.
  - Documented initial layout warnings regarding tap target sizes.

### Application Steps 1-4 (Identity & Contact)

- Objective: Test the initial data capture flow and basic form validation.
- Target pages: apply.html
- Key checks:
  - Step 1: Toggle eligibility checkboxes; verify 'Continue' is disabled until agreed.
  - Step 2: Enter personal info; test SSN masking behavior.
  - Step 3: Enter US address; validate ZIP code format if applicable.
  - Step 4: Select 'Freelance/Self-employed'; enter income figures.
- Exit criteria:
  - Progress bar updates correctly after each step.
  - No console errors during section transitions.
  - Data entered persists when moving forward.

### Complex Interactions (Steps 5-7)

- Objective: Validate high-risk UI components: ID verification, risk logic, and funding.
- Target pages: apply.html
- Key checks:
  - Step 5: Trigger 'Liveness check' modal; verify 3-2-1 countdown animation.
  - Step 6: Answer risk questions; observe if soft warnings appear based on previous income data.
  - Step 7: Select 'Link external bank' vs 'Fund later'; verify mock OAuth or selection state.
- Exit criteria:
  - Liveness modal closes successfully.
  - Funding choice is clearly selected before proceeding to Review.

### Review, Edit & Submission

- Objective: Test the summary view, navigation recovery, and final submission.
- Target pages: apply.html, confirmation.html
- Key checks:
  - Step 8: Verify all previous data is displayed accurately.
  - Click 'Edit' on a specific section (e.g., Contact); verify return to that step with data intact.
  - Test 'Save & continue later' functionality (if it triggers a modal or download).
  - Submit application; verify transition to confirmation.html.
- Exit criteria:
  - Confirmation page loads with a generated Reference ID (SOL-2026-XXXX-XX).
  - 'Back to home' link returns to index.html.

### Mobile Viewport Validation

- Objective: Repeat critical path checks on mobile to identify layout breaks and touch issues.
- Target pages: index.html, apply.html
- Key checks:
  - Re-test tap targets identified in prescan (Nav links, CTAs).
  - Verify the 8-step progress bar is readable/usable on narrow screens.
  - Check that the floating Help drawer does not obscure form inputs.
  - Ensure keyboard does not hide active input fields.
- Exit criteria:
  - Documented any layout shifts or unclickable elements specific to mobile.

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

