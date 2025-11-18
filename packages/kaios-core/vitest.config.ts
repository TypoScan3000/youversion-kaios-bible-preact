import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      instances: [
        {
          browser: 'firefox',
          headless: true,
          name: 'firefox',
        },
      ],
      provider: 'playwright',
    },
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
});
