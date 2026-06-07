# UXAgent Exploration Plan

## Goal

Exhaustively explore and critique the single-page MeadowOS marketing site, focusing on navigation, scroll behaviors, interactive modal states, and mobile responsiveness.

## Plan Summary

The exploration will validate the long-scroll narrative structure of MeadowOS. It will start by testing the top navigation anchor links and scroll progress bar on desktop. Then it will trigger and validate the fake download modal's progression and completion states. Finally, it will evaluate the mobile viewport, paying special attention to the layout of the 'Garden' grid and previously identified small tap targets.

## Coverage Targets

- pages: `Fully scroll and explore index.html on both desktop and mobile.`
- features: `Test all anchor links, the fake download modal flow, and hover/active states.`
- mobile: `Validate mobile layout for the 6-card grid and assess small tap targets identified in prescan.`

## Planned Phases

### Navigation and Scrolling

- Objective: Verify that top navigation links smoothly scroll to their respective sections and the scroll progress bar updates.
- Target pages: index.html
- Key checks:
  - Click 'Story', 'Garden', 'Docs', and 'Get the .iso' and verify the viewport scrolls to the correct anchors
  - Observe if a scroll progress bar is visible and updates its width/state based on scroll depth
- Exit criteria:
  - All top navigation links have been clicked and their target sections verified.

### Download Modal Interaction

- Objective: Test the fake '.iso' download flow and its state changes.
- Target pages: index.html
- Key checks:
  - Click the 'Download · meadowos-0.7.iso · 1.2 GB' button
  - Verify a modal appears showing download progress
  - Wait and verify the progress reaches 100% and displays the SHA256 verification success message
  - Close or dismiss the modal
- Exit criteria:
  - The download modal has been triggered, fully completed its simulated process, and closed.

### Mobile Viewport and Layout Validation

- Objective: Check responsive layout, specifically the 'Garden' grid, narrative text readability, and tap target sizes.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport
  - Examine the top navigation (check if it collapses or remains thin, verify tap target usability)
  - Scroll down to the 'Garden' section and ensure the 6-card grid stacks or adjusts appropriately without overflow
  - Check footer links (GitHub, Matrix room) for accessibility/tap target size
- Exit criteria:
  - Mobile layout has been fully scrolled and visually inspected for overflows or usability issues.

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

