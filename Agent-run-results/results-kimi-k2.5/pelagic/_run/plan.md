# UXAgent Exploration Plan

## Goal

Explore and critique the UX of the Pelagic landing page, validating primary flows (hero, code tabs, features) and responsive behavior across viewports.

## Plan Summary

Start with desktop exploration of the index.html landing page, validating interactive elements (code tabs, copy button, nav links) and animations. Then repeat critical checks in mobile viewport, focusing on tap targets and responsive layout. Ensure all visible controls and animations are exercised.

## Coverage Targets

- pages: `100% (only index.html)`
- features: `Exercise all visible controls (5 buttons, 21 links, 4 tabs) on index.html`
- mobile: `Repeat critical checks (hero, code tabs, copy, nav) on mobile viewport`

## Planned Phases

### Desktop Hero & Nav

- Objective: Validate hero interactables (Quickstart, GitHub, Copy) and nav links, check animations (stars, benchmarks)
- Target pages: index.html
- Key checks:
  - Click 'View on GitHub' (check link/state)
  - Click 'Copy' (pip install) and verify toast
  - Observe GitHub stars animation (1.2s ease)
  - Observe benchmark rotation (2.5s interval)
- Exit criteria:
  - All hero interactables exercised, animations visible

### Desktop Code Tabs

- Objective: Validate code tab switching (python→node→go→curl) for content change and responsiveness
- Target pages: index.html
- Key checks:
  - Click 'node' tab (check code block update)
  - Click 'go' tab (check update)
  - Click 'curl' tab (check update)
  - Verify tab focus states
- Exit criteria:
  - All 4 code tabs switch content, no errors

### Desktop Features & Footer

- Objective: Explore core feature cards, 3-step flow, architecture, blog/changelog, footer links
- Target pages: index.html
- Key checks:
  - Scroll to feature cards (hybrid, FAISS, self-host) and check headings
  - Scroll to 3-step flow (Ingest→Index→Query) and verify text
  - Scroll to blog/changelog feeds (5 posts each) and check links
  - Click footer 'Overview' (check link/state)
- Exit criteria:
  - All core sections scrolled, key links exercised

### Mobile Viewport (max 880px)

- Objective: Validate responsive layout, tap targets, and critical interactables (Quickstart, Copy, code tabs) on mobile
- Target pages: index.html
- Key checks:
  - Resize viewport <880px, check nav collapse (if any)
  - Tap 'Copy' (pip install) on mobile (check toast)
  - Tap code tabs (node→curl) on mobile (check content)
  - Verify tap targets (e.g., Quickstart, GitHub) for size/responsiveness
- Exit criteria:
  - Critical interactables work on mobile, layout responsive

### Mobile Tap Target Validation

- Objective: Recheck small tap targets (layout warnings) on mobile for usability
- Target pages: index.html
- Key checks:
  - Tap 'Product' (nav link, 53x21px) on mobile (check response)
  - Tap 'Docs' (34x21px) on mobile (check response)
  - Tap 'GitHub stars' (99x35px) on mobile (check response)
  - Verify no tap errors (e.g., misclicks)
- Exit criteria:
  - All small tap targets respond, no usability issues

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

