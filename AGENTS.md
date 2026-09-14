# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Durable design decisions

- Use the selected vertical mockup as the source of truth, with a compact header, illustrated book hero, story/review band, Esha-first author section, contact band, and footer.
- Avoid a navigation bar, a separate Books section, activities, school/event inquiry copy, reviewer names, and an “Amazon review” label.
- Keep typography editorial and restrained: forest green headings, charcoal body copy, red accents, and no intense bright-blue body text.
- The authors use small, individually framed illustrated profile renditions rather than direct book-page art; Esha appears first.
- The full manuscript must never be copied into the project. Only a short, flattened, reduced-resolution, visibly watermarked opening preview may be shipped.
