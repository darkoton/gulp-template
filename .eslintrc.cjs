const globals = require('globals');

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },

  extends: ['eslint:recommended', 'plugin:prettier/recommended'],

  overrides: [
    {
      files: ['gulp/**/*.js'],

      env: {
        node: true,
      },

      parserOptions: {
        sourceType: 'module',
      },

      languageOptions: {
        globals: globals.node,
      },
    },
  ],

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  rules: {
    'no-var': 'error',

    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
