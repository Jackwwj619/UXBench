# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full migration-atlas system, prioritizing the primary data visualization flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: True

## Summary

The atlas is generally functional and stable on both desktop and mobile, with filters, playback, and map updates responding without crashes or clipping. The biggest usability issues are mobile touch friction and weak state feedback: several controls are far too small to tap comfortably, and the study-year selector can change without the visible heading/summary making the change feel reliable. A few untested navigation links remain, but coverage is near-complete for the main data-viz flow.

## Issues (8)

### [HIGH] the-species-filter-checkboxes-are-extremely — mobile usability
- **Page**: `index.html / species filter rail`
- **Problem**: The species filter checkboxes are extremely small touch targets, making reliable selection on mobile difficult even though the filters work when tapped successfully.
- **Evidence**: On mobile, each species checkbox is 13×13px; the layout warnings flag multiple species inputs as below the 44px mobile guidance, and the trajectory notes repeatedly call them 'very small touch targets.'
- **Suggested fix**: Increase the tap area for each species row, not just the checkbox square—make the full label row clickable and add more vertical spacing.

### [HIGH] the-primary-playback-controls-are-also — mobile usability
- **Page**: `index.html / player controls`
- **Problem**: The primary playback controls are also below mobile touch guidance, especially the Play button and speed selector, which makes season scrubbing and animation control feel cramped.
- **Evidence**: The Play button is only 22×40px, the speed select is 71×36px, and the layout warnings flag the Play control as below the 44px guidance.
- **Suggested fix**: Enlarge the play button to a square 44px minimum target and provide a larger, more prominent speed control with clearer spacing.

### [MEDIUM] the-study-year-dropdown-can-be — clarity
- **Page**: `index.html / STUDY YEAR select`
- **Problem**: The study-year dropdown can be changed, but the visible heading/summary can remain on a different season label, creating a state/label mismatch.
- **Evidence**: In mobile testing, selecting the study-year control changed the dropdown to '2024 season,' but the main heading still read 'Migration Atlas — 2025 season'; earlier notes also describe the season selector landing on the wrong option or not visibly applying.
- **Suggested fix**: After season changes, update the title/summary immediately and add a short inline confirmation so the selected season is unmistakable.

### [MEDIUM] the-study-year-select-has-no — accessibility
- **Page**: `index.html / STUDY YEAR select`
- **Problem**: The study-year select has no visible label, aria-label, or placeholder in the DOM summary, reducing its clarity as a form control.
- **Evidence**: The browser observation explicitly reports a missing input label for the select, and the DOM summary shows the select name as the raw options text with an empty label/placeholder.
- **Suggested fix**: Add a visible label tied to the select and an accessible name that clearly states it controls the study year/season.

### [MEDIUM] some-interactions-update-the-page-quietly — feedback
- **Page**: `index.html / player + filters`
- **Problem**: Some interactions update the page quietly, but the feedback is inconsistent; for example, filter and season changes sometimes only show a subtle dropdown value change or a count change without a clear confirmation message.
- **Evidence**: The trajectory notes say the speed selector changed with 'no visible in-UI status text' beyond the dropdown, and the season selector sometimes changed without an obvious visible-text update; the user has to infer success from scattered counts/headings.
- **Suggested fix**: Add brief inline status feedback near the player or inspector when season, speed, or filter states change.

### [LOW] the-top-navigation-items-were-not — navigation
- **Page**: `index.html / top nav`
- **Problem**: The top navigation items were not fully exercised, and the ones tested behave like placeholder anchors rather than clearly distinct destinations.
- **Evidence**: The session memory shows 'Explore,' 'Methods,' and 'Submit a track' remain unvisited, while clicking 'Studies' and 'About' only appended a hash (`index.html#`) and kept the atlas in place.
- **Suggested fix**: Either make these links clearly in-page sections or label them as internal jumps/coming-soon items so expectations are set correctly.

### [LOW] the-attempted-mobile-map-click-failed — goal completion
- **Page**: `index.html / central map + inspector`
- **Problem**: The attempted mobile map click failed due to a null target, so this flow still lacks direct evidence that a user can reliably tap map objects to inspect an individual.
- **Evidence**: The final mobile step failed with 'Click failed for null' and no inspector change; the observations note that the map click did not select an item and the inspector stayed on the default guidance state.
- **Suggested fix**: Make map objects more obviously tappable on mobile and provide larger hit regions or a dedicated selection affordance.

### [LOW] the-filter-rail-is-readable-but — mobile usability
- **Page**: `index.html / left filter rail`
- **Problem**: The filter rail is readable but tightly packed on mobile, with several controls stacked close together, which can make the panel feel cramped even when it does not clip.
- **Evidence**: Multiple notes say the mobile layout remains intact but the left rail has tightly packed controls; the screenshot shows many 13px checkboxes, a long select, and dense label rows in a narrow column.
- **Suggested fix**: Increase row height and spacing in the filter rail, and consider grouping related controls or collapsing secondary options on small screens.
