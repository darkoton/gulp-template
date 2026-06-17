
import { projectConfig } from '../../project.config.js';

const validateConfig = cfg => {
  const validated = structuredClone(cfg);

  return validated;
};

export const config = validateConfig(projectConfig);
