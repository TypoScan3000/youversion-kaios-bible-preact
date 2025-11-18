import { defineConfig } from 'vite';

import { createKaiosConfig } from './vite.config.shared';

export default defineConfig(
  createKaiosConfig({
    buildOutputDir: 'dist/kaios2',
    target: 'kaios2',
    versionPrefix: '2.',
  })
);
