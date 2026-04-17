import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => {
  // Ищем файлы шрифтов .otf
  return (
    app.gulp
      .src(`${app.paths.src}/fonts/*.otf`)
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: 'FONTS',
            message: 'Error: <%= error.message %>',
          }),
        ),
      )
      // Конвертируем в .ttf
      .pipe(
        fonter({
          formats: ['ttf'],
        }),
      )
      // Выгружаем в исходную папку
      .pipe(app.gulp.dest(`${app.paths.src}/fonts/`))
  );
};

export const ttfToWoff = () => {
  // Ищем файлы шрифтов .ttf
  return (
    app.gulp
      .src(`${app.paths.src}/fonts/*.ttf`)
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: 'FONTS',
            message: 'Error: <%= error.message %>',
          }),
        ),
      )
      // Конвертируем в .woff
      .pipe(
        fonter({
          formats: ['woff'],
        }),
      )
      // Выгружаем в папку с результатом
      .pipe(app.gulp.dest(`${app.paths.buildFolder}/fonts`))
      // Ищем файлы шрифтов .ttf
      .pipe(app.gulp.src(`${app.paths.src}/fonts/*.ttf`))
      // Конвертируем в .woff2
      .pipe(ttf2woff2())
      // Выгружаем в папку с результатом
      .pipe(app.gulp.dest(`${app.paths.buildFolder}/fonts`))
  );
};

export const iconfonts = () => {
  return app.gulp
    .src(
      `${app.paths.src}/iconfonts/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}`,
    )
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'ICONFONTS',
          message: 'Error: <%= error.message %>',
        }),
      ),
    )
    .pipe(app.gulp.dest(`${app.paths.buildFolder}/iconfonts/`));
};
