import fileinclude from "gulp-file-include";
import webHtmlNosvg from "gulp-webp-html-nosvg";

export const html = () => {
  return app.gulp.src(`${app.path.srcFolder}/html/*.html`, { soursemaps: true })
    .pipe(app.plugins.plumber(app.plugins.notify.onError({
      title: "HTML",
      message: "Error: <%= error.message %>"
    })))
    .pipe(fileinclude())
    .pipe(webHtmlNosvg())
    .pipe(app.gulp.dest(`${app.path.buildFolder}/`))
    .pipe(app.plugins.browsersync.stream())
}