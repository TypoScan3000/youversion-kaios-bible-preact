import type { AppConfig } from '@kaios-bible/types';
import type { Plugin } from 'vite';

import { generateJioManifest } from './manifests/generate-manifest-jio.ts';
import { generateKaios2Manifest } from './manifests/generate-manifest-kaios2.ts';
import { generateKaios3Manifest } from './manifests/generate-manifest-kaios3.ts';

export interface Kaios2ManifestOptions {
  appConfig: AppConfig;
  target: 'kaios2' | 'jio' | 'kaios3';
  version: string;
}

export function appManifestPlugin(options: Kaios2ManifestOptions): Plugin {
  const { appConfig, target, version } = options;

  // Determine output path based on target if not provided
  let finalOutputPath: string;
  switch (target) {
    case 'kaios3':
      finalOutputPath = 'manifest.webmanifest';
      break;
    case 'jio':
    case 'kaios2':
      finalOutputPath = 'manifest.webapp';
      break;
    default:
      throw new Error(`Unsupported target: ${target}`);
  }

  return {
    apply: 'build',
    generateBundle() {
      let manifest: ReturnType<typeof generateKaios2Manifest> | ReturnType<typeof generateKaios3Manifest>;
      switch (target) {
        case 'kaios3':
          manifest = generateKaios3Manifest(appConfig, version);
          break;
        case 'jio':
          manifest = generateJioManifest(appConfig, version);
          break;
        case 'kaios2':
          manifest = generateKaios2Manifest(appConfig, version);
          break;
        default:
          throw new Error(`Unsupported target: ${target}`);
      }

      this.emitFile({
        fileName: finalOutputPath,
        source: JSON.stringify(manifest, null, 2),
        type: 'asset',
      });
    },
    name: 'app-manifest',
  };
}
