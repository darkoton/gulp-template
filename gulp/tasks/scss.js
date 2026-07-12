import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // групировка медиа запросов
import gulpIf from 'gulp-if';
import sassGlob from 'gulp-sass-glob-use-forward';

const sass = gulpSass(dartSass);

export const scss = () => {
  const { gulp, paths, plugins, config } = app;

  const src = config.optimization.criticalCSS
    ? paths.globs.styles
    : [...paths.globs.styles, `!${paths.srcStyles}/critical.scss`];

  return gulp
    .src(src, { soursemaps: true })
    .pipe(
      plugins.plumber(
        plugins.notify.onError({
          title: 'SCSS',
          message: 'Error: <%= error.message %>',
        }),
      ),
    )
    .pipe(sassGlob())
    .pipe(
      sass({
        outputStyle: 'expanded',
      }),
    )
    .pipe(groupCssMediaQueries())
    .pipe(app.gulp.dest(app.paths.buildStyles))
    .pipe(app.plugins.browsersync.stream());
};
