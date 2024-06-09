export const iconfonts = () => {
  return app.gulp.src(`${app.path.srcFolder}/iconfonts/*.*`)
    .pipe(app.gulp.dest(`${app.path.buildFolder}/iconfonts/`))
}