# UXAgent Exploration Plan

## Goal

Critique the UX of the github-404 clone by validating the primary 404 recovery flow (navigation + search + support/status links) and adjacent interactions (header nav, CTAs, interactive illustration behavior) on both desktop and mobile viewports.

## Plan Summary

Run an exploration centered on the single known page (index.html), focusing first on the recovery actions: header navigation (Search/Support/Status), the main “Search GitHub” input + Search button, and the “contact support” / “GitHub Status” links. Then validate interactive/visual elements driven by app.js (illustration hover/parallax and any fake search suggestions) and confirm keyboard focus, label accessibility, and tap-target sizing issues flagged in the prescan. Repeat the critical interactions on mobile viewport with attention to small/tappable header controls and the header layout.

## Coverage Targets

- pages: `visit all known HTML pages (100%: index.html)`
- features: `exercise all visible controls per prescan: header icon + Search/Support/Status, main search input + Search button, Code/Repositories/People, contact support, GitHub Status; validate illustration hover/parallax behavior at least once`
- mobile: `repeat phases 2-3 interactions (search + mode buttons + support/status + header links) on mobile viewport; additionally test illustration touch/gesture non-interference`

## Planned Phases

### Baseline load + content comprehension (desktop)

- Objective: Verify the 404 message, primary recovery options, and overall page usability on desktop without interaction.
- Target pages: index.html
- Key checks:
  - Confirm the main 404 headline and the guidance text are visible and readable at desktop viewport.
  - Check top navigation presence: Search, Support, Status, plus the left icon link.
  - Ensure the main input labeled/placeholder 'Search GitHub' is visible and not overlapped by illustration effects.
  - Tab through focus order from header to main search to links; confirm a visible focus indicator for interactive elements.
- Exit criteria:
  - User can understand this is a 404 page and see all key recovery actions (search, code/repositories/people options, contact support, GitHub Status).
  - No focus traps; tab order reaches all interactive controls without layout breaking.

### Primary recovery: Search input + submit behavior (desktop)

- Objective: Validate the main search flow and any dynamic UI state (fake suggestions, button enablement, submission handling).
- Target pages: index.html
- Key checks:
  - Click into the 'Search GitHub' input and type a short query (e.g., 'react' or 'ux'); verify input responsiveness.
  - Press Enter and click the green 'Search' button; confirm no console errors and verify whether a results page opens or a simulated suggestion appears.
  - If app.js provides fake suggestions, verify they appear on input/focus and can be selected/clicked; otherwise verify absence is graceful.
  - Click Code, Repositories, and People controls beneath the search; confirm they change the selected mode/state or affect search parameters.
- Exit criteria:
  - Search interaction completes without errors (no blank UI/crashes).
  - Search mode buttons (Code/Repositories/People) show a clear state change (visual or behavioral) consistent with expectations.

### Adjacent recovery: Header nav + support/status links (desktop)

- Objective: Validate secondary navigation actions for recovery and verify they are reachable, correctly labeled, and usable.
- Target pages: index.html
- Key checks:
  - Click header links: Search, Support, Status; verify navigation occurs or appropriate UI state changes without breaking layout.
  - Click 'contact support' and 'GitHub Status' links; confirm they respond (navigation or simulated behavior).
  - Re-check the small/empty-labeled icon link ('#') for usability: does it do anything meaningful, and is it keyboard accessible despite empty label.
  - Confirm external link styling/affordances are consistent (visited/unvisited not confusing).
- Exit criteria:
  - All header/support/status CTAs respond to click and do not produce broken states.
  - The unlabeled/empty-label control is still operable by keyboard; if it does nothing, the UX implications are observed.

### Illustration interactivity + performance safeguards (desktop)

- Objective: Validate the app.js-driven hover/parallax behavior and ensure it does not interfere with the primary recovery controls.
- Target pages: index.html
- Key checks:
  - Hover over the Octocat/illustration area; verify parallax/hover effect triggers and does not cause visual jank.
  - Ensure the animation does not block pointer events or obscure the search input/button or links.
  - Scroll (if possible) and observe whether background/illustration movement causes layout shift near the input area (even though it’s an error page).
  - Check that interaction remains smooth; confirm no console errors during hover/animation.
- Exit criteria:
  - Illustration effects work as intended on hover and do not hinder access to search/support actions.
  - No console errors appear during interactive testing.

### Mobile critical path: tap usability + responsive layout (mobile)

- Objective: Repeat the critical recovery interactions on mobile viewport, emphasizing small tap targets and touch behavior for illustration effects.
- Target pages: index.html
- Key checks:
  - Verify responsive layout: header items remain visible and not overlapping the search content.
  - Tap the empty-labeled icon link; confirm it is reachable and doesn’t frustrate (and observe any mis-tap due to small target).
  - Tap into 'Search GitHub' input, type a query, and submit via the Search button.
  - Tap Code/Repositories/People controls; confirm state change is discoverable on touch.
  - Tap 'contact support' and 'GitHub Status' and confirm they are hit reliably (no near-misses).
  - Touch/drag on the illustration area; verify there is no dead/unresponsive region that blocks scrolling/tapping controls.
- Exit criteria:
  - Mobile users can complete the full recovery path: focus search -> submit -> access support/status without mis-taps or layout breakage.
  - Touch behavior is consistent (no reliance on hover for critical functions).

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

