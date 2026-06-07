# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full fred-unrate system, prioritizing the primary data visualization flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The FRED Unemployment Rate clone delivers a functional core chart experience with working time-range toggles and view switching, but suffers from severe layout and interaction issues. Critical graph editing tools (EDIT LINE, ADD LINE, FORMAT) are pushed off-screen on desktop and inaccessible due to broken scrolling, while mobile users face systemic small tap target violations and dead placeholder links that erode trust and prevent navigation. Data integrity is also questionable due to unhandled missing values in the data table.

## Issues (6)

### [HIGH] the-edit-line-add-line-and — navigation
- **Page**: `index.html [data-drawer-tab="edit"], [data-drawer-tab="add"]`
- **Problem**: The 'EDIT LINE', 'ADD LINE', and 'FORMAT' tabs are positioned far outside the standard desktop viewport (x: 1304-1796) and cannot be scrolled to, making the graph editing tools completely inaccessible.
- **Evidence**: Clicks on 'EDIT LINE' and 'ADD LINE' failed with 'element is outside of the viewport' (bbox x=1468, y=12). Horizontal scroll actions also failed to change the viewport position.
- **Suggested fix**: Reposition the graph editing tabs within the main layout flow so they fit within a standard desktop viewport, or ensure the container allows horizontal scrolling with clear visual affordances.

### [HIGH] a-systemic-lack-of-adequate-tap — mobile usability
- **Page**: `index.html nav, breadcrumbs, chart toggles`
- **Problem**: A systemic lack of adequate tap target sizes plagues the mobile interface, with breadcrumb links (22px height), navigation icons (38px height), and chart toggles (30px height) all falling significantly below the 44px minimum mobile guidance.
- **Evidence**: Layout warnings consistently flagged 78-80 small tap targets per mobile view (e.g., 'Home' at 43x22px, 'Categories' at 77x22px, '10Y' toggle at 59x30px).
- **Suggested fix**: Increase padding and line-height for all interactive elements to ensure a minimum touch target size of 44x44px, particularly for breadcrumbs, nav icons, and chart controls.

### [HIGH] almost-all-links-outside-the-primary — trust
- **Page**: `index.html a[href="#"]`
- **Problem**: Almost all links outside the primary chart controls are non-functional placeholders (href='#'), providing zero navigation or visual feedback upon interaction.
- **Evidence**: Clicks on 'U.S. Bureau of Labor Statistics', 'Employment Situation', 'Categories', 'NEWS', 'BLOG', 'Gross Domestic Product', and 'Measuring labor market tightness with FRED' all resulted in no visible change or navigation.
- **Suggested fix**: Implement proper href attributes or disable/remove links that do not resolve to valid destinations. Provide clear hover/active states to indicate clickability.

### [MEDIUM] standard-vertical-scrolling-is-broken-or — navigation
- **Page**: `index.html body or main container`
- **Problem**: Standard vertical scrolling is broken or severely hindered, preventing users from accessing the Notes section and lower metadata without clicking specific deep-page links.
- **Evidence**: Multiple scroll actions failed to change the viewport position (remained at y:0), and the visible text was frequently truncated mid-sentence (e.g., 'Current Populati').
- **Suggested fix**: Investigate and fix CSS overflow properties or scroll-jacking scripts that prevent default browser scrolling behavior.

### [MEDIUM] the-data-table-displays-missing-values — clarity
- **Page**: `index.html data table view`
- **Problem**: The data table displays missing values as completely blank cells without any explicit null indicator (e.g., 'N/A' or '-'), creating ambiguity about whether the data failed to load or is genuinely missing.
- **Evidence**: In the data table view, the row for '2025-10-01' has a blank UNRATE value while surrounding months have data.
- **Suggested fix**: Explicitly represent missing data points in the table with a standard null indicator like 'N/A', 'NaN', or a dash.

### [LOW] metadata-links-like-monthly-not-seasonally — affordance
- **Page**: `index.html metadata section`
- **Problem**: Metadata links like 'Monthly, Not Seasonally Adjusted' and 'Shaded areas indicate U.S. recessions' appear as interactive elements but act as dead ends, creating misleading affordances.
- **Evidence**: Clicking 'Monthly, Not Seasonally Adjusted' resulted in no chart update or navigation, failing the user's expectation that it would toggle the data frequency.
- **Suggested fix**: If these elements are not meant to trigger actions, remove the link styling (underline/color) or provide a tooltip explaining the current state. If they are meant to toggle views, implement the functionality.
