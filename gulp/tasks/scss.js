import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // групировка медиа запросов
import gulpIf from 'gulp-if';

const sass = gulpSass(dartSass);

export const scss = () => {
  return app.gulp
    .src(app.paths.globs.styles, { soursemaps: true })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'SCSS',
          message: 'Error: <%= error.message %>',
        }),
      ),
    )
    .pipe(
      sass({
        outputStyle: 'expanded',
      }),
    )
    .pipe(
      gulpIf(
        file => file.basename !== 'tailwind.css',
        groupCssMediaQueries(),
      ),
    )
    .pipe(app.gulp.dest(app.paths.buildStyles))
    .pipe(app.plugins.browsersync.stream());
};
