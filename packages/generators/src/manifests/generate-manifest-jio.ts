/* eslint-disable sort-keys */
import type { AppConfig } from '@kaios-bible/types';

// Version should come from the package.json file
/**
 * NOTE: Jio version is a work in progress.
 * This manifest has not been checked against Jio's requirements.
 */
export function generateJioManifest(appConfig: AppConfig, version: string) {
  const manifest = {
    version,
    name: appConfig.name,
    description: appConfig.description,
    type: 'privileged',
    launch_path: '/index.html',
    origin: `app://${appConfig.id}`,
    permissions: {
      systemXHR: {
        description: 'Required to download and read offline Bibles.',
      },
    },
    content_security_policy:
      "default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; frame-src *; style-src * 'unsafe-inline';",
    icons: {
      '56': 'icons/icon_56.png',
      '112': 'icons/icon_112.png',
    },
    developer: {
      name: appConfig.developer.name,
      url: appConfig.developer.url,
    },
    locales: {
      [appConfig.language]: {
        name: appConfig.name,
        subtitle: appConfig.subtitle,
        description: appConfig.description,
      },
    },
    default_locale: appConfig.language,
  };

  return manifest;
}
