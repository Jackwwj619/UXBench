# UXAgent Exploration Plan

## Goal

Exhaustively explore the single-page GitHub 404 clone, validating the primary recovery flow from the error message through search and support/status escape routes, plus interactive states, illustration behavior, and mobile usability.

## Plan Summary

The run should focus on index.html as both the entry point and the full system surface, since prescan found no adjacent HTML pages. Start by validating the core 404 messaging and recovery actions, then exercise every visible control including nav links, search input/button, search category buttons, and footer support/status links. Spend extra time on interactions likely driven by app.js, especially illustration hover/parallax and any fake search suggestion behavior, then repeat critical checks on mobile because the prescan already flagged multiple small tap targets.

## Coverage Targets

- pages: `Visit the only known HTML page, index.html, and cover its major visible states rather than seeking nonexistent internal pages.`
- features: `Exercise all visible controls on index.html: logo link, top nav links, search input, Search button, Code/Repositories/People buttons, contact support link, GitHub Status link, and any dynamic illustration/search behaviors that actually appear.`
- mobile: `Repeat the critical recovery checks on mobile viewport, with emphasis on the already-flagged small tap targets and on whether the single-page layout remains usable.`

## Planned Phases

### Baseline 404 page validation

- Objective: Confirm that the single page clearly communicates the 404 state and presents obvious recovery options before deeper interaction testing.
- Target pages: index.html
- Key checks:
  - Verify the 404 heading, supporting message, and overall hierarchy are immediately understandable
  - Confirm the search field, Search button, category buttons, and support/status links are visible without confusing competition
  - Inspect whether the top nav meaningfully supports recovery or distracts from the main task
  - Check whether the Octocat/astronaut illustration enhances the page without obscuring the primary message
- Exit criteria:
  - Clear evidence is gathered on content hierarchy, scanability, and discoverability of primary recovery actions
  - A baseline screenshot and notes capture desktop layout before interaction changes

### Primary recovery interactions

- Objective: Exercise the main error-page escape routes centered on search and destination links.
- Target pages: index.html
- Key checks:
  - Type into the Search GitHub input and trigger search via the Search button
  - Test search submission with empty input, short query, and realistic query text to observe validation or feedback
  - Toggle Code, Repositories, and People buttons before and after entering text to see whether state changes are visible
  - Click contact support and GitHub Status links to determine whether they navigate, focus, or act as placeholders
  - Click top nav links Search, Support, and Status to compare their behavior with the main-page recovery links
- Exit criteria:
  - Every visible recovery control has been activated at least once
  - Observed outcomes are documented for empty, filled, and category-switched search states
  - Any placeholder behavior, dead ends, or lack of feedback is captured

### Secondary interactive states and motion

- Objective: Probe non-obvious behavior likely implemented in app.js and validate hover/focus responsiveness.
- Target pages: index.html
- Key checks:
  - Hover and move the pointer around the illustration area to detect parallax, transforms, or animation
  - Check whether illustration motion follows cursor position smoothly and whether it causes content distraction
  - Focus the search input and buttons via keyboard to inspect visible focus states
  - Test whether typing in the search field reveals fake suggestions, autocomplete-like UI, or other dynamic changes
  - Observe button hover/active states for Search, Code, Repositories, and People
- Exit criteria:
  - Interactive motion and hover behaviors are either confirmed or ruled out with evidence
  - Keyboard focus visibility is checked on the primary controls
  - Any dynamic search UI that appears is interacted with enough to understand its role

### Mobile resilience and tap usability

- Objective: Repeat the most important recovery interactions on mobile and verify layout, tap target, and readability risks highlighted by prescan.
- Target pages: index.html
- Key checks:
  - Open the page in mobile viewport and verify that the 404 message, search UI, and support links remain visible and legible
  - Retest the logo, top nav links, Search button, category buttons, contact support link, and GitHub Status link for tapability
  - Check whether the search input and buttons wrap, overlap, or require horizontal scrolling
  - Confirm whether the illustration and starry background crowd the content or push primary actions too far down
  - Retest any motion/parallax behavior on mobile to see whether it degrades, disappears, or interferes with touch use
- Exit criteria:
  - Critical recovery path is exercised on mobile from page load through search/support actions
  - Mobile-specific layout or tap target issues are documented with concrete examples
  - No major visible control remains untested on mobile

## Prescan Summary

### Page not found · GitHub

- Page: `index.html`
- Headings: 404
- Interactables: `4` buttons, `6` links, `1` inputs
- Notable controls:
  - clickable:a:#
  - clickable:a:Search
  - clickable:a:Support
  - clickable:a:Status
  - typeable:input:Search GitHub
  - clickable:button:Search
  - clickable:button:Code
  - clickable:button:Repositories

