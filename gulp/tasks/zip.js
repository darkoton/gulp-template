import gulpZip from 'gulp-zip';

export const zip = () => {
  return app.gulp
    .src(`${app.path.buildFolder}/*`)
    .pipe(gulpZip('dist.zip'))
    .pipe(app.gulp.dest(`${app.path.rootFolder}`));
};
