import * as dartSass from "sass";
import gulpSass from "gulp-sass";

const sass = gulpSass(dartSass)

export const scss = () => { 
    return app.gulp.src(`${app.path.srcFolder}/scss/style.scss`, { soursemaps: true })
    .pipe(app.plugins.plumber(app.plugins.notify.onError({
      title: "SCSS",
      message: "Error: <%= error.message %>"
    })))
    .pipe(sass({
      outputStyle: "expanded"
    }))
    .pipe(app.gulp.dest(`${app.path.buildFolder}/css/`))
    .pipe(app.plugins.browsersync.stream())
}