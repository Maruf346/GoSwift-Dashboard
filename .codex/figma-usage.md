# Figma MCP Usage

When receiving a Figma URL, AI assistants must follow this workflow exactly:

1. Validate the URL; ensure it is a `/design/` URL and extract `fileKey` and `nodeId` if present.
2. Load `figma-design-to-code` guidance (if available) and call `mcp_figma_mcp_ser_get_design_context` with `fileKey` and `nodeId`.
3. Inspect the returned `code` and `assets` list. Map Figma node types to React components (frame → page, component → component).
4. Download raster assets into `src/assets` only if the user allowed asset caching; otherwise use the Figma asset URL directly.
5. Extract design tokens: colors, font families, font sizes, border radii and spacing. Put tokens into `src/styles/tokens.css` or `tokens.ts`.
6. Translate layout to Tailwind utility classes where possible. If a direct Tailwind mapping is impossible, create a small utility class in `src/styles`.
7. Respect responsive breakpoints. If the design includes multiple frames/sizes, map them to Tailwind's breakpoints (`sm`, `md`, `lg`, `xl`) and verify each. If the design only shows desktop, implement a reasonable mobile fallback (stacked layout) and document assumptions.

Important:
- Do not assume color contrast is sufficient; call out accessibility issues to the user.
- If a Figma component has multiple variants, prefer a single reusable React component with `props` for variant selection.
