import gulp from 'gulp';
import webp from 'gulp-webp';
import avif from 'gulp-avif';
import settings from '../config/settings.js';

export const avifImages = () =>
  app.gulp
    .src(`${app.path.srcFolder}/img/**/*.{jpg,png,jpeg,gif}`)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'IMAGES AVIF',
          message: 'Error: <%= error.message %>',
        }),
      ),
    )
    .pipe(app.plugins.newer({ dest: `${app.path.buildFolder}/img/`, ext: '.avif' }))
    .pipe(avif())
    .pipe(app.gulp.dest(`${app.path.buildFolder}/img/`));

export const webpImages = () =>
  app.gulp
    .src(`${app.path.srcFolder}/img/**/*.{jpg,png,jpeg,gif}`)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'IMAGES WEBP',
          message: 'Error: <%= error.message %>',
        }),
      ),
    )
    .pipe(app.plugins.newer({ dest: `${app.path.buildFolder}/img/`, ext: '.webp' }))
    .pipe(webp())
    .pipe(app.gulp.dest(`${app.path.buildFolder}/img/`));

export const copyImages = () => {
  return app.gulp
    .src(`${app.path.srcFolder}/img/**/*.{jpg,png,jpeg,gif,webp}`)
    .pipe(app.gulp.dest(`${app.path.buildFolder}/img/`))
    .pipe(app.plugins.browsersync.stream());
};

export const images = gulp.parallel(
  copyImages,
  ...(settings.gulp.images.mode === 'webp'
    ? [webpImages]
    : settings.gulp.images.mode === 'avif'
      ? [avifImages]
      : [webpImages, avifImages]),
);
