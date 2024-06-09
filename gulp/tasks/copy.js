export const copy = () => {
  return app.gulp.src(`${app.path.srcFolder}/assets/**/*.*`)
    .pipe(app.gulp.dest(`${app.path.buildFolder}/assets/`))
}