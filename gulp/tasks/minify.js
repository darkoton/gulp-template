import webHtmlNosvg from "gulp-webp-html-nosvg";
import htmlmin from "gulp-htmlmin";
import cssmin from "gulp-cssmin";
import jsmin from "gulp-jsmin";
import imagemin from "gulp-imagemin";

export const minHTML = () => {
  return app.gulp.src(`${app.path.buildFolder}/*.html`)
    .pipe(webHtmlNosvg())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(app.gulp.dest(`${app.path.buildFolder}/`))
}

export const minCSS = () => {
  return app.gulp.src(`${app.path.buildFolder}/css/*.css`)
    .pipe(cssmin())
    .pipe(app.gulp.dest(`${app.path.buildFolder}/css/`))
}

export const minJS = () => {
  return app.gulp.src(`${app.path.buildFolder}/js/**/*.js`)
    .pipe(jsmin())
    .pipe(app.gulp.dest(`${app.path.buildFolder}/js/`))
}

export const minImg = () => {
  return app.gulp.src(`${app.path.buildFolder}/img/**/*.{jpg,png,jpeg,gif,webp}`)
    .pipe(app.plugins.newer(`${app.path.buildFolder}/img/`))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      interlaced: true,
      optimizationLevel: 3 // 0 to 7
    }))
    .pipe(app.gulp.dest(`${app.path.buildFolder}/img/`))
}

