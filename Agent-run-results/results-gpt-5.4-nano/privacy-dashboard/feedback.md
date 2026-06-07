# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full privacy-dashboard system, prioritizing the primary settings/privacy flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

On desktop, many privacy-dashboard interactions update content reliably (e.g., Data controls toggles, Export data workflow, and device sign-out confirmation). However, the mobile “Privacy checkup” flow has weak or missing interaction feedback: tapping recommendation cards and Start/Next/Back often results in no detectable UI change, making progress feel unclear. There are also small tap-target/accessibility risks in mobile navigation that likely contribute to mis-taps and reduced confidence in the guided checkup.

## Issues (4)

### [HIGH] tapping-privacy-checkup-recommendation-cards-on — feedback
- **Page**: `index.html (mobile screenshots): targets ux-17, ux-19, ux-20; recent_trajectory agentic-77-click-mobile.png, agentic-78-click-mobile.png, agentic-80-click-mobile.png`
- **Problem**: Tapping Privacy checkup recommendation cards on mobile does not produce an observable step/drawer/progress change, leaving users unsure whether their input registered.
- **Evidence**: Mobile trajectory shows multiple taps on checkup cards with tool feedback `changed: false` and “No obvious URL or visible-text change was detected”: tapping ux-17 (“Review activity saving Web, app, voice, and location controls”), ux-19 (“Inspect connected apps 2 apps can read profile and files”), and ux-20 (“Create a data export...”). The screenshots after these actions still show the same Privacy checkup list with cards and “Start” rather than opening the expected step content.
- **Suggested fix**: When a checkup card is tapped on mobile, provide explicit state change: open the step content reliably (or show a clear loading/transition), update the selected card styling, and add an on-screen confirmation (e.g., “Step opened: Review activity saving”) so users can verify progress.

### [HIGH] mobile-step-navigation-start-next-back — clarity
- **Page**: `index.html (mobile): Privacy checkup overlay; recent_trajectory steps agentic-67-72 (Start/Next/Back/Exit checkup)`
- **Problem**: Mobile step navigation (Start/Next/Back/Exit checkup) is not clearly advancing or dismissing in a way users can confirm through UI changes.
- **Evidence**: Mobile trajectory indicates Start tap did not visibly change UI (`changed:false`) even though the overlay appears in screenshot; Next tap on mobile also produced no advancement (`changed:false`), while screenshots show different step titles but the tool still flags no detectable change. Exit checkup tap also produced no detectable change (`changed:false`).
- **Suggested fix**: Add a visible step indicator tied to actual navigation state (e.g., step number/progress bar + selected step title update with animation), and ensure Next/Back/Exit reliably update the DOM and visible content. Also add a toast or inline status like “Moved to: Review app permissions” and “Checkup exited.”

### [MEDIUM] multiple-mobile-navigation-tap-targets-are — mobile usability
- **Page**: `Mobile layout warnings in recent_trajectory dom_summary: ux-2, ux-4, ux-5 and others; plus click failures for off-viewport elements in session_memory`
- **Problem**: Multiple mobile navigation/tap targets are below recommended sizing, increasing mis-tap probability—likely contributing to unreliable checkup/card interactions.
- **Evidence**: Layout warnings list multiple small targets in the mobile view: “Account privacy home” is 22x22px (ux-2), “Open help” is 38x38px (ux-4), “Account menu” is 67x38px (ux-5), and other top/nav items show below 44px guidance. In addition, the tool reports timeouts for off-viewport clicks on certain controls (e.g., Devices & locations and Close details), reinforcing that precision/viewport positioning issues exist.
- **Suggested fix**: Increase minimum tap target size to at least 44px height/width for top navigation and any icons (e.g., account privacy home). Add spacing between adjacent controls and consider expanding hit areas beyond visible bounds without changing layout.

### [MEDIUM] close-dismiss-controls-for-overlays-drawers — affordance
- **Page**: `session_memory notable_failures: “Click failed for Close details” (ux-40); also “Close privacy checkup” ux-43 signals changed=false`
- **Problem**: Close/dismiss controls for overlays/drawers appear unreliable or not clearly communicated, leading to “no obvious change” when users attempt to dismiss.
- **Evidence**: Session_memory includes a click failure on “Close details” with repeated timeout logs while the button was reportedly outside the viewport. Related signals show “Close privacy checkup” produced no observable UI/content change (`changed:false`, after_url unchanged).
- **Suggested fix**: Ensure dismiss buttons are within viewport and remain visible (e.g., sticky header/action bar in drawers). Add a clear dismissal animation and update the underlying page context visibly (e.g., highlight returning section or restore focus).
