# UXAgent Exploration Plan

## Goal

Exhaustively validate the single-page landing experience of Pelagic, focusing on interactive components, dynamic animations, and responsive layout scaling.

## Plan Summary

The exploration will begin on desktop by interacting with custom JS components, notably the code snippet tabs and the copy-to-clipboard function. It will then verify internal navigation anchors and the rendering of complex content blocks like the architecture diagram and dual feeds. Finally, the run will switch to a mobile viewport to investigate flagged tap-target warnings and ensure the layout gracefully degrades.

## Coverage Targets

- pages: `100% (index.html)`
- features: `Exercise code tabs, copy functionality, and anchor navigation.`
- mobile: `Validate layout breakpoints and re-test interactive tabs for usability.`

## Planned Phases

### Desktop Interactive Components

- Objective: Validate JS-driven interactive elements like code tabs and the copy button.
- Target pages: index.html
- Key checks:
  - Click through 'node', 'go', and 'curl' tabs to ensure the code snippet text updates accordingly.
  - Click the 'Copy install command' button and observe UI for a success toast or state change.
- Exit criteria:
  - All four code tabs successfully display different content.
  - Copy button interaction is completed and recorded.

### Desktop Navigation & Layout Flow

- Objective: Ensure header links work and content sections render correctly as the user scrolls.
- Target pages: index.html
- Key checks:
  - Click navigation links (Product, Docs, Pricing, Blog) to confirm anchor scrolling behavior.
  - Verify visibility of the Trusted-by logo row, architecture SVG, and dual Blog/Changelog feeds.
  - Check bottom footer layout.
- Exit criteria:
  - Page scrolled to bottom, verifying all major content sections are visible and structured well.

### Mobile Responsiveness & Tap Targets

- Objective: Evaluate mobile layout degradation and specifically test elements flagged for small tap targets.
- Target pages: index.html
- Key checks:
  - Verify if top navigation collapses into a hamburger menu or remains as small links.
  - Check if the hero section text and code block stack vertically without horizontal scrolling.
  - Attempt to tap the code language tabs (python, node, etc.) on mobile to assess usability.
  - Verify multi-column sections (features, footer) collapse to single columns.
- Exit criteria:
  - Mobile layout captured from top to bottom, with interaction attempts on the previously flagged small tap targets.

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

