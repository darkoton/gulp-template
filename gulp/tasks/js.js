export const js = () => {
  return app.gulp.src(`${app.path.srcFolder}/js/**/*.js`)
    .pipe(app.plugins.plumber(app.plugins.notify.onError({
      title: "JS",
      message: "Error: <%= error.message %>"
    })))
    .pipe(app.gulp.dest(`${app.path.buildFolder}/js/`))
    .pipe(app.plugins.browsersync.stream())
}