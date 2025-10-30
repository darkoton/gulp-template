import settings from '../config/settings.js';

//HTML
import htmlmin from 'gulp-htmlmin';
import cssmin from 'gulp-cssmin';

//JS
import jsmin from 'gulp-jsmin';

//IMAGES
import imagemin from 'gulp-image';

//CSS
import ImagesCSS from 'gulp-web-images-css'; // Вывод WEBP изображений
import autoPrefixer from 'gulp-autoprefixer'; // Добавление вендорых префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // групировка медиа запросов

export const minHTML = () => {
  return app.gulp
    .src(`${app.path.buildFolder}/*.html`)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(app.gulp.dest(`${app.path.buildFolder}/`));
};

export const minCSS = () => {
  return (
    app.gulp
      .src(`${app.path.buildFolder}/css/*.css`)
      //comment if use tailwind
      // .pipe(groupCssMediaQueries())
      .pipe(
        ImagesCSS({
          mode: settings.gulp.images.mode,
        }),
      )
      .pipe(
        autoPrefixer({
          grid: true,
          overrideBrowserslist: ['last 3 versions'],
          cascade: true,
        }),
      )
      .pipe(cssmin())
      .pipe(app.gulp.dest(`${app.path.buildFolder}/css/`))
  );
};

export const minJS = () => {
  return app.gulp
    .src(`${app.path.buildFolder}/js/**/*.js`)
    .pipe(jsmin())
    .pipe(app.gulp.dest(`${app.path.buildFolder}/js/`));
};

export const minImg = async () => {
  return app.gulp
    .src(`${app.path.buildFolder}/img/**/*.{jpg,png,jpeg,gif,webp,svg,avif}`)
    .pipe(imagemin())
    .pipe(app.gulp.dest(`${app.path.buildFolder}/img/`));
};
