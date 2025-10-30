import tailwindModule from './packages/tailwind/tasks/module.js';
import { tailwindHTML_CDN, tailwindJS_CDN } from './packages/tailwind/tasks/cdn.js';

export default {
  packages: {
    tailwind: {
      enable: false,
      config: {
        type: 'module', // 'cdn' || 'module'
      },
      tasks: {
        cdn: {
          html: tailwindHTML_CDN,
          style: null,
          js: tailwindJS_CDN,
        },
        module: {
          html: tailwindModule,
          style: tailwindModule,
          js: tailwindModule,
        },
      },
    },
  },
  gulp: {
    images: {
      mode: 'all', // 'all' || 'webp' || 'avif'  - Image optimization configuration
    },
  },
};
