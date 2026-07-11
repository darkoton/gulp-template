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

// Configuration
import { noop } from './gulp/utils/noop.js';


// Global app object
globalThis.app = {
  gulp,
  paths,
  plugins,
  config,
};

// Tasks plugins (tailwind, etc.)

// Tasks
import { assets } from './gulp/tasks/assets.js';
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
import { logBuildStart, logBuildEnd } from './gulp/utils/index.js';
import { createUnlinkHandler } from './gulp/utils/watcher.js';
import { sitemap, robots } from './gulp/tasks/optimize.js';

// ─────────────────────────────────────────────────────────────
// Watch
// ─────────────────────────────────────────────────────────────

const { globs } = paths;

function watcher() {
  gulp.watch(globs.assets, assets).on('unlink', createUnlinkHandler(paths.srcAssets, paths.buildAssets));
  gulp.watch(globs.images, images).on('unlink', (filePath) => {
    createUnlinkHandler(paths.srcImages, paths.buildImages)(filePath);

    // Remove .webp copy
    const relativePath = path.relative(paths.srcImages, filePath);
    const ext = path.extname(relativePath);
    if (['.jpg', '.jpeg', '.png'].includes(ext.toLowerCase())) {
      const webpPath = path.join(paths.buildImages, relativePath.replace(ext, '.webp'));
      try {
        fs.unlinkSync(webpPath);
      } catch {
        // ignore
      }
    }
  });
  gulp.watch(globs.html, html).on('unlink', createUnlinkHandler(paths.srcHtmlPages, paths.build, {}, 'html'));
  gulp.watch(globs.stylesWatch, scss).on('unlink', createUnlinkHandler(paths.srcStyles, paths.buildStyles, { '.scss': '.css' }));
  gulp.watch(globs.scripts, js).on('unlink', createUnlinkHandler(paths.srcScripts, paths.buildScripts));
  gulp.watch(globs.sprites, sprite);

  // Plugins watcher
}

const fonts = gulp.series(otfToTtf, ttfToWoff, iconfonts);

const mainTasks = gulp.parallel(
  assets,
  html,
  scss,
  js,
  images,
  sprite,
);

const minTasks = gulp.parallel(minHTML, minCSS, minJS, minImg);

const seoTasks = gulp.series(sitemap, robots);

const optimizeTasks = gulp.series(minTasks, seoTasks);

const buildTasks = gulp.parallel(
  fonts,
  assets,
  gulp.series(html, buildHTML),
  gulp.series(scss, buildCSS),
  images,
  sprite,
  buildJS,
);

const dev = gulp.series(
  reset,
  favicons,
  mainTasks,
  gulp.parallel(watcher, server),
);

const build = gulp.series(reset, favicons, buildTasks);

const buildMin = gulp.series(build, optimizeTasks);

gulp.task('dev', gulp.series(logBuildStart, dev, logBuildEnd));

gulp.task('start', server);

gulp.task('build', gulp.series(logBuildStart, build, zip, logBuildEnd));

gulp.task('build-min', gulp.series(logBuildStart, buildMin, zip, logBuildEnd));
