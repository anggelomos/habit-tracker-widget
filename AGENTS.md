# Repository Guidelines

## Project Structure & Module Organization
- React widget code lives in `src/`. `src/main.tsx` boots the app and imports `App.tsx`; group new components by feature to keep imports local.
- Shared styling sits in `src/App.css` and `src/index.css`, while reusable assets belong in `src/assets/`.
- Static files that must ship untouched go in `public/`; reference them via root-relative URLs instead of direct imports.
- Tooling and build config stay at the project root (`vite.config.ts`, `tsconfig*.json`, `eslint.config.js`). Update them alongside functional changes so reviewers see the full context.

## Build, Test, and Development Commands
- `npm install` — install dependencies before running any project command.
- `npm run dev` — start the Vite dev server with React Compiler for live reload and diagnostics.
- `npm run build` — run the TypeScript project references and emit the production bundle to `dist/`; verify before tagging a release.
- `npm run lint` — execute ESLint across the workspace; resolve warnings locally instead of silencing rules.
- `npm run preview` — serve the built bundle for a final smoke test that mirrors production routing.

## Coding Style & Naming Conventions
- Use TypeScript throughout; declare React components in `.tsx` with PascalCase names and camelCase utilities. Exported constants can use SCREAMING_SNAKE_CASE.
- Match the existing two-space indentation and single-quote preference in `.ts`/`.tsx` files.
- Keep props, state, and context typed explicitly; surface shared types from feature folders or a `src/types.ts`.
- Follow the enforced ESLint + React Hooks configs. If a rule blocks progress, discuss it in the PR instead of disabling it inline.

## Testing Guidelines
- Automated tests are not yet configured. Until the harness lands, include manual verification steps or gifs in each PR.
- When adding a test suite, prefer colocated specs under `src/__tests__/` or `src/<feature>/__tests__/` and wire a script such as `npm run test` so others can reproduce.

## Commit & Pull Request Guidelines
- Mirror the existing history: start commit subjects with an emoji that captures the change type (e.g., `✨ Add streak badge widget`) followed by a concise summary. Reference related issues as `(#123)`.
- Keep each PR focused on a single problem. Provide context, screenshots for UI updates, and call out migrations or config changes explicitly.
- Run `npm run lint` and `npm run build` before requesting review, and tag reviewers who own the affected feature area.
