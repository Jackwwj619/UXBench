# UXAgent Exploration Plan

## Goal

Explore the full Vaultkey marketing and pricing experience end-to-end, with emphasis on the main acquisition flow from landing page to pricing decisions, while checking adjacent navigation, in-page states, and responsive/mobile usability.

## Plan Summary

The run should start on the landing page to validate the primary CTA path into pricing and to assess whether the faux product preview, messaging hierarchy, and repeated pricing CTAs support conversion. It should then spend most time on pricing.html, since that page contains the richest interactive behavior: billing toggle, business seat slider and linked number input, volume pricing tiers, feature comparison table, and FAQ accordion. Because the prescan shows several placeholder links (#) and repeated small tap-target warnings, the run should explicitly distinguish working navigation from dead-end controls and repeat critical checks in a mobile viewport.

## Coverage Targets

- pages: `Visit both known HTML pages, fully scroll each, and traverse all visible navigation paths between them.`
- features: `Exercise all visible working navigation plus the key pricing interactions: yearly/monthly toggle, Business slider, linked number input, representative tier changes, feature comparison scan, and several FAQ accordion items; also probe placeholder links to confirm dead ends.`
- mobile: `Repeat the critical landing-to-pricing flow and the highest-risk pricing interactions on a mobile viewport, with emphasis on tap target size, stacked layout readability, and comparison-table/FAQ responsiveness.`

## Planned Phases

### Landing page orientation and CTA path

- Objective: Validate the landing page's information architecture, first-impression clarity, and the primary path from homepage into pricing.
- Target pages: index.html
- Key checks:
  - Confirm that the hero clearly communicates product value and that the two hero CTAs are visually and semantically distinct
  - Click both working pricing-entry links from the landing page (header Pricing, hero See plans, bottom See pricing) and verify they consistently reach pricing.html
  - Assess whether the faux app screenshot supports comprehension or creates false expectations of a real interactive product surface
  - Scroll the full page to inspect trust strip, 3 why-cards, and bottom CTA for hierarchy, spacing, and narrative continuity
  - Probe visible placeholder links on the landing page (Security, Enterprise, Help, Sign in, Get Vaultkey, Download free) to document dead ends versus meaningful actions
- Exit criteria:
  - All visible landing-page links have been categorized as functional navigation or placeholder/dead-end
  - At least one successful CTA path from landing page to pricing.html has been confirmed
  - Full-page content hierarchy and bottom CTA have been reviewed on desktop

### Pricing page core plan selection

- Objective: Validate the main plan-comparison experience and ensure billing-period changes are understandable and correctly reflected.
- Target pages: pricing.html
- Key checks:
  - Review the top pricing hero and plan card layout for immediate clarity between Personal, Family, and Business
  - Toggle between Yearly and Monthly and verify visible price text, savings messaging, and card labeling update consistently
  - Inspect the prominence and wording of plan CTAs (Get Personal, Start free 30-day trial, Start 14-day trial, Talk to sales →)
  - Check whether the featured Family plan is clearly marked and whether the visual emphasis feels justified relative to other plans
  - Confirm navigation back to index.html via Vaultkey/Product links if needed and return to pricing without losing context
- Exit criteria:
  - Both billing modes have been exercised
  - All primary plan cards and CTAs have been viewed and compared
  - Any inconsistencies in pricing labels, cadence, or emphasis have been documented

### Business pricing mechanics and edge states

- Objective: Stress the most interactive and error-prone pricing controls: seat sizing, linked inputs, and volume-tier transitions.
- Target pages: pricing.html
- Key checks:
  - Operate the Business team-size slider across the minimum, middle, and maximum ranges
  - Edit the linked number input directly and verify the slider and displayed seat count stay synchronized
  - Test tier boundaries explicitly at 3, 24, 25, 49, 50, 99, 100, 199, and 200 seats if practical within step budget
  - Verify that per-seat price, monthly total, and yearly total update plausibly when crossing each pricing tier
  - Check for handling of invalid or awkward typed values in the number input such as below-minimum, above-maximum, empty, or non-numeric input if the field allows entry
  - Confirm business CTA and enterprise/contact strip remain understandable after custom seat changes
- Exit criteria:
  - Slider-input synchronization has been validated in both directions
  - At least the min, one mid-tier, each tier boundary region, and max seat counts have been sampled
  - No unexplored ambiguity remains about how volume pricing changes across tiers

### Deep content surfaces: comparison and FAQ

- Objective: Check the longer-form decision-support content for scanability, correctness cues, and interaction quality.
- Target pages: pricing.html
- Key checks:
  - Scroll through the full grouped feature comparison table and assess readability, sticky context if any, and alignment across plans
  - Verify all five feature groups are present and visually separated enough to support scanning
  - Spot-check rows from each group for truncation, misalignment, or ambiguous plan inclusion states
  - Exercise multiple FAQ accordion items, including opening, closing, and moving through several questions in sequence
  - Observe whether FAQ interaction preserves orientation on the page and whether expanded answers create layout jumps or readability issues
- Exit criteria:
  - Entire feature table has been traversed
  - FAQ accordion behavior has been tested across several items, not just one
  - Any major readability or structure issues in long-form pricing content have been captured

### Mobile and responsive verification

- Objective: Repeat the most important conversion and interaction checks in a mobile viewport, focusing on small targets and responsive layout changes.
- Target pages: index.html, pricing.html
- Key checks:
  - On index.html mobile, review header/nav presentation, hero CTA stacking, faux screenshot scaling, and bottom CTA visibility
  - Re-check landing-page tap target usability for the small nav links called out by prescan warnings
  - On pricing.html mobile, verify billing toggle remains easy to use and plan cards stack/read cleanly
  - Re-test Business slider and number input on mobile for touch usability, clipping, and synchronization
  - Scroll the comparison table and FAQ on mobile to identify overflow, horizontal scrolling, or cramped text
  - Confirm at least one complete mobile path from landing CTA to pricing plan exploration works without dead ends beyond known placeholder links
- Exit criteria:
  - Critical CTA path has been revalidated on mobile
  - Most interactive pricing controls have been exercised on mobile
  - Responsive issues affecting readability, touch accuracy, or discoverability have been documented

## Prescan Summary

### Vaultkey — passwords, passkeys, and shared secrets for everyone

- Page: `index.html`
- Headings: Every login, every passkey,
one keychain., One shortcut, every site, Real end-to-end, Shared with intent, Stop reusing passwords.
- Interactables: `0` buttons, `11` links, `0` inputs
- Notable controls:
  - clickable:a:Vaultkey
  - clickable:a:Product
  - clickable:a:Pricing
  - clickable:a:Security
  - clickable:a:Enterprise
  - clickable:a:Help
  - clickable:a:Sign in
  - clickable:a:Get Vaultkey

### Pricing — Vaultkey

- Page: `pricing.html`
- Headings: Plans for every kind of keychain., Personal, Family, Business, Need bigger?, Compare every feature., Common questions.
- Interactables: `10` buttons, `12` links, `2` inputs
- Notable controls:
  - clickable:a:Vaultkey
  - clickable:a:Product
  - clickable:a:Pricing
  - clickable:a:Security
  - clickable:a:Enterprise
  - clickable:a:Help
  - clickable:a:Sign in
  - clickable:a:Get Vaultkey

