# UXAgent Exploration Plan

## Goal

Autonomously explore and critique the UX of the full codekite system, prioritizing the primary pricing flow plus adjacent pages, states, and recovery paths.

## Plan Summary

The exploration will start with the landing page (index.html), then move to the pricing page (pricing.html) to interact with the usage calculator and plan cards, followed by the docs page (docs.html). Each page will be explored in both desktop and mobile viewports, with a focus on interactables, layout warnings, and user flows.

## Coverage Targets

- pages: `visit all three known HTML pages (index, pricing, docs) in both viewports.`
- features: `exercise all visible controls (navigation links, buttons, sliders, checkboxes, accordions) per key page.`
- mobile: `repeat critical checks (navigation, calculator, plan CTAs) on mobile viewport to validate responsiveness and layout.`

## Planned Phases

### Explore Landing Page (index.html)

- Objective: Validate the landing page's interactables, layout, and flow to pricing/docs.
- Target pages: index.html
- Key checks:
  - Click navigation links (Product, Pricing, Docs, Sign in, Start free trial) and check for responsiveness.
  - Click 'See pricing' and 'Read docs' buttons and verify navigation.
  - Check layout warnings (small tap targets) for usability in both viewports.
- Exit criteria:
  - All main interactables on index.html are tested, navigation to pricing/docs works, and layout warnings are noted.

### Explore Pricing Page (pricing.html) - Plan Cards

- Objective: Validate the plan cards (Free, Team, Enterprise) and their CTAs (Get started, Start trial, Talk to sales).
- Target pages: pricing.html
- Key checks:
  - Click 'Get started' (Free plan), 'Start trial' (Team plan), and 'Talk to sales' (Enterprise plan) and check for responsiveness.
  - Verify the plan details (features, pricing) are clear and interactive elements work.
  - Check layout warnings (small tap targets, missing input labels) for the plan cards section.
- Exit criteria:
  - All plan card CTAs are tested, plan details are verified, and layout warnings for plan cards are noted.

### Explore Pricing Page (pricing.html) - Usage Calculator

- Objective: Validate the usage calculator (sliders, checkboxes, total cost breakdown) and its responsiveness.
- Target pages: pricing.html
- Key checks:
  - Interact with sliders (build minutes, concurrent builds, storage) and check two-way binding (slider <-> number input).
  - Toggle checkboxes (Linux ARM, macOS, GPU runners) and verify cost updates.
  - Check layout warnings (missing input labels, small tap targets) for the calculator section in both viewports.
  - Verify the recommended plan badge and cost breakdown update correctly.
- Exit criteria:
  - Usage calculator interactables are tested, cost updates work, and layout warnings for the calculator are noted.

### Explore Pricing Page (pricing.html) - Comparison Table & FAQ

- Objective: Validate the plan comparison table and FAQ accordion for usability and clarity.
- Target pages: pricing.html
- Key checks:
  - Scroll through the plan comparison table and check for clarity of features across plans.
  - Open/close FAQ accordion items and verify responsiveness.
  - Check layout and interactability of the trusted-logo row and footer.
- Exit criteria:
  - Plan comparison table and FAQ are tested, trusted-logo row and footer are verified.

### Explore Docs Page (docs.html)

- Objective: Validate the docs page's content and interactables.
- Target pages: docs.html
- Key checks:
  - Click navigation links (Product, Pricing, Docs, Sign in, Start free trial) and check for responsiveness.
  - Verify the YAML example and quickstart content is clear.
  - Check layout warnings (small tap targets) for usability in both viewports.
- Exit criteria:
  - Docs page interactables are tested, content is verified, and layout warnings are noted.

### Cross-Check Viewports & Recovery Paths

- Objective: Verify all critical flows (pricing, docs, navigation) in both desktop and mobile viewports, and check recovery paths (back navigation, error handling).
- Target pages: index.html, pricing.html, docs.html
- Key checks:
  - Repeat critical checks (navigation, calculator, plan CTAs) in mobile viewport.
  - Test back navigation (browser back button) after each navigation and verify state retention.
  - Check for console/network errors during all interactions.
- Exit criteria:
  - All critical flows are verified in both viewports, back navigation works, and no new errors are found.

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

