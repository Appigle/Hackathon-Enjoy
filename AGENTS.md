# Repository Guidelines

## Project Structure & Module Organization
- App source lives under `src/`, with pages in `src/app`, shared UI in `src/components`, hooks in `src/hooks`, and service logic in `src/services`.
- Email templates are stored separately in `emails/` for React Email rendering, while scripts such as seeders live in `scripts/`.
- Tailwind config, Next.js config, and tooling files (`tailwind.config.ts`, `next.config.mjs`, `postcss.config.mjs`) sit in the repo root alongside docs like `README.md` and this guide.

## Build, Test, and Development Commands
- `npm run dev` — starts the Next.js dev server on port 3000.
- `npm run build` — compiles the production bundle.
- `npm run preview` — serves the built app via `next start`.
- `npm run lint` — runs ESLint across `.ts/.tsx` files.
- `npm run format` — formats the workspace with Prettier.
- `npm run test` — executes Vitest suites (add tests under `src/**/__tests__`).
- `npm run seed` — runs `scripts/seed.ts` via `tsx` to populate mock analytics data.

## Coding Style & Naming Conventions
- TypeScript-first codebase with strict mode enabled; prefer functional React components.
- Use Tailwind utilities for layout and spacing plus MUI props for theme-aware semantics.
- Keep file names kebab- or camel-case by domain (`KPICards.tsx`, `useInsights.ts`).
- Run `npm run format` before committing; Prettier + ESLint rules enforce single quotes, 2-space indentation, and limited console usage.

## Testing Guidelines
- Vitest is the default framework; colocate tests near code in `__tests__` directories or `*.test.ts` files.
- Mock network calls with `fetch` stubs; snapshot React components when stable.
- Aim for coverage on service modules (`src/services`) and custom hooks, especially API adapters.

## Commit & Pull Request Guidelines
- Write imperative commit titles (e.g., `Add survey form validation`).
- Include context in the body when touching multiple areas (components + API routes).
- Pull requests should describe scope, testing performed, and any screenshots for UI changes; link tracking issues or tasks when available.
