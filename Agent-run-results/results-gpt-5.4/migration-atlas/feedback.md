# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full migration-atlas system, prioritizing the primary data visualization flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: True

## Summary

The atlas communicates its core data state reasonably well when filters and playback work, but several key interactions feel unreliable or silent, which hurts trust in a data exploration tool. The biggest UX issues are state synchronization problems in the season/filter summaries, utility actions that provide no confirmation, and mobile controls that are cramped or too small for confident touch use. Accessibility is also weakened by unlabeled form controls and icon-only interactions.

## Issues (8)

### [HIGH] the-study-year-control-can-become — trust
- **Page**: `index.html / study year select / target ux-11`
- **Problem**: The study year control can become out of sync with the page heading and visible data, making it unclear which season is actually being shown.
- **Evidence**: In steps 37-42 on mobile, selecting '2026 season (in progress)' failed and instead showed the select on '2024 season' while the page heading still read 'Migration Atlas — 2025 season'. Earlier session memory also notes the year control did not achieve the intended switch to 2026 and left the page showing 2025 metrics.
- **Suggested fix**: Make season changes atomic and clearly confirmed: keep the select, heading, map, and stats synchronized, and show a visible loading/updating state or confirmation whenever the season changes. If '2026 season (in progress)' is limited, explain that explicitly instead of leaving mixed states.

### [HIGH] primary-utility-actions-appear-to-do — feedback
- **Page**: `index.html header buttons / targets ux-1 and ux-2`
- **Problem**: Primary utility actions appear to do nothing after being clicked, with no toast, dialog, copied-state, URL update, or persistence cue.
- **Evidence**: Steps 07-12 found that both 'Cite this view' and 'Save view' produced no detectable feedback on desktop. The final mobile step (agentic-49-click) again found 'Save view' caused no URL change, no dialog (dialogs count 0), and no visible text change.
- **Suggested fix**: Add immediate confirmation states such as 'Copied citation', 'View saved', a toast, a modal with the generated citation, or a persistent saved/shareable URL indicator.

### [HIGH] the-aggregate-summary-can-disagree-with — goal completion
- **Page**: `index.html filter rail and center summary`
- **Problem**: The aggregate summary can disagree with the visible filter state, so users cannot rely on the counts after changing species selections or using search.
- **Evidence**: When searching 'whale', only 'Humpback whale (n=11)' remained visible in the list, but the summary still reported '2 SPECIES SHOWN'. In steps 19-24, checking 'Wandering albatross (n=4)' left the header showing '5 SPECIES SHOWN' and '65 INDIVIDUALS' even though six checkboxes were visibly checked.
- **Suggested fix**: Separate 'search results shown' from 'species selected' more explicitly, and ensure the summary recalculates immediately from the active checked species. If search is only narrowing the list view, label it as such.

### [MEDIUM] many-mobile-controls-are-undersized-or — mobile usability
- **Page**: `mobile screenshot agentic-49-click-mobile.png; targets ux-4 to ux-15`
- **Problem**: Many mobile controls are undersized or crowded, especially the 13x13px checkboxes and the small icon-only play button near the slider and speed menu.
- **Evidence**: Mobile layout warnings repeatedly flag species and display checkboxes at 13x13px and the play button at 26x40px. Chunk summaries note top-nav items and controls are under 44px guidance, and the playback area is described as cramped with compressed month labels.
- **Suggested fix**: Increase tap areas for checkboxes and player controls to at least mobile guidance size, add spacing around the slider/play/speed cluster, and consider making the entire row label tappable for each checkbox.

### [MEDIUM] important-form-controls-are-missing-accessible — accessibility
- **Page**: `final observation layout warning for ux-11; player controls ux-15, ux-16, ux-17`
- **Problem**: Important form controls are missing accessible labeling, and some interactions rely on symbols alone.
- **Evidence**: The final observation includes a 'missing_input_label' warning for the study-year select (ux-11). The play control is icon-only in the visible UI ('▶'/'⏸'), and the slider itself appears with no visible label beyond surrounding context.
- **Suggested fix**: Provide explicit labels or aria-labels for the season select, speed select, range slider, and playback button; expose the current month in a clear textual label tied to the slider.

### [MEDIUM] on-mobile-the-current-month-feedback — clarity
- **Page**: `agentic-48-drag-mobile.png / mobile player`
- **Problem**: On mobile, the current-month feedback is weak once the slider is in view; month labels compress into a dense row and the selected month is hard to identify at a glance.
- **Evidence**: Recent step 48 notes the labels render as a continuous 'JanFebMarAprMayJunJulAugSepOctNovDec' string, with weak current-month feedback. The captured mobile views show dense labels under the slider and limited explicit month emphasis in the player area.
- **Suggested fix**: Show the current month in a prominent dedicated label near the slider thumb or above the player, and reduce label density on mobile by abbreviating or showing only key ticks.

### [MEDIUM] the-playback-speed-selector-behaves-unpredictably — feedback
- **Page**: `index.html player speed select / target ux-17`
- **Problem**: The playback speed selector behaves unpredictably, selecting unintended values instead of the chosen speed.
- **Evidence**: In steps 19-24, attempting to choose '4×' resulted in '0.5×'. In recent step 47 on mobile, selecting '2×' resulted in '1×', with the reflection explicitly noting the dropdown can switch to an unintended value.
- **Suggested fix**: Stabilize the selector interaction and provide stronger confirmation of the chosen speed, such as showing the active value adjacent to the play button or briefly surfacing a changed-state cue.

### [LOW] several-header-navigation-items-look-like — navigation
- **Page**: `index.html top navigation`
- **Problem**: Several header navigation items look like real destinations but behave like no-op placeholders or redundant self-links.
- **Evidence**: Steps 07-12 found that 'Studies', 'Submit a track', 'Methods', and 'About' changed little or only added '#', with no visible content or page change. Steps 19-24 found 'Explore' behaved as a redundant self-link returning from index.html# to index.html.
- **Suggested fix**: Either connect these links to real sections/pages, convert them into clearly labeled inactive placeholders only in demos, or remove them until they work.
