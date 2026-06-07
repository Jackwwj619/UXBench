# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full runeforge-docs system, prioritizing the primary checkout/booking flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The docs site has strong orientation and scannability overall: onboarding, reference anchors, and examples filtering all generally work, and search opens a recognizable command palette. The biggest UX risks are mobile touch usability and clarity of state changes: the header contains many undersized controls, the version selector is unlabeled and appears inert, and the examples filter/reset flow does not give trustworthy feedback on mobile. Coverage is broad across the main pages, but several top-nav destinations and some reference sections remain untested, so the issues below focus on the consistently observed interaction problems.

## Issues (9)

### [HIGH] the-version-selector-is-hard-to — forms
- **Page**: `index.html / api-reference.html top bar, select v3.4 (latest)`
- **Problem**: The version selector is hard to understand and does not give visible confirmation when activated, so users cannot tell whether a version change is available or happened.
- **Evidence**: On index.html and api-reference.html, clicking the version select produced no visible menu, state change, or URL change. It is also flagged as a missing input label / unlabeled select in the DOM summary and layout warnings.
- **Suggested fix**: Give the control a visible label or stronger affordance, and show an obvious open state or version-change confirmation when tapped/clicked.

### [HIGH] the-top-bar-contains-many-tap — mobile usability
- **Page**: `Global header on index.html / examples.html / api-reference.html`
- **Problem**: The top bar contains many tap targets that are below mobile size guidance, making primary navigation and utilities difficult to use on touch screens.
- **Evidence**: Across index.html, api-reference.html, and examples.html mobile/desktop checks, controls like Docs, API, Blog, Community, Search docs ⌘K, theme toggle, star button, and the brand link were repeatedly flagged as under 44px tall; the mobile observation also shows horizontal overflow.
- **Suggested fix**: Increase hit areas to at least 44px high, reduce header density on mobile, and consider collapsing secondary links into a menu.

### [HIGH] the-clear-reset-affordance-in-the — error recovery
- **Page**: `examples.html search/filter input`
- **Problem**: The clear/reset affordance in the mobile examples filter is visible but does not provide reliable feedback that the filter was cleared.
- **Evidence**: On examples.html mobile, repeated clicks on the filter input/clear area left the query text as `async` and the gallery remained filtered; the final observation still shows the narrowed set rather than a reset state. The recent trajectory also notes no obvious text or URL change after the action.
- **Suggested fix**: Make the clear action explicit and deterministic: ensure the x control clears the field, immediately restores the full card set, and shows a brief visible reset state.

### [HIGH] the-examples-page-overflows-horizontally-on — mobile usability
- **Page**: `examples.html mobile observation / layout warning`
- **Problem**: The examples page overflows horizontally on mobile, so the filter controls and card grid sit in a wider-than-screen layout that can require extra panning.
- **Evidence**: The mobile observation reports page width 536px versus a 390px viewport, and the trajectory repeatedly notes horizontal overflow while interacting with the examples filter area.
- **Suggested fix**: Rework the mobile layout to fit the viewport, stack controls vertically, and avoid fixed-width regions that force sideways scrolling.

### [MEDIUM] the-command-palette-opens-clearly-but — feedback
- **Page**: `index.html search command palette`
- **Problem**: The command palette opens clearly, but keyboard interaction gives confusing navigation feedback because ArrowDown jumps away to a page anchor instead of visibly selecting a suggestion.
- **Evidence**: On index.html and mobile index.html, Search docs ⌘K opened a centered overlay with input and hints, but ArrowDown led to api-reference.html#forge rather than an observable selection state in the palette.
- **Suggested fix**: Keep keyboard focus inside the palette until Enter is pressed, show a visible highlighted suggestion, and only navigate after an explicit selection.

### [MEDIUM] the-version-selector-lacks-an-accessible — accessibility
- **Page**: `Header select on index.html / examples.html / api-reference.html`
- **Problem**: The version selector lacks an accessible name, which reduces discoverability and makes the control ambiguous for non-visual users.
- **Evidence**: Layout warnings repeatedly flag the header select as a missing_input_label on index.html, examples.html, and api-reference.html, and the element is described as unlabeled in the DOM summary.
- **Suggested fix**: Add a visible label or aria-label that explains what versions are being switched, and make the current version explicit.

### [MEDIUM] category-chips-on-the-examples-page — visual hierarchy
- **Page**: `examples.html filter chips`
- **Problem**: Category chips on the examples page are visually compact, which weakens the filter bar’s prominence and makes the controls feel secondary to the content below.
- **Evidence**: On mobile examples.html, the chips are only 27px tall and several are flagged as small tap targets; the same compact pattern appears on desktop with the filter row sitting close to the top of the card grid.
- **Suggested fix**: Increase chip height and spacing, and give the filter row a stronger container or section label so it reads as a primary control area.

### [LOW] the-page-supports-in-page-anchors — navigation
- **Page**: `api-reference.html anchors and error-code table`
- **Problem**: The page supports in-page anchors well, but the dense reference structure makes it easy to lose context in a long section list, especially on mobile where overflow is present.
- **Evidence**: Clicks to asyncSlice() and derive() updated the hash and kept adjacent sections scannable, but the mobile API reference still shows horizontal overflow while deeper content remains in a dense table-like layout.
- **Suggested fix**: Add slightly stronger section separation and consider a sticky subsection index or jump bar for long reference pages on mobile.

### [LOW] some-top-navigation-items-appear-as — trust
- **Page**: `Top navigation on api-reference.html / examples.html`
- **Problem**: Some top navigation items appear as inert or placeholder links without clear feedback, which can make the site feel incomplete.
- **Evidence**: The trajectory and unexplored features list show Blog and Community as clickable items, but prior actions reported no visible URL/text change for some top-bar probes and these destinations were not meaningfully exercised.
- **Suggested fix**: If destinations are intentionally placeholders, label them clearly as coming soon; otherwise make the links visibly active and test their destination states.
