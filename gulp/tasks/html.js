import fileinclude from 'gulp-file-include';
import avifWebpHTML from 'gulp-avif-webp-html-universal';
import prettify from 'gulp-prettify';
import gulpIf from 'gulp-if';

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
        webp: app.config.images.webp.enabled,
        avif: app.config.images.avif.enabled,
      }),
    )
    .pipe(
      gulpIf(!app.config.optimization.minify.html,
      prettify({
          parser: 'html',
          htmlWhitespaceSensitivity: 'ignore',
      }))
    )
    .pipe(app.gulp.dest(app.paths.build))
    .pipe(app.plugins.browsersync.stream());
};
