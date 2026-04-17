//Minification
import htmlmin from 'gulp-htmlmin';
import cssmin from 'gulp-cssmin';
import jsmin from 'gulp-jsmin';
import { optimizeImage } from '../plugins/sharp.js';

export const minHTML = () => {
  return app.gulp
    .src(app.paths.globs.htmlBuild)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(app.gulp.dest(app.paths.build));
};

export const minCSS = () => {
  return app.gulp
    .src(app.paths.globs.stylesBuild)
    .pipe(cssmin())
    .pipe(app.gulp.dest(app.paths.buildStyles));
};

export const minJS = () => {
  return app.gulp
    .src(app.paths.globs.scripts)
    .pipe(jsmin())
    .pipe(app.gulp.dest(app.paths.buildScripts));
};

export const minImg = async () => {
  return app.gulp
    .src(app.paths.globs.images)
    .pipe(optimizeImage())
    .pipe(app.gulp.dest(app.paths.buildImages));
};
