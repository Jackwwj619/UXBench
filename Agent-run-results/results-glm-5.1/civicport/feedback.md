# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full civicport system, prioritizing the primary form/onboarding flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: True

## Summary

CivicPort provides a strong desktop form experience with excellent wayfinding, dynamic checklists, and real-time fee updates, but it suffers from significant mobile usability and accessibility friction. On mobile viewports, critical interactive elements like radio buttons, checkboxes, and navigation links have severely undersized tap targets, making the form difficult to use. Additionally, multiple form inputs lack proper labels or placeholders, creating barriers for screen reader users and mobile users who lose visual context when scrolling.

## Issues (5)

### [HIGH] critical-interactive-elements-have-severely-undersized — mobile usability
- **Page**: `apply.html mobile viewport checkboxes and radio buttons`
- **Problem**: Critical interactive elements have severely undersized tap targets on mobile, making the form frustrating and difficult to complete on touch devices.
- **Evidence**: Layout warnings consistently flag undersized tap targets across mobile viewports: 'Expedited review' checkbox (13x13px), 'Contractor' radio button (56x13px), 'Owner' radio button (81x13px), 'Involves changes to the exterior' checkbox (326x13px), and 'Cancel' button (56x17px). All fall significantly below the 44px minimum mobile guidance.
- **Suggested fix**: Increase the padding and tap area for all checkboxes and radio buttons to at least 44x44px. Ensure the clickable area wraps the associated text label, not just the tiny native control.

### [HIGH] multiple-form-inputs-lack-associated-labels — accessibility
- **Page**: `apply.html inputs (ux-2, ux-3, ux-4, ux-5, ux-10, ux-15)`
- **Problem**: Multiple form inputs lack associated labels, aria-labels, or placeholders, failing accessibility standards and confusing users.
- **Evidence**: Accessibility issues were flagged for street address, city, project scope, estimated cost, area, date, and license number fields (e.g., target_ids ux-2, ux-3, ux-4, ux-5, ux-10, ux-15) which all lack labels, aria-labels, or placeholders.
- **Suggested fix**: Add explicit `<label>` elements properly associated with their inputs via `for` attributes, or use `aria-label`/`aria-labelledby` attributes, and provide clear placeholder text as a fallback.

### [MEDIUM] global-navigation-links-have-undersized-tap — mobile usability
- **Page**: `Global header navigation links`
- **Problem**: Global navigation links have undersized tap targets, making it difficult for mobile users to move between sections of the portal.
- **Evidence**: Header navigation links ('Apply' 34x22px, 'My applications' 94x22px, 'Fees' 27x22px, 'Help' 28x22px) all fall below the 44px mobile tap target guidance.
- **Suggested fix**: Increase the vertical padding of the navigation links to ensure a minimum height of 44px, providing a comfortable touch target.

### [MEDIUM] primary-form-action-buttons-back-and — forms
- **Page**: `apply.html buttons (ux-6, ux-7)`
- **Problem**: Primary form action buttons ('Back' and 'Save and continue') are slightly shorter than recommended mobile touch targets, creating minor friction in form progression.
- **Evidence**: Layout warnings indicate that 'Back' (71x42px) and 'Save and continue' (150x42px) buttons are just below the 44px height guidance on mobile viewports.
- **Suggested fix**: Increase the vertical padding on 'Back' and 'Save and continue' buttons to reach at least 44px in height, ensuring effortless tapping.

### [LOW] the-auto-save-indicator-auto-saved — feedback
- **Page**: `apply.html auto-saved indicator`
- **Problem**: The auto-save indicator ('Auto-saved · just now') is small and may be easily overlooked, potentially leaving users uncertain if their progress is secured.
- **Evidence**: Visible text shows 'Auto-saved · just now' near the top of the application, but no other prominent visual feedback is provided upon auto-save events.
- **Suggested fix**: Make the auto-save indicator slightly more prominent or use a brief, non-intrusive toast notification when a save event occurs.
