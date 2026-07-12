import nodePath from 'path';

const rootDir = nodePath.resolve();

// ─────────────────────────────────────────────────────────────
// Directory & Extension Constants (internal — not user-facing)
// ─────────────────────────────────────────────────────────────

const folders = {
  zip: nodePath.basename(rootDir),
  build: 'dist',
  src: 'src',
  styles: 'styles',
  scripts: 'scripts',
  html: 'html',
  assets: 'assets',
  images: 'img',
  sprites: 'sprites',
  pages: 'pages',
  layouts: 'layouts',
  components: 'components',
  favicons: 'favicons',
  fonts: 'fonts',
};

const extensions = {
  css: 'css',
  styles: '{css,scss}',
  scripts: 'js',
  html: 'html',
  images: '{jpg,jpeg,png,gif,ico,webp,svg}',
  sprites: 'svg',
  fonts: '{eot,ttf,otf,otc,ttc,woff,woff2,svg}',
};

// ─────────────────────────────────────────────────────────────
// Computed Paths
// ─────────────────────────────────────────────────────────────

const computedPaths = {
  srcStyles: `${folders.src}/${folders.styles}`,
  srcScripts: `${folders.src}/${folders.scripts}`,
  srcHtml: `${folders.src}/${folders.html}`,
  srcAssets: `${folders.src}/${folders.assets}`,
  srcImages: `${folders.src}/${folders.assets}/${folders.images}`,
  srcSprites: `${folders.src}/${folders.assets}/${folders.sprites}`,
  srcHtmlLayouts: `${folders.src}/${folders.html}/${folders.layouts}`,
  srcHtmlPages: `${folders.src}/${folders.html}/${folders.pages}`,
  srcHtmlComponents: `${folders.src}/${folders.html}/${folders.components}`,
  srcFavicons: `${folders.src}/${folders.assets}/${folders.favicons}`,
  srcFonts: `${folders.src}/${folders.assets}/${folders.fonts}`,
  buildHtml: `${folders.build}`,
  buildStyles: `${folders.build}/${folders.styles}`,
  buildScripts: `${folders.build}/${folders.scripts}`,
  buildAssets: `${folders.build}/${folders.assets}`,
  buildImages: `${folders.build}/${folders.assets}/${folders.images}`,
  buildFavicons: `${folders.build}/${folders.assets}/${folders.favicons}`,
  buildFonts: `${folders.build}/${folders.assets}/${folders.fonts}`,
};

const globs = {
  html: `${computedPaths.srcHtml}/**/*.${extensions.html}`,
  htmlPages: `${computedPaths.srcHtmlPages}/**/*.${extensions.html}`,
  htmlComponents: [
    `${computedPaths.srcHtmlLayouts}/**/*.${extensions.html}`,
    `${computedPaths.srcHtmlComponents}/**/*.${extensions.html}`,
  ],
  htmlBuild: `${computedPaths.buildHtml}/*.${extensions.html}`,

  styles: [
    `${computedPaths.srcStyles}/*.${extensions.styles}`,
    `${computedPaths.srcStyles}/pages/*.${extensions.styles}`,
    `!${computedPaths.srcStyles}/_*.${extensions.styles}`,
    `!${computedPaths.srcStyles}/tailwind.${extensions.styles}`,
  ],
  stylesBuild: [
    `${computedPaths.buildStyles}/**/*.${extensions.css}`,
    `!${computedPaths.buildStyles}/**/tailwind.${extensions.css}`,
  ],
  stylesWatch: `${computedPaths.srcStyles}/**/*.${extensions.styles}`,
  scripts: `${computedPaths.srcScripts}/**/*.${extensions.scripts}`,
  scriptsGlob: `${computedPaths.srcScripts}/*.${extensions.scripts}`,
  scriptsBuild: `${computedPaths.buildScripts}/**/*.${extensions.scripts}`,
  scriptsWatch: `${computedPaths.srcScripts}/**/*.${extensions.scripts}`,
  images: `${computedPaths.srcImages}/**/*.${extensions.images}`,
  imagesBuild: `${computedPaths.buildImages}/**/*.${extensions.images}`,
  sprites: `${computedPaths.srcSprites}/**/*.${extensions.sprites}`,
  assets: [
    `${computedPaths.srcAssets}/**/*`,
    `!${computedPaths.srcImages}`,
    `!${computedPaths.srcSprites}/**`,
    `!${computedPaths.srcFonts}/**`,
    `!${computedPaths.srcFavicons}/**`,
  ],
  favicons: `${computedPaths.srcFavicons}/favicon.${extensions.images}`,
  fonts: [
    `${computedPaths.srcFonts}/**/*.${extensions.fonts}`,
    `!${computedPaths.srcFonts}/iconfonts/**/*.${extensions.fonts}`,
  ],
  fontsBuild: `${computedPaths.buildFonts}/**/*.${extensions.fonts}`,
  iconFonts: `${computedPaths.srcFonts}/iconfonts/**/*.${extensions.fonts}`,
  iconFontsBuild: `${computedPaths.buildFonts}/iconfonts/**/*.${extensions.fonts}`,
};

export const paths = {
  root: rootDir,
  src: folders.src,
  build: folders.build,
  zip: folders.zip,
  ...computedPaths,
  globs,
};
