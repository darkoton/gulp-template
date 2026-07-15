export const server = () => {
  app.plugins.browsersync.init({
    server: {
      baseDir: `${app.paths.build}`,
    },
    notify: false,
    port: app.config.server.port,
    open: app.config.server.open ?? true,
    cors: true,
    // logLevel: 'silent',
  });
};
