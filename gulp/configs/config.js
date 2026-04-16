import tailwindModule from './packages/tailwind/tasks/module.js';
import {
  tailwindHTML_CDN,
  tailwindJS_CDN,
} from './packages/tailwind/tasks/cdn.js';

import { projectConfig } from '../../project.config.js';

const validateConfig = cfg => {
  const validated = structuredClone(cfg);

  return validated;
};

export const config = validateConfig(projectConfig);

// export default {
//   packages: {
//     tailwind: {
//       enable: false,
//       config: {
//         type: 'module', // 'cdn' || 'module'
//       },
//       tasks: {
//         cdn: {
//           html: tailwindHTML_CDN,
//           style: null,
//           js: tailwindJS_CDN,
//         },
//         module: {
//           html: null,
//           style: tailwindModule,
//           js: null,
//         },
//       },
//     },
//   },
//   gulp: {
//     images: {
//       mode: 'all', // 'all' || 'webp' || 'avif'  - Image optimization configuration
//     },
//   },
// };
