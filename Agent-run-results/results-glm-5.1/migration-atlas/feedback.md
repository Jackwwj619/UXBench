# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full migration-atlas system, prioritizing the primary data visualization flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: True

## Summary

The Migration Atlas delivers a functional core data-visualization flow on desktop, but suffers from severe mobile usability issues and several interaction dead-ends. Critical problems include undersized tap targets across all filter checkboxes and player controls, a complete lack of feedback for 'Cite this view' and 'Save view' actions, and non-functional navigation links. Additionally, the study year dropdown fails to update the map state, and key form controls lack accessible labels.

## Issues (7)

### [HIGH] all-species-and-display-option-checkboxes — mobile usability
- **Page**: `index.html: species checkboxes (ux-4 to ux-10), display checkboxes (ux-12 to ux-14)`
- **Problem**: All species and display option checkboxes have a severely undersized tap target of 13x13px, making them incredibly difficult to activate accurately on touch devices.
- **Evidence**: Layout warnings consistently flag 13x13px tap targets for checkboxes (e.g., Western osprey, Show trail) across both desktop and mobile viewports, well below the 44px mobile guidance.
- **Suggested fix**: Increase the clickable area of checkboxes to at least 44x44px using CSS padding or a custom checkbox component, ensuring the label text is also clickable.

### [HIGH] clicking-the-cite-this-view-and — feedback
- **Page**: `index.html: Cite this view (ux-6), Save view (ux-2)`
- **Problem**: Clicking the 'Cite this view' and 'Save view' buttons produces absolutely no visible feedback, leaving users unsure if the action succeeded or failed.
- **Evidence**: Trajectory chunks note that clicking 'Cite this view' and 'Save view' resulted in no toast, modal, URL change, or clipboard feedback.
- **Suggested fix**: Implement clear feedback mechanisms, such as a toast notification confirming 'View saved' or 'Citation copied to clipboard', and update button states momentarily.

### [HIGH] changing-the-study-year-dropdown-does — goal completion
- **Page**: `index.html: Study year select (ux-11)`
- **Problem**: Changing the study year dropdown does not update the map header, visualization, or aggregate stats, breaking the expected data binding.
- **Evidence**: Selecting '2024 season' in the study year dropdown failed to change the map header from '2025 season' or update the stats, indicating a broken state synchronization.
- **Suggested fix**: Ensure the JavaScript event listener on the study year dropdown correctly triggers a re-render of the map, stats, and header for the selected season.

### [MEDIUM] navigation-links-for-studies-submit-a — navigation
- **Page**: `index.html: nav links (Studies, Submit a track, Methods, About)`
- **Problem**: Navigation links for 'Studies', 'Submit a track', 'Methods', and 'About' are non-functional placeholders that only append '#' to the URL.
- **Evidence**: Clicking 'Studies', 'Submit a track', 'Methods', and 'About' resulted in no visible modal, scroll, or state change, only appending '#' to the URL.
- **Suggested fix**: Either implement the destination content (modals or pages) for these links, or visually distinguish them as 'coming soon' and disable them to manage expectations.

### [MEDIUM] the-study-year-select-dropdown-lacks — accessibility
- **Page**: `index.html: Study year select (ux-11)`
- **Problem**: The study year select dropdown lacks an associated label, aria-label, or placeholder, failing accessibility standards.
- **Evidence**: A medium-severity layout warning flags the study year select (ux-11) for missing an accessible label.
- **Suggested fix**: Add a visible <label> element associated with the select, or at minimum an aria-label attribute (e.g., aria-label='Study year').

### [MEDIUM] on-mobile-the-inspector-panel-stacks — mobile usability
- **Page**: `index.html: mobile viewport layout`
- **Problem**: On mobile, the inspector panel stacks far below the map, requiring significant scrolling to view details after clicking a map element, and the map player controls are hard to reach.
- **Evidence**: Observations note that the inspector panel requires significant scrolling to view after a map click, and player controls are located at y=1094, far down the mobile viewport.
- **Suggested fix**: Consider a bottom-sheet pattern for the inspector panel on mobile that can be swiped up, and ensure player controls are sticky or easily accessible near the map.

### [LOW] the-play-pause-button-and-the — mobile usability
- **Page**: `index.html: Play button (ux-15), Month slider (ux-16)`
- **Problem**: The Play/Pause button and the month slider have tap targets (26x40px and 16px height, respectively) that are too small for comfortable mobile interaction.
- **Evidence**: Layout warnings flag the Play button (26x40px) and month slider (16px height) as below the 44px mobile guidance.
- **Suggested fix**: Increase the padding around the Play button to meet the 44px minimum, and increase the height of the range slider track/thumb for better touch targeting.
