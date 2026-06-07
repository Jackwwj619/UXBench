# UXAgent Exploration Plan

## Goal

Exhaustively explore the CivicPort permit application portal, focusing heavily on the dynamic multi-step application form, its conditional logic, and recovery states.

## Plan Summary

The run will first map the static pages (Home, Fees, My Applications) to establish baseline navigation. The bulk of the exploration will focus on the `apply.html` form, executing multiple passes to validate the linear 'happy path', trigger conditional steps (like historic district or exterior changes), and test interruption flows like cancellation and backward navigation. Finally, critical interactions will be re-tested in a mobile viewport.

## Coverage Targets

- pages: `Visit all 4 known HTML pages.`
- features: `Exercise the standard flow, conditional logic, fee calculator, and cancellation within the application form.`
- mobile: `Test global navigation and the initial steps of the application form in a mobile viewport to assess layout collapse.`

## Planned Phases

### Basic Navigation and Static Content

- Objective: Verify the global navigation and the content of static auxiliary pages.
- Target pages: index.html, fees.html, my-applications.html
- Key checks:
  - Click through the top navigation links.
  - Verify the large icon-action buttons on the homepage work correctly.
  - Ensure content is fully visible on the Fees and My Applications pages.
- Exit criteria:
  - All static pages have been visited and their primary content/links verified.

### Permit Application - Standard Flow

- Objective: Execute a standard, non-conditional path through the permit application.
- Target pages: apply.html
- Key checks:
  - Fill out initial steps (address, basic project type).
  - Verify clicking 'Save and continue' progresses the form and updates the step tree.
  - Check that the 'What you'll need' checklist updates as steps are completed.
  - Test clicking the 'Back' button or clicking on completed steps in the tree to navigate backward.
- Exit criteria:
  - Successfully navigated through several steps of a basic application and confirmed backward navigation.

### Permit Application - Conditional Branches

- Objective: Trigger and validate the conditional logic within the application form.
- Target pages: apply.html
- Key checks:
  - Select inputs known to trigger conditional steps (e.g., exterior changes, historic parcel, Addition/Structural).
  - Verify new steps appear in the left-hand step tree.
  - Navigate to these newly revealed steps to ensure they render correctly.
- Exit criteria:
  - At least two different conditional form states have been triggered and visualized.

### Application Form - Interruptions & Edge Cases

- Objective: Test the robustness of the form against interruptions and check dynamic calculations.
- Target pages: apply.html
- Key checks:
  - Click the 'Cancel' button and interact with the resulting dialog.
  - Toggle the 'Expedited review' checkbox and verify the 'Estimated Fees' total updates correctly.
  - Attempt to proceed without filling required fields to check for validation messaging.
- Exit criteria:
  - Cancel dialog verified, fee calculator validated, and validation errors (if any) observed.

### Mobile Responsiveness

- Objective: Ensure the complex application form and small tap targets are usable on mobile.
- Target pages: index.html, apply.html
- Key checks:
  - Verify global navigation menus are accessible on a small viewport.
  - Check how the three-column layout in apply.html collapses (step tree, form, checklist).
  - Verify tap targets (buttons, links) are easily clickable without zooming.
- Exit criteria:
  - Mobile layout observed for the home page and the first step of the application process.

## Prescan Summary

### CivicPort — City of Avalon Bay

- Page: `index.html`
- Headings: Welcome to CivicPort., Apply for a permit, Track an application, Pay fees, Service alerts
- Interactables: `0` buttons, `7` links, `0` inputs
- Notable controls:
  - clickable:a:Apply
  - clickable:a:My applications
  - clickable:a:Fees
  - clickable:a:Help
  - clickable:a:Apply for a permit Residential, electrical, plumbing, roof. ~25 min.
  - clickable:a:Track an application See status, inspector notes, next steps.
  - clickable:a:Pay fees Open invoices, history, refunds.

### Apply for a permit — CivicPort

- Page: `apply.html`
- Headings: APPLICATION, 1.1 Property address, WHAT YOU'LL NEED, ESTIMATED FEES, Cancel this application?
- Interactables: `5` buttons, `0` links, `4` inputs
- Notable controls:
  - clickable:button:Cancel
  - typeable:input:unlabeled control
  - typeable:input:Avalon Bay
  - typeable:input:Zip
  - clickable:button:Back
  - clickable:button:Save and continue
  - clickable:input:Expedited review (+50%, decision in 3 days)

### Fees — CivicPort

- Page: `fees.html`
- Headings: Permit fee schedule
- Interactables: `0` buttons, `3` links, `0` inputs
- Notable controls:
  - clickable:a:Apply
  - clickable:a:My applications
  - clickable:a:Fees

### My applications — CivicPort

- Page: `my-applications.html`
- Headings: My applications
- Interactables: `0` buttons, `3` links, `0` inputs
- Notable controls:
  - clickable:a:Apply
  - clickable:a:My applications
  - clickable:a:Fees

