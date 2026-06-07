# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full lattice system, prioritizing the primary pricing flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: True

## Summary

The core pricing flow is conceptually strong: selecting matrix cells updates the quote card and cost breakdown clearly, and add-ons recalculate totals without stale state on both desktop and mobile. However, trust and usability are undermined by hidden pricing rationale, broken-looking primary navigation/CTA links, and significant mobile friction from horizontal overflow and tiny tap targets. The result is a pricing tool that feels informative once used, but harder than it should be to trust, explore, and operate on a phone.

## Issues (7)

### [HIGH] the-page-repeatedly-exposes-a-how — trust
- **Page**: `pricing.html quote card / "How we got this number"`
- **Problem**: The page repeatedly exposes a "How we got this number" affordance, but the pricing rationale remains hidden during tested flows, leaving users with totals and percentage add-ons they cannot easily verify.
- **Evidence**: Across desktop matrix selections ($541, $1,025, $1,335), the quote card continued to show the collapsed label "How we got this number" and clicking the selected matrix cell did not reveal details. In the Contact us state, multiple percentage add-ons displayed as $0 while the disclosure still remained collapsed. Final mobile and desktop observations also show only the collapsed explanation label beneath the selected quote.
- **Suggested fix**: Make the calculation breakdown easier to discover at the moment of change: auto-expand it after a new cell is selected, or surface a short inline formula summary directly in the quote card. For enterprise selections, replace hidden math with explicit messaging about which add-ons are estimated now vs finalized through sales.

### [HIGH] many-prominent-navigation-and-trust-building — trust
- **Page**: `index.html and pricing.html header/footer links`
- **Problem**: Many prominent navigation and trust-building links appear clickable but go nowhere, creating a broken or placeholder feel during evaluation.
- **Evidence**: Desktop testing showed no navigation or content change for Book demo, Docs, Customers, Sign in, Architecture, Benchmarks, Security, About, Blog, and Careers; chunk summaries note these anchors use href '#'. On mobile, footer link Overview also changed the URL to pricing.html# without surfacing new content.
- **Suggested fix**: Either provide real destinations for these links or visually demote/remove them until they are functional. At minimum, primary actions like Book demo, Docs, and Sign in should lead somewhere meaningful or clearly indicate they are unavailable.

### [HIGH] the-pricing-page-overflows-horizontally-on — mobile usability
- **Page**: `pricing.html mobile matrix / screenshots agentic-67-uncheck-mobile.png and agentic-70-uncheck-mobile.png`
- **Problem**: The pricing page overflows horizontally on mobile, and access to the full matrix is unclear, making comparison of right-side columns unreliable.
- **Evidence**: Mobile observations repeatedly flagged "Page width 475px exceeds viewport 390px." In steps 55-60, a drag attempt produced changed=false, so panning behavior could not be confirmed. The summary notes mobile exposed the 5–20 TB column but not the final 20 TB+ / Contact us column, leaving right-edge access unresolved.
- **Suggested fix**: Redesign the matrix for small screens with an explicit horizontal scroll affordance, sticky headers/labels, or a stacked alternative selector for seats and data volume. Also ensure the last columns remain obviously reachable.

### [HIGH] critical-interactive-targets-are-too-small — accessibility
- **Page**: `pricing.html mobile add-on list and top nav targets ux-40 to ux-48, ux-2, ux-3`
- **Problem**: Critical interactive targets are too small for comfortable touch use, especially the add-on checkboxes that drive pricing changes.
- **Evidence**: Layout warnings repeatedly report 13x13px add-on checkboxes for HIPAA, backups, PrivateLink, GPU, Read replica, PITR, and Sandbox. Header nav links were also flagged as undersized, such as Pricing at 45x21px, Docs at 31x21px, Sign in at 42x21px, and Book demo at 105x41px.
- **Suggested fix**: Increase the tappable area of checkboxes and nav items to at least 44px high/wide, and make the full label row toggle the checkbox rather than only the tiny native box.

### [MEDIUM] the-pricing-breakdown-shows-percentage-charges — clarity
- **Page**: `pricing.html final estimated cost card`
- **Problem**: The pricing breakdown shows percentage charges as rounded dollar values without clarifying the math basis or whether multiple percentage add-ons stack on the base or compound.
- **Evidence**: Desktop testing showed 15% of $1,335 displayed as $200, suggesting rounding. Mobile final observation shows Matrix base $4,272 with +15% backups = $641 and +8% PITR = $342, while step 68 notes the card does not explicitly explain whether stacked percentages are applied only to the matrix base or compounded.
- **Suggested fix**: Add a short note such as "percent add-ons are calculated from the matrix base and rounded to the nearest dollar" and show the formula inline for each percentage line item.

### [MEDIUM] selecting-an-enterprise-contact-us-cell — goal completion
- **Page**: `pricing.html selected-cell quote card for Contact us state`
- **Problem**: Selecting an enterprise "Contact us" cell changes the quote state but does not provide a strong next step or context-specific sales path.
- **Evidence**: Chunk steps 07-12 reports the right panel changed to "SELECTED CELL Contact us" with tier "Enterprise," but "No explanatory enterprise messaging or next-step CTA appeared in the selected-cell card beyond 'Contact us' and a collapsed 'How we got this number'." Meanwhile, Book demo was tested elsewhere and did nothing because it links to '#'.
- **Suggested fix**: When an enterprise cell is selected, replace the generic quote summary with a dedicated enterprise panel: explain custom pricing, clarify which add-ons are indicative only, and provide a working CTA such as "Talk to sales" or "Request enterprise quote."

### [MEDIUM] the-lower-page-disclosure-link-behavior — feedback
- **Page**: `pricing.html FAQ/footer area on mobile`
- **Problem**: The lower-page disclosure/link behavior is ambiguous: FAQ rows are compact and closed, and at least one tap intended to inspect that area activated a footer placeholder link instead of revealing information.
- **Evidence**: Steps 61-66 note that FAQ items were visible only as compact closed rows with a trailing '+'. A click meant to reach FAQ disclosure instead activated footer link "Overview," which changed the URL to pricing.html# but produced no new content. Mobile overflow persisted in this region too.
- **Suggested fix**: Improve separation between FAQ and footer links, enlarge disclosure targets, and consider opening the first FAQ by default or adding clearer hit areas and visual cues for expandable questions.
