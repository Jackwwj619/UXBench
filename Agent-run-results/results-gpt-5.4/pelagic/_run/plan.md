# UXAgent Exploration Plan

## Goal

Exhaustively explore the Pelagic single-page marketing experience, validating the primary hero-to-information flow, interactive landing-page behaviors, section navigation, and responsive/mobile usability.

## Plan Summary

This run should treat index.html as a complete single-page product-marketing journey rather than a multi-page app. Start by validating the hero and top-nav conversion path, then exercise the page’s scripted interactions: code-language tabs, benchmark rotation, stars animation, and copy-to-clipboard toast. After that, inspect deeper content sections and footer links/anchors, then repeat critical conversion and navigation checks on mobile with special attention to the prescan’s small tap targets and responsive layout shifts.

## Coverage Targets

- pages: `Visit the single known HTML page (index.html) and cover it from top to footer in both desktop and mobile viewports.`
- features: `Exercise all visible scripted features on index.html, all hero CTAs, all top-nav anchors, all code tabs, the copy action, and a representative sample of footer links.`
- mobile: `Repeat critical hero, navigation, copy, and tab interactions on mobile, plus inspect reflow of major content sections and all prescan-flagged small tap targets.`

## Planned Phases

### Primary landing and hero flow

- Objective: Validate the first-screen product pitch, CTA hierarchy, and immediate path from arrival to action.
- Target pages: index.html
- Key checks:
  - Confirm hero messaging, trust cue, and performance claims are visible and scannable on initial load
  - Activate Quickstart CTA in hero or header and verify whether it scrolls to a meaningful in-page destination
  - Activate View on GitHub and confirm whether it navigates meaningfully or behaves like a placeholder
  - Inspect the install strip and Copy control for obvious affordance and visibility near the CTAs
  - Assess whether the hero’s right-side code example supports rather than competes with the main conversion path
- Exit criteria:
  - Hero CTAs have been clicked and their outcomes observed
  - Initial-value proposition and next-step clarity are documented
  - Any dead-end or misleading hero interactions are confirmed

### Interactive scripted components

- Objective: Exercise all visible JS-driven behaviors and confirm they are understandable, stable, and discoverable.
- Target pages: index.html
- Key checks:
  - Click each code tab (python, node, go, curl) and verify content updates correctly and active state is clear
  - Use the Copy install command button and verify clipboard feedback/toast appears, is readable, and dismisses appropriately
  - Observe benchmark rotation for at least one full cycle and check for jank, layout shift, or hard-to-read transitions
  - Observe GitHub stars counter animation on load or after refresh to confirm it completes smoothly and does not distract
  - Check whether any of these animated elements continue moving excessively or interfere with reading
- Exit criteria:
  - All four code tabs have been exercised
  - Copy interaction and resulting feedback have been verified
  - At least one rotation cycle and the stars animation have been observed and assessed

### In-page navigation and section continuity

- Objective: Verify that the landing page supports smooth progression from hero through features, architecture, social proof, and content feeds.
- Target pages: index.html
- Key checks:
  - Use top-nav anchors (Product, Docs, Pricing, Blog, Quickstart) and confirm each lands at a sensible section or reveal any missing anchors
  - Scroll through feature cards, the Ingest → Index → Query sequence, architecture section, quote cards, and dual blog/changelog area to assess readability and narrative order
  - Check whether section headings and supporting text maintain hierarchy and avoid overly dense blocks
  - Inspect whether the blog and changelog feed items appear interactive, understandable, and visually balanced
  - Confirm that returning to the top or continuing downward feels coherent after anchor jumps
- Exit criteria:
  - All visible top-nav anchors have been tested
  - Core informational sections have been viewed in sequence
  - Any broken jumps, weak section labeling, or continuity issues are captured

### Footer and edge-link validation

- Objective: Probe lower-priority but high-risk link affordances that may create dead ends or credibility issues.
- Target pages: index.html
- Key checks:
  - Test representative footer links across sitemap/docs/community columns such as Overview, Docs, Quickstart, GitHub, Discord, and Forum
  - Determine which footer links are placeholders versus meaningful navigation
  - Assess whether placeholder links are visually indistinguishable from real destinations
  - Check if footer layout remains legible and well grouped near the bottom of the long page
- Exit criteria:
  - A representative sample of footer links has been clicked
  - Placeholder/dead-end link behavior is confirmed
  - Footer IA and trust implications are documented

### Mobile-critical regression pass

- Objective: Repeat the most important navigation and conversion checks in a mobile viewport, focusing on touch targets and responsive layout behavior.
- Target pages: index.html
- Key checks:
  - Review mobile header and above-the-fold hero for stacking, clipping, and CTA prominence
  - Retest top navigation access and any anchor-jump behavior on mobile
  - Retest Quickstart CTA, Copy control, and at least two code tabs on mobile
  - Check whether benchmark stats, trusted-by logos, feature cards, architecture graphic, and footer columns reflow cleanly
  - Pay special attention to the prescan small tap targets for nav items, tabs, stars pill, and copy control
- Exit criteria:
  - Critical conversion and navigation interactions have been repeated on mobile
  - Responsive reflow of major sections has been inspected
  - Touch-target and readability issues have been confirmed or ruled out

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

