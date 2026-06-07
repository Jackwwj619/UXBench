# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full cloudflare-radar system, prioritizing the primary dashboard flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The dashboard communicates section changes reasonably well on desktop through synchronized top-nav and left-rail highlights, but several interaction patterns break down when users try to go deeper or recover from overlays. The biggest UX problems are blocked or hard-to-dismiss drawers/modals, weak feedback for search/filter actions, and mobile controls that are too small or remain off-canvas. Coverage is only partial (39% of visible features exercised), so some deeper content areas remain untested.

## Issues (9)

### [HIGH] recovery-from-overlays-is-unreliable-especially — error recovery
- **Page**: `index.html mobile modal #modalLayer / Radar API dialog`
- **Problem**: Recovery from overlays is unreliable, especially on mobile. The Radar API modal remained open after repeated dismissal attempts, leaving the underlying dashboard blocked and making it unclear how to get back.
- **Evidence**: Recent mobile steps 77-80 show the Radar API modal still visible after click and keyboard attempts; clicking the header API control failed because "#modalLayer ... intercepts pointer events," and pressing Escape produced no visible change. Final screenshot /Users/timchef/UXBench/results-gpt-5.4/cloudflare-radar/_run/screenshots/agentic-80-press_key-mobile.png still shows the modal overlay with a visible × while the dashboard is dimmed behind it.
- **Suggested fix**: Make modal dismissal more robust and redundant: ensure the visible close button is always reachable, support tap-outside and Escape/back dismissal, trap focus correctly, and visibly restore the prior dashboard state after close.

### [HIGH] the-filter-workflow-is-fragile-because — forms
- **Page**: `index.html #filterDrawer button.solid-button / Run query`
- **Problem**: The filter workflow is fragile because the main submit action can become unclickable while the filter drawer is open, even though the button appears visible and enabled.
- **Evidence**: In steps 13-18, clicking "Run query" timed out because the open filter drawer and its labels intercepted pointer events: "<aside id='filterDrawer' ...> intercepts pointer events." The drawer stayed open, and the summary still showed prior state such as "Scope Worldwide, all networks" and "Comparison Previous period."
- **Suggested fix**: Ensure the primary action remains fully clickable and visually stable. Prevent overlapping elements from intercepting clicks, keep the CTA fixed within the drawer viewport, and show a clear applied state only after the query actually runs.

### [MEDIUM] search-submission-gives-almost-no-feedback — feedback
- **Page**: `index.html LOOKUP field 'Domain, IP, ASN, or report'`
- **Problem**: Search submission gives almost no feedback when it does not produce an immediate result, so users cannot tell whether Enter worked, whether there are no matches, or whether another action is required.
- **Evidence**: In steps 37-42, the LOOKUP field accepted "chatgpt," but typing showed no autocomplete suggestions, filtering hints, no-results message, or result-state change. Pressing Enter also produced no detectable state change; tool_result.changed=false and the URL stayed at index.html#.
- **Suggested fix**: Add explicit search feedback such as suggestions, loading state, result count, empty-state messaging, or inline helper text explaining how to submit and what entities are supported.

### [MEDIUM] scope-location-state-is-duplicated-and — clarity
- **Page**: `index.html top filter bar / scope summary`
- **Problem**: Scope/location state is duplicated and not clearly differentiated, which makes it harder to tell what is currently applied versus what is merely a control label.
- **Evidence**: Session notes repeatedly observed the location control as "Worldwide" with helper text "All locations and networks" while the dashboard also displayed a separate summary chip/state reading "Scope Worldwide, all networks." After interactions, the control still appeared as "Worldwide," with little obvious change to indicate a new selection or closed/open state.
- **Suggested fix**: Consolidate applied scope into a single prominent state representation, or clearly separate the editable control from the currently applied filter summary. Show stronger before/after feedback when scope changes.

### [MEDIUM] many-section-changes-happen-entirely-in — navigation
- **Page**: `index.html SPA section navigation`
- **Problem**: Many section changes happen entirely in-page without distinct URL updates, which weakens deep-linking, back-button expectations, and confidence that navigation truly changed state.
- **Evidence**: Across multiple chunks, successful nav actions changed visible content but left the address as index.html# rather than a more specific hash such as #reports, #traffic, #connectivity, or #outages. Examples were noted for Traffic, Reports, Connectivity, Security, and left-rail subsection changes.
- **Suggested fix**: Update the URL/hash consistently for section and subsection changes, and keep active-state styling synchronized with those route changes.

### [MEDIUM] mobile-tap-targets-are-frequently-undersized — mobile usability
- **Page**: `index.html mobile header and nav items`
- **Problem**: Mobile tap targets are frequently undersized, making common actions harder to hit accurately and increasing the chance of mistaps.
- **Evidence**: The final observation reports many small tap-target warnings, including Open navigation 38x38, Search 38x38, API 48x38, Cloudflare Radar home 107x28, and multiple drawer/nav items at 32-34px height. Session notes also flagged the top-nav 'Traffic' link on desktop as small for touch use.
- **Suggested fix**: Increase target heights to at least mobile guidance, add more spacing between adjacent controls, and prioritize larger touch areas for header actions and navigation rows.

### [MEDIUM] mobile-navigation-links-appear-to-remain — mobile usability
- **Page**: `index.html mobile side navigation links, e.g. a[href='#traffic-type']`
- **Problem**: Mobile navigation links appear to remain off-canvas or otherwise not fully brought into the active viewport, so a visible item can still behave like it is unreachable.
- **Evidence**: Steps 67-72 show repeated failure clicking the mobile 'Traffic by type' nav link because it was "outside of the viewport" on every retry, with bbox x=-278. The final interactables list also shows multiple nav links with negative x positions, indicating off-screen placement while the drawer state is still affecting the layout.
- **Suggested fix**: Ensure the mobile drawer fully enters the viewport, closes cleanly after selection, and does not leave links partially off-screen. Add stronger visual and motion cues for opened/closed drawer state.

### [LOW] card-level-actions-like-explore-inspect — affordance
- **Page**: `index.html cards: Protocol usage / Traffic by type`
- **Problem**: Card-level actions like Explore, Inspect, and tile selections often provide subtle or unclear feedback, so it is hard to tell whether the card is interactive, selected, or supposed to navigate deeper.
- **Evidence**: In steps 19-24, clicking IPv6 in the Protocol usage card produced only a subtle selected state and contextual label ('IPv6 selected') with no navigation or stronger feedback. In mobile steps 67-72 and 73-78, visible CTAs like 'Inspect' and the intended card 'Explore' objective were not meaningfully validated, while the screen continued to show the same cards without clear drill-in state.
- **Suggested fix**: Differentiate selectable in-card filters from true drill-in actions, strengthen pressed/selected states, and provide a more explicit transition or detail panel when users choose to go deeper.

### [LOW] subsection-highlighting-can-be-ambiguous-because — clarity
- **Page**: `index.html left sidebar subsection navigation`
- **Problem**: Subsection highlighting can be ambiguous because multiple sibling items sometimes appear emphasized at once.
- **Evidence**: In the connectivity area, notes from steps 19-24 reported that the group was expanded and 'Quality' was highlighted, but sibling items such as 'Speed' and '1.1.1.1 resolver' also had strong boxed emphasis. In steps 43-48, both 'Bot traffic' and 'AI crawlers' appeared highlighted in the same grey pill style after navigation.
- **Suggested fix**: Use one clearly dominant active style for the current subsection and a visually weaker style for merely related or available siblings.
