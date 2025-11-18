import { defineConfig } from 'vite';

import { createKaiosConfig } from './vite.config.shared';

export default defineConfig(
  createKaiosConfig({
    buildOutputDir: 'dist/jio',
    target: 'jio',
    versionPrefix: '2.', // TODO: Change to JIO version, depending on how they do versioning
  })
);
