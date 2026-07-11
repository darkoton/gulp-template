import svgSprite from 'gulp-svg-sprite';

export const sprite = () => {
  const { gulp, paths, plugins, config } = app;

  if (!config.sprites.enabled) {
    return Promise.resolve();
  }

  const spritesDir = paths.srcSprites.split('/').pop();

  const spriteConfig = {
    mode: {
      symbol: {
        sprite: `../${spritesDir}/${config.sprites.fileName}`,
      },
    },
    shape: {
      transform: [
        {
          svgo: {
            plugins: [
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    removeViewBox: false,
                  },
                },
              },
              { name: 'removeXMLNS' },
              {
                name: 'cleanupIDs',
                params: {
                  remove: false,
                  minify: true,
                },
              },
            ],
          },
        },
      ],
    },
  };

  return gulp
    .src(paths.globs.sprites)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'SVG Sprite',
          message: 'Error: <%= error.message %>',
        }),
      ),
    )
    .pipe(svgSprite(spriteConfig))
    .pipe(gulp.dest(paths.buildAssets))
    .pipe(plugins.browsersync.stream());
};
