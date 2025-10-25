# Repository Guidelines

## Project Structure & Module Organization
Keep the root clean and group source code under `src/`, with domain folders such as `src/api`, `src/ui`, and `src/hooks`. Place integration and end-to-end specs under `tests/` to avoid mixing runtime code with scaffolding, and reserve `public/` for static assets (images, fonts, mock data). When adding sample data or playground notebooks, tuck them into `experiments/` so they are easy to exclude from builds.

## Build, Test, and Development Commands
Use Node.js 20 LTS and `npm` to stay consistent. After cloning, run `npm install` to hydrate dependencies. Local iteration should rely on `npm run dev`, which must start the primary development server (create this script inside `package.json` when wiring tooling). Ship-ready bundles come from `npm run build`, and `npm run preview` should mirror the production build locally. Keep `npm test` mapped to the main test runner so CI can execute the same command.

## Coding Style & Naming Conventions
Default to TypeScript with strict mode enabled; fall back to modern ES modules only when TypeScript is impractical. Use 2-space indentation, single quotes, and trailing commas where valid. Run `npx prettier --write .` before committing, and back it with ESLint (`npm run lint`) to enforce import order, unused symbol checks, and React hook rules. File names follow kebab-case for components (`hero-banner.tsx`) and camelCase for utilities.

## Testing Guidelines
Author fast unit suites with Vitest or Jest, naming files `*.spec.ts`. For reactive UI, add component tests in `tests/components/` and smoke flows in Playwright under `tests/e2e/`. Aim for 80% line coverage and always reproduce bug reports with a red test before fixing. CI must run `npm test -- --runInBand` to keep logs deterministic.

## Commit & Pull Request Guidelines
Follow Conventional Commits (`feat: add booking widget`, `fix: guard null room ids`) just like the existing history. PRs need a concise summary, linked issue or ticket, test evidence (`npm test` output or screenshots), and any environment variables introduced. Keep branches short-lived; rebase before requesting review to avoid merge noise.

## Security & Configuration Tips
Store secrets in `.env.local` and document required variables in `.env.example` without values. Never commit API keys. When integrating third-party SDKs, wrap them in `src/services/` so audits can review sensitive access in one place.
