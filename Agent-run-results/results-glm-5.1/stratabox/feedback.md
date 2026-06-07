# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full stratabox system, prioritizing the primary pricing flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: True

## Summary

Stratabox's marketing site offers a compelling interactive builder and live preview, but suffers from critical mobile usability issues and dead-end CTAs that undermine conversion. Primary calls-to-action like 'Book a demo' and 'Start free' are non-functional, providing zero feedback. On mobile, the layout fails to adapt, leaving desktop-sized navigation and severely undersized touch targets, making the site frustrating to use on smaller devices.

## Issues (7)

### [HIGH] primary-ctas-book-a-demo-start — feedback
- **Page**: `index.html: Book a demo, Start free →, See full plans →`
- **Problem**: Primary CTAs ('Book a demo', 'Start free →', 'See full plans →') are dead links (href='#') that provide no visual feedback, navigation, or modal upon clicking.
- **Evidence**: Clicking 'Book a demo' (ux-11) and 'Start free →' (ux-10) only appends '#' to the URL without triggering a modal, toast, or scroll. Same for 'See full plans →' (ux-34).
- **Suggested fix**: Implement functional destinations for these CTAs (e.g., signup form, demo booking calendar) or provide clear visual feedback if the feature is not yet available.

### [HIGH] the-site-layout-does-not-adapt — mobile usability
- **Page**: `index.html: <nav>, .header`
- **Problem**: The site layout does not adapt to mobile viewports; the desktop horizontal navigation remains, resulting in severely undersized tap targets and cramped UI.
- **Evidence**: When switching to the mobile viewport, the layout remains multi-column with full horizontal nav links. Nav links like 'Sign in' (45x17px) and 'Start free' (100x35px) fall far below the 44px mobile touch guidance.
- **Suggested fix**: Implement a responsive mobile layout that collapses the navigation into a hamburger menu and ensures all interactive elements meet the 44px minimum touch target size.

### [HIGH] the-builder-s-delete-button-is — mobile usability
- **Page**: `index.html: .block-delete, ux-52`
- **Problem**: The builder's delete button ('×') is severely undersized (21x22px), making it incredibly difficult to tap on mobile without accidentally hitting adjacent elements.
- **Evidence**: Layout warnings flag the '×' button (ux-52, ux-55) as 21x22px, well below the 44px mobile guidance, posing a high risk of accidental taps.
- **Suggested fix**: Increase the tap target size of the delete button to at least 44x44px, possibly by adding padding or using a larger icon with a visible touch area.

### [MEDIUM] footer-links-e-g-cli-contact — feedback
- **Page**: `index.html: <footer>`
- **Problem**: Footer links (e.g., CLI, Contact, Careers, Changelog, Assets) are non-functional placeholder links that provide no feedback or navigation.
- **Evidence**: Clicking footer links like 'CLI' (ux-50), 'Contact' (ux-55), and 'Careers' (ux-54) changes the URL to '#' but provides no visible scroll, navigation, or state change.
- **Suggested fix**: Either link these to their respective pages or sections, or remove/hide them if the content does not yet exist. Consider a 'Coming Soon' label if appropriate.

### [MEDIUM] the-block-type-switcher-select-dropdown — accessibility
- **Page**: `index.html: ux-50, select element in builder`
- **Problem**: The block type switcher (select dropdown) in the builder lacks an accessible label, aria-label, or placeholder, failing accessibility standards.
- **Evidence**: A medium severity layout warning indicates the select element (ux-50) has no label, aria-label, or placeholder, impacting screen reader users.
- **Suggested fix**: Add a visible label element associated with the select, or at minimum, add an aria-label attribute (e.g., aria-label='Block type').

### [MEDIUM] the-integrations-search-input-placeholder-does — feedback
- **Page**: `index.html: #integrations search input`
- **Problem**: The integrations search input placeholder does not dynamically update to reflect the number of filtered results, leaving the count stale.
- **Evidence**: After typing 'Git' into the search input (ux-38), the placeholder text remains 'Search 24 visible integrations…' instead of updating to reflect the filtered count (e.g., '1 visible integration').
- **Suggested fix**: Update the placeholder or an adjacent live region dynamically as the user types to display the current count of matching integrations.

### [LOW] the-delete-button-on-builder-blocks — affordance
- **Page**: `index.html: .builder-block`
- **Problem**: The '×' delete button on builder blocks is not persistently visible and requires hovering over the block to appear, which is a weak affordance.
- **Evidence**: The '×' delete button was not present in the interactables list until hovering over the builder block input, indicating a hover-to-reveal interaction pattern.
- **Suggested fix**: Make the delete button persistently visible or provide a clear visual hint (like an edit mode) that indicates the blocks are interactive and deletable.
