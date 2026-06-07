# UXAgent Report

## Target

- Site: `lattice`
- Page type: `pricing`
- Target: `file:///Users/timchef/UXBench/websites/lattice/index.html`
- Run directory: `/Users/timchef/UXBench/results-gpt-5.4/lattice/_run`

## Explored User Goal

Autonomously explore and critique the UX of the full lattice system, prioritizing the primary pricing flow plus adjacent pages, states, and recovery paths.

## Exploration Summary

The core pricing flow is conceptually strong: selecting matrix cells updates the quote card and cost breakdown clearly, and add-ons recalculate totals without stale state on both desktop and mobile. However, trust and usability are undermined by hidden pricing rationale, broken-looking primary navigation/CTA links, and significant mobile friction from horizontal overflow and tiny tap targets. The result is a pricing tool that feels informative once used, but harder than it should be to trust, explore, and operate on a phone.

## Execution Plan

Start on the short landing page to confirm the entry path into pricing and sanity-check the top navigation and CTA behavior. Spend most of the run on pricing.html, since the prescan shows the core interactive system there: a 6x6 pricing matrix, sticky quote card, expandable calculation details, 9 add-on checkboxes, tier explainer mapping, feature matrix, FAQ, and footer links. Use desktop first for full-state coverage, then repeat the most important pricing interactions on mobile because the prescan already flagged several small tap targets in the header.

### Landing page entry and navigation sanity check

- Objective: Validate that the landing page clearly funnels users into the pricing experience and that visible top-level links behave as expected.
- Target pages: index.html
- Key checks:
  - Load index.html and confirm core content hierarchy: hero statement, SQL example, three feature cards, and See pricing CTA
  - Click See pricing and confirm it reaches pricing.html
  - Check header links Lattice DB, Platform, and Pricing for sensible navigation between known pages
  - Probe Docs, Customers, Sign in, and Book demo once each to verify whether they are placeholders, inert anchors, or cause unexpected jumps
  - Assess whether the landing page gives enough pricing context before the CTA
- Exit criteria:
  - Confirmed at least one clean path from index.html into pricing.html
  - Header/navigation behavior documented for all visible landing-page links
  - No ambiguity remains about which control launches the primary pricing flow

### Core pricing matrix behavior

- Objective: Exercise the main pricing interaction model and verify that selected states, highlights, and quote-card updates are coherent across representative cells.
- Target pages: pricing.html
- Key checks:
  - Identify default selection state on initial load, if any
  - Click representative matrix cells across the grid: at least one low-end numeric cell, one mid-range numeric cell, one high numeric cell, and one or more 'Contact us' cells
  - Verify each click highlights the correct row and column intersection and updates the selected price in the sticky quote card
  - Verify the selected seat band and data-volume context remain understandable after multiple changes
  - Check whether the sticky quote card stays visible and usable during scrolling
  - Use repeated back-to-back cell changes to look for stale highlights, stale price text, or mismatched tier labels
- Exit criteria:
  - Representative coverage achieved across numeric and Contact us matrix states
  - Quote-card synchronization confirmed or clearly broken for multiple selections
  - Row/column highlighting behavior observed for several distinct cells

### Quote calculation and add-on composition

- Objective: Validate the pricing explanation and additive cost controls that turn a base cell into a fuller monthly quote.
- Target pages: pricing.html
- Key checks:
  - Open and close the 'How this is calculated' disclosure and verify the content is understandable and visually stable
  - Toggle several add-ons individually to confirm each visibly affects the quote or breakdown where applicable
  - Test both percentage-style add-ons and flat-fee add-ons, since the prescan mentions both types
  - Select multiple add-ons together and verify cumulative behavior in the final monthly-fee breakdown card
  - Turn add-ons back off to confirm totals recover correctly without lingering charges
  - Check whether add-on interactions behave differently for numeric cells versus Contact us cells
- Exit criteria:
  - At least one percentage add-on and one flat-fee add-on validated
  - Multi-add-on state and recovery state both observed
  - Final monthly-fee breakdown behavior documented for at least one numeric quote and one special-case quote if supported

### Explanatory and supporting pricing content

- Objective: Confirm that supporting sections reinforce the matrix selection rather than confusing or breaking the flow.
- Target pages: pricing.html
- Key checks:
  - Verify clicking matrix cells auto-highlights the corresponding tier in the 4-tier explainer
  - If the tier explainer itself is interactive, test whether clicking tier cells changes or clarifies state without conflicting with the matrix
  - Scroll through the 15-row feature matrix to check readability, alignment, and whether the current tier context remains understandable
  - Review the 8-question FAQ for expansion behavior if interactive, or at minimum for scannability and answer visibility
  - Check footer content and links for obvious dead ends or unexpected behavior
- Exit criteria:
  - Tier-mapping behavior confirmed for multiple matrix selections
  - Feature matrix and FAQ reviewed for layout and comprehension issues
  - Lower-page content covered enough to assess whether it supports the pricing decision

### Mobile pass on critical flows

- Objective: Repeat the most important pricing interactions on a mobile viewport, focusing on tapability, responsive layout, and sticky/scroll behavior.
- Target pages: index.html, pricing.html
- Key checks:
  - Revisit header controls on mobile and test the nav links that were flagged as small tap targets in the prescan
  - Confirm the landing-page CTA remains prominent and easy to activate on mobile
  - On pricing.html, verify the matrix remains understandable and operable on a small viewport, including horizontal scrolling or stacking if present
  - Repeat a small set of critical matrix selections on mobile: one numeric cell, one higher-end cell, and one Contact us cell
  - Toggle at least two add-ons on mobile and confirm the quote/breakdown remains visible and comprehensible
  - Check whether the sticky quote card, disclosure, FAQ, and long-table sections behave acceptably while scrolling
- Exit criteria:
  - Primary landing-to-pricing flow completed on mobile
  - Critical pricing interactions repeated successfully or major mobile blockers identified
  - Small-tap-target impact assessed on the header and key actions

## Exploration Coverage

- Status: `near_complete`
- Confidence: `high`
- Page coverage: `100%`
- Feature coverage: `72%`
- Action success rate: `99%`
- Viewports exercised: `desktop, mobile`

Coverage gaps:
- 1 browser action(s) failed and should be retried or analyzed.

## Top UX Feedback

1. **[HIGH] The page repeatedly exposes a "How we got this number" affordance, but the pricing rationale remains hidden during tested flows, leaving users with totals and percentage add-ons they cannot easily verify.** (trust)
2. **[HIGH] Many prominent navigation and trust-building links appear clickable but go nowhere, creating a broken or placeholder feel during evaluation.** (trust)
3. **[HIGH] The pricing page overflows horizontally on mobile, and access to the full matrix is unclear, making comparison of right-side columns unreliable.** (mobile usability)
4. **[HIGH] Critical interactive targets are too small for comfortable touch use, especially the add-on checkboxes that drive pricing changes.** (accessibility)
5. **[MEDIUM] The pricing breakdown shows percentage charges as rounded dollar values without clarifying the math basis or whether multiple percentage add-ons stack on the base or compound.** (clarity)

## High Severity Findings

### The page repeatedly exposes a "How we got this number" affordance, but the pricing rationale remains hidden during tested flows, leaving users with totals and percentage add-ons they cannot easily verify.

- UX area: `trust`
- User goal: Validate how the quoted monthly price is calculated before committing or contacting sales.
- Evidence: Across desktop matrix selections ($541, $1,025, $1,335), the quote card continued to show the collapsed label "How we got this number" and clicking the selected matrix cell did not reveal details. In the Contact us state, multiple percentage add-ons displayed as $0 while the disclosure still remained collapsed. Final mobile and desktop observations also show only the collapsed explanation label beneath the selected quote.
- Why it matters: Pricing confidence is especially fragile when the UI mixes base price, flat fees, percentages, included features, and estimated usage. If users cannot inspect the math, they may doubt the quote, hesitate to self-serve, or abandon for a competitor with clearer pricing transparency.
- Suggested change: Make the calculation breakdown easier to discover at the moment of change: auto-expand it after a new cell is selected, or surface a short inline formula summary directly in the quote card. For enterprise selections, replace hidden math with explicit messaging about which add-ons are estimated now vs finalized through sales.
- Source hint: `pricing.html quote card / "How we got this number"`

### Many prominent navigation and trust-building links appear clickable but go nowhere, creating a broken or placeholder feel during evaluation.

- UX area: `trust`
- User goal: Use header/footer links and CTAs to learn more, book a demo, sign in, or verify the company.
- Evidence: Desktop testing showed no navigation or content change for Book demo, Docs, Customers, Sign in, Architecture, Benchmarks, Security, About, Blog, and Careers; chunk summaries note these anchors use href '#'. On mobile, footer link Overview also changed the URL to pricing.html# without surfacing new content.
- Why it matters: When a pricing page asks users to trust a cost model, dead-end nav and CTA elements make the site feel unfinished or unreliable. This is especially damaging for a database product where security, docs, sign-in, and sales access are core trust signals.
- Suggested change: Either provide real destinations for these links or visually demote/remove them until they are functional. At minimum, primary actions like Book demo, Docs, and Sign in should lead somewhere meaningful or clearly indicate they are unavailable.
- Source hint: `index.html and pricing.html header/footer links`

### The pricing page overflows horizontally on mobile, and access to the full matrix is unclear, making comparison of right-side columns unreliable.

- UX area: `mobile usability`
- User goal: Compare pricing columns and choose the right matrix cell on a phone.
- Evidence: Mobile observations repeatedly flagged "Page width 475px exceeds viewport 390px." In steps 55-60, a drag attempt produced changed=false, so panning behavior could not be confirmed. The summary notes mobile exposed the 5–20 TB column but not the final 20 TB+ / Contact us column, leaving right-edge access unresolved.
- Why it matters: The matrix is the primary pricing mechanism. If mobile users cannot confidently see or reach all columns, they may miss higher-volume options, misunderstand pricing bands, or assume the experience is broken.
- Suggested change: Redesign the matrix for small screens with an explicit horizontal scroll affordance, sticky headers/labels, or a stacked alternative selector for seats and data volume. Also ensure the last columns remain obviously reachable.
- Source hint: `pricing.html mobile matrix / screenshots agentic-67-uncheck-mobile.png and agentic-70-uncheck-mobile.png`

### Critical interactive targets are too small for comfortable touch use, especially the add-on checkboxes that drive pricing changes.

- UX area: `accessibility`
- User goal: Toggle add-ons and use navigation accurately on touch devices.
- Evidence: Layout warnings repeatedly report 13x13px add-on checkboxes for HIPAA, backups, PrivateLink, GPU, Read replica, PITR, and Sandbox. Header nav links were also flagged as undersized, such as Pricing at 45x21px, Docs at 31x21px, Sign in at 42x21px, and Book demo at 105x41px.
- Why it matters: Small targets make selection error-prone, slow, and fatiguing, particularly in a pricing configurator where users may toggle several options in sequence. This harms mobile usability and accessibility for users with motor limitations.
- Suggested change: Increase the tappable area of checkboxes and nav items to at least 44px high/wide, and make the full label row toggle the checkbox rather than only the tiny native box.
- Source hint: `pricing.html mobile add-on list and top nav targets ux-40 to ux-48, ux-2, ux-3`

## Medium Severity Findings

### The pricing breakdown shows percentage charges as rounded dollar values without clarifying the math basis or whether multiple percentage add-ons stack on the base or compound.

- UX area: `clarity`
- User goal: Understand how percentage-based add-ons are applied to the base price.
- Evidence: Desktop testing showed 15% of $1,335 displayed as $200, suggesting rounding. Mobile final observation shows Matrix base $4,272 with +15% backups = $641 and +8% PITR = $342, while step 68 notes the card does not explicitly explain whether stacked percentages are applied only to the matrix base or compounded.
- Why it matters: Users comparing plans may try to verify pricing mentally and become confused when displayed numbers do not match exact arithmetic. Ambiguity around rounding or stacking reduces trust in the estimate and makes budgeting harder.
- Suggested change: Add a short note such as "percent add-ons are calculated from the matrix base and rounded to the nearest dollar" and show the formula inline for each percentage line item.
- Source hint: `pricing.html final estimated cost card`

### Selecting an enterprise "Contact us" cell changes the quote state but does not provide a strong next step or context-specific sales path.

- UX area: `goal completion`
- User goal: Move forward when the selected pricing cell requires enterprise sales contact.
- Evidence: Chunk steps 07-12 reports the right panel changed to "SELECTED CELL Contact us" with tier "Enterprise," but "No explanatory enterprise messaging or next-step CTA appeared in the selected-cell card beyond 'Contact us' and a collapsed 'How we got this number'." Meanwhile, Book demo was tested elsewhere and did nothing because it links to '#'.
- Why it matters: Enterprise users are the least likely to self-serve and most dependent on clear handoff. A dead-end enterprise state can stall qualified prospects at the exact moment they signal high-intent interest.
- Suggested change: When an enterprise cell is selected, replace the generic quote summary with a dedicated enterprise panel: explain custom pricing, clarify which add-ons are indicative only, and provide a working CTA such as "Talk to sales" or "Request enterprise quote."
- Source hint: `pricing.html selected-cell quote card for Contact us state`

### The lower-page disclosure/link behavior is ambiguous: FAQ rows are compact and closed, and at least one tap intended to inspect that area activated a footer placeholder link instead of revealing information.

- UX area: `feedback`
- User goal: Open FAQ or supporting content to answer decision-making questions.
- Evidence: Steps 61-66 note that FAQ items were visible only as compact closed rows with a trailing '+'. A click meant to reach FAQ disclosure instead activated footer link "Overview," which changed the URL to pricing.html# but produced no new content. Mobile overflow persisted in this region too.
- Why it matters: Users often rely on FAQ and supporting documentation to resolve objections around tiers, add-ons, and enterprise plans. Ambiguous or non-responsive disclosure behavior increases effort and can make the page feel less informative than it really is.
- Suggested change: Improve separation between FAQ and footer links, enlarge disclosure targets, and consider opening the first FAQ by default or adding clearer hit areas and visual cues for expandable questions.
- Source hint: `pricing.html FAQ/footer area on mobile`

## Low Severity Findings

_None in this run._

## Screenshots and Evidence

- `/Users/timchef/UXBench/results-gpt-5.4/lattice/_run/screenshots/initial-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/lattice/_run/screenshots/initial-responsive-screenshots-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/lattice/_run/screenshots/initial-responsive-screenshots-mobile.png`
- `/Users/timchef/UXBench/results-gpt-5.4/lattice/_run/screenshots/initial-after-responsive-check-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/lattice/_run/screenshots/post-plan-reset-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/lattice/_run/screenshots/agentic-01-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/lattice/_run/screenshots/agentic-02-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/lattice/_run/screenshots/agentic-03-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/lattice/_run/screenshots/agentic-04-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/lattice/_run/screenshots/agentic-05-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/lattice/_run/screenshots/agentic-06-check-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/lattice/_run/screenshots/agentic-07-check-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/lattice/_run/screenshots/agentic-08-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/lattice/_run/screenshots/agentic-09-scroll-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/lattice/_run/screenshots/agentic-10-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/lattice/_run/screenshots/agentic-11-check-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/lattice/_run/screenshots/agentic-12-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/lattice/_run/screenshots/agentic-13-click-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/lattice/_run/screenshots/agentic-14-check-desktop.png`
- `/Users/timchef/UXBench/results-gpt-5.4/lattice/_run/screenshots/agentic-15-click-desktop.png`

## Suggested Fix Priorities

1. Make the calculation breakdown easier to discover at the moment of change: auto-expand it after a new cell is selected, or surface a short inline formula summary directly in the quote card. For enterprise selections, replace hidden math with explicit messaging about which add-ons are estimated now vs finalized through sales.
2. Either provide real destinations for these links or visually demote/remove them until they are functional. At minimum, primary actions like Book demo, Docs, and Sign in should lead somewhere meaningful or clearly indicate they are unavailable.
3. Redesign the matrix for small screens with an explicit horizontal scroll affordance, sticky headers/labels, or a stacked alternative selector for seats and data volume. Also ensure the last columns remain obviously reachable.
4. Increase the tappable area of checkboxes and nav items to at least 44px high/wide, and make the full label row toggle the checkbox rather than only the tiny native box.
5. Add a short note such as "percent add-ons are calculated from the matrix base and rounded to the nearest dollar" and show the formula inline for each percentage line item.
6. When an enterprise cell is selected, replace the generic quote summary with a dedicated enterprise panel: explain custom pricing, clarify which add-ons are indicative only, and provide a working CTA such as "Talk to sales" or "Request enterprise quote."
7. Improve separation between FAQ and footer links, enlarge disclosure targets, and consider opening the first FAQ by default or adding clearer hit areas and visual cues for expandable questions.

## Claude Remediation

_Claude Code fix pass was not requested for this run._

## Trace Summary

- Trace entries: `69`
- Full trace: `trace.json`
- Structured report: `report.json`
