# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full codekite system, prioritizing the primary pricing flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

CodeKite’s pricing flow communicates value well at first glance: the plan cards, default calculator estimate, and sticky cost breakdown make the core pricing proposition feel concrete. However, several high-impact UX problems interrupt trust and completion, especially dead-end conversion links, opaque calculator assumptions, and weak mobile/accessibility ergonomics. Coverage was substantial across landing, pricing, docs, and both desktop/mobile, but FAQ expansion behavior was only partially verified because the visible accordion controls were hard to target reliably.

## Issues (9)

### [HIGH] primary-conversion-actions-look-actionable-but — goal completion
- **Page**: `pricing.html plan cards/header; docs.html header Sign in`
- **Problem**: Primary conversion actions look actionable but behave like silent dead ends, with no navigation, modal, or confirmation after click.
- **Evidence**: On pricing.html, clicking Team "Start trial," Enterprise "Talk to sales," Free "Get started," and header "Sign in" all produced no meaningful change; multiple actions only changed the URL to pricing.html# or showed no visible-text change. The docs-page "Sign in" similarly changed only from docs.html to docs.html#.
- **Suggested fix**: Make every primary CTA lead to a real next step: signup flow, contact form, or at minimum a clear interim message. Avoid placeholder # links for key actions, and provide immediate feedback if a destination is unavailable.

### [HIGH] several-footer-company-resource-links-appear — trust
- **Page**: `index.html footer links; pricing.html footer links`
- **Problem**: Several footer/company/resource links appear legitimate but are placeholders that do nothing except append # to the URL.
- **Evidence**: Clicks on pricing.html footer links such as "About" and "Overview" produced no meaningful content change, and mobile testing confirmed index.html "Careers" only changed the URL from index.html to index.html#. The interactables list shows multiple footer links with href '#', including Changelog, Status, Security, About, Blog, and Careers.
- **Suggested fix**: Either remove unfinished footer links until they exist or route them to lightweight placeholder pages that clearly explain status and preserve navigation context.

### [MEDIUM] the-calculator-uses-hidden-assumptions-for — clarity
- **Page**: `pricing.html calculator breakdown and runner checkboxes`
- **Problem**: The calculator uses hidden assumptions for add-on runner pricing and allowances, so line items do not clearly map to what the user entered.
- **Evidence**: When ARM, macOS, and GPU add-ons were selected, breakdown rows used unexplained shares like "ARM runners (~25% of minutes)," "macOS runners (~15% of minutes)," and "GPU runners (~5% of minutes)" even though the checkbox labels only promised per-minute pricing. Storage also showed entered values like 1000 GB becoming billed as "995 GB-month" without inline explanation.
- **Suggested fix**: Explain assumptions adjacent to each add-on control or let users explicitly set the share of minutes per runner type. Also clarify included storage/base allowances where billed values differ from entered values.

### [MEDIUM] the-calculator-accepts-problematic-values-like — error recovery
- **Page**: `pricing.html calculator number inputs`
- **Problem**: The calculator accepts problematic values like 0 and even -10 without visible validation or explanation, creating contradictory states.
- **Evidence**: Entering 0 into build minutes recalculated to a Free plan state with no visible validation messaging. Entering -10 into artifact storage changed the field to -10 while the estimate remained $0.00 and Recommended plan: Free, with no visible error or explanation. Earlier invalid/constrained edits to concurrency also produced little to no feedback about whether values were rejected or clamped.
- **Suggested fix**: Add explicit min/max constraints, inline validation messages, and immediate corrective feedback when values are out of range. If values are auto-clamped, show that visibly.

### [MEDIUM] multiple-calculator-controls-are-missing-labels — accessibility
- **Page**: `pricing.html calculator inputs`
- **Problem**: Multiple calculator controls are missing labels, making the dense form harder to interpret and increasing ambiguity during editing.
- **Evidence**: Repeated layout warnings flagged missing labels on calculator range and number inputs (referenced as ux-10 to ux-13 in observations/chunks). This issue persisted across desktop and mobile testing while the calculator was being edited directly.
- **Suggested fix**: Provide persistent visible labels tied programmatically to every slider and numeric input, and keep labels close enough that field purpose remains obvious while editing.

### [MEDIUM] mobile-tap-targets-are-frequently-undersized — mobile usability
- **Page**: `mobile screenshots and layout warnings on index.html, pricing.html, docs.html`
- **Problem**: Mobile tap targets are frequently undersized, including header links, footer links, and add-on checkboxes, making high-value actions fiddly to hit.
- **Evidence**: Mobile layout warnings repeatedly flagged targets below 44px guidance: header links like "Product" at 53x21px and brand/nav items around 27–28px high; footer links such as Overview/Pricing/Docs/About/Blog/Careers were 159x26px; add-on checkboxes on mobile were only 13x13px.
- **Suggested fix**: Increase tappable area for nav, footer, and checkbox rows so the entire row or label is touchable, and bring all key targets up to comfortable mobile size.

### [MEDIUM] the-docs-page-is-reachable-and — navigation
- **Page**: `docs.html main content and header`
- **Problem**: The docs page is reachable and coherent, but it feels too sparse and lacks an explicit path back into signup or pricing decision-making.
- **Evidence**: Docs successfully loads from pricing and landing, but observations describe it as one heading, one YAML example, no buttons/forms, and roughly 399 characters of text. Session notes also state there is no explicit CTA back into signup or pricing from docs beyond generic header navigation.
- **Suggested fix**: Add contextual next steps on docs, such as "See pricing," "Start trial," or a small banner tying quickstart setup to plan selection.

### [LOW] at-least-one-mobile-header-link — navigation
- **Page**: `index.html mobile header Product link`
- **Problem**: At least one mobile header link behaves as a redundant self-link, so the navigation offers an option that does not meaningfully move the user.
- **Evidence**: On mobile index.html, clicking "Product" changed the URL only from index.html# to index.html while keeping the user on the same landing page. The tap target is also small at 53x21px.
- **Suggested fix**: Either convert self-links into true in-page anchors/section jumps or remove/highlight the current page state so users are not offered a no-op navigation choice.

### [LOW] the-mobile-comparison-table-is-cramped — visual hierarchy
- **Page**: `pricing.html mobile comparison table`
- **Problem**: The mobile comparison table is cramped and text-dense, which makes side-by-side plan scanning difficult before users reach the FAQ.
- **Evidence**: Mobile exploration found the comparison table displayed in four columns within a narrow viewport, with rows like "Concurrent builds" and "Artifact storage" appearing tightly packed. Earlier notes also describe the lower page as highly text-dense before the FAQ becomes visible.
- **Suggested fix**: Consider a mobile-specific comparison pattern such as stacked cards, sticky row labels, horizontal snapping, or progressive disclosure of only the most important plan differences first.
