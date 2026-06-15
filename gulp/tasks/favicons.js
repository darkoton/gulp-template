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
          header('<link rel="icon" href="./favicons/favicon.ico">'),
        ),
      )
      .pipe(app.gulp.dest(app.paths.srcHtmlComponents))
      .on('end', resolve)
      .on('error', reject);
  });

  await deleteAsync(htmlPath);
};

export const faviconsDevImage = () => {
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
        path: '/favicons',
        url: process.env.SITE_URL,
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: './',
        version: 1.0,
        html: `./favicons.html`,
        pipeHTML: true,
        icons: {
          android: false,
          appleIcon: false,
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

export const faviconsBuildImage = () => {
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
        path: '../favicons',
        url: process.env.SITE_URL,
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: './',
        version: 1.0,
        html: `./favicons.html`,
        pipeHTML: true,
        icons: {
          android: true,
          appleIcon: true,
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

export const faviconsDev = gulp.series(faviconsDevImage, faviconsHTML);
export const faviconsBuild = gulp.series(faviconsBuildImage, faviconsHTML);
