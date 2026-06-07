# UXAgent Exploration Plan

## Goal

Exhaustively explore and critique the CivicPort onboarding/application UX end-to-end, including adjacent flows (track and fees), key states (autsaved, cancellation, navigation), conditional form rendering, and mobile usability.

## Plan Summary

Start from index.html and navigate through Apply, Track (My applications), and Fees, validating global navigation and layout issues noted in the prescan. Then focus on apply.html to exercise the multi-step form: backward navigation, parcel/ownership gating, file upload sections, neighbor signature/affidavits, conditional step visibility, sticky “What you’ll need”, and the expedited fee toggle plus final review/submit and cancellation dialog. Repeat critical checks on mobile viewport for tap targets and any responsive layout shifts.

## Coverage Targets

- pages: `Visit all known HTML pages: index.html, apply.html, my-applications.html, fees.html; also return across pages via header actions at least once each`
- features: `For apply.html: exercise step navigation (back/cancel), parcel/address verification gating, at least one branch each for neighbor/historic/elevation drawings/energy worksheet, at least one file upload, review summary, and submit gating; validate sticky checklist updates and expedited fee toggle`
- mobile: `Repeat critical checks on mobile viewport: header tap targets on index.html, primary actions (Back/Save/Submit/Cancel) on apply.html, and readability/interactivity on fees.html and my-applications.html`

## Planned Phases

### Global navigation & landing page validation

- Objective: Validate that the entry points (Apply / Track / Pay / Help) route correctly and that mobile touch targets and focus states are usable.
- Target pages: index.html
- Key checks:
  - Click the three large icon-action buttons: Apply for a permit → apply.html, Track an application → my-applications.html, Pay fees → fees.html; confirm landing on correct page and expected headings
  - Use the header links (Apply / My applications / Fees / Help) to confirm correct routing
  - On index.html, interact with “Help” link (#) to verify whether it opens/collapses content or anchors to a section (avoid dead-end)
  - Validate service alerts are readable and do not overlap controls; confirm no console/network errors on navigation
  - Mobile viewport check: confirm tap targets for header links are still interactable despite small size warnings; verify visual focus/hover states
- Exit criteria:
  - All three main actions and header links successfully navigate to the expected pages without UI errors
  - Help behavior is confirmed (either opens content or anchors appropriately)
  - Mobile check confirms header actions are tappable and route correctly

### Apply flow core mechanics (step navigation, save, cancel)

- Objective: Exercise the multi-step form’s navigation model (backward steps, locked steps), autosave, and the cancellation dialog safely.
- Target pages: apply.html
- Key checks:
  - Verify step-tree structure is present (6 groups with sub-steps) and that the current step highlights appropriately
  - On initial load, confirm “Auto-saved” timestamp text appears (“just now”) and remains consistent as you enter text
  - Complete step 1.1 minimally: fill Street address, City/State/Zip fields; verify Save and continue enables progression and does not reset entered data
  - Use Back (button present) to ensure you return to the previous step with fields intact
  - Attempt to click back to already-completed steps (✓) and validate it works; attempt to access locked/conditional steps to confirm locking behavior is enforced
  - Open the “Cancel APPLICATION” dialog and validate: presence of confirm/cancel choices, that canceling does not lose work unexpectedly, and that closing the dialog returns you to the correct step
  - Mobile viewport check: ensure Cancel and primary actions (Save and continue / Back) remain tappable and visible in sticky layout
- Exit criteria:
  - Autosave and Save-and-continue behavior validated across at least one step transition
  - Completed-step back navigation confirmed and locked-step access behavior verified
  - Cancel dialog tested for safe recovery paths
  - Critical actions remain usable on mobile viewport

### Conditional form branching + sticky “What you’ll need” checklist

- Objective: Trigger each notable conditional visibility branch described in the prescan and verify the sticky materials checklist and fee card update accordingly.
- Target pages: apply.html
- Key checks:
  - Trigger address/parcel verification path: use parcel number start option (step 2.1 hint shown) or street address to reach “Parcel verified” state; confirm that subsequent sections unlock only after parcel verification
  - Ownership proof + contractor license sections: validate their completion markers and that their completion impacts materials checklist ✓ status
  - Conditional branch: select a scope that implies exterior changes and confirm neighbor signature block becomes visible; verify it appears/disappears and the sticky checklist updates with ✓
  - Conditional branch: choose a scenario that marks the parcel as historic-district; confirm historic-district step appears and any fee surcharge logic is reflected in the estimated fees card (historic review surcharge mentioned in prescan)
  - Conditional branch: for Addition/Structural, confirm elevation drawings appear as required documents
  - Conditional branch: for Roof/Electrical/HVAC, confirm energy worksheet appears
  - Validate sticky checklist updates as you progress through these conditional steps (checkbox ✓ alignment with completed sub-steps)
- Exit criteria:
  - All prescan-described conditional branches are reached at least once (neighbor/exterior, historic-district, elevation drawings, energy worksheet)
  - Sticky “What you’ll need” checklist accurately reflects each branch’s required materials status
  - Locked/unlocked behavior remains consistent with conditional visibility on navigation

### Materials/docs, affidavits, final review, and submit

- Objective: Validate the document upload + affidavit workflow and that the final review/submit step correctly summarizes what was provided.
- Target pages: apply.html
- Key checks:
  - Exercise at least one file upload control in the plans & documents section (site plan and/or floor plan; other docs as available) and ensure the UI reflects selection (no blocking)
  - Validate affidavits sections visibility and requiredness: e.g., Lead paint (pre-1978) and Environmental; confirm how selecting project/address affects which affidavits show up
  - Progress to “Review & submit” step and verify Summary section includes the collected details and indicates completion status for conditional items
  - Confirm the estimated fee card at Review matches the selected project type and expedited toggle state
  - Submit attempt: validate required fields/documents are enforced; if submission is blocked, identify which items are missing; if submission succeeds (demo), confirm confirmation state and next-screen behavior
  - Mobile viewport check: verify that upload controls, long forms, and sticky checklist do not obstruct the final submit button
- Exit criteria:
  - File upload + affidavit workflow validated through review step
  - Submission gating works (required items enforced) and review summary matches inputs
  - Final submit path behaves correctly on mobile

### Adjacent flows: Track (my applications) and Fees

- Objective: Validate status list UX, global navigation back to onboarding, and fee-information comprehension elements.
- Target pages: my-applications.html, fees.html
- Key checks:
  - On my-applications.html, validate the list displays 3 applications with App ID, Type, Address, Submitted date, and Status badges
  - Try clicking any status badge/app row if interactive (even if not indicated): confirm it either navigates to a detail view or provides appropriate non-action feedback
  - Use header navigation to return to Apply and verify that routing does not break
  - On fees.html, validate the permit fee schedule is readable and corresponds to project types listed on apply.html (e.g., Kitchen/Bathroom/Addition/Roof/Structural/Electrical/Plumbing)
  - Mobile viewport check: validate fees table layout is readable without horizontal scrolling trapping key info
- Exit criteria:
  - Track and Fees pages display expected content with correct structure on desktop and mobile
  - Any clickable elements on my-applications are handled gracefully
  - Project type fee rows match the onboarding project types for consistency

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

