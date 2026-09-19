# AI Direction

Purpose: provide concise, deterministic instructions for an AI developer assistant to implement UI from Figma, maintain code quality, and prepare for API integration and AWS deployment.

- Core goals:
- Use Figma MCP (`mcp_figma_mcp_ser_get_design_context`) to fetch design context for a provided Figma URL.
- Extract colors, typography, spacing, assets, and component hierarchy from the design context.
- Implement React + Vite components that match the design visually and semantically (responsive where applicable).
- Store design tokens (colors, font stacks, spacing) in a central `src/styles/tokens.*` file and reuse across components.
- Keep UI implementation framework-idiomatic (use TailwindCSS as project's chosen styling system).
 - Ensure responsive implementations that match Figma layouts across common breakpoints (mobile, tablet, desktop). When Figma provides frames for multiple sizes, map them to Tailwind breakpoints and validate behavior at each size.

Behavior rules for the AI:
1. Always read `figma-usage.md` before making design-to-code changes.
2. Prefer reusing existing components and styles in the repository; do not create duplicates.
3. When creating new files, follow existing project organization: `src/components`, `src/pages`, `src/hooks`, `src/data`, `src/styles`.
4. Write TypeScript React components. Use functional components and hooks.
5. Include minimal unit/integration tests only when requested.
6. When the user supplies a Figma link, fetch the design context, download assets referenced, and reference them in components using short-lived Figma asset URLs or by saving them into `src/assets` if user approves.
	- Implement responsive variants and verify layout integrity at mobile (<=480px), tablet (sm/md), and desktop breakpoints.
7. Before changing package dependencies, propose and get confirmation from the user.
8. For development-only conveniences (mock OTPs, relaxed validations), document the behavior in `src/data` and flag them clearly as development-only.

Deliverables for a Figma-to-code task:
- `src/pages/*` and `src/components/*` for top-level screens and shared UI.
- `src/styles/*` tokens and shared class utilities.
- Mock data under `src/data` for API placeholders.
- A short PR-style changelog message summarizing edits.

If the Figma design includes interactive states (hover, focus, disabled), implement them where feasible using Tailwind utilities.
