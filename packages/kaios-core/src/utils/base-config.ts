import type { AppConfig } from '@kaios-bible/types';

/** This base config is only used for development. Each app bundle will need to have its own config. */
export const baseConfig: AppConfig = {
  description: 'KaiOS Bible App - Development',
  developer: {
    name: 'INSERT NAME HERE',
    url: 'https://your-website.example.com',
  },
  id: 'kaios-bible-dev',
  language: 'en-US',
  name: 'KaiOS Bible',
  offlineBibleVersion: 206,
  offlineVotdFile: '2025_206.json',
  subtitle: 'Development Version',
};
