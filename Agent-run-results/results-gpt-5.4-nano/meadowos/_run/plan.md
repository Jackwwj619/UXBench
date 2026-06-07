# UXAgent Exploration Plan

## Goal

Critique and validate the UX of the MeadowOS marketing/long-scroll landing experience, focusing on navigation, reading/progress affordances, and the ISO download CTA and its recovery states on desktop and mobile.

## Plan Summary

Run a full long-scroll exploration of the single-page index.html, validating anchor navigation (Story/Garden/Docs), scroll progress behavior, and the Download .iso flow including its modal states. Then validate footer links and any external navigation affordances. Repeat the most critical checks (nav anchors + download modal) on mobile viewport to confirm responsive layout and tappability.

## Coverage Targets

- pages: `Visit all known HTML pages (index.html).`
- features: `Exercise all visible controls from the prescan: Story/Garden/Docs anchors, Get the .iso anchor, Download .iso modal lifecycle, and footer links (GitHub, Matrix room).`
- mobile: `Repeat critical checks on mobile viewport: anchor navigation (3 items + get the .iso) and the download modal flow.`

## Planned Phases

### Baseline load + scroll progress instrumentation

- Objective: Confirm the page loads cleanly and that the scroll progress affordance reflects position accurately from top to bottom.
- Target pages: index.html
- Key checks:
  - Verify header renders correctly: brand, nav links (Story, Garden, Docs), and Get the .iso CTA.
  - Scroll from very top to the first chapter; observe whether any progress bar updates smoothly (no flicker/jumps).
  - Scroll to mid-page sections (Garden card grid area and reviewer quotes area); confirm progress continues updating.
  - Scroll to bottom; confirm progress reaches 100% and does not overshoot.
- Exit criteria:
  - Scroll progress bar is visible and continuously updates throughout the scroll without errors.
  - Top state and bottom state are correct (0% at top; 100% at end).

### Anchor navigation correctness (Story/Garden/Docs/Download)

- Objective: Validate smooth anchor scrolling and correct final focus/position for each nav target.
- Target pages: index.html
- Key checks:
  - Click Story (ux-1) and verify the viewport lands within the intended Story/chapter section (#story).
  - Click Garden (ux-2) and verify the viewport lands on the 6-card plant-app grid (#garden).
  - Click Docs (ux-3) and verify the viewport lands on the docs/tooling section (#docs) rather than stopping short.
  - Click Get the .iso (ux-4) to navigate to the download section (#download) and confirm the Download button (ux-5) is visible afterward.
  - Repeat each click once while already partway down the page to ensure anchor scrolling still works.
- Exit criteria:
  - All anchor clicks land at the correct section each time (no wrong offsets/near-miss).
  - Navigation feels smooth (no abrupt jumps) and does not break subsequent scrolling.

### Download .iso modal flow + post-completion state

- Objective: Exercise the Download CTA and validate the modal’s full lifecycle and usability after completion.
- Target pages: index.html, script.js
- Key checks:
  - Click Download · meadowos-0.7.iso · 1.2 GB (ux-5); confirm the fake download-progress modal appears.
  - Verify progress increments stepwise and reaches 100%.
  - Confirm the modal transitions to the SHA256 verification passed message/state after reaching 100%.
  - Try closing/dismissing the modal (if a close control exists) and verify the page remains scrollable.
  - Edge case: click Download again immediately while the modal is open (confirm behavior: ignore, restart, or queue) and ensure no broken UI state.
- Exit criteria:
  - Modal shows download progress, completes to 100%, and displays 'SHA256 verification passed' as described in the prescan.
  - After completion/closing, the page remains functional (scroll/nav works).

### Adjacent content validation (Garden cards + manifesto + footer links)

- Objective: Ensure key content blocks and interactive elements around the primary flow are usable and visually coherent.
- Target pages: index.html
- Key checks:
  - Interrogate the Garden 6-card plant-app grid: attempt hover/click on each card region (Nextfile/Bramble/Cottage/Smithy/Hearth/Postcard) to see if cards are clickable or purely illustrative.
  - Check that reviewer quotes and manifesto items (numbered items) are readable and not overlapped at common scroll positions.
  - Scroll to footer; click GitHub (ux-6) and Matrix room (ux-7) to confirm whether they navigate externally or are non-functional placeholders.
- Exit criteria:
  - Garden cards behave consistently with affordances (either clickable with expected behavior or clearly non-clickable).
  - Footer links respond to clicks without causing UI errors (even if they are placeholders).

### Mobile viewport regression (critical path only)

- Objective: Repeat the most important interactions on mobile to validate responsive layout and tap-target accessibility.
- Target pages: index.html
- Key checks:
  - On mobile viewport, tap Story/Garden/Docs and confirm correct anchor landing (no mis-taps).
  - Tap Get the .iso to reach the download section; confirm Download button is visible and tappable.
  - Tap Download to trigger the modal; verify the progress to 100% and SHA256 verification state is still reachable and not obstructed.
  - Verify header/tap targets are usable despite prescan 'small tap target' warnings (especially ux-1/ux-2/ux-3/ux-4).
- Exit criteria:
  - Critical path (anchor navigation + download modal) works end-to-end on mobile.
  - No major usability failures (mis-navigation, modal inaccessible, or persistent overlay trapping).

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

