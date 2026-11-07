# Samuel Haas – Website

Source code of [samuel-haas.com](https://samuel-haas.com), built with Angular 22 (standalone components, zoneless) and hosted on Firebase Hosting.

## Requirements

- Node.js 26 LTS (see `engines` in `package.json`)
- pnpm (the version is pinned via `packageManager` in `package.json`)

## Commands

| Command | Description |
| --- | --- |
| `pnpm install` | Install dependencies |
| `pnpm start` | Start the dev server on `http://localhost:4200/` |
| `pnpm build` | Production build into `dist/samuel-haas/browser` |
| `pnpm test` | Run the unit tests with Vitest in watch mode |
| `pnpm test:ci` | Run the unit tests once |
| `pnpm test:coverage` | Run the unit tests once with a coverage report in `coverage/` |
| `pnpm deploy` | Build and deploy to Firebase Hosting (requires `firebase login`) |
