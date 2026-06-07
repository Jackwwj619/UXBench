# UXAgent Exploration Plan

## Goal

Exercise the full single-page Pelagic landing experience, with emphasis on the hero conversion path, interactive code/benchmark controls, section navigation, and responsive/mobile usability.

## Plan Summary

The run should start in the hero and validate the primary conversion path: CTA links, install copy action, stars counter, and code tab switching. It should then move through the anchored sections to confirm the landing page structure, feature messaging, and footer navigation all behave as expected. Because this is a single HTML page, coverage should focus on distinct sections, visible controls, and mobile tap-target/regression checks rather than page-to-page traversal.

## Coverage Targets

- pages: `visit the single known HTML page (index.html) and traverse all major anchored sections`
- features: `exercise all visible hero controls, representative top-nav and footer links, code tabs, copy feedback, and at least one full benchmark animation cycle`
- mobile: `repeat the hero conversion flow, one code-tab switch, and key navigation checks in a narrow viewport, specifically checking tap-target usability`

## Planned Phases

### Hero conversion and interactive controls

- Objective: Validate the first-screen experience and the core interactive elements that drive conversion.
- Target pages: index.html
- Key checks:
  - Click Quickstart and confirm it scrolls/jumps to the quickstart section without breaking layout.
  - Click View on GitHub and confirm the link target/state is handled as expected for this clone.
  - Click Copy on the install command and verify a visible toast or confirmation appears.
  - Switch among python, node, go, and curl tabs and confirm the code sample updates cleanly for each state.
  - Observe the GitHub stars pill and benchmark line for animation/rotation and confirm text remains legible during updates.
- Exit criteria:
  - All hero controls have been exercised at least once.
  - At least one successful copy interaction is observed.
  - All four code tabs have been selected and their content/state changes confirmed.

### Section-by-section content scan

- Objective: Traverse the landing page anchors and validate the major marketing sections for structure and content continuity.
- Target pages: index.html
- Key checks:
  - Use top nav anchors Product, Docs, Pricing, and Blog to jump to the relevant sections.
  - Validate the core-feature cards and the Ingest → Index → Query flow are presented in a readable sequence.
  - Check the architecture diagram section for rendering integrity and no overlap/clipping.
  - Review the customer quote cards and the blog/changelog dual feed for correct card/list formatting.
- Exit criteria:
  - Each major content region has been reached or visually confirmed.
  - The three-step flow and architecture section render without obvious truncation.
  - The blog/changelog split feed is visible and distinguishable as two columns/streams.

### Footer and sitemap link validation

- Objective: Verify the lower-page navigation model and the sitemap-style footer links.
- Target pages: index.html
- Key checks:
  - Scroll to the footer and confirm the four-column sitemap is present.
  - Click representative footer links from each column: Overview, Hybrid search, Managed, Docs, Quickstart, Benchmarks, Migration guides, GitHub, Discord, Forum, and RFC tracker.
  - Confirm anchor behavior is consistent and the page does not lose state or jump to broken positions.
- Exit criteria:
  - All footer columns are reachable and visually clear.
  - Representative links from each footer column have been tested.
  - No broken anchor behavior or layout collapse is observed.

### Mobile viewport regression pass

- Objective: Re-check the most important interactions under mobile constraints, with attention to tap target usability and layout stacking.
- Target pages: index.html
- Key checks:
  - Repeat the hero checks on mobile viewport: Quickstart, Copy, and one code-tab switch.
  - Verify the top nav compresses acceptably and remains usable or transforms safely on narrow width.
  - Check that the hero, code panel, and metric strip stack without horizontal overflow.
  - Inspect tap targets called out in the prescan as small on mobile, especially nav links, copy button, and code tabs.
- Exit criteria:
  - Core hero interactions work on mobile viewport.
  - No major horizontal scrolling or clipping appears.
  - Mobile tap-target concerns are confirmed with concrete evidence.

### Stability and edge-state review

- Objective: Look for regressions in dynamic content, repeated interactions, and any state persistence issues.
- Target pages: index.html
- Key checks:
  - Re-select code tabs multiple times to ensure state changes remain stable.
  - Observe benchmark rotation through at least one cycle to confirm content updates do not jitter or overlap.
  - Return to the hero after deep scrolling and confirm anchor navigation preserves expected page state.
  - Check for console or layout errors after repeated interactions.
- Exit criteria:
  - Dynamic elements remain stable after repeated use.
  - No console errors or new layout warnings emerge during the run.
  - The page remains visually coherent after navigation and state toggling.

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

