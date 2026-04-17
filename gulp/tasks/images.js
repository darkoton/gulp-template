import gulp from 'gulp';
import { config } from '../configs/config.js';
import {
  convertImageToWebP,
  convertImageToAvif,
} from '../plugins/sharp.js';

const createImagesTask = ({
  title,
  ext,
  convertor,
  name = 'createImagesTask',
}) => {
  const task = () =>
    app.gulp
      .src(`${app.paths.srcImages}/**/*.{jpg,png,jpeg}`)
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
          dest: app.paths.buildImages,
          ext,
        }),
      )
      .pipe(convertor())
      .pipe(app.gulp.dest(app.paths.buildImages));

  Object.defineProperty(task, 'name', { value: name });

  return task;
};

export const imagesAvif = createImagesTask({
  title: 'IMAGES AVIF',
  ext: '.avif',
  convertor: convertImageToAvif,
  name: 'imagesAvif',
});

export const imagesWebp = createImagesTask({
  title: 'IMAGES WEBP',
  ext: '.webp',
  convertor: convertImageToWebP,
  name: 'imagesWebp',
});

export const imagesCopy = () => {
  return app.gulp
    .src(app.paths.globs.images)
    .pipe(app.gulp.dest(app.paths.buildImages))
    .pipe(app.plugins.browsersync.stream());
};

export const images = gulp.parallel(
  imagesCopy,
  ...[
    config.images.webp.enabled ? imagesWebp : null,
    config.images.avif.enabled ? imagesAvif : null,
  ].filter(Boolean),
);
