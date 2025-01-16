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
import { tailwind } from './gulp/tasks/tailwind.js';

let styles = scss
let minStyles = minCSS

if (packages.tailwind) {
  styles = gulp.series(scss, tailwind)
  minStyles = gulp.series(minCSS, tailwind)
}



function watcher() {
  gulp.watch(`${path.srcFolder}/assets/`, copy);
  gulp.watch(`${path.srcFolder}/img/**/*.{png,jpeg,jpg,gif,webp,svg}`, images);

  if (packages.tailwind) {
    gulp.watch(`${path.srcFolder}/html/**/*.html`, gulp.parallel(html, gulp.series(scss, tailwind)))
    gulp.watch(`${path.srcFolder}/scss/**/*.scss`, gulp.series(scss, tailwind))
    gulp.watch(`${path.srcFolder}/js/**/*.js`, gulp.parallel(js, gulp.series(scss, tailwind)));
  }else{
    gulp.watch(`${path.srcFolder}/html/**/*.html`, html);
    gulp.watch(`${path.srcFolder}/scss/**/*.scss`, styles)
    gulp.watch(`${path.srcFolder}/js/**/*.js`, js);
  }

}

const fonts = gulp.series(otfToTtf, ttfToWoff, iconfonts);

const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, styles, js, images));

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));

const build = gulp.series(reset, mainTasks);

const buildMin = gulp.series(reset, mainTasks, gulp.parallel(minHTML, minStyles, minJS, minImg));

gulp.task('dev', dev);

gulp.task('build', build);

gulp.task('build-min', buildMin);
