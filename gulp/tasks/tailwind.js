// "npm i -D tailwindcss gulp-postcss autoprefixer"

import tailwindCSS from "tailwindcss";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";

export const tailwind = () => { 
  return app.gulp.src(`${app.path.buildFolder}/css/*.css`, { sourcemaps: true })
    .pipe(app.plugins.plumber(app.plugins.notify.onError({
      title: "TAILWIND CSS",
      message: "Error: <%= error.message %>"
    })))
    .pipe(postcss([
      tailwindCSS('./tailwind.config.js'),
      autoprefixer()
    ]))
    .pipe(app.gulp.dest(`${app.path.buildFolder}/css/`))
    .pipe(app.plugins.browsersync.stream())
};
