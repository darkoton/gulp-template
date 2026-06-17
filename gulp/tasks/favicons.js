import gulp from 'gulp';
import faviconsGenerate from 'gulp-favicons';
import { deleteAsync } from 'del';
import gulpIf from 'gulp-if';
import header from 'gulp-header';

const faviconsHTML = async () => {
  const htmlPath = `${app.paths.buildFavicons}/favicons.html`;

  await new Promise((resolve, reject) => {
    app.gulp
      .src(htmlPath)
      .pipe(
        gulpIf(
          app.config.env.isProd,
          header('<link rel="icon" href="./assets/favicons/favicon.ico">'),
        ),
      )
      .pipe(app.gulp.dest(app.paths.srcHtmlComponents))
      .on('end', resolve)
      .on('error', reject);
  });

  await deleteAsync(htmlPath);
};

export const faviconsImage = () => {
  return app.gulp
    .src(app.paths.globs.favicons)
    .pipe(
      faviconsGenerate({
        ...(app.config.favicons
          ? app.config.favicons
          : {
              appName: 'My App',
              appShortName: 'App',
              appDescription: 'This is my application',
              developerName: 'Artem Rachuk',
              developerURL: 'https://github.com/darkoton',
              background: '#fff',
            }),
        path: '/assets/favicons',
        url: process.env.SITE_URL,
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: './',
        version: 1.0,
        html: `./favicons.html`,
        pipeHTML: true,
        icons: {
          android: app.config.env.isProd,
          appleIcon: app.config.env.isProd,
          appleStartup: false,
          coast: false,
          favicons: true,
          windows: false,
          yandex: false,
        },
      }),
    )
    .pipe(app.gulp.dest(app.paths.buildFavicons));
};

export const favicons = gulp.series(faviconsImage, faviconsHTML);
