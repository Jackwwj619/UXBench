# UXAgent Exploration Plan

## Goal

Critique and validate the end-to-end UX of the govuk-passport local demo’s multi-step passport apply/renew flow, including validation, error recovery, state persistence, and responsive/mobile behavior.

## Plan Summary

Start at index.html, handle cookie banner and enter the service via “Start now”. Progress through every visible step of the single-page form (eligibility/fees → application type → personal info → address → previous passport info → photo upload → review), intentionally triggering validation and using back/forward to assess state persistence and error-summary behavior. Repeat the critical path checks on mobile viewport to confirm layout/interaction fidelity.

## Coverage Targets

- pages: `Visit all known HTML pages (index.html only).`
- features: `Exercise most visible controls per key page/step: cookie banner buttons, Start/Cancel, Save and continue/back, application-type choice, required form inputs, error summary navigation, photo upload, and review/stop-before-payment state.`
- mobile: `Repeat critical checks (entry, one validation-error recovery, photo upload, review/stop state) on mobile viewport.`

## Planned Phases

### Landing page & entry controls

- Objective: Validate the demo landing experience and ensure users can reliably start the multi-step form regardless of cookie choice.
- Target pages: index.html
- Key checks:
  - On desktop: load index.html and verify the content matches “Apply for or renew a passport - GOV.UK local demo” with the “Start now ›” control visible.
  - Accept analytics cookies and then click “Start now ›”; confirm the service section becomes active (no blocking modal persists).
  - Repeat with Reject analytics cookies; verify the start flow still works.
  - Click “View cookies” and ensure it’s dismissible/doesn’t trap focus; then start the service.
  - Check that top nav links (Home/Service/Demo result) don’t break the active step state (they use anchor navigation).
- Exit criteria:
  - Start the service successfully at least once after Accept and once after Reject cookies.
  - Cookie modal/view state does not interfere with step content or navigation.
  - No console/network errors are present during entry.

### Happy-path traversal through all steps

- Objective: Complete the full multi-step form flow (to the point where the prototype stops before payment) and verify correct step progression and UI consistency.
- Target pages: index.html
- Key checks:
  - Navigate through steps in order: start/eligibility & fees → application type (new/renew/replace) → personal info → address → previous passport info → photo upload → review → stop before payment.
  - Verify the step indicator (left/top) updates correctly on each transition.
  - Use “Save and continue” at each step (and “Cancel” at least once to confirm cancel behavior).
  - On each step: verify inline help text/hints are readable and that the correct input widgets are shown for the chosen application type.
- Exit criteria:
  - Every visible step’s main controls can be completed without blocking validation failures (using non-real test data).
  - No unexpected UI regressions occur between steps (fields don’t disappear incorrectly).
  - The user reaches the review/stop-before-payment stage.

### Validation & error recovery

- Objective: Deliberately trigger validation failures and confirm error summary, inline errors, and recovery (back/forward) behave as intended.
- Target pages: index.html
- Key checks:
  - At multiple steps, attempt “Save and continue” with missing/invalid values to trigger inline errors.
  - Confirm error summary appears (if implemented) and keyboard focus moves to it (error-summary focus behavior).
  - From the error summary, confirm navigation to the correct failing field/section.
  - Trigger an error, then use browser back (or in-app back) and forward to ensure state is preserved and errors update appropriately.
  - Confirm that correcting a field clears both inline error and error summary on re-submit.
- Exit criteria:
  - Validation failures are reproducible on at least 3 different steps.
  - Focus behavior is correct: error summary receives focus and highlights actionable content.
  - Correcting inputs resolves errors without requiring full refresh.

### State persistence (localStorage) & refresh resilience

- Objective: Verify that script.js persistence works and that the service resumes appropriately after refresh or partial completion.
- Target pages: index.html
- Key checks:
  - During the flow, partially fill fields on a mid-form step (e.g., personal info) but do not proceed; refresh the page and verify what persists.
  - Proceed to a later step (e.g., address), refresh, and confirm the active step and entered data remain consistent.
  - Complete photo upload step with a test image selection (non-sensitive) and refresh; verify preview/required state is handled (or fails gracefully with a clear message if persistence is not possible).
  - After reaching review, refresh and confirm the review reflects the latest stored values.
- Exit criteria:
  - At least 2 refresh scenarios show expected persistence (active step + inputs).
  - Photo upload persistence behavior is understood: either retained appropriately or produces a clear recovery path without broken UI.
  - No stale/contradictory review data is shown after refresh.

### Responsive/mobile verification of critical interactions

- Objective: Repeat the most failure-prone interactions on mobile viewport to check touch target size, layout integrity, and keyboard focus behavior.
- Target pages: index.html
- Key checks:
  - Mobile viewport: enter the service from “Start now ›” (confirm cookie banner doesn’t block).
  - On at least one step, trigger a validation error and confirm the error summary and scroll/focus work on small screens.
  - Verify step navigation control (left/top indicator) is usable without mis-taps.
  - Re-check photo upload and review controls (buttons/inputs) for touch accessibility.
- Exit criteria:
  - Critical path (entry → at least one validated error recovery → review/stop-before-payment) succeeds on mobile.
  - No overlapping/hidden elements prevent completing required actions.
  - Touch interactions do not cause accidental taps on small controls.

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

