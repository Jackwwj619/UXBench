# UXAgent Exploration Plan

## Goal

Explore and critique the UX of the CivicPort permit portal, focusing on the primary application flow (apply.html) and adjacent pages (index, my-applications, fees), validating interactivity, conditional logic, and mobile responsiveness.

## Plan Summary

Start on index.html to validate home navigation, then proceed to apply.html to test the multi-step form flow (project info, property, plans, affidavits, submission). Check my-applications.html for application tracking and fees.html for fee details. Repeat critical checks in mobile viewport, focusing on small tap targets and dynamic content updates.

## Coverage Targets

- pages: `Visit all 4 target pages (index, apply, my-applications, fees) with full interaction.`
- features: `Exercise all form fields, buttons, dynamic checklists/fees, and navigation links in apply.html; verify application list in my-applications.html; verify fee schedule in fees.html.`
- mobile: `Repeat critical checks (navigation, form interactions, dynamic elements) in mobile viewport, focusing on small tap targets and responsive layout.`

## Planned Phases

### Home Page & Navigation

- Objective: Validate index.html interactables, navigation links, and service alerts.
- Target pages: index.html
- Key checks:
  - Click 'Apply' link (href=apply.html) to confirm navigation to apply.html.
  - Click 'My applications' link (href=my-applications.html) to confirm navigation to my-applications.html.
  - Click 'Fees' link (href=fees.html) to confirm navigation to fees.html.
  - Verify service alerts text and formatting (e.g., dates, announcements).
  - Check mobile viewport for small tap targets (top navigation links) and adjust interaction if needed.
- Exit criteria:
  - Successfully navigated to all linked pages (apply, my-applications, fees) from index.html.
  - Service alerts content verified.

### Apply Form: Project Info Step

- Objective: Test apply.html's first form step (Property address, Project type, Project scope, Dates) and dynamic elements (checklist, fees).
- Target pages: apply.html
- Key checks:
  - Type into 'Property address' input (verify label/functionality).
  - Select a 'Project type' (verify dropdown/options, check dynamic fee update).
  - Describe 'Project scope' (verify text input).
  - Set 'Start / end dates' (verify date inputs).
  - Check 'What you'll need' checklist for updates (e.g., 'Property address' marked as done).
  - Toggle 'Expedited review' and verify fee calculation (+50%).
  - Click 'Back' and 'Save and continue' buttons to test navigation between steps.
- Exit criteria:
  - All form fields in Project Info step are functional (input, selection, date).
  - Dynamic checklist and fee calculations updated correctly.
  - Back/Save buttons navigate as expected.

### Apply Form: Subsequent Steps & Conditional Logic

- Objective: Test apply.html's remaining steps (Property & ownership, Plans & documents, Affidavits, Review & Submit) and conditional visibility (e.g., neighbor step, historic district).
- Target pages: apply.html
- Key checks:
  - Navigate to '2. Property & ownership' step (click step in left tree or 'Save and continue').
  - Test 'Parcel lookup' (input parcel number, verify lookup functionality).
  - Upload 'Ownership proof' (simulate file upload, check checklist update).
  - Enter 'Contractor license' (verify input).
  - Trigger conditional steps (e.g., select 'Exterior changes' in scope to show neighbor step, check checklist for 'Neighbor signature').
  - Upload 'Site plan' and 'Floor plan' (check checklist updates).
  - Complete 'Affidavits' (e.g., 'Lead paint' checkbox, 'Environmental' text input).
  - Navigate to 'Review & Submit' step, verify summary and fees, then click 'Submit' (simulate submission, check confirmation).
  - Test 'Cancel' button (verify dialog appears and cancels application).
- Exit criteria:
  - All steps (1-6) navigated and form fields tested (inputs, uploads, checkboxes).
  - Conditional steps (neighbor, historic district) appear as expected based on input.
  - Cancel dialog and submission process verified.

### My Applications Page

- Objective: Validate my-applications.html's application list, status badges, and navigation.
- Target pages: my-applications.html
- Key checks:
  - Verify application list (3 past applications, status badges: Approved, Inspector follow-up).
  - Click on an application (e.g., 'AB-2026-PERM-7042') to check details (if any, or verify link functionality).
  - Navigate back to index.html or apply.html from my-applications.html.
- Exit criteria:
  - Application list content verified (3 entries, status badges).
  - Navigation from my-applications.html to other pages works.

### Fees Page & Mobile Checks

- Objective: Test fees.html content, fee schedule, and repeat critical checks in mobile viewport.
- Target pages: fees.html
- Key checks:
  - Verify fee schedule table (project types, base fees, per sq ft, expedited).
  - Check mobile viewport for small tap targets (top navigation links) and re-test navigation.
  - Repeat apply.html's 'Expedited review' toggle in mobile view to verify fee calculation and checklist updates.
- Exit criteria:
  - Fees page content (schedule, descriptions) verified.
  - Mobile viewport interactions (navigation, form inputs) functional.

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

