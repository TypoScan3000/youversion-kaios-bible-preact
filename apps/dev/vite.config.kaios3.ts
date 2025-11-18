import { defineConfig } from 'vite';

import { createKaiosConfig } from './vite.config.shared';

export default defineConfig(
  createKaiosConfig({
    buildOutputDir: 'dist/kaios3',
    target: 'kaios3',
    versionPrefix: '3.',
  })
);
