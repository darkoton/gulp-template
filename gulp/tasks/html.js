import fileinclude from "gulp-file-include";

export const html = () => {
  return app.gulp.src(`${app.path.srcFolder}/html/*.html`)
    .pipe(app.plugins.plumber(app.plugins.notify.onError({
      title: "HTML",
      message: "Error: <%= error.message %>"
    })))
    .pipe(fileinclude())
    .pipe(app.gulp.dest(`${app.path.buildFolder}/`))
    .pipe(app.plugins.browsersync.stream())
}