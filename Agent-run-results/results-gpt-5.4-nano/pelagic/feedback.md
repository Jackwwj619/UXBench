# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full pelagic system, prioritizing the primary landing flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: True

## Summary

On desktop, the primary Quickstart path is mostly understandable: language tabs update the code snippet and the copy interaction sometimes shows confirmation. On mobile, the experience is significantly less reliable: multiple nav/anchor links (Docs/Overview/Pricing) do not visibly navigate, and the GitHub stars pill and Quickstart copy affordances fail to provide consistent, observable feedback. Additionally, many critical controls (nav items, language tabs, copy button, stars) are below recommended mobile tap sizes, increasing mis-tap risk.

## Issues (4)

### [HIGH] mobile-in-page-navigation-links-frequently — navigation
- **Page**: `index.html|mobile nav links: selectors/targets ux-11 (Overview), ux-14 (Pricing), ux-15 (Docs), ux-17 (Benchmarks); screenshots: /pelagic/_run/screenshots/agentic-77-click-mobile.png, agentic-78-click-mobile.png, agentic-79-click-mobile.png`
- **Problem**: Mobile in-page navigation links frequently fail to update hash/scroll position, leaving the user at the hero and breaking orientation.
- **Evidence**: Mobile clicks show no visible navigation: 'Overview' stays unchanged (before_url and after_url identical; screenshot /agentic-77-click-mobile.png). 'Pricing' tap also shows no change (after_url unchanged; /agentic-78-click-mobile.png). 'Docs' tap produced no detectable UX change and no hash/scroll (mobile /agentic-?? steps show after_url unchanged; additionally documented as: clicking “Docs” didn’t produce any detectable UX change). Even 'Benchmarks' shows only visible content change while still appearing on the hero/Quickstart area and without URL hash update (/agentic-79-click-mobile.png).
- **Suggested fix**: Ensure every header/section link has a real, working href target (e.g., #docs, #overview, #pricing) and verify smooth scroll/URL hash updates on mobile. Add visible feedback on tap (active state + immediate scroll) so users can confirm navigation even if the hash isn’t visible.

### [HIGH] the-copy-to-clipboard-confirmation-is — feedback
- **Page**: `index.html Copy install command button target ux-6; mobile observations and screenshot: /pelagic/_run/screenshots/agentic-77-click-mobile.png (shows Copy button bbox); related notes where toast was not detected`
- **Problem**: The copy-to-clipboard confirmation is inconsistent on mobile and often not observable immediately, reducing user trust and increasing repeated tapping.
- **Evidence**: On mobile, tapping 'Copy' for the install command results in no visible confirmation detected: tool reports no obvious visible change after clicking the mobile Copy button (/mobile steps where changed=false; observation notes no toast/overlay detected). Layout warnings show the copy control is small (≈50x24px, below guidance). On desktop there is a toast sometimes (“Copied pip install pelagic” appears in screenshots/notes), but mobile does not reliably show this.
- **Suggested fix**: Make the confirmation unmissable on mobile: show a persistent (or at least longer duration) toast near the copy button, include accessible status text (aria-live), and visually change the Copy button state (e.g., 'Copied' for 2–3s). Increase the tap target size to meet mobile guidance.

### [MEDIUM] the-github-stars-pill-appears-clickable — affordance
- **Page**: `index.html GitHub stars pill target ux-2; screenshot: /pelagic/_run/screenshots/agentic-80-click-mobile.png`
- **Problem**: The GitHub stars pill appears clickable on mobile but provides no observable navigation or state feedback, making it feel non-interactive.
- **Evidence**: Mobile click on the stars pill (★ 18.2k) produces no URL/hash change and no visible-state change (after_url unchanged; /agentic-80-click-mobile.png). The stars pill is also flagged as small (≈99x35px), below the guidance used by the tool.
- **Suggested fix**: If the stars pill is meant to navigate, ensure it links to GitHub (real URL) and opens predictably (same tab/new tab per design). If it’s purely decorative, remove link styling/cursor to avoid a false affordance. Add an immediate press/active style and/or tooltip on tap.

### [MEDIUM] language-tabs-and-other-controls-are — mobile usability
- **Page**: `index.html code tabs: targets ux-7..ux-10 (python/node/go/curl) with layout warnings in the mobile dom_summary`
- **Problem**: Language tabs and other controls are small on mobile, increasing mis-taps and undermining confidence in snippet switching.
- **Evidence**: The tool flags multiple small tap targets on mobile: language tabs python (~71x32), node (~57x32), go (~42x32), curl (~57x32) and the copy button (~50x24). Mobile experiments show some tab switching works (curl/node updated snippets), but inconsistent detection elsewhere (e.g., one 'python' click not producing an observable change earlier) suggests reliability risk under touch constraints.
- **Suggested fix**: Increase the height/width of each tab to meet touch guidance (≥44px in both dimensions where possible), add spacing between tabs, and provide clearer selected-state contrast (color + underline/border) that persists after tap.
