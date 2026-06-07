# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full pelagic system, prioritizing the primary landing flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: True

## Summary

The Pelagic landing page effectively communicates technical value through clear hierarchy and interactive code snippets, but suffers from significant mobile usability friction due to undersized touch targets across navigation and controls. Critical trust gaps exist where primary CTAs ('View on GitHub') and footer links are non-functional placeholders, breaking the user journey. Additionally, anchor navigation for 'Pricing' and 'Quickstart' fails to scroll to content, creating confusion about missing sections.

## Issues (5)

### [HIGH] critical-interactive-elements-have-tap-targets — mobile usability
- **Page**: `layout_warnings: ux-6, ux-9, ux-11`
- **Problem**: Critical interactive elements have tap targets significantly below the 44px minimum guideline, leading to potential mis-clicks and frustration.
- **Evidence**: Layout warnings consistently flag elements like the 'Copy' button (50x24px), code tabs (e.g., 'go' at 42x32px), and footer links (29px height) as too small for reliable touch interaction.
- **Suggested fix**: Increase the padding or height of all interactive buttons and links to meet the 44x44px minimum touch target standard, ensuring comfortable thumb interaction.

### [HIGH] the-view-on-github-cta-and — trust
- **Page**: `steps-43-48: 'View on GitHub' CTA has href='#'`
- **Problem**: The 'View on GitHub' CTA and 'GitHub stars' pill are dead links (href='#'), failing to navigate to the actual repository.
- **Evidence**: Clicking 'View on GitHub' (ux-5) only changes the URL hash to '#' without opening an external link. The README implies this is a marketing clone, but for a real product, this breaks the primary trust signal.
- **Suggested fix**: Ensure all external social proof links (GitHub, Discord, Twitter) point to valid, live URLs. If the repo is private, explicitly state that or remove the link.

### [MEDIUM] header-anchor-links-for-pricing-and — navigation
- **Page**: `steps-31-36: 'Pricing' nav link updated hash but did not scroll.`
- **Problem**: Header anchor links for 'Pricing' and 'Quickstart' update the URL hash but fail to scroll the viewport to the corresponding content.
- **Evidence**: Clicking 'Pricing' (ux-4) updates the URL to #pricing but leaves the user at the top of the page; no '#pricing' section exists in the DOM. Similarly, '#quickstart' does not trigger a scroll.
- **Suggested fix**: Either implement smooth scrolling to the correct section IDs or remove the navigation items if the sections do not exist on the single-page layout.

### [MEDIUM] the-running-benchmark-text-and-rotating — feedback
- **Page**: `index.html: Hero section benchmark display`
- **Problem**: The 'Running benchmark...' text and rotating numbers lack context or a clear indicator of whether the data is live, simulated, or static.
- **Evidence**: The UI shows 'Running benchmark on YFCC-100M...' with changing numbers (e.g., 'Recall@10: 0.987'). It is unclear if this is a real-time connection to a test cluster or a pre-recorded animation.
- **Suggested fix**: Add a subtle tooltip or label clarifying that these are 'Latest Benchmark Results' or 'Live Demo Metrics' to set accurate user expectations.

### [LOW] the-active-state-for-code-tabs — affordance
- **Page**: `steps-61-61: 'Visual active state indication is present but subtle...'`
- **Problem**: The active state for code tabs is visually subtle, relying mainly on text color/brightness rather than strong background differentiation.
- **Evidence**: Observations note that while the 'node' tab becomes active, the visual distinction is 'subtle' and lacks a strong background highlight or underline compared to inactive tabs.
- **Suggested fix**: Enhance the active tab state with a distinct background color, bottom border, or increased font weight to clearly separate it from inactive options.
