# UXAgent Exploration Plan

## Goal

Validate the UX of the MeadowOS single-page marketing site, focusing on narrative flow, interactive download simulation, and mobile responsiveness.

## Plan Summary

The run will traverse the long-scroll landing page using both top navigation anchors and manual scrolling to verify content hierarchy. It will trigger the 'Download .iso' button to validate the fake progress modal and SHA256 verification state. Finally, it will switch to a mobile viewport to audit the reported small tap targets and layout stability.

## Coverage Targets

- pages: `100% of index.html sections (Hero, Story Ch I-V, Garden, Download, Footer)`
- features: `Nav anchors, Scroll progress bar, Download modal simulation, Card hover states`
- mobile: `Full pass on mobile viewport focusing on touch targets and text scaling`

## Planned Phases

### Desktop Narrative & Anchor Navigation

- Objective: Verify smooth scrolling behavior and content visibility for the primary narrative sections.
- Target pages: index.html
- Key checks:
  - Click 'Story', 'Garden', 'Docs', and 'Get the .iso' nav links to test anchor jumping.
  - Manually scroll through Chapters I-V to check for layout shifts or overlapping elements.
  - Verify the 'Read time' and chapter headings remain legible against the cream background.
- Exit criteria:
  - All nav anchors successfully scroll to their respective sections.
  - No visual overlap between text and illustrations during scroll.

### Interactive Download Flow

- Objective: Test the primary conversion action and its feedback loop.
- Target pages: index.html
- Key checks:
  - Locate and click the 'Download · meadowos-0.7.iso' button.
  - Observe the modal appearance and progress bar animation (0% to 100%).
  - Confirm the final state displays 'SHA256 verification passed'.
  - Close the modal and verify the background page remains interactive.
- Exit criteria:
  - Modal opens without error.
  - Progress simulation completes fully.
  - Success message is visible.

### Garden App Grid Inspection

- Objective: Review the presentation of the ecosystem apps within the 'Garden' section.
- Target pages: index.html
- Key checks:
  - Scroll to the 'Garden' section.
  - Inspect the 6-card grid (Nextfile, Bramble, Cottage, Smithy, Hearth, Postcard).
  - Check for hover states on cards (rotation/shadow effects mentioned in CSS).
  - Verify card text is readable and aligned.
- Exit criteria:
  - All 6 app cards are visible and styled correctly.
  - Hover interactions function as expected.

### Mobile Viewport & Accessibility Audit

- Objective: Address prescan warnings regarding small tap targets and layout on narrow screens.
- Target pages: index.html
- Key checks:
  - Switch viewport to mobile (e.g., iPhone SE or Pixel 5 dimensions).
  - Attempt to tap 'Story', 'Garden', and 'Docs' links; note if they are difficult to hit.
  - Check if the hamburger menu (if present) or nav collapses gracefully.
  - Verify the 'Download' button is full-width or easily tappable.
  - Check text readability for the long-form prose on small screens.
- Exit criteria:
  - Navigation is usable despite small target warnings.
  - Content reflows correctly without horizontal scroll.
  - Download CTA is prominent and accessible.

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

