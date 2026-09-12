# Framer Homepage Visual Findings

The adapted root route was captured after dismissing the preserved welcome animation at 1440×900 and 390×844.

The shutter hero, portrait crop, left/right artist rails, 01/05 index marks, centered RADARCharts wordmark, and dark editorial treatment match the supplied Framer reference direction. The mobile crop preserves the face focal point and both artist rails without horizontal overflow.

The first capture exposed a protected-app integration issue: RADARMe’s fixed five-tab bottom navigation overlaps the lower edge of the oversized Framer wordmark band. The intended repair is to add reserved bottom space inside the Framer brand band so the app navigation remains visible without covering identity-critical content. The preserved welcome overlay remains separate and continues to appear before the homepage frame.

After adding reserved bottom space to the brand band, the fixed five-tab navigation no longer covers the RADARCharts wordmark on either viewport. The 1440×900 and 390×844 captures now preserve the hero focal point, artist rails, wordmark, and navigation separation. The ticker begins below the fold on mobile, matching the long editorial frame rather than compressing the hero into a card.

A fresh Playwright browser audit at 1440×900 reported no console or page errors. It verified the welcome overlay exists before interaction, disappears after `Skip opening`, and restores the document overflow value.
