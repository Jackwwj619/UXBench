# UXAgent Exploration Plan

## Goal

Explore and critique the full Solstice Bank account-opening experience end to end, with deepest coverage on the 8-step onboarding flow and supporting recovery, review, and confirmation states.

## Plan Summary

Begin on the marketing landing page to validate the handoff into application start, then spend most of the run inside apply.html exercising each visible step, navigation rule, and recovery path. Prioritize states explicitly indicated in the prescan: validation errors, save-later, cancel confirmation, help drawer behavior, step-progress navigation, ID verification modal, funding options, and review-step edits. Finish by confirming successful submission to confirmation.html and repeat the highest-risk path on mobile, especially areas already flagged for small tap targets.

## Coverage Targets

- pages: `Visit all 3 known HTML pages, with repeated visits to apply.html for both primary and recovery flows.`
- features: `Exercise the majority of visible controls on apply.html, including all 8 steps, progress navigation, help drawer, validation states, ID/liveness modal behavior, funding choices, review edits, save-later, cancel confirmation, submission, and confirmation return path.`
- mobile: `Repeat the critical path from landing into early application steps plus at least one modal and one late-stage control on mobile, with explicit checks for small tap targets, overlay interference, and progress usability.`

## Planned Phases

### Landing page and entry validation

- Objective: Confirm the marketing page communicates prerequisites clearly and provides a reliable entry into the application flow on desktop before deep form testing.
- Target pages: index.html
- Key checks:
  - Verify both primary entry CTAs ('Open an account' and 'Start application') navigate to apply.html
  - Check whether header links with '#' behave inertly, scroll, or create confusing dead interactions
  - Review above-the-fold clarity of value proposition, required materials checklist, and timing expectations before form start
  - Note mobile-relevant risks already flagged by prescan for small nav/CTA tap targets
- Exit criteria:
  - At least one CTA successfully enters apply.html
  - Header interaction behavior is understood and documented
  - Initial desktop UX issues and mobile tap-target concerns on landing are captured

### Early-step gating and validation behavior

- Objective: Test the start of the onboarding flow for required-consent gating, validation messaging, and baseline usability of the first half of the form.
- Target pages: apply.html
- Key checks:
  - Attempt Continue on step 1 with incomplete eligibility/consent selections to trigger and inspect the error summary and field-level cues
  - Complete step 1 and validate progress indicator updates appropriately
  - Exercise step 2 personal information inputs, including DOB and masked SSN behavior
  - Exercise step 3 contact/address fields with a mix of empty and completed states to verify validation and recovery
  - Exercise step 4 employment/income selections, including freelance/self-employed-relevant paths where visible
  - Check that Auto-saved messaging is credible by moving between steps and confirming entered data persists
- Exit criteria:
  - Steps 1 through 4 have been completed at least once
  - Validation behavior has been observed on at least two distinct steps
  - Data persistence across back/forward movement is confirmed or failure is documented

### Identity, risk, and contextual assistance

- Objective: Probe the highest-complexity interactive states in the middle of the application, especially modal flows, warnings, and assistance.
- Target pages: apply.html
- Key checks:
  - Open and complete or dismiss the ID verification front/back upload mock states
  - Launch the liveness check modal and observe the 3-2-1 countdown sequence, close behavior, and return-to-form state
  - Complete the risk questionnaire and intentionally create a mismatch scenario to surface the soft warning tied to income
  - Open the floating Help drawer on multiple steps and confirm the copy changes contextually without blocking form completion
  - Check keyboard/focus or interaction continuity after closing dialogs if practical within the run
- Exit criteria:
  - ID verification and liveness modal behavior has been directly observed
  - At least one soft warning state in the risk step has been triggered or ruled out
  - Help drawer behavior has been sampled on multiple different steps

### Funding, review, and recovery paths

- Objective: Validate decision-heavy late-flow behavior, especially choice switching, review/edit loops, and explicit interruption controls.
- Target pages: apply.html
- Key checks:
  - Exercise each visible funding choice: external bank mock OAuth, mailed check, and fund later
  - If bank linking exposes the four fictional banks, verify selection feedback and ability to switch or back out
  - Reach the review step and use Edit links to jump back into earlier sections, then return to review with prior data intact
  - Test Save & continue later and record resulting feedback/state even if it is mock-only
  - Test Cancel application and the second-confirmation safeguard, including backing out of cancellation
- Exit criteria:
  - All visible funding options have been visited
  - Review/Edit loop has been exercised for at least two earlier sections
  - Both save-later and cancel-confirmation interruption paths have been observed

### Submission, confirmation, and mobile regression pass

- Objective: Complete the application to success, then rerun the most critical path on mobile to catch responsive and tap-target issues.
- Target pages: apply.html, confirmation.html, index.html
- Key checks:
  - Submit from review and verify navigation to confirmation.html
  - Confirm presence and formatting of the generated application reference and clarity of next-step messaging
  - Use 'Back to home' to verify return path to index.html
  - On mobile viewport, repeat landing-to-apply entry, first-step consent interactions, help drawer access, progress navigation, one modal interaction, and final CTA/tap-target usability
  - Pay special attention on mobile to the already flagged small header/link targets and any overlap from the floating Help control
- Exit criteria:
  - End-to-end submission reaches confirmation.html
  - Confirmation content and return-home path are validated
  - A focused mobile pass covers landing, start of form, one complex modal, and one late-stage action

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

