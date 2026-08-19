import htmlmin from 'gulp-htmlmin';
import cssmin from 'gulp-cssmin';
import jsmin from 'gulp-jsmin';
import { optimizeImage } from '../plugins/sharp.js';
import gulpIf from 'gulp-if';

export const minHTML = () => {
  return app.gulp
    .src(app.paths.globs.htmlBuild)
    .pipe(
      gulpIf(
        app.config.optimization.minify.html,
        htmlmin({ collapseWhitespace: true }),
      ),
    )
    .pipe(app.gulp.dest(app.paths.build));
};

export const minCSS = () => {
  return app.gulp
    .src(app.paths.globs.stylesBuild)
    .pipe(gulpIf(app.config.optimization.minify.css, cssmin()))
    .pipe(app.gulp.dest(app.paths.buildStyles));
};

export const minJS = () => {
  return app.gulp
    .src(app.paths.globs.scriptsBuild)
    .pipe(gulpIf(app.config.optimization.minify.js, jsmin()))
    .pipe(app.gulp.dest(app.paths.buildScripts));
};

export const minImg = async () => {
  return app.gulp
    .src(app.paths.globs.imagesBuild)
    .pipe(gulpIf(app.config.optimization.minify.images, optimizeImage()))
    .pipe(app.gulp.dest(app.paths.buildImages));
};
