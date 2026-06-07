# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full pelagic system, prioritizing the primary landing flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: True

## Summary

The landing page is structurally solid: the hero, section jumps, benchmark animation, code tabs, and lower-page content all render and behave without runtime errors. The biggest UX risks are mobile touch ergonomics and a few misleading placeholder-style links that change the URL without taking users to a meaningful destination. There’s also a content readability issue in the mobile curl example, where the code is truncated at the right edge. Coverage is near-complete for the single page, but Pricing and Quickstart were not fully exercised on desktop, so those are the main remaining gaps.

## Issues (7)

### [HIGH] several-primary-controls-are-below-comfortable — mobile usability
- **Page**: `index.html / header + hero controls + footer sitemap`
- **Problem**: Several primary controls are below comfortable mobile touch size, making the hero and footer hard to use accurately on touch screens.
- **Evidence**: Mobile layout warnings flagged small tap targets including the logo (100×28), GitHub stars pill (99×35), Quickstart button (101×41), install Copy button (50×24), code tabs (71×32, 57×32, 42×32, 57×32), and footer links (159×29).
- **Suggested fix**: Increase tap target heights to at least 44px, add more vertical padding in the hero/nav/footer, and ensure adjacent controls have enough spacing to avoid accidental taps.

### [HIGH] the-view-on-github-cta-behaves — clarity
- **Page**: `index.html: View on GitHub / GitHub stars`
- **Problem**: The 'View on GitHub' CTA behaves like a placeholder anchor rather than a meaningful destination, which weakens trust and leaves users without a clear next step.
- **Evidence**: On mobile, tapping 'View on GitHub' changed the URL from `#quickstart` to `#` with no visible in-page feedback or destination change; earlier tests also showed the GitHub stars pill and some footer links behaving as same-page placeholder links.
- **Suggested fix**: Point the CTA to a real GitHub repository or open it in a new tab, and if the destination is intentionally unavailable, label it accordingly or disable it visually.

### [HIGH] multiple-footer-sitemap-items-appear-to — navigation
- **Page**: `index.html: footer sitemap`
- **Problem**: Multiple footer sitemap items appear to be placeholder links, so the footer reads like navigation but does not reliably navigate.
- **Evidence**: Mobile footer clicks on Overview, Docs, Discord, Forum, and RFC tracker produced no meaningful URL change or only `#`, with either no visible change or vague same-page behavior; prior trajectory notes describe this as placeholder-anchor behavior.
- **Suggested fix**: Replace placeholder anchors with real section IDs or outbound URLs, and if a destination is not ready, hide the link or mark it as unavailable.

### [MEDIUM] the-benchmark-row-is-visually-compact — clarity
- **Page**: `index.html: hero benchmark row`
- **Problem**: The benchmark row is visually compact and rotates in place, which makes it easy to miss what is changing or whether the metric is live data versus decoration.
- **Evidence**: The benchmark text remained visible and legible after a 3s wait, showing changes like 'Running benchmark on YFCC-100M… Recall@10: 0.987' and 'Throughput: 42k QPS'; no errors occurred, but the content is compressed into a small hero row.
- **Suggested fix**: Consider labeling the benchmark area more explicitly as a rotating live example or carousel, and give each state a slightly larger visual treatment or progress indicator.

### [MEDIUM] the-mobile-curl-snippet-is-truncated — accessibility
- **Page**: `index.html: curl code tab / mobile code panel`
- **Problem**: The mobile curl snippet is truncated on the right edge, so part of the command is not visible in the viewport.
- **Evidence**: After switching to the curl tab on mobile, the visible text shows the command but the reflection notes it is clipped on the right edge; the screenshot shows the long line extending beyond the card width.
- **Suggested fix**: Wrap long lines, reduce inline width, or add an explicit horizontal scroll affordance and a copy-to-clipboard control for the code block.

### [MEDIUM] the-copy-interaction-works-but-the — feedback
- **Page**: `index.html: Copy install command`
- **Problem**: The copy interaction works, but the button is tiny and the success feedback competes with a dense hero, so discoverability is fragile on mobile.
- **Evidence**: Clicking the copy button produced a clear toast ('Copied pip install pelagic'), but the control is only 50×24px and mobile layout warnings repeatedly flag it as below guidance.
- **Suggested fix**: Make the copy button larger and more prominent, and consider placing the success message closer to the command itself so users can connect action and result immediately.

### [LOW] the-header-and-hero-pack-multiple — visual hierarchy
- **Page**: `index.html: hero/header`
- **Problem**: The header and hero pack multiple similar-weight actions together, which dilutes the prominence of the primary path and makes the secondary actions feel equally important.
- **Evidence**: The mobile hero shows Quickstart, View on GitHub, install Copy, stars pill, and code-tab controls clustered near the top, while the layout warnings show many small targets in the same area.
- **Suggested fix**: Strengthen hierarchy by emphasizing one primary CTA, demoting secondary actions, and separating utility controls from product-intro content more clearly.
