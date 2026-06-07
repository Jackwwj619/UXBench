# stratabox-clone

Fictional headless content platform "Stratabox" marketing site (Contentful / Sanity-style).

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Single-page long scroll: sticky top nav; hero with editor-vs-live-preview split panel that periodically swaps blocks; trusted-by logo strip; 4-stat row with intersection-observer count-up; 3 feature cards; **live block builder** (drag-and-drop reorder, type switcher, add/delete blocks, two-pane editor + render with debounced auto-save status); 4-language SDK code tabs (JS / Python / Ruby / curl) with copy button; 24-card searchable integrations grid; 3 customer quotes; gradient pricing teaser; dark 4-column footer |
| `styles.css` | Brand color #0E7E7E warm teal + cream paper; Inter + JetBrains Mono; responsive at 3 breakpoints (>1100 / 720–1100 / <720) |
| `script.js` | Stat count-up via IntersectionObserver; hero block-swap micro-animation every 3.5s; full builder logic (reorder via HTML5 drag-and-drop, type switcher, add/delete, debounced auto-save status); SDK tab switcher with syntax-highlighted snippets and copy-to-clipboard toast; integrations search filter (matches name + category) with live count |
