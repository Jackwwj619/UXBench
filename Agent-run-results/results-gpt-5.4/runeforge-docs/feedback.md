# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full runeforge-docs system, prioritizing the primary checkout/booking flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

Runeforge’s docs have strong orientation in the core reading flow: breadcrumbs, active nav states, step-based quickstart content, and accurate desktop anchor navigation make the documentation feel structured and learnable. However, several shared controls undermine trust and recovery, especially on mobile: search dismissal behaves unexpectedly, multiple navigation items look real but are placeholders, and the responsive layout overflows horizontally. Coverage reached all pages but only a small share of controls were exercised, so the clearest issues are around shared navigation, search, filtering feedback, and mobile ergonomics rather than every deep doc path.

## Issues (8)

### [HIGH] the-documented-escape-to-dismiss-behavior — error recovery
- **Page**: `guide-quickstart.html and index.html search modal`
- **Problem**: The documented Escape-to-dismiss behavior for search is broken or misleading. Instead of closing the modal and returning users to the current page context, Escape navigated away to an API anchor, which feels like lost place and broken recovery.
- **Evidence**: From guide-quickstart and again from index, the search modal opened with helper text stating "esc to dismiss," but pressing Escape navigated to api-reference.html#forge rather than staying on the source page. Session memory and chunk summaries also note that a dialog still appeared to be present afterward.
- **Suggested fix**: Make Escape always close the modal without navigation, restore focus to the original trigger, and ensure any highlighted result is not activated by dismissal keys. Add a clear close button as a secondary escape hatch.

### [HIGH] several-prominent-navigation-items-look-actionable — trust
- **Page**: `shared header links on index.html / api-reference.html / examples.html; mobile left nav in /Users/timchef/UXBench/results-gpt-5.4/runeforge-docs/_run/screenshots/agentic-80-click-mobile.png`
- **Problem**: Several prominent navigation items look actionable but are actually placeholders or no-ops, creating false affordances.
- **Evidence**: Desktop tests found Blog, Community, and the GitHub stars badge using href '#', with clicks leaving users on the same page. On mobile, left-nav items like "Why Runeforge?" changed the URL only to index.html# while visible content stayed at the top; the final observation also shows many sidebar items such as Installation, Migration from Redux, React, and others pointing to '#'.
- **Suggested fix**: Remove placeholder items from production-facing nav, disable them with clear 'Coming soon' treatment, or wire them to real anchors/pages so the behavior matches the visual promise.

### [HIGH] the-mobile-layout-has-persistent-horizontal — mobile usability
- **Page**: `api-reference.html mobile, screenshot /Users/timchef/UXBench/results-gpt-5.4/runeforge-docs/_run/screenshots/agentic-78-scroll-mobile.png`
- **Problem**: The mobile layout has persistent horizontal overflow, causing content and controls to extend beyond the viewport and making dense reference content hard to read.
- **Evidence**: Multiple mobile observations report page width 541px on a 390px viewport. In step 78, the forge() parameters table on api-reference showed the rightmost description column clipped off-screen. Mobile search overlays and the home page also retained this overflow state.
- **Suggested fix**: Rework responsive behavior for tables, code blocks, and header controls: stack or collapse columns, allow contained horizontal scrolling only within code/table regions, and prevent the whole page from exceeding viewport width.

### [MEDIUM] examples-filtering-gives-weak-or-contradictory — feedback
- **Page**: `examples.html desktop/mobile`
- **Problem**: Examples filtering gives weak or contradictory feedback, so it is hard to trust whether chips and search are actually narrowing the list.
- **Evidence**: The Intermediate chip appeared active on mobile while visible results still started with Beginner cards like "Counter" and "Todo list with persistence." Desktop testing also found Advanced and SSR chip clicks often produced no obvious visible-text or URL change, and typing terms like "ssr" did not clearly communicate narrowed results.
- **Suggested fix**: Show explicit result counts and an applied-filters summary, update the grid more visibly, and ensure category chips only display matching cards. If filters combine, surface that combination clearly near the results list.

### [MEDIUM] when-the-examples-list-is-filtered — feedback
- **Page**: `examples.html filtered state`
- **Problem**: When the examples list is filtered, the controls scroll out of view and the remaining grid looks sparse, which can make the state feel like missing content rather than an intentional filter.
- **Evidence**: After filtering, the results lower on the page showed only a partial set such as Counter, Todo list with persistence, Async fetcher with retry, and Server-side rendered shop, with a large empty area to the right. The search field and chips had negative y positions, so users reviewing results could no longer see the active "shop" query and selected chip.
- **Suggested fix**: Keep active filters sticky or echo them above the results, and add a visible result count plus a prominent clear-all action so recovery is obvious even after scrolling.

### [MEDIUM] changing-the-version-selector-does-not — trust
- **Page**: `header version selector on index.html and api-reference.html`
- **Problem**: Changing the version selector does not create a coherent, trustworthy state change; the control value can change while the page still visually presents the old version.
- **Evidence**: On desktop and mobile, selecting v3.3 changed the dropdown value but the URL stayed the same and visible page branding still said Runeforge v3.4 / Reference · v3.4. Step 77 specifically recorded "No obvious URL or visible-text change" after selecting v3.3.
- **Suggested fix**: Either make version switching load distinct content/URLs immediately, or treat older versions as disabled options until supported. The selected version should be echoed in the page header and metadata after change.

### [MEDIUM] the-shared-version-selector-lacks-an — accessibility
- **Page**: `shared header select control`
- **Problem**: The shared version selector lacks an accessible label across pages, making a key global control harder to identify and verify.
- **Evidence**: Session memory and multiple chunk summaries flag a missing label/aria-label/placeholder for the select field on index, examples, guide pages, stores, actions, and api-reference. Final mobile layout warnings also flag target ux-3 as missing an input label.
- **Suggested fix**: Add a persistent visible or programmatic label such as 'Documentation version' and ensure the current version is announced clearly.

### [MEDIUM] many-mobile-tap-targets-are-below — mobile usability
- **Page**: `mobile header and left navigation; screenshot /Users/timchef/UXBench/results-gpt-5.4/runeforge-docs/_run/screenshots/agentic-79-click-mobile.png`
- **Problem**: Many mobile tap targets are below recommended touch size, making navigation and shared controls harder to hit reliably.
- **Evidence**: Layout warnings repeatedly flagged targets below 44px guidance: Docs 32x34, API 23x34, search trigger height 31px, theme toggle 35x32, brand link 152x25, and numerous mobile sidebar items at 326x29. The final observation lists 52 layout warnings on mobile home.
- **Suggested fix**: Increase tap target height/padding for header and sidebar items, add more spacing between adjacent controls, and prioritize a mobile-specific nav pattern rather than shrinking desktop controls.
