# UXAgent Exploration Plan

## Goal

Exhaustively explore and critique the UX of the CivicPort municipal permit portal, focusing on the complex multi-step application flow, conditional logic, adjacent tracking/payment pages, and responsive layout issues.

## Plan Summary

The run will start by assessing the homepage and adjacent pages (Fees, My Applications) to establish context and check for basic layout issues. The core of the exploration will dive deeply into the 6-step apply.html form, specifically targeting conditional logic triggers (exterior, historic, structural, roof) to validate dynamic UI updates. Finally, the entire critical path and conditional states will be re-validated on a mobile viewport to assess responsive behavior and tap-target warnings.

## Coverage Targets

- pages: `visit all 4 known HTML pages`
- features: `exercise all conditional form paths, dynamic fee updates, step navigation, and cancel dialog`
- mobile: `validate critical form interactions and 3-column layout collapse on mobile viewport`

## Planned Phases

### Homepage & Adjacent Flows

- Objective: Validate the portal entry points, service alerts, and adjacent tracking/fee pages for content accuracy and basic usability.
- Target pages: index.html, fees.html, my-applications.html
- Key checks:
  - Verify all 3 main action cards (Apply, Track, Pay) link to their respective pages correctly
  - Check fees.html table for readability and consistency with apply.html fee card
  - Validate my-applications.html displays the 3 past applications with correct status badges
  - Inspect header navigation links across these pages for consistency
- Exit criteria:
  - All 3 adjacent pages visited and visually validated
  - Navigation between index, fees, and my-applications confirmed working

### Primary Application Flow (Baseline)

- Objective: Traverse the standard application flow without triggering major conditional steps to validate the base form experience, step navigation, and dynamic checklist.
- Target pages: apply.html
- Key checks:
  - Fill step 1.1 Property Address and note the missing label accessibility issue
  - Use 'Save and continue' and 'Back' buttons to verify step tree navigation and auto-save behavior
  - Verify the right-side 'What you'll need' checklist updates checkmarks as steps are completed
  - Complete a basic project type (e.g., Kitchen) that avoids conditional steps
  - Test the 'Cancel' button to ensure the dialog appears and can be dismissed
- Exit criteria:
  - Baseline flow navigated from 1.1 to 6 (Review & submit)
  - Checklist update behavior confirmed
  - Cancel dialog triggered and dismissed

### Conditional Logic & Dynamic States

- Objective: Trigger specific project types and parcel lookups to validate the appearance of conditional form steps and dynamic fee updates.
- Target pages: apply.html
- Key checks:
  - Select 'Addition/Structural' project type and verify 'Elevation drawings' step appears
  - Select 'Roof/Electrical/HVAC' and verify 'Energy worksheet' step appears
  - Trigger exterior changes to verify 'Neighbor signature' step appears
  - Trigger historic parcel lookup to verify 'Historic-district review' step appears and $120 surcharge is added
  - Toggle 'Expedited review' and verify the estimated fee card updates by +50%
- Exit criteria:
  - All 4 conditional steps triggered and validated
  - Expedited fee toggle confirmed working
  - Historic district surcharge confirmed in fee card

### Mobile Responsive Validation

- Objective: Re-evaluate the critical flows and identified risk hotspots on a mobile viewport to check layout collapse, readability, and tap target sizing.
- Target pages: index.html, apply.html, my-applications.html
- Key checks:
  - Verify header nav tap targets (Apply, My applications, Fees) on mobile and confirm small tap target warning impact
  - Check apply.html 3-column layout (step tree, form, checklist) collapse on mobile
  - Validate form inputs and 'Save and continue' button usability on mobile
  - Ensure dynamic fee card and checklist are accessible on smaller screens
- Exit criteria:
  - Mobile viewport tested on index, apply, and my-applications pages
  - Layout issues for 3-column form documented
  - Tap target constraints verified

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

