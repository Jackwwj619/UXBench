# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the GitHub 404 error page, focusing on interactive recovery paths, visual feedback, and mobile responsiveness.

## Plan Summary

The exploration will focus entirely on the single index.html page, validating the search input, category filters, and navigation links. It will assess the parallax effect on the Octocat illustration and verify the behavior of all interactive elements. Finally, it will repeat critical checks on a mobile viewport to evaluate the numerous small tap target warnings identified in the prescan.

## Coverage Targets

- pages: `100% of known HTML pages (index.html)`
- features: `100% of visible controls (11 interactables) and the parallax visual effect`
- mobile: `Repeat all critical interactions and layout checks on mobile viewport`

## Planned Phases

### Header Navigation Validation

- Objective: Validate the accessibility and behavior of the top navigation bar controls.
- Target pages: index.html
- Key checks:
  - Click the logo link (ux-1) and verify behavior, noting the empty accessible label
  - Click the 'Search', 'Support', and 'Status' nav links and check for any visual feedback or console errors
- Exit criteria:
  - All header links have been clicked
  - Accessibility issue with the logo link is documented

### Search and Recovery Flow

- Objective: Test the primary user recovery flow via the search input and category filters.
- Target pages: index.html
- Key checks:
  - Type a query into the 'Search GitHub' input (ux-5) and observe if fake suggestions appear
  - Click the 'Search' button (ux-6) to submit the query and check for UI response
  - Click the 'Code', 'Repositories', and 'People' filter buttons (ux-7, ux-8, ux-9) and verify state changes or visual feedback
- Exit criteria:
  - Search input has been typed into and submitted
  - All three category filter buttons have been interacted with

### Illustration and Footer Interaction

- Objective: Validate the visual parallax effect and footer link behaviors.
- Target pages: index.html
- Key checks:
  - Hover/move mouse over the Octocat illustration area to trigger the parallax effect
  - Click the 'contact support' link (ux-10) and check for feedback
  - Click the 'GitHub Status' link (ux-11) and check for feedback
- Exit criteria:
  - Parallax effect is confirmed working or not working
  - Footer links have been clicked and behaviors observed

### Mobile Viewport Checks

- Objective: Evaluate layout shifts, tap target usability, and parallax behavior on a mobile viewport.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport and check for layout overlapping or broken styling
  - Verify if small tap targets (especially footer links and category buttons) are usable or severely impacted
  - Test touch interactions on the illustration for the parallax effect
- Exit criteria:
  - Mobile layout has been screenshot and assessed
  - Tap target severity has been validated via interaction

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

