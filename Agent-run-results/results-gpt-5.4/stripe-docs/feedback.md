# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full stripe-docs system, prioritizing the primary docs/tutorial flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The docs clone does a good job preserving orientation across Hosted, Embedded, and Customization pages, and core tutorial interactions like language switching and code copy give clear in-place feedback. The biggest UX weaknesses are around recovery and trust: mobile overlays can stack and become hard to dismiss, some demo CTAs feel inert or misleading, and several outbound links appear to do nothing. Coverage reached all pages and both desktop/mobile, but only about a third of visible controls were directly exercised, so the critique emphasizes repeatedly observed issues rather than untested areas.

## Issues (6)

### [HIGH] overlay-states-can-stack-on-mobile — error recovery
- **Page**: `mobile search/nav overlay state; embedded.html and customization.html header/search/sidebar controls`
- **Problem**: Overlay states can stack on mobile and become difficult or impossible to close, leaving users stuck in a layered interface with dimmed content and conflicting controls.
- **Evidence**: On mobile, opening search while nav state was still present showed both search UI and nav text like 'Navigate Close' at once (recent steps 77-79; screenshot /Users/timchef/UXBench/results-gpt-5.4/stripe-docs/_run/screenshots/agentic-79-click-mobile.png). The final attempt to recover failed because the visible 'Close' control resolved to a button positioned off-screen (bbox x=-102) and remained unclickable; the page still reported dialogs: 1 afterward (agentic-80-click, screenshot /Users/timchef/UXBench/results-gpt-5.4/stripe-docs/_run/screenshots/agentic-80-click-mobile.png). Similar desktop behavior appeared after search-result jumps, where Escape did not close the lingering dialog and a dedicated close control was not visible/clickable.
- **Suggested fix**: Make search and mobile nav mutually exclusive states, automatically close one before opening the other, and ensure the active close control is always on-screen and topmost. Also support robust Escape/backdrop dismissal after in-page search jumps and restore focus to the underlying content.

### [HIGH] several-outbound-links-look-active-and — trust
- **Page**: `header and sidebar official links across index.html, embedded.html, customization.html`
- **Problem**: Several outbound links look active and important but produce no visible response, making users question whether links work and whether they are actually being taken to live Stripe resources.
- **Evidence**: Multiple tested external references produced no URL or visible-text change: 'Official Checkout docs' on index.html, 'Testing cards' and 'Official docs' on index.html, 'Checkout overview' on embedded.html, and 'Branding' on customization.html all showed unchanged before/after URLs in chunk summaries. This conflicts with visible copy such as 'Every visible control is wired up, and every source link points to Stripe’s live docs or Dashboard.'
- **Suggested fix**: Provide explicit external-link behavior and feedback: open in a new tab consistently, show an external-link icon/label, and give immediate confirmation when branching to Stripe docs or Dashboard. If external navigation is intentionally disabled in this environment, say so clearly at click time instead of appearing inert.

### [MEDIUM] primary-looking-demo-ctas-promise-meaningful — feedback
- **Page**: `index.html demo CTA area; embedded.html preview CTA`
- **Problem**: Primary-looking demo CTAs promise meaningful transitions but often respond only with a subtle toast or no obvious visual change, so the actions feel inert or misleading.
- **Evidence**: On index.html, 'Submit checkout request' produced no detected URL or visible-text change; only a low-visibility toast explained that it was preview-only. 'Preview checkout handoff' showed no visible state change at all in the tested state. On embedded.html mobile, 'Preview embedded mount' also produced no visible page change beyond a toast saying 'Preview only. Use the linked official docs for a live Stripe flow.'
- **Suggested fix**: Either reduce the affordance of these controls so they read as illustrative examples, or add a stronger simulated transition after click—such as an inline preview panel, state change, progress step, or modal explaining what would happen in a real integration.

### [MEDIUM] many-persistent-controls-are-below-comfortable — mobile usability
- **Page**: `shared docs shell/header/footer across all pages in mobile view`
- **Problem**: Many persistent controls are below comfortable mobile tap size, especially in navigation, breadcrumbs, footer/reference links, and small utility buttons.
- **Evidence**: Repeated layout warnings flagged undersized mobile targets: home link 150x28 or 62x28, breadcrumb 'Stripe Checkout' 106x23, footer/reference links around 182x26 to 228x26, feedback buttons 55x44 and 50x44, and multiple Copy buttons at 65x44. The final observation on embedded.html mobile lists 14 layout warnings, including small targets for home, breadcrumb, copy buttons, yes/no feedback, and official links.
- **Suggested fix**: Increase hit areas for small text links and utility buttons to comfortably exceed mobile touch guidance, especially in the header/breadcrumb region and footer/reference sections. Preserve the visual style if needed, but expand the clickable area with padding and spacing.

### [MEDIUM] after-selecting-a-search-result-the — feedback
- **Page**: `search dialog result-selection flow on customization.html and embedded.html`
- **Problem**: After selecting a search result, the interface often lands at the right section but leaves the search dialog state lingering, creating ambiguity about whether search is finished.
- **Evidence**: On customization.html, selecting 'Appearance and branding settings' updated the URL to customization.html#appearance and showed the correct heading, but the DOM still reported 1 dialog afterward; pressing Escape did not close it (steps 37-42). On embedded.html, choosing 'Create an embedded Checkout Session on the server' navigated correctly to embedded.html#step-session, but the page still reported 1 dialog and later close attempts failed because the close target was not visible (steps 49-54).
- **Suggested fix**: Close the search modal automatically after a result is selected, move focus to the destination heading, and provide a brief but clear arrival cue. If the modal stays open intentionally, keep the close control visible and explain the persistent state.

### [LOW] the-shared-docs-shell-is-content — visual hierarchy
- **Page**: `mobile layouts and overlay screenshots across index.html, embedded.html, customization.html`
- **Problem**: The shared docs shell is content-dense, and on smaller screens the combination of top nav, breadcrumbs, left-nav drawer, on-page cards, code controls, and footer references creates a crowded hierarchy.
- **Evidence**: Mobile observations repeatedly described the pages as interaction-dense, with counts like 42 links and 17 buttons on customization.html and many visible controls on index.html. Recent mobile screenshots show header controls, drawer content, article content, and supporting links competing for attention at once, with page text still visible behind overlays.
- **Suggested fix**: Simplify the mobile presentation by more aggressively collapsing secondary navigation and footer/reference material, and give stronger visual emphasis to the current tutorial step and primary next action. Prevent background content from peeking through when overlays are open.
