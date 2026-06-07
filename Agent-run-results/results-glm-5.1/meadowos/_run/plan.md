# UXAgent Exploration Plan

## Goal

Exhaustively explore and critique the UX of the MeadowOS single-page marketing site, validating the long-scroll narrative, interactive elements, download flow, and responsive mobile layout.

## Plan Summary

The exploration will proceed through the single-page long-scroll site in a top-to-bottom sequence, validating navigation, narrative sections, and the Garden app grid. It will then trigger and validate the fake download modal and its completion state. Finally, the entire flow will be repeated on a mobile viewport to assess responsive behavior and tap target sizing.

## Coverage Targets

- pages: `100% coverage of the single index.html page, including all anchored sections.`
- features: `100% coverage of interactive elements: all nav links, the download button/modal flow, and scroll progress bar.`
- mobile: `Repeat critical navigation, layout checks (Garden grid), and the download modal flow on mobile viewport to validate responsive design and tap targets.`

## Planned Phases

### Hero and Navigation Validation

- Objective: Validate the initial viewport, top navigation functionality, and scroll progress bar.
- Target pages: index.html
- Key checks:
  - Verify the hero section renders correctly with the hand-drawn SVG house and flower illustration.
  - Click the 'Story', 'Garden', and 'Docs' nav links to confirm smooth anchor scrolling to their respective sections.
  - Scroll down the page and verify the top scroll progress bar updates accurately.
  - Check the 'Read time · ~6 min' indicator is visible and properly styled.
- Exit criteria:
  - All top nav links successfully scroll to their anchored sections.
  - Progress bar responds to scroll position.
  - Hero section and SVG are fully visible without layout shifts.

### Narrative and Garden Grid

- Objective: Validate the long-scroll narrative chapters (I-V) and the mid-page Garden app grid interactions.
- Target pages: index.html
- Key checks:
  - Scroll through all five chapters (Roman numerals I–V) verifying typography, pull quotes, and chapter illustrations.
  - Inspect the 'Garden' 6-card grid (Nextfile, Bramble, Cottage, Smithy, Hearth, Postcard) for correct layout and paper-shadow/rotate styling.
  - Hover over or interact with the Garden cards to check for any hover states or additional information.
  - Verify reviewer quotes section renders correctly between chapters and grid.
- Exit criteria:
  - All five chapters have been scrolled through and visible text/illustrations verified.
  - Garden grid displays all 6 cards with intended styling.
  - No text overflow or layout breakage observed in the prose sections.

### Download Flow and Manifesto

- Objective: Validate the terminal-style download block, the fake download modal interaction, and the manifesto section.
- Target pages: index.html
- Key checks:
  - Scroll to the download section and verify the terminal-style block, platform pills, and minimum/recommended specs are displayed.
  - Click the 'Download · meadowos-0.7.iso · 1.2 GB' button.
  - Verify the fake download-progress modal appears and increments to 100%.
  - Verify the modal displays the 'SHA256 verification passed' message upon completion.
  - Dismiss the modal and ensure it closes properly.
  - Scroll to the six numbered manifesto items and verify they render correctly.
- Exit criteria:
  - Download modal successfully triggers, progresses, and shows SHA256 success state.
  - Modal can be dismissed without errors.
  - Terminal block, specs, and manifesto items are fully visible.

### Footer and Mobile Responsiveness

- Objective: Validate the dark footer and then repeat critical checks on a mobile viewport to assess responsiveness and tap targets.
- Target pages: index.html
- Key checks:
  - Scroll to the dark footer and verify content and layout.
  - Switch viewport to mobile mode.
  - Re-evaluate the top navigation tap targets (Story, Garden, Docs) for the previously flagged small tap target warnings.
  - Verify the Garden 6-card grid stacks or adapts appropriately on mobile.
  - Trigger the download flow again on mobile to ensure the modal is responsive and usable.
  - Check footer links (GitHub, Matrix room) for tap target sizing on mobile.
- Exit criteria:
  - Footer validated on desktop.
  - Mobile viewport displays all sections without horizontal overflow.
  - Mobile download modal functions correctly.
  - Tap target constraints and responsive layout adaptations have been assessed.

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

