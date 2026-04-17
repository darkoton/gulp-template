import gulpZip from 'gulp-zip';

export const zip = () => {
  return app.gulp
    .src(app.paths.build)
    .pipe(gulpZip(app.paths.zip + '.zip'))
    .pipe(app.gulp.dest(app.paths.root));
};
