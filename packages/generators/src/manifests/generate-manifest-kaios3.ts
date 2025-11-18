/* eslint-disable sort-keys */
import type { AppConfig } from '@kaios-bible/types';

// Version should come from the package.json file
export function generateKaios3Manifest(appConfig: AppConfig, version: string) {
  const manifest = {
    name: appConfig.name,
    short_name: `${appConfig.name.split(' ').pop()}`,
    description: appConfig.description,
    version,
    lang: appConfig.language,
    id: appConfig.id,
    origin: appConfig.id,
    start_url: '/index.html',
    theme_color: appConfig.colors?.theme ?? '#551B1D',
    background_color: appConfig.colors?.background ?? '#551B1D',
    orientation: 'portrait',
    display: 'standalone',
    dir: appConfig.textDirection ?? 'ltr',
    scope: '/',
    categories: ['books', 'lifestyle', 'education'],
    icons: [
      {
        src: 'icons/icon_56.png',
        type: 'image/png',
        sizes: '56x56',
      },
      {
        src: 'icons/icon_112.png',
        type: 'image/png',
        sizes: '112x112',
      },
    ],
    developer: {
      name: appConfig.developer.name,
      url: appConfig.developer.url,
    },
    subtitle: appConfig.subtitle,
    b2g_features: {
      version,
      subtitle: appConfig.subtitle,
      origin: appConfig.id.toLowerCase(),
      type: 'privileged',
      developer: {
        name: appConfig.developer.name,
        url: appConfig.developer.url,
      },
      permissions: {
        systemXHR: {
          description: 'Required to download and read offline Bibles.',
        },
      },
      focus_color: appConfig.colors?.focus ?? '#551B1D',
    },
  };

  return manifest;
}
