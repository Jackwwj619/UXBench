# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full tessera system, prioritizing the primary docs/tutorial flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

Tessera’s docs architecture is strong on desktop: users can scan deep reference pages, jump via search, and orient themselves with the persistent TOC and on-page outline. The main UX risks are on mobile, where the header becomes cramped, the version selector is unlabeled, and dense tables overflow horizontally, making key reference content harder to inspect. There are also two trust/clarity issues in the onboarding/nav layer: some large quick-start cards behave like dead ends, and version switching does not visibly confirm a page update. Coverage is broad across core docs pages, but several deep data-type links remain untested, so the findings focus on the interactions that were actually observed.

## Issues (8)

### [HIGH] the-data-types-page-overflows-the — mobile usability
- **Page**: `data-types.html`
- **Problem**: The data types page overflows the 390px mobile viewport, so table content is clipped at the right edge and cannot be fully read without horizontal scrolling.
- **Evidence**: Mobile observations report page width 592px vs 390px viewport on data-types.html, and the screenshot shows clipped table columns. The final observation notes horizontal overflow persists even after scrolling through Numeric, String, Boolean, Date / Time, and Composite sections.
- **Suggested fix**: Make the tables responsive for narrow screens by stacking columns, allowing horizontal table scroll with clear affordance, or collapsing less-critical columns into expandable rows.

### [HIGH] the-version-switcher-is-unlabeled-and — forms
- **Page**: `index.html / data-types.html`
- **Problem**: The version switcher is unlabeled and the selection change does not produce clear visible page feedback, so users cannot tell whether they successfully changed versions.
- **Evidence**: The select on index.html and data-types.html is reported as having no label/aria-label/placeholder. On index.html, selecting v2.3 updated the control value, but the page still visibly showed the v2.4 badge and hero copy; on data-types.html, clicking the select produced no obvious visible change.
- **Suggested fix**: Add an accessible label such as 'Version', and after selection update the page content, URL, or a prominent confirmation badge so the change is unmistakable.

### [HIGH] some-large-quick-start-cards-look — feedback
- **Page**: `index.html`
- **Problem**: Some large quick-start cards look highly actionable but do nothing when clicked, creating misleading dead-end affordances.
- **Evidence**: On mobile, clicking the 'Install' quick-start card produced no navigation, URL change, or visible content change; clicking 'Connect' also did not navigate or change visible text. The cards are very large touch targets (e.g. 342×147px), so the inert behavior is especially noticeable.
- **Suggested fix**: Either make each card navigate to a real destination or visually mark inert cards as disabled/non-clickable; if they are placeholders, remove the click affordance entirely.

### [MEDIUM] key-header-controls-are-too-small — accessibility
- **Page**: `index.html / data-types.html`
- **Problem**: Key header controls are too small for touch and the version selector lacks a visible/accessible label, making the compact global nav harder to operate and understand on mobile.
- **Evidence**: Mobile layout warnings on data-types.html flag the Tessera logo at 100×26px and the theme toggle at 42×37px, both below the 44px guidance. The version select is explicitly reported as missing a label/aria-label/placeholder. Similar small-tap-target warnings appear across index.html and function pages.
- **Suggested fix**: Increase hit areas, add explicit labels, and give the version select a visible text label or an accessible name that explains its purpose.

### [MEDIUM] search-is-discoverable-and-gives-results — clarity
- **Page**: `index.html`
- **Problem**: Search is discoverable and gives results feedback, but some other global controls lack equally clear state confirmation, especially the version switcher.
- **Evidence**: ⌘K search opens a modal with a visible input and 'NO RESULTS' state, showing good feedback. In contrast, version changes on index.html did not visibly alter the page, and the user only saw the select value change, not a clear page-state update.
- **Suggested fix**: Mirror the strong search feedback pattern for version switching by updating the page copy, badge, or URL, and briefly confirming the active version in a prominent location.

### [MEDIUM] a-top-nav-item-labeled-tutorials — navigation
- **Page**: `index.html`
- **Problem**: A top-nav item labeled Tutorials behaves like a no-op, which undermines the credibility of the primary navigation.
- **Evidence**: Clicking Tutorials on index.html only changed the URL to index.html# and kept the user on the same page. The interaction felt inert compared with working links like Reference.
- **Suggested fix**: Either link Tutorials to a real page or hide it until the destination exists; if it is intentionally placeholder content, mark it as such instead of using a clickable nav item.

### [LOW] the-search-overlay-shows-a-no — feedback
- **Page**: `index.html`
- **Problem**: The search overlay shows a no-results state but does not clearly close or hand control back to browsing, leaving the user in an awkward intermediate state.
- **Evidence**: Typing queries such as 'row number' and 'json extract' produced visible 'NO RESULTS' feedback, but Escape did not visibly change the URL or text and the modal remained open over the docs page. The underlying page stayed visible, but the overlay still dominated context.
- **Suggested fix**: Add a clearer close action, allow Escape to reliably dismiss the overlay, and provide suggested alternatives or nearby matches when no results are found.

### [LOW] the-docs-layout-is-strong-on — visual hierarchy
- **Page**: `reference.html / data-types.html`
- **Problem**: The docs layout is strong on desktop but visually dense, and on mobile the same structure becomes crowded enough that important controls and table content compete for attention.
- **Evidence**: Reference and function pages use a three-column layout with left TOC, center content, and right outline, which is excellent on desktop. On mobile, the header compresses, controls become small, and the content width exceeds the viewport on data-types.html, reducing scanning ease.
- **Suggested fix**: Preserve the current desktop hierarchy, but introduce a mobile-specific stack: collapse side rails, enlarge primary controls, and prioritize the active section/table within the viewport.
