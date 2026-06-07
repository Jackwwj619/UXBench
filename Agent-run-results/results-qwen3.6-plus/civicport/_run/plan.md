# UXAgent Exploration Plan

## Goal

Evaluate the end-to-end UX of the CivicPort permit application flow, focusing on form complexity, conditional logic visibility, and mobile accessibility.

## Plan Summary

The run will start by validating the landing page entry points and fee transparency. It will then execute a deep-dive into the multi-step 'Apply' wizard, specifically testing how the UI handles conditional requirements (e.g., historic districts, exterior changes) and dynamic checklists. Finally, it will verify the 'My Applications' tracking view and repeat critical path checks on mobile to address known tap-target issues.

## Coverage Targets

- pages: `100% of HTML files visited.`
- features: `Exercise all visible form inputs in apply.html, toggle expedited fees, trigger at least one conditional step logic.`
- mobile: `Full pass through Phase 2 (Core Flow) and Phase 5 (Mobile Specifics) on mobile viewport.`

## Planned Phases

### Landing & Context

- Objective: Validate clear entry points and pre-application information architecture.
- Target pages: index.html, fees.html
- Key checks:
  - Verify 'Apply', 'Track', and 'Pay' cards are distinct and clickable.
  - Check 'Service alerts' for readability and relevance.
  - Navigate to 'Fees' to verify if the table matches the 'Estimated Fees' card seen in the application flow.
  - Test global nav links from index.
- Exit criteria:
  - All primary navigation links function.
  - Fee structure is understood before starting application.

### Application Wizard - Core Flow

- Objective: Execute the primary path of the permit application to test form density and sidebar utility.
- Target pages: apply.html
- Key checks:
  - Start new application; observe initial state of Step Tree (left) and Checklist (right).
  - Fill Step 1 (Project Info): Test address input and Project Type dropdown.
  - Toggle 'Expedited review' and verify immediate update in Fee Breakdown card.
  - Progress to Step 2 (Property): Verify 'Parcel lookup' and 'Ownership' fields.
  - Monitor right-sidebar checklist: Ensure items check off automatically as form fields are populated.
- Exit criteria:
  - Successfully navigated Steps 1-3.
  - Sidebar checklist reflects form completion status accurately.

### Conditional Logic & Edge Cases

- Objective: Trigger complex states to validate dynamic UI behavior and error handling.
- Target pages: apply.html
- Key checks:
  - Attempt to trigger 'Historic District' logic (e.g., entering an address in 'Foundry District' mentioned in alerts).
  - Observe if new steps appear in the left Step Tree or if existing steps unlock.
  - Select 'Exterior Changes' or 'Addition' project types to trigger 'Neighbor Signature' or 'Elevation Drawings' requirements.
  - Test 'Back' button functionality: Does it preserve data? Does it re-lock conditional steps?
  - Test file upload interactions (visual feedback only).
- Exit criteria:
  - Conditional steps are visibly triggered or explained.
  - Navigation between steps does not cause data loss or UI breaks.

### Tracking & Recovery

- Objective: Validate the post-submission experience and application management.
- Target pages: my-applications.html
- Key checks:
  - Review list of mock applications for status clarity (badges).
  - Check for details view on individual applications (if clickable).
  - Test navigation back to 'Apply' from this page.
  - Verify 'Cancel' action on the Apply page (Phase 2/3) leads to a safe exit or confirmation dialog.
- Exit criteria:
  - Application status is clearly communicated.
  - User can safely abandon or resume an application.

### Mobile Responsiveness & Accessibility

- Objective: Stress-test the UI on smaller viewports, focusing on the identified tap-target risks.
- Target pages: index.html, apply.html
- Key checks:
  - Switch to mobile viewport (approx 375px width).
  - Verify global nav collapses or remains usable (prescan showed small targets).
  - On Apply page: Check if the 3-column layout stacks correctly (Tree -> Form -> Checklist).
  - Ensure sticky elements (Fee card/Checklist) do not obscure form inputs on scroll.
  - Re-verify tap targets for 'Save and Continue' and inputs.
- Exit criteria:
  - No horizontal scrolling on main content.
  - Critical actions (Next/Save) are reachable and tappable.

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

