# UXAgent Exploration Plan

## Goal

Validate the UX of the Pelagic single-page landing site, focusing on developer onboarding flows (code snippets, install commands), content hierarchy, and mobile responsiveness.

## Plan Summary

The run will treat index.html as a comprehensive single-page application. It begins by verifying the hero section's value proposition and interactive code tabs. It then proceeds to validate the 'How it fits' workflow and architecture diagrams. Finally, it assesses the footer navigation and repeats critical checks on mobile viewports to address known tap-target risks.

## Coverage Targets

- pages: `100% of index.html sections (Hero, Features, Architecture, Social, Footer)`
- features: `All 4 code tabs, Copy button, All nav links, All footer links`
- mobile: `Full pass on mobile viewport with focus on header and code blocks`

## Planned Phases

### Hero & Developer Onboarding

- Objective: Validate the primary conversion path: understanding the product and getting started via code/install.
- Target pages: index.html
- Key checks:
  - Click all 4 code tabs (Python, Node, Go, curl) to verify content switching.
  - Click 'Copy' on the pip install strip to verify toast/feedback.
  - Verify 'Quickstart' and 'View on GitHub' buttons are clickable and distinct.
  - Check legibility of the animated benchmark text.
- Exit criteria:
  - All code languages displayed correctly.
  - Copy action confirmed visually.
  - Primary CTAs responsive.

### Feature Deep-Dive & Architecture

- Objective: Ensure technical claims (Hybrid search, FAISS drop-in) and architectural diagrams are readable and logically ordered.
- Target pages: index.html
- Key checks:
  - Scroll to 'Built for the way modern retrieval actually works' section.
  - Verify readability of the 3 core feature cards.
  - Inspect the 'Ingest → Index → Query' flow diagram for clarity.
  - Check the Architecture SVG for scaling issues or missing labels.
- Exit criteria:
  - Feature cards text is legible.
  - Architecture diagram renders without overflow.
  - Logical flow of the 3-step process is visually clear.

### Social Proof & Footer Navigation

- Objective: Validate trust signals and ensure all footer links resolve to valid in-page anchors or external resources.
- Target pages: index.html
- Key checks:
  - Scan 'Trusted by' logo row for rendering issues.
  - Review Blog and Changelog feeds for date/content formatting.
  - Click through footer sitemap links (Overview, Hybrid search, Managed, etc.).
  - Verify external community links (GitHub, Discord, Forum).
- Exit criteria:
  - Logos visible and aligned.
  - Footer links navigate to correct sections or open new tabs appropriately.
  - No broken anchor links.

### Mobile Responsiveness & Accessibility

- Objective: Stress-test the layout on mobile viewports, specifically addressing the prescan warnings about small tap targets.
- Target pages: index.html
- Key checks:
  - Switch to mobile viewport (<880px).
  - Test hamburger menu (if present) or stacked nav accessibility.
  - Attempt to tap header links (Product, Docs, Pricing) to check for overlap/mis-clicks.
  - Verify code block horizontal scrolling behavior on small screens.
  - Check font sizes for readability on mobile.
- Exit criteria:
  - Nav items are distinguishable and tappable.
  - Code blocks are usable (scrollable or wrapped).
  - No critical content is hidden or overlapping.

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

