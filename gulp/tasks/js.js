import fileInclude from 'gulp-file-include';

export const js = () => {
  return app.gulp
  .src(`${app.path.srcFolder}/js/*.js`)
  .pipe(fileInclude())
  .pipe(app.gulp.dest(`${app.path.buildFolder}/js`))
  .pipe(app.plugins.browsersync.stream());
}