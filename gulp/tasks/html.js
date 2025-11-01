import fileinclude from 'gulp-file-include';
import webphtml from 'gulp-webp-html-nosvg';
import avifWebpHTML from 'gulp-avif-webp-html';
import gulpif from 'gulp-if';
import prettify from 'gulp-prettify';
import settings from '../config/settings.js';

export const html = () => {
  return app.gulp
    .src(`${app.path.srcFolder}/html/*.html`, { soursemaps: true })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'HTML',
          message: 'Error: <%= error.message %>',
        }),
      ),
    )
    .pipe(fileinclude())
    .pipe(gulpif(settings.gulp.images.mode === 'avif', avifWebpHTML())) // Needs to be fixed in the future
    .pipe(gulpif(settings.gulp.images.mode === 'webp', webphtml()))
    .pipe(gulpif(settings.gulp.images.mode === 'all', avifWebpHTML()))
    .pipe(
      prettify({
        indent_size: 2,
        indent_char: ' ',
        max_preserve_newlines: 1,
        preserve_newlines: true,
        unformatted: ['pre', 'code'],
      }),
    )
    .pipe(app.gulp.dest(`${app.path.buildFolder}/`))
    .pipe(app.plugins.browsersync.stream());
};
