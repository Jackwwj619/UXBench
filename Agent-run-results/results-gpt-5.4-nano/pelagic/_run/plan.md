# UXAgent Exploration Plan

## Goal

Critique and validate the pelagic marketing-site UX end-to-end, focusing on the primary Quickstart/installation intent, code-tab interaction, and navigation-to-section recovery, with desktop and mobile checks.

## Plan Summary

Run a structured scan of the single-page index.html: validate top navigation anchors, code language tabs, copy-to-clipboard toast behavior, and the rotating benchmark numbers. Then verify the in-page “Quickstart” and “View on GitHub” paths, the 3-step “How it fits” flow, and the blog/changelog dual feeds for discoverability. Finally, repeat the critical interactions on mobile viewport to confirm tap targets, sticky/header behavior, and section navigation.

## Coverage Targets

- pages: `Visit all known HTML pages (only index.html per prescan).`
- features: `Exercise: header anchor navigation (all visible links), hero CTAs (Quickstart + View on GitHub), GitHub stars interaction (if it is clickable), code tabs (python/node/go/curl), copy button (pip install pelagic), rotating benchmark content, 'How it fits' anchor list, and at least one Blog link + one Changelog entry.`
- mobile: `Repeat critical checks on mobile viewport: header navigation, code tabs, copy-to-clipboard toast, benchmark rotation legibility, and ensure tap targets do not cause failure.`

## Planned Phases

### Header + anchor navigation sanity (desktop)

- Objective: Confirm the primary navigation and CTAs reliably move to the intended sections and maintain context.
- Target pages: index.html
- Key checks:
  - Click each header link: Product (#product), Docs (#docs), Pricing (#pricing), Blog (#blog) and validate scroll-to-section behavior (no dead anchors).
  - Activate 'Quickstart' anchor (#quickstart) and confirm the scroll position aligns with the Quickstart section entry.
  - Click 'View on GitHub' in the hero and verify it navigates as expected (new tab vs same tab consistent with UX expectation).
  - Click the 'Pelagic' brand in header (href '#') and verify it returns to top without breaking the current dynamic widgets.
- Exit criteria:
  - All named header/nav links are clickable and result in a visible scroll position change to the relevant section within index.html.
  - No navigation causes layout collapse or hides the code panel/benchmark content permanently.

### Code tabs + copy-to-clipboard interaction (desktop)

- Objective: Validate the comprehension loop for quick adoption: code language selection and copy/install affordances.
- Target pages: index.html
- Key checks:
  - Switch code tabs in sequence: python → node → go → curl; confirm each tab changes the visible code block and the active tab styling updates correctly.
  - Verify code block formatting remains readable and does not overflow/overlap when switching.
  - Click the 'pip install pelagic' copy button; confirm toast appears and the copied value matches the displayed command.
  - Repeat copy clicks rapidly (2-3 times) to confirm idempotent behavior (no duplicate toasts or error states).
  - If stars pill is clickable: click '★ 18.2k' and verify it doesn’t navigate unexpectedly (or that navigation is intentional) while the animation remains smooth.
- Exit criteria:
  - Language tabs always show the correct corresponding snippet and never leave the panel in an inconsistent state.
  - Copy action provides clear feedback (success toast or graceful error) and works repeatedly.

### Benchmark rotation + content stability (desktop)

- Objective: Ensure rotating performance metrics remain legible and don’t undermine comprehension or interaction.
- Target pages: index.html
- Key checks:
  - Observe rotation of benchmark rows (noted as every 2.5s) for at least 2 full cycles; confirm values update as expected.
  - Attempt to interact with nearby controls during rotation (e.g., switch code tabs or scroll slightly) and confirm rotation doesn’t break focus/selection.
  - Check for any flashing/overlap or sudden layout shifts around the rotating content region.
- Exit criteria:
  - Benchmark values rotate smoothly with stable layout and without interfering with other interactions.

### Primary “How it fits” flow + deeper sections (desktop)

- Objective: Validate comprehension of the 3-step system narrative and adjacent architecture/customer content discoverability.
- Target pages: index.html
- Key checks:
  - Use the in-page feature navigation items under the 'How it fits' area (Overview, Hybrid search, Managed, Pricing, Docs, Quickstart, Benchmarks, Migration guides) to confirm each anchor scrolls and lands on the right subsection.
  - Follow the visible 3-step flow: Ingest → Index → Query; confirm each step is clearly labeled and visually distinct.
  - Scan the architecture SVG diagram region for readability (no clipped labels) and confirm it doesn’t block tab interactions when present.
  - Review customer quote cards region for link/button presence (none expected) and confirm layout doesn’t jump.
- Exit criteria:
  - All 'How it fits' related anchor links lead to their corresponding sections within index.html.
  - The Ingest/Index/Query narrative remains clear at the typical scroll positions.

### Blog + changelog dual feed usability (desktop)

- Objective: Validate that both left Blog and right Changelog lists are discoverable, readable, and actionable.
- Target pages: index.html
- Key checks:
  - Scroll to 'From the blog' and 'Changelog' sections; confirm headings are visible and the two-column layout remains aligned.
  - Click at least one Blog post link and one Changelog entry link; verify navigation behavior (external vs same page) and that link affordances are clear.
  - Verify hover/focus states (if any) clearly indicate clickability.
- Exit criteria:
  - Both lists remain usable with clear separation between Blog and Changelog items, and their links respond correctly.

### Mobile critical-path replay (mobile viewport)

- Objective: Re-run the highest-risk interactions on mobile: tap targets, navigation, tabs, and copy feedback.
- Target pages: index.html
- Key checks:
  - Tap header nav items and Quickstart (Product/Docs/Pricing/Blog/Quickstart) and verify correct scroll-to-section behavior.
  - Tap each code language tab (python/node/go/curl) and confirm the code panel updates without mis-taps (given prescan small tap target warnings).
  - Tap the 'pip install pelagic' copy button; confirm toast appears and no accidental scroll occurs due to tiny targets.
  - Verify rotating benchmark numbers remain readable and don’t overlap touch targets.
- Exit criteria:
  - Critical interactions (anchor navigation, code tabs, copy button) work on mobile without mis-taps or broken states.
  - No major responsive layout issues (overlap/clipping) occur in the hero region.

## Prescan Summary

### Pelagic — Open-source vector database

- Page: `index.html`
- Headings: The vector database that scales with your retrieval, not your bill., Built for the way modern retrieval actually works., Hybrid search out of the box, Drop-in for FAISS or pgvector, Self-host or managed, How it fits, Architecture, From the blog, Why we rewrote our HNSW build in Rust, Pelagic 0.42: hybrid search, done right
- Interactables: `5` buttons, `21` links, `0` inputs
- Notable controls:
  - clickable:a:Pelagic
  - clickable:a:Product
  - clickable:a:Docs
  - clickable:a:Pricing
  - clickable:a:Blog
  - clickable:a:GitHub stars
  - clickable:a:Quickstart
  - clickable:a:View on GitHub

