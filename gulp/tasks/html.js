import fileinclude from 'gulp-file-include';
import avifWebpHTML from 'gulp-avif-webp-html-universal';
import gulpif from 'gulp-if';
import prettify from 'gulp-prettify';
import { config } from '../configs/config.js';

export const html = () => {
  return app.gulp
    .src(app.paths.globs.htmlPages, { soursemaps: true })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'HTML',
          message: 'Error: <%= error.message %>',
        }),
      ),
    )
    .pipe(fileinclude())
    .pipe(
      avifWebpHTML({
        webp: config.images.webp.enabled,
        avif: config.images.avif.enabled,
      }),
    )
    .pipe(
      prettify({
        indent_size: 2,
        indent_char: ' ',
        max_preserve_newlines: 1,
        preserve_newlines: true,
        unformatted: ['pre', 'code'],
      }),
    )
    .pipe(app.gulp.dest(app.paths.build))
    .pipe(app.plugins.browsersync.stream());
};
