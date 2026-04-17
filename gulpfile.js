import gulp from 'gulp';
import { paths } from './gulp/configs/paths.js';
import { plugins } from './gulp/configs/plugins.js';
import { config } from './gulp/configs/config.js';

global.app = {
  gulp: gulp,
  paths: paths,
  plugins: plugins,
};

import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
// import { otfToTtf, ttfToWoff, iconfonts } from './gulp/tasks/fonts.js';
import { server } from './gulp/tasks/server.js';
import { minHTML, minCSS, minJS, minImg } from './gulp/tasks/minify.js';
import { buildCSS } from './gulp/tasks/build.js';
import { zip } from './gulp/tasks/zip.js';

const taskSeries = {
  html: [html],
  styles: [scss],
  js: [js],
  images: [images],
};

// for (let index = 0; index < Object.keys(config.packages).length; index++) {
//   const key = Object.keys(config.packages)[index];
//   const packageConfig = config.packages[key];

//   let type = 'module';
//   const tasks = {};
//   if (packageConfig.enable) {
//     if (packageConfig.config.type === 'cdn') {
//       type = 'cdn';
//     } else if (packageConfig.config.type === 'module') {
//       type = 'module';
//     }
//     Object.assign(tasks, packageConfig.tasks[type]);
//   }

//   for (let i = 0; i < Object.keys(tasks).length; i++) {
//     const taskKey = Object.keys(tasks)[i];
//     const task = tasks[taskKey];

//     if (task) {
//       taskSeries[taskKey].push(task);
//     }
//   }
// }

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
}

// const fonts = gulp.series(otfToTtf, ttfToWoff, iconfonts);

const mainTasks = gulp.series(
  // fonts,
  gulp.parallel(
    copy,
    gulp.series(...taskSeries.html),
    gulp.series(...taskSeries.styles),
    gulp.series(...taskSeries.js),
    gulp.series(...taskSeries.images),
  ),
);

const buildTasks = gulp.series(buildCSS);

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));

const build = gulp.series(reset, mainTasks, buildTasks, minImg);

const buildMin = gulp.series(build, gulp.parallel(minHTML, minCSS, minJS));

gulp.task('dev', dev);

gulp.task('start', server);

gulp.task('build', gulp.series(build, zip));

gulp.task('build-min', gulp.series(buildMin, zip));
