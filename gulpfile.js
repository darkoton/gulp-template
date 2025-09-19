import gulp from 'gulp';
import { path } from './gulp/config/path.js';
import { plugins } from './gulp/config/plugins.js';
import packages from './gulp/config/packages.js';

global.app = {
  gulp: gulp,
  path: path,
  plugins: plugins,
};

import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { otfToTtf, ttfToWoff, iconfonts } from './gulp/tasks/fonts.js';
import { server } from './gulp/tasks/server.js';
import { minHTML, minCSS, minJS, minImg } from './gulp/tasks/minify.js';

const taskSeries = {
  html: [html],
  style: [scss],
  js: [js],
}

for (let index = 0; index < Object.keys(packages).length; index++) {
  const key = Object.keys(packages)[index]

  const packageConfig = packages[key];

  if (packageConfig.enable) {
    for (let i = 0; i < Object.keys(packageConfig.tasks).length; i++) {
      const taskKey = Object.keys(packageConfig.tasks)[i]
      const task = packageConfig.tasks[taskKey];

      if (task) {
        taskSeries[taskKey].push(task)
      }
    }
  }
}

function watcher() {
  gulp.watch(`${path.srcFolder}/assets/`, copy);
  gulp.watch(`${path.srcFolder}/img/**/*.{png,jpeg,jpg,gif,webp,svg}`, images);
  gulp.watch(`${path.srcFolder}/html/**/*.html`, gulp.series(...taskSeries.html));
  gulp.watch(`${path.srcFolder}/scss/**/*.scss`, gulp.series(...taskSeries.style))
  gulp.watch(`${path.srcFolder}/js/**/*.js`, gulp.series(...taskSeries.js));

}

const fonts = gulp.series(otfToTtf, ttfToWoff, iconfonts);

const mainTasks = gulp.series(fonts, gulp.parallel(copy, gulp.series(...taskSeries.html), gulp.series(...taskSeries.style), gulp.series(...taskSeries.js), images));

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));

const build = gulp.series(reset, mainTasks);

const buildMin = gulp.series(reset, mainTasks, gulp.parallel(minHTML, minCSS, minJS, minImg));

gulp.task('dev', dev);

gulp.task('build', build);

gulp.task('build-min', buildMin);
