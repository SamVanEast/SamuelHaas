# Samuel Haas Website

Source code of [samuel-haas.com](https://samuel-haas.com), built with Angular 22 (standalone components, zoneless, signals) and hosted on Firebase Hosting.

## Features

- German and English, switched in place without a page reload; the initial language follows the browser (fallback German)
- Light and dark mode; follows the operating system until the visitor chooses
- Responsive from small phones to large monitors, keyboard and screen reader friendly
- Responsive WebP images generated from the originals in `resources/images`
- Search engines and link previews: title and description per language, Open Graph preview image, canonical links, `noindex` for unknown pages, `robots.txt`, `sitemap.xml` and structured data (JSON-LD) in `index.html`

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
| `pnpm images` | Regenerate the WebP images and the link preview image (`assets/img/social/og-image.jpg`) from `resources/images` |
| `pnpm deploy` | Build and deploy to Firebase Hosting (requires `firebase login`) |

## Project structure

| Path | Content |
| --- | --- |
| `src/app/i18n` | Language service and the German/English texts (`de.ts`, `en.ts`) |
| `src/app/theme` | Light/dark mode service and toggle |
| `src/app/core` | Section navigation (scrolling without reload, active section) and meta tags for search engines (`seo.service.ts`) |
| `src/robots.txt`, `src/sitemap.xml` | Copied to the site root by the build; add new pages to the sitemap |
| `src/app/shared` | Reveal directive for the scroll animations |
| `src/styles.scss` | Colour tokens (light/dark), fluid font sizes and shared styles |
| `resources/images` | Original images and logo variants (not deployed) |
