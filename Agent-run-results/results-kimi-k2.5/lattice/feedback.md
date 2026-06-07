# UX Critique

- **Persona**: A curious first-time visitor assessing whether this site is usable.
- **Intent**: Autonomously explore and critique the UX of the full lattice system, prioritizing the primary pricing flow plus adjacent pages, states, and recovery paths.
- **Intent completed**: False

## Summary

The Lattice pricing page offers a matrix-based pricing model with row (team size) and column (data volume) axes. While matrix interactions (cell highlighting, quote card updates) work for most cells, there are issues with target cell selection, mobile horizontal overflow, and small tap targets. Key untested areas include add-on checkboxes and some navigation links, with only 51% of interactive features exercised.

## Issues (6)

### [MEDIUM] repeated-targeting-errors-occurred-when-attempting — goal completion
- **Page**: `pricing.html (mobile viewport)`
- **Problem**: Repeated targeting errors occurred when attempting to click the $543 cell (41–100 seats, Up to 50 GB) in mobile view, with the agent incorrectly clicking the $89 cell (Up to 5 seats, Up to 50 GB) instead. This prevented validating the target cell's interaction and quote card update.
- **Evidence**: Multiple steps in the recent trajectory show the agent clicking the $89 cell (target_id 'ux-4') instead of the intended $543 cell (target_id 'ux-40' or similar). The visible text and DOM summary confirm the clicked cell was $89, with no highlighting or quote card updates for the target cell.
- **Suggested fix**: Improve the visual distinction between cells (e.g., larger click targets, clearer row/column labels) and provide better guidance for selecting the correct cell. Consider adding tooltips or a 'select by team size and data volume' dropdown for easier selection.

### [MEDIUM] the-pricing-page-has-a-horizontal — mobile usability
- **Page**: `pricing.html (mobile viewport)`
- **Problem**: The pricing page has a horizontal overflow on mobile (page width 475px exceeds viewport 390px), requiring horizontal scrolling to view all columns. This reduces the usability of the matrix and makes it difficult to see the full pricing options at a glance.
- **Evidence**: The final observation and coverage report mention a horizontal overflow on mobile, with the page width (475px) exceeding the viewport width (390px). This is also visible in the mobile screenshot, where the matrix columns extend beyond the screen.
- **Suggested fix**: Optimize the pricing matrix for mobile by reducing column widths, using responsive design techniques (e.g., stacking columns or rows on smaller screens), or increasing the viewport width to fit the content. Ensure all columns are visible without horizontal scrolling.

### [LOW] small-tap-targets-e-g-13x13px — accessibility
- **Page**: `pricing.html (mobile viewport)`
- **Problem**: Small tap targets (e.g., 13x13px for checkboxes, 123x28px for the 'Lattice DB' link) are present on mobile, below the recommended 44px touch target size. This makes it difficult for users to accurately tap the desired elements, especially with larger fingers or touchscreen devices.
- **Evidence**: The layout warnings in the final observation list multiple small tap targets, including checkboxes (13x13px) and the 'Lattice DB' link (123x28px). The coverage report also notes untested checkboxes, likely due to their small size.
- **Suggested fix**: Increase the size of tap targets to at least 44x44px for all interactive elements (e.g., cells, checkboxes, links) on mobile. This can be achieved by adjusting the CSS to increase padding or font sizes, or by repositioning elements to provide more space between them.

### [MEDIUM] the-agent-repeatedly-clicked-the-wrong — goal completion
- **Page**: `pricing.html (desktop viewport)`
- **Problem**: The agent repeatedly clicked the wrong cell (e.g., $8,144 for 41–100 seats, 5–20 TB) instead of the intended $15,353 cell (101–300 seats, 5–20 TB) in desktop view. This prevented validating the target cell's interaction and quote card update, suggesting a potential issue with cell identification or targeting.
- **Evidence**: Multiple steps in the trajectory show the agent clicking the $8,144 cell (target_id 'ux-30') instead of the intended $15,353 cell (target_id 'ux-31' or similar). The quote card updated to $8,144, and the row/column highlighting reflected the incorrect cell.
- **Suggested fix**: Improve the visual identification of cells by increasing the font size, using distinct colors or borders for different tiers, or adding labels to each cell (e.g., 'Tier · Enterprise' directly in the cell). Also, provide a clear legend or tooltip explaining the tier and cost for each cell.

### [LOW] clicking-the-contact-us-cell-101 — affordance
- **Page**: `pricing.html (desktop and mobile viewports)`
- **Problem**: Clicking the 'Contact us' cell (101–300 seats, 5–20 TB) did not highlight the cell or update the quote card to show a price, instead displaying 'Contact us' with 'Tier · Enterprise'. This reduces the clarity of the interaction and may confuse users about whether the cell was selected or if custom pricing is available.
- **Evidence**: Multiple steps in the trajectory show that clicking the 'Contact us' cell (target_id 'ux-31') did not highlight the cell or update the quote card to a price, only showing 'Contact us' and the tier. The DOM summary also confirms that the cell text is 'Contact us' with no price.
- **Suggested fix**: Provide visual feedback when clicking 'Contact us' cells (e.g., highlighting the cell and row/column, or displaying a message indicating that contact has been initiated). Also, clarify the purpose of these cells (e.g., 'Custom pricing available — contact us for a quote') to reduce ambiguity.

### [LOW] only-51-of-visible-interactive-feature — feature coverage
- **Page**: `pricing.html and index.html`
- **Problem**: Only 51% of visible interactive feature signatures were directly exercised, including untested add-on checkboxes (e.g., 'Continuous cross-region backups +15%', 'HIPAA compliance pack +$400/mo') and navigation links (e.g., 'Book demo', 'About', 'Docs'). This means a significant portion of the page's functionality was not validated, increasing the risk of undiscovered usability issues.
- **Evidence**: The coverage report lists multiple untested interactive features, including 9 add-on checkboxes and several navigation links. The feature coverage percent is 51%, indicating that over half of the interactive elements were not tested.
- **Suggested fix**: Conduct a more comprehensive test of all interactive features, including add-on checkboxes, navigation links, and other elements. Ensure that all features are tested across different viewports (desktop and mobile) to identify and address any usability issues.
