# UXAgent Exploration Plan

## Goal

Exhaustively explore and critique the UX of the Pelagic landing page, validating all interactive components, dynamic animations, responsive layouts, and navigation flows.

## Plan Summary

The exploration will focus entirely on the single-page landing site, systematically validating the hero section, interactive code tabs, copy-to-clipboard functionality, and dynamic benchmark animations. It will then scroll to test mid-page feature cards, the architecture diagram, and the blog/changelog feeds. Finally, it will repeat critical checks on a mobile viewport to assess responsive behavior and tap-target sizing.

## Coverage Targets

- pages: `100% of known HTML pages (index.html)`
- features: `Exercise all 5 buttons, 4 code tabs, and representative anchor links`
- mobile: `Repeat hero interactions and layout checks on mobile viewport`

## Planned Phases

### Hero & Interactive Code Validation

- Objective: Validate the primary conversion flow, interactive code snippets, and copy functionality in the hero section.
- Target pages: index.html
- Key checks:
  - Click 'Quickstart' and 'View on GitHub' CTAs to verify anchor/link behavior.
  - Click each code tab (python, node, go, curl) and verify the code block updates correctly.
  - Click the 'Copy install command' button and verify the toast notification appears.
  - Observe the benchmark number rotation for smooth animation and correct data display.
- Exit criteria:
  - All 4 code tabs have been clicked and displayed corresponding code.
  - Copy button clicked and toast verified.
  - CTAs clicked and responses observed.

### Mid-Page Features & Architecture

- Objective: Validate the feature cards, three-step flow, and architecture SVG rendering.
- Target pages: index.html
- Key checks:
  - Scroll to 'Built for the way modern retrieval actually works' and check 3 core-feature cards for layout and readability.
  - Verify the Ingest → Index → Query three-step flow layout and content.
  - Inspect the Architecture SVG diagram for proper rendering and scaling.
  - Check the 'Trusted in production by' logo row for correct rendering and alignment.
- Exit criteria:
  - Feature cards and 3-step flow visually verified.
  - Architecture SVG confirmed visible and well-scaled.

### Footer, Feeds & Navigation Anchors

- Objective: Validate the blog/changelog feeds, footer structure, and all anchor navigation links.
- Target pages: index.html
- Key checks:
  - Scroll to Blog and Changelog dual feed; verify layout and content presence.
  - Click footer links (Overview, Docs, GitHub, Discord, etc.) to check for broken anchors or placeholders.
  - Click top navigation links (Product, Docs, Pricing, Blog) and verify smooth scrolling to correct sections.
  - Verify the GitHub stars counter pill animation and display.
- Exit criteria:
  - All top nav and footer links clicked.
  - Blog/Changelog feed layout verified.

### Mobile Viewport & Responsiveness

- Objective: Assess mobile usability, responsive breakpoints, and tap-target issues identified in prescan.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport (<880px) and check for layout collapses or overlaps.
  - Verify hamburger menu appearance and functionality if the top nav collapses.
  - Re-test code tabs and copy button on mobile to ensure they remain usable despite small tap targets.
  - Check if the architecture SVG and logo row scale appropriately on small screens.
- Exit criteria:
  - Mobile layout visually verified.
  - Interactive elements re-tested on mobile viewport.
  - Responsive breakpoint behavior confirmed.

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

