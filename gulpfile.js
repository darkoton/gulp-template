import gulp from "gulp"
import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";


global.app = {
  gulp: gulp,
  path: path,
  plugins: plugins
}

import { copy } from "./gulp/tasks/copy.js"
import { reset } from "./gulp/tasks/reset.js"
import { html } from "./gulp/tasks/html.js"
import { scss } from "./gulp/tasks/scss.js"
import { js } from "./gulp/tasks/js.js"
import { images } from "./gulp/tasks/images.js"
import { server } from "./gulp/tasks/server.js"
import { minHTML, minCSS, minJS } from "./gulp/tasks/minify.js";


function watcher() {
  gulp.watch(`${path.srcFolder}/assets/`, copy);
  gulp.watch(`${path.srcFolder}/html/**/*.html`, html);
  gulp.watch(`${path.srcFolder}/scss/**/*.scss`, scss);
  gulp.watch(`${path.srcFolder}/js/**/*.js`, js);
  gulp.watch(`${path.srcFolder}/img/**/*.{png,jpeg,jpg,gif,webp,svg}`, images);
}

const mainTasks = gulp.parallel(copy, html, scss, js, images)

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server))

const build = gulp.series(reset, mainTasks, gulp.parallel(minHTML, minCSS, minJS))

gulp.task("dev", dev)

gulp.task("build", build)
