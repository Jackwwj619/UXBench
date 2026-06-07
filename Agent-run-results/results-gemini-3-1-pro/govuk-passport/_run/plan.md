# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the govuk-passport single-page application, focusing on the multi-step form flow, validation, state persistence, and responsive design.

## Plan Summary

The run will start by interacting with the cookie banner and initial navigation on the start page. It will then proceed into the main form flow via 'Start now', intentionally triggering validation errors to assess error summaries and inline messaging. After evaluating errors, it will complete a happy path through all steps to the review page. Finally, it will test state persistence by reloading, and evaluate the mobile layout given several small tap target warnings.

## Coverage Targets

- pages: `Explore all logical steps within the single index.html file.`
- features: `Exercise cookie banner, form validation, step navigation, and data persistence.`
- mobile: `Validate form responsiveness, step indicator placement, and tap target sizes.`

## Planned Phases

### Start Page & Utilities

- Objective: Evaluate the initial landing state, cookie banner interactions, and header/footer navigation.
- Target pages: index.html
- Key checks:
  - Interact with 'Accept/Reject analytics cookies' and ensure the banner dismisses.
  - Check top navigation links ('Home', 'Service', 'Demo result') for expected anchor routing.
  - Observe the visual layout of the 'Before you start' section.
- Exit criteria:
  - Cookie banner is dismissed and the user is ready to click 'Start now'.

### Form Validation & Error Handling

- Objective: Assess how the form handles missing or invalid inputs on the first interactive steps.
- Target pages: index.html
- Key checks:
  - Click 'Start now' to enter the form flow.
  - Attempt to proceed ('Save and continue') without filling out mandatory fields.
  - Verify the presence of the GOV.UK style red error summary box at the top.
  - Check that inline error messages appear near the respective inputs.
  - Ensure focus is correctly managed when clicking an error link in the summary.
- Exit criteria:
  - Validation errors are successfully triggered, observed, and documented.

### Happy Path Execution

- Objective: Navigate through all form steps with valid data to reach the review/stop screen.
- Target pages: index.html
- Key checks:
  - Provide valid inputs for application type, personal info, address, previous passport, and photo upload.
  - Observe the step indicator updates as progression occurs.
  - Verify the review screen accurately reflects the inputted data.
  - Check the final 'stop before payment' state.
- Exit criteria:
  - The review page is reached and displays the entered data correctly.

### Persistence & Navigation

- Objective: Test localStorage persistence and form recovery.
- Target pages: index.html
- Key checks:
  - Use the 'Cancel' or UI back buttons to navigate to a previous step.
  - Reload the page (F5/Refresh) while mid-form to verify if data is retained via localStorage.
  - Verify that the user returns to the correct step or can resume without losing data.
- Exit criteria:
  - Page reload and back navigation are tested, with state retention verified.

### Mobile Viewport Evaluation

- Objective: Review the layout and tap targets on a mobile screen size.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport.
  - Check if the step indicator shifts correctly (e.g., from left side to top).
  - Interact with small tap targets flagged in the prescan (header links, radio buttons).
  - Verify form fields and error summaries fit within the mobile width without horizontal scrolling.
- Exit criteria:
  - Mobile layout is thoroughly reviewed for accessibility and usability issues.

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

