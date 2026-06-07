# UXAgent Exploration Plan

## Goal

Thoroughly explore Solstice Bank’s end-to-end account-opening experience, with emphasis on the linear application flow, validation behavior, recovery paths, and mobile usability of key controls.

## Plan Summary

Start on the landing page to verify the main call to action and any adjacent navigation behavior, then drive the full onboarding flow on apply.html from eligibility through submission. Pay special attention to step gating, editable review, save/cancel recovery paths, modal/upload/funding interactions, and any warnings or soft-blocks triggered by realistic input combinations. Repeat the critical checks in mobile viewport, especially for controls already flagged as small tap targets on the landing page and likely dense controls inside the form.

## Coverage Targets

- pages: `Visit all known HTML pages: index.html, apply.html, and confirmation.html.`
- features: `Exercise the primary application path plus the visible recovery controls, step navigation, help drawer, upload/liveness flow, risk questionnaire, funding options, review edits, and final submission.`
- mobile: `Repeat the landing CTA test, step progression, at least one input-heavy step, and one modal/dialog interaction on a mobile viewport, with extra attention to the small tap targets already flagged on the landing page.`

## Planned Phases

### Landing entry and CTA validation

- Objective: Confirm the landing page communicates the value proposition and funnels reliably into the application, including checking adjacent top-nav items for any simple interactions or dead ends.
- Target pages: index.html
- Key checks:
  - Click the primary Start application CTA and the Open an account nav CTA to confirm both route to apply.html.
  - Sample the header links Why Solstice, Pricing, Help, and Sign in to see whether they are inert placeholders or expose any content/state.
  - Assess whether the landing page’s small tap targets remain usable in mobile viewport.
- Exit criteria:
  - Primary application entry confirmed from both visible CTAs.
  - Any adjacent nav behavior recorded, including whether links are placeholders.
  - Mobile tap-target risk on the landing page is verified.

### Eligibility and progress gating

- Objective: Validate the initial onboarding step, required acknowledgements, auto-save presentation, and how the flow handles blocked continuation before requirements are met.
- Target pages: apply.html
- Key checks:
  - Attempt Continue before checking all required eligibility/legal boxes to confirm error handling and message placement.
  - Check the three eligibility statements and review whether Privacy notice / Terms language is readable and appropriately linked or static.
  - Observe whether Save & continue later preserves state or at least presents a clear saving affordance.
  - Inspect the stepper/progress bar behavior, especially whether incomplete steps are locked and completed steps become clickable.
- Exit criteria:
  - Blocked and successful progression from step 1 both observed.
  - Progress indicator and step-locking behavior understood.
  - Save-state affordance noted.

### Identity and contact data entry

- Objective: Exercise the core personal-information sections for format validation, accessibility of inputs, and any auto-formatting or masking behavior.
- Target pages: apply.html
- Key checks:
  - Fill step 2 with plausible name, DOB, and masked SSN values; observe any formatting, masking, or validation constraints.
  - Proceed through step 3 with contact and US address data, checking required field handling and whether address inputs accept realistic freelancer residence info.
  - Use an edit/back path from later review or stepper if needed to confirm earlier data remains editable.
- Exit criteria:
  - Step 2 and step 3 accepted with realistic data.
  - Any input formatting or validation issues documented.
  - Back/edit behavior confirmed at least once for earlier data.

### Employment, ID verification, and liveness modal

- Objective: Validate the more failure-prone middle of the application, including freelance/self-employed options, upload mock behavior, and the liveness-countdown dialog.
- Target pages: apply.html
- Key checks:
  - Test employment/income choices relevant to freelancers/self-employed users and note whether the UI supports that segment cleanly.
  - Open the ID verification controls for front/back photo upload mock and verify how file selection or placeholder states behave.
  - Launch the liveness modal and confirm the 3-2-1 countdown, dismissal behavior, and whether it returns to the same step cleanly.
- Exit criteria:
  - Employment step completed with freelancer-appropriate inputs.
  - Upload mock interactions validated.
  - Liveness modal opened and closed successfully.

### Risk questionnaire and funding choices

- Objective: Probe the decision-heavy middle-late steps for soft warnings, option clarity, and edge cases across funding paths.
- Target pages: apply.html
- Key checks:
  - Answer the five risk questions and deliberately vary income-sensitive inputs to see when soft warnings appear.
  - Inspect whether warnings are informative rather than blocking and whether they persist or clear as answers change.
  - Exercise each funding option shown: external bank connect mock OAuth, mailed check, and fund later, plus the listed fictional banks if selectable.
- Exit criteria:
  - At least one income/risk warning path observed.
  - Each funding path has been sampled or ruled out as non-interactive.
  - No dead-end discovered in the funding step.

### Review, final submit, and recovery paths

- Objective: Confirm the application can be reviewed, edited, saved, cancelled, and submitted through to a successful confirmation state.
- Target pages: apply.html, confirmation.html
- Key checks:
  - Use the review step Edit links to jump back to earlier sections and confirm the form state remains coherent after edits.
  - Submit the application and verify transition to confirmation.html with a valid-looking application reference number.
  - Open and test Cancel application second confirmation, then recover or restart as needed.
  - Check Save & continue later near the end to understand persistence/re-entry expectations if available.
- Exit criteria:
  - Final submission reaches confirmation.html.
  - Confirmation page reference number and next-step copy recorded.
  - Cancel confirmation and at least one recovery path validated.

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

