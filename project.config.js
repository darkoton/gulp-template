const isDev = process.env.NODE_ENV !== 'production';
const isProd = process.env.NODE_ENV === 'production';

export const projectConfig = {
  // ─────────────────────────────────────────────────────────
  // Environment
  // ─────────────────────────────────────────────────────────
  env: {
    isDev,
    isProd,
  },
  // ─────────────────────────────────────────────────────────
  // Images
  // ─────────────────────────────────────────────────────────
  images: {
    webp: {
      enabled: true,
      quality: 80,
    },
    avif: {
      enabled: false,
      quality: 80,
    },
    jpeg: {
      quality: 80,
      progressive: true,
    },
    png: {
      compressionLevel: 9,
    },
  },

  // ─────────────────────────────────────────────────────────
  // Scripts
  // ─────────────────────────────────────────────────────────
  scripts: {
    type: 'modules', // 'modules' or 'scripts'
  },

  // ─────────────────────────────────────────────────────────
  // Favicon
  // ─────────────────────────────────────────────────────────
  favicons: {
    appName: 'Gulp Template',
    appShortName: 'Template',
    appDescription: 'This is my gulp template',
    developerName: 'Artem Rachuk',
    developerURL: 'https://github.com/darkoton/gulp-template',
    background: '#000',
  },
};
