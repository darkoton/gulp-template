import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => {
  // Find fonts files .otf
  return (
    app.gulp
      .src(`${app.paths.srcFonts}/**/*.otf`)
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: 'FONTS',
            message: 'Error: <%= error.message %>',
          }),
        ),
      )
      // Convert to format .ttf
      .pipe(
        fonter({
          formats: ['ttf'],
        }),
      )
      // Upload to src folder
      .pipe(app.gulp.dest(app.paths.srcFonts))
  );
};

export const ttfToWoff = () => {
  // Find fonts files .ttf
  return (
    app.gulp
      .src([
        `${app.paths.srcFonts}/**/*.ttf`,
        `!${app.paths.srcFonts}/iconfonts/**/*.**`,
      ])
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: 'FONTS',
            message: 'Error: <%= error.message %>',
          }),
        ),
      )
      // Convert to format .woff
      .pipe(
        fonter({
          formats: ['woff'],
        }),
      )
      // Upload to result folder
      .pipe(app.gulp.dest(app.paths.buildFonts))
      // Find fonts files .ttf
      .pipe(
        app.gulp.src([
          `${app.paths.srcFonts}/**/*.ttf`,
          `!${app.paths.srcFonts}/iconfonts/**/*.**`,
        ]),
      )
      // Convert to format .woff2
      .pipe(ttf2woff2())
      // Upload to result folder
      .pipe(app.gulp.dest(app.paths.buildFonts))
  );
};

export const iconfonts = () => {
  return app.gulp
    .src(app.paths.globs.iconFonts)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'ICONFONTS',
          message: 'Error: <%= error.message %>',
        }),
      ),
    )
    .pipe(app.gulp.dest(`${app.paths.buildFonts}/iconfonts/`));
};
