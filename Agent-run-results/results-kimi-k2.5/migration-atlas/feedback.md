# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full migration-atlas system, prioritizing the primary data visualization flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: True

## Summary

The Migration Atlas has several UX issues: non-functional navigation links (About, Methods, Studies), unresponsive speed selector in mobile, small checkbox tap targets, missing feedback for Save/Cite buttons, and inconsistent study year dropdown. These impact usability, especially for mobile users and those needing navigation or feedback.

## Issues (6)

### [MEDIUM] navigation-links-about-methods-studies-are — navigation
- **Page**: `index.html: ux-4, ux-5`
- **Problem**: Navigation links (About, Methods, Studies) are non-functional, only changing the URL to `index.html#` without displaying relevant content.
- **Evidence**: Clicking the 'About' link (target_id: ux-5) and 'Methods' link (target_id ux-4) resulted in no visible content update or navigation to a new page.
- **Suggested fix**: Fix the links to navigate to relevant pages or display modal content with the information.

### [MEDIUM] the-speed-selector-in-mobile-view — mobile usability
- **Page**: `index.html: ux-17 (mobile view)`
- **Problem**: The speed selector in mobile view does not update to the selected speed (e.g., '2×'), remaining at the default or previous value.
- **Evidence**: Attempts to select '2×' speed in mobile view failed; the speed selector remained at '0.5×' or '1×' despite interaction.
- **Suggested fix**: Fix the speed selector's interaction logic to update the animation speed correctly in mobile view.

### [MEDIUM] checkbox-tap-targets-e-g-species — accessibility
- **Page**: `index.html: ux-4, ux-5, ux-12, ux-13, ux-14`
- **Problem**: Checkbox tap targets (e.g., species, display toggles) are 13x13px, below mobile guidance (44px), making them hard to interact with.
- **Evidence**: Layout warnings highlight checkbox tap targets (13x13px) are below mobile guidance (44px), and the 'Play' button (26x40px) is also below guidance.
- **Suggested fix**: Increase checkbox and button tap targets to at least 44x44px for mobile usability.

### [MEDIUM] buttons-like-save-view-and-cite — feedback
- **Page**: `index.html: ux-6, ux-7`
- **Problem**: Buttons like 'Save view' and 'Cite this view' lack visible feedback (e.g., color change, animation, or text update) when clicked.
- **Evidence**: Clicking 'Save view' (ux-7) and 'Cite this view' (ux-6) resulted in no visible feedback or URL change.
- **Suggested fix**: Add visual feedback (e.g., button color change, success message) to confirm the action was executed.

### [MEDIUM] the-study-year-dropdown-does-not — forms
- **Page**: `index.html: ux-11`
- **Problem**: The 'STUDY YEAR' dropdown does not update the map or aggregate stats when a new year is selected (e.g., '2024 season').
- **Evidence**: After selecting '2024 season' from the dropdown, the visible text still showed 'Migration Atlas — 2025 season' and aggregate stats remained unchanged.
- **Suggested fix**: Ensure the dropdown updates the map and aggregate stats when a new study year is selected.

### [LOW] a-form-field-dropdown-has-no — accessibility
- **Page**: `index.html: ux-11`
- **Problem**: A form field (dropdown) has no label, aria-label, or placeholder, violating accessibility standards.
- **Evidence**: The 'STUDY YEAR' dropdown (target_id: ux-11) has no visible label or accessible name, as highlighted in layout warnings.
- **Suggested fix**: Add a label or aria-label to the dropdown to describe its purpose (e.g., 'Select study year').
