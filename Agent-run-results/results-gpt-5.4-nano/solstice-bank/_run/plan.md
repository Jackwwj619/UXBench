# UXAgent Exploration Plan

## Goal

Critique and validate the end-to-end Solstice Bank account-opening UX, focusing on the multi-step apply flow (validation, navigation, recovery), and then confirming the post-submission experience.

## Plan Summary

Start from the landing page and enter the apply flow via the primary CTA. Perform deep, step-by-step traversal of the 8-step linear onboarding in apply.html, including validation errors, help drawer behavior, the ID/liveness modal, step-dots navigation (completed vs locked), save/cancel recovery, and funding/review edits. Finish by completing submission to reach confirmation.html, then verify reference number display and exit navigation.

## Coverage Targets

- pages: `Visit all known HTML pages: index.html, apply.html, confirmation.html.`
- features: `Exercise all visible controls per apply.html step: checkboxes/consents, text inputs (including masked SSN), continue navigation, progress dots, Help drawer, Save & continue later, Cancel second confirmation, photo upload mock, liveness modal countdown, risk questionnaire answers + conditional warning, funding option switching including OAuth mock, Review section Edit buttons, and final submission.`
- mobile: `Repeat the critical path checks (CTA -> apply, step progression/validation, Help drawer, liveness modal, funding option switching, review edit loop, confirmation back-to-home) on mobile viewport, prioritizing tap-target usability.`

## Planned Phases

### Landing entry + header navigation sanity

- Objective: Confirm the landing page exposes clear entry points and that navigation controls behave reasonably before starting the onboarding flow.
- Target pages: index.html
- Key checks:
  - Use the primary CTA 'Start application' to reach apply.html
  - Verify 'Open an account' in the header routes to apply.html and does not scroll/redirect unexpectedly
  - Open header 'Help' and 'Sign in' to check whether they anchor, open modals, or navigate (validate no dead-ends from prescan)
  - On mobile viewport, test tap targets for 'Open an account' and 'Start application' remain clickable and do not mis-tap decorative elements
- Exit criteria:
  - apply.html loads successfully from both landing CTAs
  - Any Help/Sign in behavior is observed and is not broken (e.g., no blank page or console/runtime error)
  - On mobile, CTA tap interactions consistently work

### Apply flow: step structure, validation gates, and navigation rules

- Objective: Validate the 8-step linear flow UX: eligibility consent, required fields, validation messaging, and progress-based navigation (dots/bar).
- Target pages: apply.html
- Key checks:
  - Verify step progression UI: top progress bar + step dots; attempt to click completed vs unfinished steps
  - Step 1 Eligibility: validate required checkboxes (US resident, 18+), USA PATRIOT Act consent, and ToS/Deposit Account Agreement agreement; trigger 'Please fix the following' by continuing with missing items
  - Step 2 About you: enter name and DOB and ensure masked SSN behaves as expected (e.g., formatting/masking); trigger validation by leaving required fields empty
  - Use 'Edit' or section navigation (if present outside review) to confirm data retention
  - On mobile, ensure toggles/checkboxes/continue buttons remain usable and errors are readable
- Exit criteria:
  - Validation errors are shown when required fields are missing and disappear after correction
  - Step dots enforce expected locking behavior and section switching updates the visible step
  - Data entered in earlier steps persists when navigating back/forward

### Help drawer + save/cancel recovery behaviors

- Objective: Deeply validate recovery paths and contextual assistance across multiple steps.
- Target pages: apply.html
- Key checks:
  - Open the bottom-right floating Help drawer during at least two different steps and confirm copy changes per step
  - Use 'Save & continue later' and verify a safe recovery path (e.g., confirmation message or persistent state) without breaking the flow
  - Use 'Cancel application' and confirm the second-confirmation prompt; verify cancel does not happen accidentally and that flow state handling is consistent
  - If save produces a resumable state, resume and verify earlier inputs are intact (no resets to defaults)
- Exit criteria:
  - Help drawer opens/closes reliably and updates content appropriately by step
  - Save and cancel both present appropriate confirmations and do not corrupt entered data
  - If resuming is supported, the resumed state matches what was saved

### Identity verification + liveness modal interaction

- Objective: Validate the most complex verification interactions: photo upload inputs, liveness modal countdown, retry behavior, and error handling.
- Target pages: apply.html
- Key checks:
  - Step 5 Verify ID: attempt to proceed without uploading to trigger required-field errors
  - Simulate uploading front and back photo controls (use available file input behavior in the demo; if uploads are mock, verify the UI state changes accordingly)
  - Trigger the liveness check and observe the 3-2-1 countdown modal timing
  - Test closing/canceling the liveness modal (if allowed) and then restarting to ensure the flow doesn’t get stuck
  - On mobile, confirm modal controls are tappable and countdown does not cause layout/scroll issues
- Exit criteria:
  - Uploads (or mock upload state) and validation gates function correctly
  - Liveness countdown runs and required completion conditions are enforced
  - User can recover from interruptions (close/retry) without the step becoming inconsistent

### Risk questionnaire + funding choice + review/edit loop

- Objective: Validate conditional messaging, external integration mock, and the review-to-edit navigation loop for all sections.
- Target pages: apply.html
- Key checks:
  - Step 6 Risk: answer all 5 questions; test a scenario that should trigger the soft warning when compared against income
  - Verify that warning is presented without hard-blocking (unless intentionally designed otherwise) and that user can continue
  - Step 7 Funding: exercise each funding option at least once (connect bank mock OAuth, mailed check, fund later) and ensure each updates the UI state
  - In the OAuth mock, verify you can return to apply.html and that the connection state is reflected in the step
  - Step 8 Review: use each section’s 'Edit' to jump back; modify a value and return to review to confirm changes reflect correctly
  - Verify the final 'submit' (or equivalent) pathway is available only when required steps are complete
- Exit criteria:
  - Soft warning behavior appears under the intended conditions and user can proceed
  - Funding options switch correctly and persist selection/connection state
  - Review edit loop correctly navigates and reflects changes when returning

### Submit success + confirmation content validation

- Objective: Verify confirmation page correctness and the primary exit navigation after successful application submission.
- Target pages: confirmation.html
- Key checks:
  - Complete submission from apply.html to reach confirmation.html
  - Verify animated checkmark (or success animation) runs and reference number format matches SOL-2026-XXXX-XX style
  - Confirm the confirmation copy includes decision timeline (1–3 business days) and app-tracking guidance
  - Use 'Back to home' link and ensure it routes to index.html without breaking the browser state
  - On mobile viewport, ensure confirmation content is readable and the back link is tappable
- Exit criteria:
  - Confirmation page loads with a valid-looking reference number
  - Back to home returns to index.html successfully on desktop and mobile

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

