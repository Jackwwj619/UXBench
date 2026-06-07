# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full tessera system, prioritizing the primary docs/tutorial flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

Tessera’s docs are generally easy to orient within once a real page loads: the homepage CTA path works, reference pages have clear titles, and function/detail pages use a strong scan-friendly structure. However, several highly visible controls and links behave like placeholders or appear inert, which creates trust problems because users are invited to click paths that do not go anywhere or give no feedback. Mobile usability also needs attention: the docs show horizontal overflow, small tap targets, and an unlabeled version selector, while global search has a blocking overlay failure that harms recovery.

## Issues (8)

### [HIGH] the-global-search-overlay-can-trap — goal completion
- **Page**: `Global search overlay (#cmdkOverlay) on index.html, operators.html, reference.html, function-date-trunc.html`
- **Problem**: The global search overlay can trap users in a blocked state: tapping visible results does not navigate, and the overlay intercepts interaction instead of cleanly selecting the result or closing.
- **Evidence**: On desktop, clicking search results like ARRAY_AGG and DATE_TRUNC failed with repeated errors that "#cmdkOverlay intercepts pointer events," while the page stayed dimmed and the URL did not change. On mobile, tapping DATE_ADD from search on function-date-trunc.html also timed out because the same overlay intercepted pointer events, and pressing Escape did not clearly dismiss the search state.
- **Suggested fix**: Make result rows directly selectable above the backdrop, ensure the overlay has a reliable close path, and provide clear dismissal/selection behavior for both pointer and keyboard users.

### [HIGH] many-prominent-links-look-actionable-but — trust
- **Page**: `index.html quick start/documentation cards; reference.html popular links; header nav links`
- **Problem**: Many prominent links look actionable but are actually dead ends with href="#", giving no unavailable-state message or alternate path.
- **Evidence**: Homepage Quick start cards Install, Connect, and Your first query did not navigate and remained on index.html/index.html#. The homepage Architecture card also did nothing. On reference.html, ARRAY_AGG changed the URL only to reference.html#, while visible shortcut chips like CREATE TABLE and ALTER TABLE are also listed with href="#". Top-nav items like GitHub, Tutorials, and Download were observed as placeholder links too.
- **Suggested fix**: Remove placeholder affordances from production-like surfaces, or replace them with disabled styling plus explanatory text such as “Coming soon.” If destinations exist, wire them up consistently.

### [MEDIUM] active-state-styling-in-the-left — navigation
- **Page**: `Left reference navigation on function-date-trunc.html, operators.html, reference.html`
- **Problem**: Active-state styling in the left navigation can highlight the wrong item, so the sidebar does not reliably reflect the current page.
- **Evidence**: On function-date-trunc.html, MAX appeared highlighted while the page heading was DATE_TRUNC. On operators.html#arith, REGEXP_MATCH remained highlighted even though the main content was the Operators page. Earlier observations also noted COUNT highlighted after clicking placeholder ARRAY_AGG.
- **Suggested fix**: Tie active styling strictly to the loaded page/anchor and clear stale highlights when crossing categories or following placeholder links.

### [MEDIUM] mobile-pages-have-horizontal-overflow-causing — mobile usability
- **Page**: `Mobile function-date-trunc.html parameters/examples; mobile index.html and reference.html screenshots`
- **Problem**: Mobile pages have horizontal overflow, causing tables and examples to clip beyond the viewport instead of fitting or clearly scrolling within their own container.
- **Evidence**: On mobile function-date-trunc.html, layout warnings reported page width 443px vs viewport 390px, and the Parameters table’s Description column was visibly clipped to the right. The mobile homepage and mobile reference page also showed overflow warnings (407px on a 390px viewport).
- **Suggested fix**: Constrain wide content to local scroll containers, reduce table density on small screens, and ensure the page itself does not exceed viewport width.

### [MEDIUM] the-version-selector-has-no-label — accessibility
- **Page**: `Header version select on index.html, reference.html, and function pages`
- **Problem**: The version selector has no label, aria-label, or placeholder, so its purpose is unclear to assistive tech users and weaker for sighted users in a dense header.
- **Evidence**: Layout warnings repeatedly flagged the select on reference.html, function-date-trunc.html, function-json-extract.html, and mobile pages as "missing_input_label." The control appears in the crowded top bar as only the version text string.
- **Suggested fix**: Add a clear accessible label such as “Documentation version,” and visually reinforce what the control changes.

### [MEDIUM] global-controls-like-theme-toggle-and — feedback
- **Page**: `Header theme toggle and version select across index.html, operators.html, function-date-trunc.html`
- **Problem**: Global controls like theme toggle and version switcher often appear non-responsive because they provide little or no visible confirmation after interaction.
- **Evidence**: Clicking the theme toggle on operators.html, index.html, and mobile function-date-trunc.html produced no detectable visible-text or URL change. Selecting v2.3 on operators.html and mobile function-date-trunc.html updated the control value but showed no obvious page/content change, making the switch appear inert.
- **Suggested fix**: Provide immediate state feedback: visibly switch theme styling, update a version badge/page notice, or show a short confirmation that the selected version is now active.

### [MEDIUM] many-controls-are-undersized-for-touch — mobile usability
- **Page**: `Mobile index.html, reference.html, and function-date-trunc.html layout warnings`
- **Problem**: Many controls are undersized for touch, especially in the header and around code examples.
- **Evidence**: Layout warnings repeatedly flagged controls below 44px height: mobile theme toggle 42x37, many header items around 33–37px high, homepage CTAs 38px tall, and Copy buttons on mobile examples only 46x22. Even popular reference links on mobile are 318x42, just below guidance.
- **Suggested fix**: Increase tap target height/padding for top-bar controls, CTA buttons, sidebar/list links, and copy actions to meet mobile touch guidance.

### [LOW] copy-actions-do-not-provide-clear — feedback
- **Page**: `function-date-trunc.html example Copy button`
- **Problem**: Copy actions do not provide clear success feedback, so users cannot tell whether code was actually copied.
- **Evidence**: On mobile function-date-trunc.html, tapping the visible Copy button produced no visible feedback and the label remained "Copy" afterward. Earlier attempts to evaluate copy on other pages were interrupted by navigation, so the only direct evidence still suggests weak confirmation behavior.
- **Suggested fix**: Show a clear transient success state such as “Copied” with an icon or toast, and keep the control comfortably tappable.
