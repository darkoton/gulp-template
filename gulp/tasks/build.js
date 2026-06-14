import gulpif from 'gulp-if';

//CSS
import ImagesCSS from 'gulp-web-images-css'; // WebP image output
import autoPrefixer from 'gulp-autoprefixer'; // Adding vendor prefixes

const imagesMode = () => {
  if (app.config.images.webp.enabled && app.config.images.avif.enabled)
    return 'all';
  if (app.config.images.webp.enabled) return 'webp';
  if (app.config.images.avif.enabled) return 'avif';
  return null;
};

export const buildCSS = () => {
  return app.gulp
    .src(app.paths.globs.stylesBuild)
    .pipe(
      gulpif(
        imagesMode(),
        ImagesCSS({
          mode: imagesMode(),
        }),
      ),
    )
    .pipe(
      autoPrefixer({
        grid: true,
        overrideBrowserslist: ['last 3 versions'],
        cascade: true,
      }),
    )
    .pipe(app.gulp.dest(app.paths.buildStyles));
};

//JS
import gulpEsbuild from 'gulp-esbuild';

export const buildJS = () => {
  return app.gulp
    .src(
      app.config.scripts.type === 'modules'
        ? app.paths.globs.scripts
        : app.paths.globs.scriptsGlob,
    )
    .pipe(
      gulpif(
        app.config.scripts.type === 'scripts',
        gulpEsbuild({
          bundle: true,
          format: 'iife',
          minify: false,
          target: 'es2020',
          sourcemap: false,
          charset: 'utf8',
        }),
      ),
    )
    .pipe(app.gulp.dest(app.paths.buildScripts));
};

//HTML
import replace from 'gulp-replace';

export const buildHTML = () => {
  return app.gulp
    .src(app.paths.globs.htmlBuild)
    .pipe(
      gulpif(
        app.config.scripts.type === 'scripts',
        replace(/type="module"/g, ''),
      ),
    )
    .pipe(app.gulp.dest(app.paths.buildHtml));
};
