# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full pelagic system, prioritizing the primary landing flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

Pelagic’s landing page communicates the product story well and the core demo interactions mostly work, but several primary navigation and trust-building actions are misleading or nonfunctional. The biggest UX problem is that many links that look important—especially GitHub, footer resources, and some top-nav items—either go nowhere or land in the wrong place, which makes the page feel less trustworthy. Mobile reading and section stacking are generally solid, but touch-target sizing and dense technical visuals create usability and accessibility friction.

## Issues (7)

### [HIGH] multiple-links-that-appear-to-promise — trust
- **Page**: `index.html hero CTAs, stars pill, and footer link groups`
- **Problem**: Multiple links that appear to promise real destinations are dead-end placeholders, including the hero "View on GitHub," the GitHub stars pill, footer GitHub, Discord, Forum, RFC tracker, Docs, Quickstart, Benchmarks, Migration guides, and others.
- **Evidence**: The hero "View on GitHub" CTA has href '#'; clicking it on both desktop and mobile produced no meaningful navigation and left the URL at index.html#. The GitHub stars pill is also an <a href="#"> and did not navigate. Footer links including GitHub, Discord, Forum, Docs, Quickstart, Benchmarks, and Migration guides were individually tested and likewise only changed to or remained at '#'.
- **Suggested fix**: Replace placeholder links with real destinations before presenting them as navigation. If a destination does not exist yet, remove the link styling or label it clearly as "coming soon" rather than making it appear clickable.

### [HIGH] the-quickstart-cta-navigation-does-not — goal completion
- **Page**: `index.html top nav / hero CTA anchors`
- **Problem**: The "Quickstart" CTA/navigation does not lead to a clearly identifiable quickstart destination, and other nav items like Docs and Pricing land in mismatched content areas rather than sections users would expect.
- **Evidence**: Clicking Quickstart changed the URL to #quickstart but the visible content remained at the top hero, and the DOM/headings do not include a 'Quickstart' section. Clicking Docs changed the URL to #docs but brought the viewport to the blog/changelog area. Clicking Pricing changed the URL to #pricing but also landed on the blog/changelog area with no visible pricing heading or pricing content.
- **Suggested fix**: Ensure every nav item maps to a visible, correctly labeled section with enough scroll offset to be immediately recognizable. Rename links if they actually point to another section, or add the promised sections if they are part of the intended funnel.

### [MEDIUM] many-interactive-elements-on-mobile-are — mobile usability
- **Page**: `mobile header, hero actions, code tab row, footer link list`
- **Problem**: Many interactive elements on mobile are below recommended touch size, including header nav, the stars pill, Quickstart, the copy button, code tabs, and footer links.
- **Evidence**: Layout warnings repeatedly flagged small mobile tap targets: Pelagic 100x28, GitHub stars 99x35, Quickstart 101x41, Copy 50x24, python 71x32, node 57x32, go 42x32, curl 57x32, and footer links such as Docs/Overview/Pricing at 159x29. These warnings appeared across mobile observations and tested interactions.
- **Suggested fix**: Increase interactive heights to at least 44px, add more internal padding, and preserve spacing between nearby controls in the header, code tabs, copy action, and footer lists.

### [MEDIUM] the-copy-action-relies-mostly-on — feedback
- **Page**: `index.html install command strip / Copy button`
- **Problem**: The copy action relies mostly on a transient toast, while the button itself does not change state or provide persistent inline confirmation.
- **Evidence**: Clicking the 50x24 Copy button successfully showed a lower-right toast reading "Copied pip install pelagic," but the inline control text remained "Copy" and no visible change occurred at the button itself. Session notes explicitly mention confirmation depends on noticing the transient toast.
- **Suggested fix**: Add inline confirmation at the button or command strip, such as changing the label to "Copied" briefly, showing a check icon, or keeping a short-lived success state near the interaction target.

### [MEDIUM] the-architecture-diagram-appears-dense-and — clarity
- **Page**: `index.html Architecture section`
- **Problem**: The architecture diagram appears dense and difficult to read on small screens even though it scales to fit.
- **Evidence**: Mobile scrolling revealed the Architecture heading and diagram; notes state the diagram is fully scaled into the narrow viewport but the labels are tiny relative to the section and likely hard to read without zooming. On desktop, the architecture area was also described as information-dense and partially cropped when arriving mid-scroll.
- **Suggested fix**: Simplify the mobile diagram, increase label size, provide a tap-to-expand/lightbox version, or accompany it with a short textual summary of the key components and data flow.

### [LOW] the-auto-rotating-benchmark-ticker-introduces — accessibility
- **Page**: `index.html hero benchmark ticker`
- **Problem**: The auto-rotating benchmark ticker introduces motion in the first screenful, competing with headline and CTA reading.
- **Evidence**: After a 3-second wait on both desktop and mobile, the hero benchmark row changed states (for example to "Running benchmark on YFCC-100M… Throughput: 42k QPS"). Notes indicate the motion sits near primary hero content and changes within the initial reading flow.
- **Suggested fix**: Slow the rotation, pause it until the section is engaged, or provide a reduced-motion/static fallback so users can absorb the hero content without distraction.

### [LOW] the-pelagic-logo-appears-clickable-but — affordance
- **Page**: `index.html header logo link`
- **Problem**: The Pelagic logo appears clickable but does not provide any observable home/top reset behavior.
- **Evidence**: On desktop and mobile, clicking the header logo ('Pelagic', href '#') produced no URL or visible-text change; one result explicitly reported changed=false. The logo is presented as a link, creating an expectation of navigation.
- **Suggested fix**: Make the logo scroll to the top or reload the landing state consistently, and ensure the feedback is noticeable if users are already at the top.
