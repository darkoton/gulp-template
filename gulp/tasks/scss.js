import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // групировка медиа запросов
import gulpIf from 'gulp-if';

const sass = gulpSass(dartSass);

export const scss = () => {
  return app.gulp
    .src(`${app.path.srcFolder}/scss/*.scss`, { soursemaps: true })
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
    .pipe(gulpIf(file => file.basename !== 'tailwind.css', groupCssMediaQueries()))
    .pipe(app.gulp.dest(`${app.path.buildFolder}/css/`))
    .pipe(app.plugins.browsersync.stream());
};
