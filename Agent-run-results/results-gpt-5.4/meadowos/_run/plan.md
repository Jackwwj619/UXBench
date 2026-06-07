# UXAgent Exploration Plan

## Goal

Exhaustively explore the single-page MeadowOS landing experience, validating the long-scroll narrative, anchor-based navigation, Garden/docs/download sections, and the fake download modal across desktop and mobile viewports.

## Plan Summary

The run should focus on the core landing-page journey from hero to download, since the prescan shows only one HTML page with in-page anchors rather than separate adjacent pages. Start by validating top-nav anchor behavior and long-scroll readability, then inspect the Garden app grid, docs/download section, and the modal-driven download interaction in depth. Because mobile is in scope and the prescan already flags small tap targets, repeat critical navigation and CTA checks on a mobile viewport and look for sticky-nav, anchor, and modal usability issues.

## Coverage Targets

- pages: `Visit the only known HTML page, index.html, and cover all major in-page sections from hero through footer.`
- features: `Exercise all visible top-nav anchors, inspect the six Garden cards, review the docs/specs/download content, test footer links, and run the download modal through its full progress/completion flow.`
- mobile: `Repeat the navigation, long-scroll, download CTA, modal, and footer-link checks on a mobile viewport, with special focus on the small tap-target warnings already seen in prescan.`

## Planned Phases

### Desktop first-pass orientation and anchor flow

- Objective: Validate the main landing-page path from hero through anchored sections using the top navigation and natural scrolling.
- Target pages: index.html
- Key checks:
  - Confirm the hero presents the product proposition clearly before scrolling.
  - Click Story, Garden, Docs, and Get the .iso from the top nav and verify each scrolls to the intended section.
  - Check whether anchored sections are fully visible after navigation and not hidden beneath the top nav.
  - Observe whether smooth scrolling feels controlled and whether the URL/hash behavior is sensible for a single-page site.
  - Scroll manually through the page to compare anchor jumps with the natural reading flow.
- Exit criteria:
  - All four visible top-nav links have been exercised at least once.
  - Each anchor target is located and confirmed to map to the expected section content.
  - Any header-overlap, disorientation, or anchor mismatch issues are documented.

### Narrative content and long-scroll behavior

- Objective: Assess the editorial long-form experience, including chapter structure, progress feedback, and readability over the full page.
- Target pages: index.html
- Key checks:
  - Read/skim through the chapter sequence I–V and verify section headings and pull-quote moments remain discoverable.
  - Monitor the scroll progress bar from top to bottom for accuracy and smoothness.
  - Check whether the 'Read time · ~6 min' framing feels consistent with page length and pacing.
  - Inspect transitions between hero, story chapters, Garden, reviewer quotes, download/specs, manifesto items, and footer for narrative coherence.
  - Note any fatigue points such as overly dense text blocks, weak section separation, or confusing shifts in tone/content.
- Exit criteria:
  - Top, middle, and bottom page regions have all been reviewed in sequence.
  - Progress bar behavior has been observed during substantial scrolling.
  - Long-scroll UX strengths and breakdowns are captured with section-specific evidence.

### Garden, docs, and footer affordance validation

- Objective: Examine the secondary content clusters that support the primary story: the Garden app grid, docs/specs area, and footer links.
- Target pages: index.html
- Key checks:
  - Inspect all six Garden cards (Nextfile, Bramble, Cottage, Smithy, Hearth, Postcard) for consistency in presentation and affordance.
  - Determine whether Garden cards look clickable or static, and verify actual behavior where possible.
  - Review the docs/download section for clarity of the .iso offering, platform pills, and minimum/recommended specs presentation mentioned in the prescan summary.
  - Check whether the docs anchor lands at the expected installation/specification area.
  - Test footer links GitHub and Matrix room to confirm whether they are functional links or placeholders.
- Exit criteria:
  - All six Garden items have been visually reviewed.
  - Docs/specs/download support content has been inspected for clarity.
  - Footer link behavior is confirmed and any dead-end behavior is recorded.

### Download modal and recovery states

- Objective: Deeply validate the most stateful interaction on the site: the fake .iso download modal and its completion flow.
- Target pages: index.html
- Key checks:
  - Trigger the download using the main download button and confirm the modal opens reliably.
  - Observe progress updates from initial state through 100% completion.
  - Verify the terminal-style completion message includes the reported 'SHA256 verification passed' state.
  - Check whether the modal can be dismissed/closed at different points if controls are available.
  - Assess whether background scrolling or interaction is blocked appropriately while the modal is open.
  - After closing or finishing, confirm the page returns to a usable state without losing context.
- Exit criteria:
  - The download modal has been run through to completion at least once.
  - Any available close/dismiss/retry path has been exercised.
  - Blocking, focus, or recovery issues for the modal interaction are documented.

### Mobile critical-path verification

- Objective: Repeat the highest-value checks on mobile, emphasizing tap target usability, section navigation, long-scroll legibility, and modal behavior.
- Target pages: index.html
- Key checks:
  - Re-test Story, Garden, Docs, and Get the .iso on a mobile viewport for tap reliability and anchor accuracy.
  - Validate whether the top nav remains usable on mobile and whether any controls are cramped, wrapped, or obscured.
  - Pay special attention to prescan-reported small tap targets in nav and footer.
  - Confirm the Garden cards and download area remain readable and well spaced on smaller screens.
  - Re-run the download modal on mobile and check for viewport fit, clipping, and dismissibility.
  - Test footer links on mobile to see whether small target sizes make them error-prone.
- Exit criteria:
  - Critical nav and CTA interactions have been repeated on mobile.
  - At least one complete top-to-download journey has been exercised on mobile.
  - Mobile-specific issues around tap size, layout density, or modal fit are captured.

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

