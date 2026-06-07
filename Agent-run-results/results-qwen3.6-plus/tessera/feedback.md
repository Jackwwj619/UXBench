# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full tessera system, prioritizing the primary docs/tutorial flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The Tessera documentation site features a robust three-column layout with clear information hierarchy, but suffers from significant mobile usability and accessibility gaps. Critical issues include horizontal overflow on mobile viewports that truncates operator tables, sub-44px tap targets for global navigation controls, and an unlabeled version switcher. Additionally, the primary 'Get started' CTA is a non-functional placeholder, breaking the initial user journey.

## Issues (5)

### [HIGH] horizontal-overflow-causes-content-truncation-on — mobile usability
- **Page**: `operators.html | mobile viewport`
- **Problem**: Horizontal overflow causes content truncation on mobile screens (viewport width 390px vs page width 465px).
- **Evidence**: Layout warnings in steps 73-80 indicate 'Page width 465px exceeds viewport 390px'. The final screenshot shows the 'Precedence' column of the Operators table cut off at the right edge, requiring horizontal scrolling to view full data.
- **Suggested fix**: Implement responsive table design: enable horizontal scrolling within the table container with a visual indicator, or stack/abbreviate less critical columns on narrow viewports.

### [HIGH] the-primary-get-started-button-is — goal completion
- **Page**: `index.html | #get-started-btn`
- **Problem**: The primary 'Get started' button is a dead link (href='#').
- **Evidence**: In steps 37-42 and 61-66, clicking 'Get started' only appended a hash fragment to the URL without navigating to installation or quickstart content. The agent noted this as a 'broken or placeholder user journey'.
- **Suggested fix**: Link the 'Get started' button to the 'Install' or 'Your first query' section/card identified in the homepage hero area.

### [MEDIUM] the-version-switcher-dropdown-lacks-an — accessibility
- **Page**: `Global Header | .version-switcher`
- **Problem**: The version switcher dropdown lacks an accessible label, aria-label, or placeholder text.
- **Evidence**: Multiple layout warnings (steps 25-30, 43-48, 67-72) flag 'missing_input_label' for the version selector (ux-2/ux-7). The DOM summary confirms the select element has no associated label.
- **Suggested fix**: Add an aria-label='Select documentation version' or visually hidden label to the <select> element.

### [MEDIUM] multiple-header-tap-targets-are-below — mobile usability
- **Page**: `Global Header | nav-controls`
- **Problem**: Multiple header tap targets are below the recommended 44x44px minimum size.
- **Evidence**: Layout warnings consistently identify small targets: 'Tessera' logo (100x26px), Theme toggle (42x37px), and Version switcher height (33px). Steps 67-72 confirmed these persist in mobile viewport.
- **Suggested fix**: Increase the padding or hit-area of these buttons to meet the 44x44px WCAG/mobile guideline, even if the visual icon remains smaller.

### [LOW] the-search-modal-lacks-a-visible — error recovery
- **Page**: `Search Modal | .cmdk-modal`
- **Problem**: The search modal lacks a visible 'X' close button, relying on clicking outside or keyboard shortcuts.
- **Evidence**: In steps 73-78, the agent noted 'No explicit close button... is visible'. The agent had to use the Escape key (step 79) to recover when clicking the background failed initially due to overlay interception issues.
- **Suggested fix**: Add a visible 'X' icon in the top-right corner of the search modal for clear affordance.
