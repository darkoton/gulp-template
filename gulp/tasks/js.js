export const js = () => {
  return app.gulp
    .src(app.paths.globs.scripts)
    .pipe(app.gulp.dest(app.paths.buildScripts))
    .pipe(app.plugins.browsersync.stream());
};
