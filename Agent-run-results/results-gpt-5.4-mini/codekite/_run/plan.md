# UXAgent Exploration Plan

## Goal

Thoroughly validate CodeKite’s primary pricing calculator flow, supporting plan/FAQ/comparison content, and adjacent navigation paths across desktop and mobile.

## Plan Summary

Start from the landing page to confirm the main conversion paths into pricing and docs, then spend most of the run on pricing.html where the interactive calculator, plan selection, monthly total, and recommendation logic live. After that, verify adjacent informational content on docs.html and return to pricing for deeper validation of the comparison table, FAQ accordion, and footer links. Repeat the critical pricing checks in a mobile viewport, with special attention to small tap targets and the calculator’s two-way linked controls.

## Coverage Targets

- pages: `Visit all known HTML pages: index.html, pricing.html, and docs.html.`
- features: `Exercise the homepage CTAs, pricing calculator inputs, add-on checkboxes, plan CTAs, comparison table, FAQ accordion, docs quickstart content, and key header/footer navigation links.`
- mobile: `Repeat the pricing calculator, main CTA, and one or two supporting navigation/content checks in a mobile viewport, with explicit attention to the small tap targets already flagged by prescan.`

## Planned Phases

### Landing page entry and navigation

- Objective: Validate the homepage messaging and the main routes into pricing and docs before focusing on the calculator.
- Target pages: index.html
- Key checks:
  - Confirm the hero CTA pair routes to pricing and docs as expected.
  - Verify top navigation links for Product, Pricing, Docs, Sign in, and Start free trial are present and usable.
  - Check whether the page has any broken or placeholder links beyond the visible marketing paths.
- Exit criteria:
  - Pricing and docs entry points have been exercised from the landing page.
  - No unexpected navigation failures or obvious broken primary CTAs are observed.

### Pricing page core calculator

- Objective: Stress the primary pricing flow and confirm that editable controls, cost updates, and plan recommendations stay consistent.
- Target pages: pricing.html
- Key checks:
  - Interact with each slider and its paired number input to confirm two-way synchronization.
  - Test a few meaningful states for build minutes, concurrency, and storage, including low, mid, and high values.
  - Toggle ARM, macOS, and GPU runner checkboxes and verify their impact on the estimate and line items.
  - Observe whether the sticky monthly total and recommended-plan badge update correctly after each change.
  - Check for any formatting issues, stale totals, or mismatched labels in the cost breakdown.
- Exit criteria:
  - All three linked input pairs have been manipulated in both directions.
  - At least one changed state has been validated for each add-on checkbox.
  - The monthly total and recommended-plan behavior have been observed under multiple input combinations.

### Pricing plans, comparison, and FAQ

- Objective: Validate the surrounding pricing content that supports purchase decisions and common questions.
- Target pages: pricing.html
- Key checks:
  - Open and inspect the plan cards for Free, Team, and Enterprise, including their CTAs.
  - Scan the 16-row comparison table for alignment, readability, and consistency with the plan cards.
  - Exercise several FAQ accordion items to confirm expand/collapse behavior and content clarity.
  - Check whether repeated CTAs such as Get started, Start trial, and Talk to sales feel consistent with plan positioning.
- Exit criteria:
  - Each plan card has been reviewed.
  - Multiple FAQ items have been expanded and collapsed successfully.
  - The comparison table has been visually checked for structure or overflow issues.

### Docs adjacency and back-navigation

- Objective: Confirm the adjacent docs experience and ensure the site supports a reasonable informational detour from pricing.
- Target pages: docs.html
- Key checks:
  - Verify the quickstart content loads and the YAML example is readable.
  - Check the header navigation back to Pricing and other top-level pages.
  - Confirm the docs page is consistent with the marketing site's tone and does not introduce broken states.
- Exit criteria:
  - Docs page content and navigation are verified.
  - Any path back to pricing has been exercised cleanly.

### Mobile viewport regression pass

- Objective: Repeat the most important conversion and calculator checks on a mobile viewport, emphasizing touch usability and layout stability.
- Target pages: index.html, pricing.html, docs.html
- Key checks:
  - Recheck header navigation and primary CTAs for tap usability on small screens.
  - Repeat core calculator interactions on pricing, including at least one slider/number pair and one checkbox toggle.
  - Verify the sticky total, plan cards, and FAQ remain usable without clipping or overlap.
  - Note any small tap target or spacing problems that hinder mobile use.
- Exit criteria:
  - Critical pricing interactions have been confirmed on mobile.
  - Mobile-specific layout or tap target issues have been documented where visible.

## Prescan Summary

### CodeKite CI — Faster builds. Honest bills.

- Page: `index.html`
- Headings: Faster builds.
Honest bills., Parallelism, plain, Bill you can read, Drop-in YAML
- Interactables: `0` buttons, `17` links, `0` inputs
- Notable controls:
  - clickable:a:CodeKite
  - clickable:a:Product
  - clickable:a:Pricing
  - clickable:a:Docs
  - clickable:a:Sign in
  - clickable:a:Start free trial
  - clickable:a:See pricing
  - clickable:a:Read docs

### CodeKite Docs

- Page: `docs.html`
- Headings: Quickstart
- Interactables: `0` buttons, `5` links, `0` inputs
- Notable controls:
  - clickable:a:CodeKite
  - clickable:a:Product
  - clickable:a:Pricing
  - clickable:a:Docs
  - clickable:a:Sign in

### CodeKite CI — Faster builds. Honest bills.

- Page: `pricing.html`
- Headings: Pricing built for builds, not seats., Free, Team, Enterprise, Estimate your monthly cost, What's in each plan, Frequently asked
- Interactables: `0` buttons, `18` links, `9` inputs
- Notable controls:
  - clickable:a:CodeKite
  - clickable:a:Product
  - clickable:a:Pricing
  - clickable:a:Docs
  - clickable:a:Sign in
  - clickable:a:Start free trial
  - clickable:a:Get started
  - clickable:a:Start trial

