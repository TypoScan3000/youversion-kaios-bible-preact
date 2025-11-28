import reactConfig from '@youversion/eslint-config-typescript/react';
import { defineConfig } from "eslint/config";

export default defineConfig([
  ...reactConfig,
  {
    settings: {
      // From Preact eslint config, so the React plugins work.
      react: {
        pragma: 'h',
        version: '16.0',
      },
    },
  }
]);
