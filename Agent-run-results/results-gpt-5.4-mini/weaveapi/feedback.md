# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full weaveapi system, prioritizing the primary docs/tutorial flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The docs are generally well-structured and the primary onboarding flow is easy to scan, but the deeper reference pages feel cramped on mobile and some controls don’t provide clear interaction feedback. The Charges page is especially strong in content organization and synchronized examples, yet horizontal overflow and undersized tap targets make the experience harder to use on small screens. Search works as a navigation aid in some contexts, but the deep-page mobile search interaction is inconsistent and the site still has a few untested areas, so this is not a fully complete assessment.

## Issues (7)

### [HIGH] the-charges-reference-does-not-fit — mobile usability
- **Page**: `charges.html / mobile viewport`
- **Problem**: The Charges reference does not fit the mobile viewport cleanly, causing horizontal overflow that makes the docs harder to scan and interact with.
- **Evidence**: Final observation shows a mobile viewport of 390px with page width 779px, and earlier mobile observations repeatedly noted the page was wider than the viewport.
- **Suggested fix**: Reflow the docs into a true mobile layout: stack the sidebar, main content, and try-it panel vertically and eliminate horizontal overflow at narrow widths.

### [HIGH] the-code-sample-tabs-and-copy — affordance
- **Page**: `charges.html: EXAMPLE tabs / Copy`
- **Problem**: The code-sample tabs and copy controls are too small to tap reliably on mobile, so key example interactions feel hard to use.
- **Evidence**: Layout warnings on the final mobile observation flag CURL, PYTHON, NODE, GO, and Copy controls as 34–62px wide by 22–24px tall, below mobile tap-target guidance; earlier notes also mention undersized controls in the code-tab/copy area.
- **Suggested fix**: Increase the hit area of tabs and copy buttons to at least 44x44px and add more spacing so each control is easier to select on touch devices.

### [MEDIUM] mobile-code-tab-interaction-does-not — feedback
- **Page**: `charges.html: PYTHON tab`
- **Problem**: Mobile code-tab interaction does not provide strong enough visible feedback, making it unclear whether the language switch happened.
- **Evidence**: Step 79 reports that clicking PYTHON produced no visible change in the example/code area; earlier desktop notes also said some tab changes were not legible enough in the capture.
- **Suggested fix**: Make the active tab and snippet change more obvious with stronger contrast, a clearer selected state, or an animated/updated code block transition.

### [MEDIUM] tapping-the-search-field-on-the — feedback
- **Page**: `charges.html: Search docs…`
- **Problem**: Tapping the search field on the Charges page did not show immediate focus, suggestions, or other confirmation, so the control feels inert.
- **Evidence**: Step 80 says clicking the mobile 'Search docs…' field produced no visible focus state, suggestion list, or content change; earlier global search on the home page did show suggestions, so the behavior is inconsistent by context.
- **Suggested fix**: Ensure the search field always shows a visible focus state and suggestion popover on tap, especially on deep pages where users are likely trying to navigate quickly.

### [MEDIUM] the-page-is-visually-dense-and — visual hierarchy
- **Page**: `charges.html`
- **Problem**: The page is visually dense, and the try-it/code area competes with the reference content rather than feeling comfortably subordinate on small screens.
- **Evidence**: Multiple mobile observations note the right-side code/try-it strip is cramped, the page width exceeds the viewport, and the final screen shows the example controls and response area tightly packed below the parameters table.
- **Suggested fix**: Separate the example/try-it section with stronger spacing or a collapsible mobile panel so the reference content has a clearer reading hierarchy.

### [MEDIUM] left-nav-items-are-sized-below — navigation
- **Page**: `shared left nav`
- **Problem**: Left-nav items are sized below mobile guidance, which makes sidebar navigation feel difficult on touch devices.
- **Evidence**: Session memory and trajectory notes repeatedly report left-nav links around 223x31px on desktop and below 44px guidance on mobile; the final mobile-focused layout warnings also show multiple controls under the recommended touch size.
- **Suggested fix**: Increase sidebar row height and padding on small screens, or replace the persistent sidebar with a more touch-friendly collapsible menu.

### [LOW] a-malformed-mobile-url-path-triggered — trust
- **Page**: `charges.html / file URL handling`
- **Problem**: A malformed mobile URL path triggered a file-not-found network error during exploration, which suggests a brittle path-handling edge case.
- **Evidence**: Session memory records `net::ERR_FILE_NOT_FOUND` for `charges.html%3Fviewport%3Dmobile`, and the final observation also reports a file://-related network error in the mobile context.
- **Suggested fix**: Audit internal navigation and viewport-specific URL handling to ensure malformed or encoded query paths do not surface broken requests.
