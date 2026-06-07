# UXAgent Exploration Plan

## Goal

Evaluate the UX, accessibility, and interactive behavior of the GitHub 404 error page clone, focusing on recovery paths (search/navigation) and visual feedback mechanisms.

## Plan Summary

The exploration will focus on the single-page application structure of `index.html`. It will validate the functionality of the search input and scope buttons, test the Octocat parallax/hover effects described in the JS file, and audit the navigation links. A significant portion of the run will address the prescan-identified mobile tap target issues by verifying layout responsiveness.

## Coverage Targets

- pages: `100% of known HTML files (index.html)`
- features: `Exercise all 11 interactables identified in prescan, specifically the search bar and scope toggles.`
- mobile: `Full pass on mobile viewport to validate touch target usability vs. desktop hover states.`

## Planned Phases

### Core Layout & Visuals

- Objective: Validate the initial render, dark mode styling, and the presence/clarity of the error message.
- Target pages: index.html
- Key checks:
  - Verify H1 '404' and subtext 'This is not the web page you are looking for' are visible and legible.
  - Check contrast ratios of text against the dark background.
  - Confirm the Octocat illustration loads correctly without layout shift.
- Exit criteria:
  - Error state is clearly communicated visually.
  - No immediate console errors on load.

### Recovery Flow: Search & Scoping

- Objective: Test the primary user action: searching for content from the error page.
- Target pages: index.html
- Key checks:
  - Focus the 'Search GitHub' input (ux-5) and verify focus ring visibility.
  - Type a query and observe any 'fake search suggestions' triggered by app.js.
  - Click the 'Search' button (ux-6) and verify behavior (e.g., console log or mock redirect).
  - Toggle scope buttons ('Code', 'Repositories', 'People') to check for active state styling changes.
- Exit criteria:
  - Input accepts text.
  - Scope buttons provide visual feedback when clicked/hovered.
  - Search action triggers a predictable response (even if mocked).

### Interactive Elements & Micro-interactions

- Objective: Validate the JavaScript-driven effects and secondary navigation.
- Target pages: index.html
- Key checks:
  - Hover over the Octocat illustration to trigger/observe the parallax or hover effect.
  - Click top nav links (Search, Support, Status) to confirm they are clickable (even if dead links).
  - Click footer links ('contact support', 'GitHub Status').
  - Inspect the GitHub Logo (ux-1) for accessibility labels (aria-label) since prescan flagged it as empty.
- Exit criteria:
  - Illustration responds to mouse movement.
  - All links have cursor pointer states.
  - Accessibility tree inspection reveals if ux-1 has an implicit or explicit label.

### Mobile Responsiveness & Touch Targets

- Objective: Address the high volume of 'small_tap_target' warnings from the prescan.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport (e.g., iPhone SE or Pixel 5).
  - Verify if the top nav collapses into a hamburger menu or remains horizontal.
  - Attempt to tap the 'Search', 'Support', and 'Status' links to check for overlap or mis-clicks.
  - Verify the search input and buttons stack or resize appropriately for narrow screens.
  - Check if the Octocat illustration scales down or obscures text on mobile.
- Exit criteria:
  - Layout does not break horizontally.
  - Critical actions (Search) remain usable despite small target sizes noted in prescan.
  - Text remains readable without zooming.

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

