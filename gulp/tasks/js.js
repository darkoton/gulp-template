import webpack from "webpack-stream"

export const js = () => {
  return app.gulp.src(`${app.path.srcFolder}/js/script.js`, { soursemaps: true })
    .pipe(app.plugins.plumber(app.plugins.notify.onError({
      title: "JS",
      message: "Error: <%= error.message %>"
    })))
    .pipe(webpack({
      mode: "development",
      output: {
        filename: "script.js"
      }
    }))
    .pipe(app.gulp.dest(`${app.path.buildFolder}/js/`))
    .pipe(app.gulp.src([`${app.path.srcFolder}/js/*.js`, `!${app.path.srcFolder}/js/script.js`]))
    .pipe(app.gulp.dest(`${app.path.buildFolder}/js/`))
    .pipe(app.plugins.browsersync.stream())
}