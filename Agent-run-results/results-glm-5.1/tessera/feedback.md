# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full tessera system, prioritizing the primary docs/tutorial flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The Tessera documentation site features a well-structured three-column layout and clear content hierarchy for function references, but suffers from severe error recovery issues and mobile usability gaps. A broken internal link traps users on a dead-end browser error page with no way back, highlighting a critical lack of 404 handling. Additionally, small tap targets and an inaccessible version switcher undermine the experience for mobile and assistive technology users.

## Issues (5)

### [HIGH] following-a-link-to-function-extract — error recovery
- **Page**: `chromewebdata/`
- **Problem**: Following a link to 'function--extract.html' results in a raw browser error page (chrome-error://chromewebdata/) with no site navigation, search, or back links, creating a dead-end from which users cannot easily recover.
- **Evidence**: Repeated net::ERR_FILE_NOT_FOUND errors for 'function--extract.html' in steps 7-80 resulted in a blank browser error page. The DOM summary for the final observation shows 0 links, 0 buttons, and 0 headings, confirming a total loss of site UI.
- **Suggested fix**: Implement a custom 404 error page that retains the site's header, footer, and search functionality, and provides suggested pages or a link back to the documentation home.

### [HIGH] internal-links-or-url-assumptions-for — navigation
- **Page**: `function--extract.html`
- **Problem**: Internal links or URL assumptions for the EXTRACT function point to an invalid double-hyphenated URL ('function--extract.html') instead of the correct single-hyphenated file ('function-extract.html').
- **Evidence**: Network errors consistently show attempts to load 'function--extract.html' failing with net::ERR_FILE_NOT_FOUND, while the site's actual file list contains 'function--extract.html' (single hyphen).
- **Suggested fix**: Audit all internal links and URL generation logic to ensure consistent, valid hyphenation that matches the actual file structure.

### [MEDIUM] the-version-switcher-dropdown-lacks-an — accessibility
- **Page**: `select#ux-7`
- **Problem**: The version switcher dropdown lacks an accessible label (aria-label, placeholder, or associated <label>), making it difficult for screen reader users to understand the purpose of the control.
- **Evidence**: Accessibility audits across multiple pages (reference.html, function-date-trunc.html, sql-select.html, operators.html, data-types.html, function-row-number.html, function-regexp-match.html) flagged 'A form field has no label, aria-label, or placeholder' for the version switcher (ux-7).
- **Suggested fix**: Add an aria-label attribute (e.g., aria-label='Documentation version') to the version switcher select element.

### [MEDIUM] interactive-elements-in-the-left-toc — mobile usability
- **Page**: `Left TOC tree / Top navigation`
- **Problem**: Interactive elements in the left TOC tree and top navigation have tap targets smaller than the recommended 44x44px, making them difficult to activate accurately on touch devices.
- **Evidence**: Layout warnings flagged small tap targets for TOC items like SUM, AVG, COUNT (230x30px), as well as top navigation links and the theme toggle (42x37px).
- **Suggested fix**: Increase the vertical padding of TOC links and navigation controls to meet the 44px minimum touch target size recommended by mobile usability guidelines.

### [LOW] the-left-toc-tree-is-fully — navigation
- **Page**: `reference.html left TOC`
- **Problem**: The left TOC tree is fully expanded by default, displaying deep nesting (e.g., FUNCTIONS > AGGREGATE > SUM) which causes overwhelming vertical scrolling.
- **Evidence**: UX signals from reference.html noted that the 'Left TOC tree is fully expanded by default, showing deep nesting... which may cause overwhelming vertical scrolling on smaller screens.'
- **Suggested fix**: Collapse sub-categories by default, expanding only the current page's path and top-level categories, or implement a progressive disclosure pattern.
