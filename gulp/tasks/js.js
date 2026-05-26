import { config } from '../configs/config.js';
import gulpEsbuild from 'gulp-esbuild';
import gulpif from 'gulp-if';

export const js = () => {
  return app.gulp
    .src(
      config.scripts.type === 'modules'
        ? app.paths.globs.scripts
        : app.paths.globs.scriptsGlob,
    )
    .pipe(
      gulpif(
        config.scripts.type === 'scripts',
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
    .pipe(app.gulp.dest(app.paths.buildScripts))
    .pipe(app.plugins.browsersync.stream());
};
