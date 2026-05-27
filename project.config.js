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
};
