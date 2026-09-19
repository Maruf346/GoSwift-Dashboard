# UI Quality and Pixel-Perfect Checklist

These checks ensure the implemented UI closely matches the Figma design.

Visual verification:
- Colors: Verify primary, secondary, background, and accent colors match Figma hex values within a delta of ±2 on RGB channels.
- Typography: font family, weight, size, letter-spacing, line-height must match or be mapped to the closest web-safe equivalent.
- Spacing: margins and paddings should match within ±4px on desktop.
- Border radii and shadows: replicate the style tokens in `src/styles/tokens`.

Automated and manual steps:
1. Export Figma screenshot of the target node and place it in a temporary reference location.
2. Render the implemented page in the browser and compare visually (manual side-by-side or pixel-compare tool).
3. Run accessibility checks (contrast ratio for text at normal and large sizes).

When differences exist:
- Log the difference with screenshots and a suggested small CSS change to bring it closer.
- Prefer adjusting design tokens rather than per-component fixes.
