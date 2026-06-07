# UXAgent Exploration Plan

## Goal

Explore and critique the UX of the meadowos landing page, focusing on the primary long-scroll flow, interactive elements, and responsive behavior.

## Plan Summary

The exploration will proceed in phases: first, validate the top navigation and scroll progress; then, explore the hero and chapter content; next, interact with the Garden app grid and download flow; followed by reviewing the manifesto and footer; and finally, check mobile responsiveness. Each phase will validate specific interactions and states.

## Coverage Targets

- pages: `Visit and explore all sections of the single index.html page.`
- features: `Exercise all visible controls (nav links, download button, app cards, footer links) and validate their states.`
- mobile: `Repeat critical checks (nav links, download flow, tap targets) in mobile viewport.`

## Planned Phases

### Top Navigation & Scroll Progress

- Objective: Validate the top navigation links, scroll progress bar, and initial hero section.
- Target pages: index.html
- Key checks:
  - Click each top nav link (Story, Garden, Docs, Get the .iso) and verify smooth scrolling to the correct section.
  - Verify the scroll progress bar updates as the page is scrolled.
  - Check the hero section's illustration and text for proper rendering.
- Exit criteria:
  - All nav links scroll to the correct section; scroll progress bar is visible and updates; hero section renders correctly.

### Chapter Content & Pull Quotes

- Objective: Explore the chapter sections (I–V) for readability, illustration rendering, and pull quote presentation.
- Target pages: index.html
- Key checks:
  - Scroll through each chapter (I–V) and verify the prose, pull quotes, and chapter illustrations render correctly.
  - Check for responsive text and image sizing as the viewport changes.
- Exit criteria:
  - All chapters are readable with correct illustrations and pull quotes; text and images adjust responsively.

### Garden App Grid & Download Flow

- Objective: Interact with the Garden app cards and the download button to validate their behavior.
- Target pages: index.html
- Key checks:
  - Hover over and click each Garden app card (Nextfile, Bramble, etc.) to check for hover effects and any interactive states (if applicable).
  - Click the 'Download .iso' button and verify the download modal appears, progresses to 100%, and shows SHA256 verification.
  - Check the platform pills and specs section for readability.
- Exit criteria:
  - App cards have visible hover effects; download modal triggers, progresses, and shows verification; specs section is readable.

### Manifesto & Footer

- Objective: Review the manifesto items and footer links for readability and functionality.
- Target pages: index.html
- Key checks:
  - Scroll to the manifesto section and verify the six numbered items are readable and properly formatted.
  - Click the footer links (GitHub, Matrix room) and check for correct navigation (or at least the absence of errors).
  - Verify the footer's dark theme and text contrast.
- Exit criteria:
  - Manifesto items are readable and formatted; footer links are clickable (or fail gracefully); footer text has good contrast.

### Mobile Responsiveness

- Objective: Check the site's mobile viewport behavior, including tap targets, text sizing, and layout adjustments.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport and verify the top navigation collapses or adjusts (if applicable).
  - Check the small tap targets (per layout warnings) for improved sizing or accessibility in mobile view.
  - Re-verify key interactions (nav links, download button) in mobile view.
- Exit criteria:
  - Mobile layout is functional; tap targets are improved or accessible; key interactions work in mobile view.

## Prescan Summary

### MeadowOS — Bring your data home

- Page: `index.html`
- Headings: Plant your data
in a meadow., The Cloud is Someone Else's House., A Patch of Land., What Grows Here., Nextfile, Bramble, Cottage, Smithy, Hearth, Postcard
- Interactables: `2` buttons, `6` links, `0` inputs
- Notable controls:
  - clickable:a:Story
  - clickable:a:Garden
  - clickable:a:Docs
  - clickable:a:Get the .iso
  - clickable:button:Download · meadowos-0.7.iso · 1.2 GB
  - clickable:a:GitHub
  - clickable:a:Matrix room

