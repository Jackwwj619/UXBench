# UXAgent Exploration Plan

## Goal

Validate the MeadowOS single-page marketing journey end-to-end, with emphasis on story-to-garden-to-docs-to-download navigation, the fake ISO download experience, and mobile usability of the compact navigation controls.

## Plan Summary

The run should start at the top of the long-scroll landing page, confirm the anchored navigation/progress behavior, then work through the narrative sections and the Garden app grid to make sure the page’s key marketing content is reachable and readable. After that, the browser should validate the download section and the scripted download-progress modal, then check footer/community links and any recovery behavior for the placeholder external links. Because the prescan shows several small tap targets, the critical interactions should be repeated in a mobile viewport to verify touch usability and scrolling/anchor alignment.

## Coverage Targets

- pages: `Visit all known HTML pages discovered in the prescan; here that means fully covering index.html.`
- features: `Exercise the top navigation anchors, the long-scroll story content, the 6-card Garden grid, the Docs/specs block, the fake ISO download modal, and the footer links.`
- mobile: `Repeat the highest-value checks on mobile viewport: top nav taps, anchor jumps, the Garden section, and the download modal flow.`

## Planned Phases

### Baseline landing and navigation

- Objective: Establish the page structure, top-of-page state, and the behavior of the sticky navigation and progress indicator.
- Target pages: index.html
- Key checks:
  - Confirm the hero headline, subheading, and illustration render without truncation at the initial scroll position.
  - Click 'Story', 'Garden', and 'Docs' from the top nav and verify each anchor scrolls to the expected section.
  - Observe whether the top progress bar updates while scrolling through the page.
  - Check whether the sticky nav remains usable after a small scroll.
- Exit criteria:
  - All top-nav anchors have been exercised at least once.
  - The scroll/progress behavior has been observed in both idle and scrolled states.
  - No obvious layout breaks are seen in the hero or sticky header.

### Story section reading and anchor alignment

- Objective: Validate the long-form narrative content and the page's readability/wayfinding through the story chapters.
- Target pages: index.html
- Key checks:
  - Scroll through chapters I–V and confirm headings, pull quotes, and chapter illustrations are legible in sequence.
  - Verify the 'Read time · ~6 min' cue stays contextually appropriate and does not overlap content.
  - Use the Story anchor to jump back into the section and check that the landing position is sensible.
  - Check for any awkward spacing or line-length issues in the magazine-style prose blocks.
- Exit criteria:
  - All story chapters have been viewed at least once.
  - At least one anchor jump into the story section has been validated.
  - No clipping/overlap issues are observed in the text-heavy sections.

### Garden feature grid validation

- Objective: Exercise the featured app grid as the main adjacent product/storytelling flow and inspect the card layout behavior.
- Target pages: index.html
- Key checks:
  - Scroll to the Garden section and confirm all 6 app cards are visible: Nextfile, Bramble, Cottage, Smithy, Hearth, and Postcard.
  - Inspect card spacing, rotation, and paper-shadow styling for visual consistency.
  - Check whether the section remains readable and whether cards wrap cleanly on narrower viewports.
  - If any cards are interactive, confirm their click/tap behavior; if not, verify they are still presented as intended informational items.
- Exit criteria:
  - All six Garden cards are seen and identified.
  - No card-overlap or misalignment issues are present in desktop and mobile layouts.
  - The section is reachable via both scrolling and the Garden anchor.

### Docs and download conversion flow

- Objective: Validate the documentation/download lead-in and the scripted ISO download experience from initiation to completion.
- Target pages: index.html
- Key checks:
  - Jump to the Docs section and verify the terminal-style .iso block, platform pills, and minimum/recommended specs are visible.
  - Activate the 'Download · meadowos-0.7.iso · 1.2 GB' button and confirm the fake download-progress modal appears.
  - Watch the modal increment to completion and confirm the final SHA256 verification passed state is shown.
  - Ensure the modal can be dismissed or otherwise does not trap the user after completion.
- Exit criteria:
  - The download CTA has been triggered successfully.
  - The progress modal reaches its terminal success state.
  - Return path from the modal is confirmed and the page remains functional afterward.

### Footer, placeholders, and recovery paths

- Objective: Check secondary links and end-of-page affordances, especially placeholder external destinations and any fallback behavior.
- Target pages: index.html
- Key checks:
  - Scroll to the footer and verify the 'GitHub' and 'Matrix room' links are present and identifiable.
  - Activate each footer link and record whether it is a placeholder, inert, or produces any recovery behavior.
  - Confirm the footer styling remains legible in the dark theme and does not obscure link affordances.
  - If the page supports keyboard navigation, verify tab order reaches these links logically.
- Exit criteria:
  - Footer links have been exercised.
  - Any placeholder behavior has been documented.
  - The end-of-page state does not introduce unexpected errors or broken UI.

### Mobile viewport validation

- Objective: Repeat the most important interactions on mobile to verify touch targets, anchor usability, and long-scroll readability under constrained width.
- Target pages: index.html
- Key checks:
  - Re-check the header nav targets 'Story', 'Garden', 'Docs', and 'Get the .iso' for tap accuracy and accidental misfires.
  - Verify the page remains usable with the small tap targets flagged in the prescan.
  - Confirm the hero, Garden cards, and Docs/download section reflow cleanly without horizontal scrolling.
  - Repeat the download CTA and modal flow in mobile to ensure the scripted interaction still works.
- Exit criteria:
  - Critical anchor and CTA interactions have been repeated in mobile viewport.
  - No mobile-specific clipping, overlap, or unusable controls are observed beyond the already noted small-target risk.
  - The download flow and at least one anchor jump are confirmed on mobile.

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

