# UXAgent Exploration Plan

## Goal

Explore and critique the UX of the github-404 error page system, focusing on the primary error page flow, recovery paths (search, navigation links), and validating responsive design and interactable behaviors.

## Plan Summary

The run will start with desktop exploration of the index.html 404 page, validating top navigation, search functionality, and recovery links. Then, switch to mobile viewport to repeat critical checks. Finally, verify interactive elements like the Octocat (if present) and check for JS-driven effects like hover/parallax.

## Coverage Targets

- pages: `Visit and fully explore the only known page (index.html).`
- features: `Exercise all visible controls (top nav links, search input/button, recovery links, action buttons, illustration interaction) on both desktop and mobile viewports.`
- mobile: `Repeat critical checks (top nav, search, tap targets) on mobile viewport to ensure responsive UX.`

## Planned Phases

### Desktop: Top Navigation & Labels

- Objective: Validate top navigation links (Search, Support, Status) and the unlabeled top-left element, checking for accessible labels and tap target sizes.
- Target pages: index.html
- Key checks:
  - Click the top-left unlabeled element (ux-1) to see its behavior.
  - Click 'Search' (ux-2), 'Support' (ux-3), 'Status' (ux-4) links and check if they navigate (or show expected behavior, given it's a local clone).
  - Verify if the top-left element has a visible label on hover (check for tooltips or ARIA labels).
- Exit criteria:
  - Observed behavior of top navigation elements; noted any accessibility warnings (empty labels, small taps).

### Desktop: Search Functionality

- Objective: Test the search input (ux-5) and 'Search' button (ux-6), checking for responsiveness, input validation, and interaction feedback.
- Target pages: index.html
- Key checks:
  - Type 'test' into the search input (ux-5) and click the 'Search' button (ux-6) to see if it triggers a search (or shows suggestions, per app.js).
  - Check if the search input has a visible placeholder ('Search GitHub') and if the button is clearly labeled.
  - Verify the tap target size of the search button (ux-6) and input (ux-5) on desktop.
- Exit criteria:
  - Search input and button behavior observed; noted any errors or unexpected feedback.

### Desktop: Recovery Links & Buttons

- Objective: Test recovery links (contact support, GitHub Status) and action buttons (Code, Repositories, People), checking their behavior and tap targets.
- Target pages: index.html
- Key checks:
  - Click 'contact support' (ux-10) and 'GitHub Status' (ux-11) links to check navigation (or expected behavior).
  - Click 'Code' (ux-7), 'Repositories' (ux-8), 'People' (ux-9) buttons to see their behavior (e.g., do they filter search or navigate?).
  - Check the tap target sizes of these elements (ux-7 to ux-11) and note if they meet accessibility guidelines (e.g., >44px for mobile, but check desktop tap targets too).
- Exit criteria:
  - Recovery links and action buttons behavior observed; noted any small tap target warnings or navigation issues.

### Desktop: Illustration Hover/Parallax

- Objective: Test the Octocat illustration's hover/parallax effect (driven by app.js) by moving the mouse over it and checking for visual feedback.
- Target pages: index.html
- Key checks:
  - Move the mouse over the Octocat illustration (near ux-1's area? Or the centered image) and check if it parallaxes or changes appearance (hover effect).
  - Verify if the illustration's hover effect is smooth and responsive (no JS errors in console).
- Exit criteria:
  - Observed hover/parallax effect (or confirmed its absence with console checks); noted any JS errors related to the illustration.

### Mobile: Responsive Layout & Tap Targets

- Objective: Switch to mobile viewport and repeat critical checks (top nav, search, recovery links) to validate responsive design and tap target sizes.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport (e.g., 360x640) and check the layout of top navigation, search input, and buttons.
  - Test tap targets for 'Search' (ux-2), 'Support' (ux-3), 'Status' (ux-4) links and the search button (ux-6) on mobile (check if they're easy to tap).
  - Verify if the search input (ux-5) and button (ux-6) are accessible on mobile (e.g., input size, button placement).
- Exit criteria:
  - Mobile layout and tap targets validated; noted any responsiveness issues or small tap target problems.

### Final: JS Effects & Accessibility

- Objective: Check for JS-driven effects (hover/parallax) on the illustration, and review all interactables for accessibility warnings (empty labels, small taps).
- Target pages: index.html
- Key checks:
  - Recheck the Octocat illustration's hover/parallax effect (if not already confirmed) by moving the mouse or tapping (on mobile) the illustration area.
  - Review the DOM for any empty interactive labels (e.g., ux-1) and check if ARIA labels or tooltips are missing.
  - Check the console for any JS errors related to app.js (hover/parallax functionality).
- Exit criteria:
  - JS effects confirmed (or noted as absent); accessibility warnings documented; console errors reviewed.

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

