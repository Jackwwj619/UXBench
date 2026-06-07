# UXAgent Exploration Plan

## Goal

Thoroughly explore CodeKite’s marketing site with emphasis on the pricing decision flow: entering usage, interpreting the calculator output, comparing plans, and reaching the right CTA, while also validating adjacent landing and docs paths on desktop and mobile.

## Plan Summary

Start on the landing page to verify how clearly it routes users into pricing or docs, then spend the deepest coverage on pricing.html because it contains the site’s main interactive experience and decision logic. On pricing, test the linked slider/number inputs, runner add-on checkboxes, sticky total/recommended-plan behavior, comparison table readability, and FAQ expansion patterns. Finish by checking docs as a lightweight adjacent flow and then repeat the most critical pricing and navigation checks on mobile, where small tap targets and dense comparison content are most likely to break down.

## Coverage Targets

- pages: `Visit all 3 known HTML pages, with repeated deeper passes on pricing.html and at least one revisit path from index.html to pricing.html and from docs.html back through header navigation.`
- features: `Exercise all visible calculator inputs and add-on checkboxes, all major pricing CTAs, representative FAQ accordion items, main header links, and a sample of footer/placeholder links to assess dead-end behavior.`
- mobile: `Repeat critical navigation and pricing checks on mobile viewport, specifically CTA access, header tap targets, calculator editability, sticky summary behavior, comparison table readability, and FAQ interaction.`

## Planned Phases

### Landing page orientation and pathing

- Objective: Validate that index.html communicates the product clearly and routes users cleanly into the primary pricing flow and the adjacent docs flow.
- Target pages: index.html
- Key checks:
  - Confirm the hero message, YAML example, and three feature cards are understandable without interaction-heavy dependencies.
  - Use primary CTAs 'See pricing' and header 'Start free trial' to confirm they both route to pricing.html consistently.
  - Use 'Read docs' and header 'Docs' to confirm docs.html is reachable and positioned as a secondary path.
  - Check header navigation consistency, including what happens when clicking Product and Sign in links that appear non-destination or placeholder-like.
  - Review footer links for discoverability and whether placeholder destinations create confusing dead ends.
- Exit criteria:
  - All visible landing-page navigation paths have been exercised at least once.
  - Clear evidence is collected on whether the landing page effectively funnels users to pricing versus docs.
  - Any dead-end or misleading links on the landing page are identified with concrete examples.

### Pricing overview and conversion entry points

- Objective: Establish whether pricing.html presents the three plans clearly before deep calculator testing begins.
- Target pages: pricing.html
- Key checks:
  - Inspect the Free, Team, and Enterprise cards for hierarchy, feature clarity, and CTA distinctness.
  - Trigger the visible plan CTAs ('Get started', 'Start trial', 'Talk to sales') and note whether they behave meaningfully or lead to placeholders.
  - Compare the plan cards with the page headline and calculator intro to ensure the page frames usage-based pricing coherently.
  - Check whether the initial recommended-plan state aligns with the default calculator values visible on load.
- Exit criteria:
  - All three plan cards and their CTAs have been reviewed or activated once.
  - Initial pricing-page state is documented, including visible default input values and recommendation.
  - Any mismatch between static plan messaging and calculator recommendation is captured.

### Calculator logic and recovery states

- Objective: Stress the pricing calculator as the main product UX, including normal use, edge edits, and state recovery.
- Target pages: pricing.html
- Key checks:
  - For each of the three usage controls, change the slider and verify the number input updates immediately.
  - For each of the three usage controls, type into the number input and verify the slider position and output panel update immediately.
  - Exercise a range of values: low/default/high combinations to see whether total cost, line items, and recommendation adapt plausibly.
  - Toggle ARM, macOS, and GPU runner checkboxes individually and in combination, verifying that add-on pricing and line-item breakdown reflect each state.
  - Check for invalid or awkward numeric entry behavior such as clearing a field, entering very small values, very large values, or nonstandard edits, then verify whether the UI recovers to a coherent state.
  - Scroll while interacting to verify the right-side sticky monthly total remains visible and does not overlap or detach unexpectedly.
- Exit criteria:
  - Every calculator control has been manipulated through both available input methods where present.
  - At least several distinct usage scenarios are observed, including a low-usage and higher-usage case plus runner add-ons.
  - Evidence is collected on whether the recommendation, total, and breakdown stay synchronized under edits and recovery attempts.

### Decision-support content below the calculator

- Objective: Validate whether supporting content helps users confirm or refine the plan choice after using the calculator.
- Target pages: pricing.html
- Key checks:
  - Review the 16-row plan comparison table for scanability, alignment with top plan cards, and any ambiguous feature distinctions.
  - Cross-check a few notable features from the comparison table against the plan card summaries for consistency.
  - Open multiple FAQ items across the 10-question accordion, including first, middle, and last items, to test expansion behavior and content clarity.
  - Observe whether FAQ state management is intuitive when opening multiple items or switching between items.
  - Verify that trusted logos and footer content do not distract from or interrupt the decision flow.
- Exit criteria:
  - Comparison table has been scrolled and sampled enough to judge readability and consistency.
  - FAQ accordion interaction has been exercised across multiple positions in the list.
  - Any contradictions or usability issues in supporting decision content are documented.

### Adjacent docs flow and mobile regression pass

- Objective: Confirm the secondary docs path is coherent, then repeat the most critical navigation and pricing checks on mobile where layout and tap targets are riskier.
- Target pages: docs.html, index.html, pricing.html
- Key checks:
  - On docs.html, verify the quickstart content is readable, lightweight, and connected back to the rest of the site via header navigation.
  - Check whether docs feels intentionally minimal versus incomplete, given it is described as a placeholder quickstart page.
  - In mobile viewport, revisit header navigation and primary CTAs on index.html, focusing on tap target comfort and layout integrity.
  - In mobile viewport, repeat the highest-value calculator checks on pricing.html: edit all three usage controls, toggle runner checkboxes, and verify sticky summary behavior or any mobile adaptation.
  - In mobile viewport, inspect the plan comparison table and FAQ accordion for overflow, clipping, horizontal scrolling, or hard-to-tap controls.
- Exit criteria:
  - docs.html has been visited and evaluated as a secondary path.
  - Critical desktop findings have been sanity-checked on mobile for navigation and pricing interactions.
  - Mobile-specific issues around tap size, dense content, or sticky behavior are captured with concrete page references.

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

