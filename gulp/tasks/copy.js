export const copy = () => {
  return app.gulp
    .src(app.paths.globs.assets)
    .pipe(app.gulp.dest(app.paths.buildAssets));
};
