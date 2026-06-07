# UXAgent Exploration Plan

## Goal

Critique the UX of Solstice Bank's account-opening flow (and adjacent pages) by exploring all key pages, interacting with visible controls, and validating mobile/desktop consistency.

## Plan Summary

Start on index.html to explore landing, then proceed to apply.html (the 8-step form) to interact with each step's controls (eligibility, personal info, etc.), check recovery paths (Cancel, Save & continue), and finally visit confirmation.html. Validate mobile viewports for critical elements and check for errors/warnings.

## Coverage Targets

- pages: `Visit all 3 known HTML pages (index, apply, confirmation)`
- features: `Exercise all visible controls on apply.html (8 steps, checkboxes, buttons, uploads, modals) + key controls on index/confirmation`
- mobile: `Repeat critical checks (form steps, navigation, tap targets) on mobile viewport for index.html, apply.html (steps 1,5,8), and confirmation.html`

## Planned Phases

### Landing Page (index.html)

- Objective: Validate landing page content, interactables, and mobile viewport
- Target pages: index.html
- Key checks:
  - Click 'Start application' and 'Open an account' links (verify they navigate to apply.html)
  - Check all top navigation links (Why Solstice, Pricing, etc.) for responsiveness
  - Validate mobile viewport: check tap targets (small ones flagged) and content layout
  - Verify console/network errors (prescan had timeouts, check if resolved)
- Exit criteria:
  - All index.html interactables tested
  - Mobile viewport validated
  - Navigation to apply.html confirmed

### Application Form (apply.html)

- Objective: Explore all 8 steps of the form, interact with controls, check recovery paths
- Target pages: apply.html
- Key checks:
  - Step 1: Eligibility (check all checkboxes, click 'Continue')
  - Step 2: Personal info (interact with name/DOB/SSN fields, check 'Edit' flow)
  - Step 5: ID verification (mock upload, liveness modal interaction)
  - Step 6: Risk questionnaire (answer questions, check soft warning)
  - Step 7: Funding (select options, mock OAuth flow)
  - Step 8: Review (check 'Edit' for each section)
  - Recovery paths: Click 'Save & continue later' (check modal), Click 'Cancel application' (verify second confirmation)
  - Help drawer: Open/close on each step, check copy changes
  - Mobile viewport: Validate step navigation, tap targets, and form fields
- Exit criteria:
  - All 8 steps + recovery paths tested
  - All visible form controls interacted with
  - Mobile viewport validated for critical steps

### Confirmation Page (confirmation.html)

- Objective: Validate success page content and navigation
- Target pages: confirmation.html
- Key checks:
  - Verify 'Back to home' link (navigates to index.html)
  - Check application number format (SOL-2026-XXXX-XX)
  - Validate mobile viewport: content layout and tap targets
  - Check console/network errors
- Exit criteria:
  - Confirmation page content verified
  - Mobile viewport validated
  - Navigation to home confirmed

### Cross-Check & Error Review

- Objective: Validate all phases' findings, check for missed controls, and confirm error resolution
- Target pages: index.html, apply.html, confirmation.html
- Key checks:
  - Recheck small tap targets (per layout warnings) on all pages
  - Confirm no new console/network errors
  - Verify all critical controls (Continue, Cancel, Save) work as expected
  - Check mobile viewport consistency for all key pages
- Exit criteria:
  - All critical checks revalidated
  - No new errors found
  - Mobile/desktop consistency confirmed

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

