/**
 * Gulpfile
 */

import gulp from 'gulp';

// Environment (must be first — loads .env before config evaluation)
import './gulp/configs/env.js';

// Configuration
import { paths } from './gulp/configs/paths.js';
import { plugins } from './gulp/configs/plugins.js';
import { config } from './gulp/configs/config.js';

// Global app object
global.app = {
  gulp,
  paths,
  plugins,
  config,
};

// Tasks plugins (tailwind, etc.)

// Tasks
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { otfToTtf, ttfToWoff, iconfonts } from './gulp/tasks/fonts.js';
import { server } from './gulp/tasks/server.js';
import { minHTML, minCSS, minJS, minImg } from './gulp/tasks/minify.js';
import { buildCSS, buildJS, buildHTML } from './gulp/tasks/build.js';
import { zip } from './gulp/tasks/zip.js';
import { favicons } from './gulp/tasks/favicons.js';
import { sprite } from './gulp/tasks/sprite.js';

const taskSeries = {
  html: [html],
  styles: [scss],
  js: [js],
  images: [images],
};

// ─────────────────────────────────────────────────────────────
// Watch
// ─────────────────────────────────────────────────────────────

const { globs } = paths;

function watcher() {
  gulp.watch(globs.assets, copy);
  gulp.watch(globs.images, gulp.series(...taskSeries.images));
  gulp.watch(globs.html, gulp.series(...taskSeries.html));
  gulp.watch(globs.stylesWatch, gulp.series(...taskSeries.styles));
  gulp.watch(globs.scripts, gulp.series(...taskSeries.js));
  gulp.watch(globs.sprites, sprite);

  // Plugins watcher
}

const fonts = gulp.series(otfToTtf, ttfToWoff, iconfonts);

const mainTasks = gulp.parallel(
  copy,
  gulp.series(...taskSeries.html),
  gulp.series(...taskSeries.styles),
  gulp.series(...taskSeries.js),
  gulp.series(...taskSeries.images),
  sprite,
);

const buildTasks = gulp.parallel(
  fonts,
  copy,
  gulp.series(...taskSeries.html, buildHTML),
  gulp.series(...taskSeries.styles, buildCSS),
  gulp.series(...taskSeries.images),
  sprite,
  buildJS,
);

const buildMinTasks = gulp.parallel(
  ...(config.minify.html ? [minHTML] : []),
  ...(config.minify.css ? [minCSS] : []),
  ...(config.minify.js ? [minJS] : []),
  ...(config.minify.images ? [minImg] : []),
);

const dev = gulp.series(
  reset,
  favicons,
  mainTasks,
  gulp.parallel(watcher, server),
);

const build = gulp.series(reset, favicons, buildTasks);

const buildMin = gulp.series(build, buildMinTasks);

gulp.task('dev', dev);

gulp.task('start', server);

gulp.task('build', gulp.series(build, zip));

gulp.task('build-min', gulp.series(buildMin, zip));
