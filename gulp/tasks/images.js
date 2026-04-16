import gulp from 'gulp';
import { config } from '../configs/config.js';
import {
  convertImageToWebP,
  convertImageToAvif,
} from '../plugins/sharp.js';

const createImagesTask = ({ title, ext, convertor }) => {
  return () =>
    app.gulp
      .src(`${app.path.srcFolder}/img/**/*.{jpg,png,jpeg}`)
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title,
            message: 'Error: <%= error.message %>',
          }),
        ),
      )
      .pipe(
        app.plugins.newer({
          dest: `${app.path.buildFolder}/img/`,
          ext,
        }),
      )
      .pipe(convertor())
      .pipe(app.gulp.dest(`${app.path.buildFolder}/img/`));
};

export const imagesAvif = createImagesTask({
  title: 'IMAGES AVIF',
  ext: '.avif',
  convertor: convertImageToAvif,
});

export const imagesWebp = createImagesTask({
  title: 'IMAGES WEBP',
  ext: '.webp',
  convertor: convertImageToWebP,
});

export const imagesCopy = () => {
  return app.gulp
    .src(`${app.path.srcFolder}/img/**/*.{jpg,png,jpeg,webp,gif,svg}`)
    .pipe(app.gulp.dest(`${app.path.buildFolder}/img/`))
    .pipe(app.plugins.browsersync.stream());
};

export const images = gulp.parallel(
  imagesCopy,
  ...[
    config.images.webp.enabled ? imagesWebp : null,
    config.images.avif.enabled ? imagesAvif : null,
  ].filter(Boolean),
);
