import webpack from "webpack-stream"

export const js = () => {
  return app.gulp
  .src(`${app.path.srcFolder}/js/**/*.js`)
  .pipe(app.gulp.dest(`${app.path.buildFolder}/js`))
  .pipe(app.plugins.browsersync.stream());
}