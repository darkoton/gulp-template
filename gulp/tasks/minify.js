//Minification
import htmlmin from 'gulp-htmlmin';
import cssmin from 'gulp-cssmin';
import jsmin from 'gulp-jsmin';
import imagemin from 'gulp-image';
import gulpIf from 'gulp-if';

export const minHTML = () => {
  return app.gulp
    .src(`${app.path.buildFolder}/*.html`)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(app.gulp.dest(`${app.path.buildFolder}/`));
};

export const minCSS = () => {
  return app.gulp
    .src(`${app.path.buildFolder}/css/*.css`)
    .pipe(cssmin())
    .pipe(app.gulp.dest(`${app.path.buildFolder}/css/`));
};

export const minJS = () => {
  return app.gulp
    .src(`${app.path.buildFolder}/js/**/*.js`)
    .pipe(jsmin())
    .pipe(app.gulp.dest(`${app.path.buildFolder}/js/`));
};

export const minImg = async () => {
  const isVercel = process.env.VERCEL;

  return app.gulp
    .src(`${app.path.buildFolder}/img/**/*.{jpg,png,jpeg,gif,webp,svg,avif}`)
    .pipe(gulpIf(!isVercel, imagemin()))
    .pipe(app.gulp.dest(`${app.path.buildFolder}/img/`));
};
