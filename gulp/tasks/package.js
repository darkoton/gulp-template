import fs from 'fs';
import path from 'path';

export const packageBuild = done => {
  const { paths, config } = app;

  const pkg = JSON.parse(
    fs.readFileSync(path.join(paths.root, 'package.json')),
  );

  const buildPackage = {
    private: true,
    scripts: {},
    devDependencies: {},
  };

  if (config.scripts.type === 'modules') {
    buildPackage.scripts['serve'] = 'vite';
    buildPackage.devDependencies['vite'] = '^7.0.0';
  }

  if (pkg.devDependencies['tailwindcss'] !== undefined) {
    buildPackage.scripts['build:css'] =
      'npx tailwindcss -i tailwind.input.css -o styles/tailwind.css --minify';
    buildPackage.devDependencies['tailwindcss'] = '3.4.17';
  }

  if (Object.keys(buildPackage.scripts).length > 0) {
    fs.writeFileSync(
      path.join(paths.build, 'package.json'),
      JSON.stringify(buildPackage, null, 2),
    );

    const readme = [
      '# Local Build — Vite',
      '',
      'This folder contains the compiled project files and can be launched locally for preview.',
      '',
      '## Quick Start',
      '',
      '```bash',
      'npm install',
      'npm run serve',
      '```',
      '',
      'After starting the server, Vite will display the local URL in the terminal.',
      '',
      '## Requirements',
      '',
      '- Node.js 20+',
      '- npm',
      '',
      '## Files',
      '',
      '| File | Purpose |',
      '| --- | --- |',
      '| `package.json` | Dependencies and local server script |',
      '| `README.md` | Instructions for running the build locally |',
      '',
    ].join('\n');
    fs.writeFileSync(path.join(paths.build, 'README.md'), readme);
  }

  done();
};
