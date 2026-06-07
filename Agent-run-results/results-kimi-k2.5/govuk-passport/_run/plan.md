# UXAgent Exploration Plan

## Goal

Explore and critique the UX of the govuk-passport system, focusing on the multi-step form flow, state transitions, validation, and recovery paths, across desktop and mobile viewports.

## Plan Summary

The exploration will proceed in phases: start with the initial page and cookie handling, then enter the form flow via 'Start now', progress through each form step (validating navigation, validation, and state persistence), check error handling, and verify mobile responsiveness. Each phase will validate specific interactions and states, with a focus on the single-page form's multi-step navigation and UX patterns.

## Coverage Targets

- pages: `visit all known HTML pages (only index.html, but explore all form states)`
- features: `exercise multi-step navigation, field validation, error handling, state persistence, and related links`
- mobile: `repeat critical checks (form navigation, tap targets, layout) on mobile viewport`

## Planned Phases

### Initial Page and Cookie Handling

- Objective: Validate initial page load, cookie interactions, and 'Start now' button
- Target pages: index.html
- Key checks:
  - Click 'Accept analytics cookies' and verify state change
  - Click 'Reject analytics cookies' and verify state change
  - Click 'Start now ›' and verify navigation to form start
- Exit criteria:
  - Cookie interactions validated
  - 'Start now' navigates to form

### Form Navigation (Step Forward/Back)

- Objective: Validate multi-step form navigation (start, application type, personal info, etc.)
- Target pages: index.html
- Key checks:
  - Navigate through each form step (start → application type → personal info → address → previous passport → photo upload → review)
  - Use 'Back' button to return to previous steps
  - Verify step indicator updates correctly
- Exit criteria:
  - All form steps visited via forward/back navigation

### Field Validation and Error Handling

- Objective: Validate field validation (inline errors) and error summary
- Target pages: index.html
- Key checks:
  - Submit empty form fields to trigger validation
  - Verify inline errors and error summary display
  - Correct errors and verify error removal
- Exit criteria:
  - Field validation (inline and summary) verified

### State Persistence (LocalStorage)

- Objective: Validate state persistence across form steps and page reloads
- Target pages: index.html
- Key checks:
  - Fill form fields, navigate steps, and reload page
  - Verify form state is restored from localStorage
  - Clear localStorage and verify state reset
- Exit criteria:
  - State persistence (localStorage) verified

### Mobile Usability (Small Tap Targets)

- Objective: Validate mobile viewport usability (tap targets, layout)
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport (e.g., 360x640)
  - Verify tap targets (e.g., 'Start now', form buttons) meet mobile usability (≥44x44px)
  - Validate form layout and readability on mobile
- Exit criteria:
  - Mobile viewport usability validated (tap targets, layout)

### Adjacent Flows (Related Content Links)

- Objective: Validate 'Related content' links (renew, child, lost/stolen, fees)
- Target pages: index.html
- Key checks:
  - Click 'Renew an adult passport' and verify navigation
  - Click 'Apply for a child passport' and verify navigation
  - Click 'Report a lost or stolen passport' and verify navigation
  - Click 'Passport fees' and verify navigation
- Exit criteria:
  - All related content links validated

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

