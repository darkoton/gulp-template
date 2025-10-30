import settings from '../config/settings.js';

//CSS
import ImagesCSS from 'gulp-web-images-css'; // Вывод WEBP изображений
import autoPrefixer from 'gulp-autoprefixer'; // Добавление вендорых префиксов

export const buildCSS = () => {
  return app.gulp
    .src(`${app.path.buildFolder}/css/*.css`)
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
    .pipe(app.gulp.dest(`${app.path.buildFolder}/css/`));
};
