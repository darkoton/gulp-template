import rename from 'gulp-rename';
import replace from 'gulp-replace';

const cdn = '<script src="https://cdn.tailwindcss.com"></script>'


const replacement = `<!-- CDN -->
  ${cdn}
  <script src='js/tailwind.js'></script>
`

export function tailwindHTML_CDN() {
  return app.gulp.src(`${app.path.buildFolder}/*.html`, { sourcemaps: true })
    .pipe(app.plugins.plumber(app.plugins.notify.onError({
      title: "TAILWIND CDN HTML",
      message: "Error: <%= error.message %>"
    })))
    .pipe(replace('<!-- CDN -->', replacement))
    .pipe(app.gulp.dest(`${app.path.buildFolder}/`))
    .pipe(app.plugins.browsersync.stream())
};

export function tailwindJS_CDN() {
  return app.gulp.src(`${app.path.rootFolder}/tailwind.config.json`, { sourcemaps: true })
    .pipe(app.plugins.plumber(app.plugins.notify.onError({
      title: "TAILWIND CDN JS",
      message: "Error: <%= error.message %>"
    })))
    .pipe(rename({
      basename:"tailwind",
      extname: '.js'
    }))
    .pipe(replace(/^{/, 'tailwind.config = {'))
    .pipe(replace(/}$/, '};'))
    .pipe(app.gulp.dest(`${app.path.buildFolder}/js/`))
    .pipe(app.plugins.browsersync.stream())
};