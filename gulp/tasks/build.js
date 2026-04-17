import { config } from '../configs/config.js';
import gulpif from 'gulp-if';

//CSS
import ImagesCSS from 'gulp-web-images-css'; // Вывод WEBP изображений
import autoPrefixer from 'gulp-autoprefixer'; // Добавление вендорых префиксов

const imagesMode = () => {
  if (config.images.webp.enabled && config.images.avif.enabled)
    return 'all';
  if (config.images.webp.enabled) return 'webp';
  if (config.images.avif.enabled) return 'avif';
  return null;
};

export const buildCSS = () => {
  return app.gulp
    .src(app.paths.globs.stylesBuild)
    .pipe(
      gulpif(
        imagesMode(),
        ImagesCSS({
          mode: imagesMode(),
        }),
      ),
    )
    .pipe(
      autoPrefixer({
        grid: true,
        overrideBrowserslist: ['last 3 versions'],
        cascade: true,
      }),
    )
    .pipe(app.gulp.dest(app.paths.buildStyles));
};
