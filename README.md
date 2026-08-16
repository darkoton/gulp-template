# Gulp Template

A **Gulp 4** build for fast static site development: HTML includes, SCSS, ES modules bundled with esbuild, automatic WebP/AVIF generation, SVG sprites, favicons, fonts, and production minification out of the box.

## Stack & Key Features

- **HTML** — pages assembled from reusable components via `gulp-file-include`, automatic `<picture>` generation with WebP/AVIF (`gulp-avif-webp-html-universal`), formatting via `gulp-prettify`.
- **SCSS** — Dart Sass, automatic `@use`/`@forward` resolution via `gulp-sass-glob-use-forward`, autoprefixer, media query grouping, automatic WebP background substitution in CSS (`gulp-web-images-css`).
- **JavaScript** — bundled with `esbuild`; supports two modes — native ES modules (`type="module"`) or a single IIFE bundle.
- **Images** — converted to WebP/AVIF and compressed via `sharp` (production build only).
- **SVG sprite** — symbol sprite generation (`gulp-svg-sprite`).
- **Fonts** — `otf → ttf → woff/woff2` pipeline, with icon fonts handled separately.
- **Favicon** — full favicon set and HTML tag auto-generated from a single PNG.
- **Dev server** — BrowserSync with live reload and watchers for every file type.
- **Production** — HTML/CSS/JS/image minification, `sitemap.xml` and `robots.txt` generation, build ZIP archive, and a separate lightweight `package.json` for previewing the build locally via Vite.
- **Project configuration** — a single `project.config.js` file, no need to touch the task runner.
- **Linting** — ESLint + Prettier + Stylelint.

## Requirements

- Node.js 18+ (20+ recommended)
- [pnpm](https://pnpm.io/) (the primary package manager, see `pnpm-lock.yaml` / `pnpm-workspace.yaml`)

## Installation

```bash
pnpm install
```

## Scripts

| Command               | Description                                                                                              |
| --------------------- | -------------------------------------------------------------------------------------------------------- |
| `pnpm dev`            | Starts the dev server with watch mode and BrowserSync (`NODE_ENV=development`)                           |
| `pnpm build:dev`      | Builds to `dist/` without minification, but with production environment settings (`NODE_ENV=production`) |
| `pnpm build:prod`     | Full production build: HTML/CSS/JS/image minification + sitemap/robots + ZIP archive                     |
| `pnpm preview`        | Production build + local server (`gulp start`) to preview `dist/`                                        |
| `pnpm tailwind:setup` | Adds Tailwind CSS integration to the project (`@darkoto/gulp-template-cli`)                              |
| `pnpm lint`           | Runs ESLint + Stylelint checks                                                                           |
| `pnpm lint:fix`       | Auto-fixes ESLint + Stylelint issues                                                                     |
| `pnpm format`         | Formats the whole project with Prettier                                                                  |
| `pnpm clean`          | Removes `dist/` and `node_modules/`                                                                      |

## Project Structure

```
├── gulp/
│   ├── configs/          # paths.js, config.js, env.js, plugins.js — task runner configuration
│   ├── plugins/          # custom plugins (sharp.js — image conversion/optimization)
│   ├── tasks/             # individual gulp tasks (html, scss, js, images, fonts, sprite, favicons...)
│   └── utils/             # logging, watch-event handling, etc.
├── src/
│   ├── assets/
│   │   ├── favicons/      # source favicon.png
│   │   ├── fonts/         # fonts (+ iconfonts/)
│   │   ├── img/           # images
│   │   └── sprites/       # source SVGs for the sprite
│   ├── html/
│   │   ├── components/    # reusable fragments (favicons.html, preloader.html)
│   │   ├── layouts/       # head, header, footer
│   │   └── pages/         # finished pages (index.html, etc.)
│   ├── scripts/
│   │   ├── modules/       # feature chunks (burger menu, popups, tabs, swiper, etc.)
│   │   ├── UI/             # UI components (range, etc.)
│   │   ├── app.js          # main JS entry point
│   │   └── ui.js            # UI scripts entry point
│   └── styles/
│       ├── components/     # component styles
│       ├── layouts/         # header/footer styles
│       ├── modules/          # mixins, icon fonts
│       ├── pages/             # page-specific styles
│       ├── UI/                 # UI component styles
│       ├── main.scss, ui.scss, critical.scss, fonts.scss, normalize.scss, vars.scss
├── dist/                  # build output (generated, not committed to the repo)
├── .env.development       # dev environment variables (PORT, SITE_URL)
├── .env.production        # production environment variables (SITE_URL)
├── project.config.js      # main project config (see below)
├── gulpfile.js            # wires tasks into `dev` / `build` / `build-min`
├── eslint.config.js
└── vercel.json             # Vercel deployment config for dist/
```

## Configuration (`project.config.js`)

All project settings live in a single file:

```js
export const projectConfig = {
  server: {
    port: 3000, // BrowserSync port (or PORT from .env)
    hostname: '...', // SITE_URL from .env
    open: false, // open browser on pnpm dev
  },
  images: {
    webp: { enabled: true, quality: 80 },
    avif: { enabled: false, quality: 80 },
    jpeg: { quality: 80, progressive: true },
    png: { compressionLevel: 9 },
  },
  scripts: {
    type: 'modules', // 'modules' | 'scripts' (single IIFE bundle)
  },
  favicons: {/* appName, appShortName, developerName, background, etc. */},
  optimization: {
    minify: { html: isProd, css: isProd, js: isProd, images: isProd },
    criticalCSS: false, // whether to include src/styles/critical.scss in the build
    sitemap: false, // generate sitemap.xml
    robots: false, // generate robots.txt
  },
  sprites: {
    enabled: true,
    fileName: 'sprite.symbol.svg',
  },
};
```

Environment variables (`PORT`, `SITE_URL`) are loaded from `.env.development` / `.env.production` depending on `NODE_ENV`.

## How It Works

### Gulp Tasks (`gulpfile.js`)

- **`dev`** — cleans `dist/`, generates favicons, builds HTML/SCSS/JS/images/sprite in parallel, then starts watchers and BrowserSync.
- **`build`** (`pnpm build:dev`) — same as above without the dev server, plus fonts, a generated `package.json`/`README.md` for `dist/`, and a ZIP archive.
- **`build-min`** (`pnpm build:prod`) — `build` plus HTML/CSS/JS/image minification, `sitemap.xml`/`robots.txt` (if enabled in the config), and a ZIP archive.

### HTML

Pages from `src/html/pages/**` are assembled via `gulp-file-include`, which lets you include layouts/components (`@@include(...)`). After assembly, `<picture>` tags with WebP/AVIF sources are generated automatically based on the `images` settings in the config.

### SCSS

Top-level files in `src/styles/*.scss` (excluding files starting with `_` and `tailwind.scss`) are compiled to CSS; partials are resolved automatically (`gulp-sass-glob-use-forward`), media queries are grouped, and vendor prefixes are added.

### JavaScript

Bundled with `esbuild`. With `scripts.type = 'modules'`, files are copied as-is and `type="module"` is kept in the HTML; with `scripts.type = 'scripts'`, all scripts are bundled into a single IIFE file and the `type="module"` attribute is stripped from the HTML during the build.

### Images

In dev mode images are simply copied to `dist/`; in production, WebP/AVIF versions are additionally generated via `sharp`, and (during `build-min`) compression is applied.

### Fonts

The `otfToTtf → ttfToWoff → iconfonts` pipeline: `.otf` is converted to `.ttf`, `.woff`/`.woff2` are generated from `.ttf`; icon fonts (`src/assets/fonts/iconfonts/**`) are copied to the build separately, without conversion.

### SVG Sprite

All SVGs from `src/assets/sprites/**` are combined into a single symbol sprite, `sprite.symbol.svg` (name configurable in `project.config.js`).

### Favicon

Based on `src/assets/favicons/favicon.png`, a full favicon set plus the corresponding HTML markup is generated and automatically inserted into `src/html/components/favicons.html`.

### Production Utilities

- `sitemap.xml` and `robots.txt` are generated from the HTML files in `dist/` (enabled via the `optimization.sitemap` / `optimization.robots` flags).
- After `build`/`build-min`, the contents of `dist/` are packaged into `<project-folder-name>.zip` in the project root.
- For `scripts.type = 'modules'`, a `package.json` and `README.md` are generated inside `dist/` with an `npm run serve` command (powered by Vite) for previewing the finished build locally.

## Creating a New Project From This Template

To scaffold a fresh project folder from this template (files only, no git history) using [`degit`](https://github.com/Rich-Harris/degit):

```bash
npx degit darkoton/gulp-template my-new-project
cd my-new-project
pnpm install
```

This downloads a clean copy of the repository — no `.git` folder, no commit history — ready to be turned into its own project.

## Quick Start

```bash
pnpm install
pnpm dev
```

The dev server starts on the port from `.env.development` (default `http://localhost:3000`) with automatic reload on changes in `src/`.

For a production build:

```bash
pnpm build:prod
```

The result will appear in `dist/` and as a `<folder-name>.zip` archive in the project root.

## Deployment

The repository includes a `vercel.json` configured to serve the contents of `dist/` as a static site on [Vercel](https://vercel.com/).
