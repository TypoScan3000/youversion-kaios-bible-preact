/* eslint-disable sort-keys */
/* eslint-disable import/no-extraneous-dependencies */
import { appManifestPlugin } from '@kaios-bible/generators';
import preact from '@preact/preset-vite';
import legacy from '@vitejs/plugin-legacy';
import * as cheerio from 'cheerio';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import prettier from 'prettier';
import type { UserConfig } from 'vite';

import { appConfig } from './config';
import packageJson from './package.json';

// Plugin to modify HTML for KaiOS compatibility using cheerio
const kaiosHtmlPlugin = (buildOutputDir: string) => {
  return {
    name: 'kaios-html',
    async closeBundle() {
      try {
        const htmlPath = join(buildOutputDir, 'index.html');

        // Wait a bit for the build to complete
        await new Promise(resolve => setTimeout(resolve, 500));

        if (!existsSync(htmlPath)) {
          console.error(`HTML file not found: ${htmlPath}`);
          return;
        }

        let html = readFileSync(htmlPath, 'utf8');

        // Load HTML with cheerio
        const $ = cheerio.load(html);

        // Remove all type="module" attributes and the modern script
        $('script[type="module"]').remove();

        // Remove all crossorigin attributes
        $('[crossorigin]').removeAttr('crossorigin');

        // Remove all defer attributes
        $('[defer]').removeAttr('defer');

        // Remove all nomodule attributes
        $('[nomodule]').removeAttr('nomodule');

        // Find the two legacy scripts we want to keep BEFORE removing inline scripts
        const polyfillScript = $('script[id="vite-legacy-polyfill"]');
        const legacyEntryScript = $('script[id="vite-legacy-entry"]');

        let polyfillSrc = '';
        let legacyEntrySrc = '';

        if (polyfillScript.length && legacyEntryScript.length) {
          // Get the src attributes
          polyfillSrc = polyfillScript.attr('src') || '';
          legacyEntrySrc = legacyEntryScript.attr('data-src') || '';

          // Remove the old scripts
          polyfillScript.remove();
          legacyEntryScript.remove();
        }

        // Remove all inline scripts except the bundled config
        $('script').each((_index, element) => {
          const $script = $(element);
          const src = $script.attr('src');
          const content = $script.html();

          // Keep only the bundled config script
          if (!src && content && !content.includes('__BUNDLED_CONFIG__')) {
            $script.remove();
          }
        });

        // Add the two scripts back with proper attributes (no crossorigin, no nomodule, no inline code)
        if (polyfillSrc) {
          $('body').append(`<script src="${polyfillSrc}"></script>`);
        }
        if (legacyEntrySrc) {
          $('body').append(`<script src="${legacyEntrySrc}"></script>`);
        }

        // Format HTML with prettier using 2-space indentation
        const formattedHtml = await prettier.format($.html(), {
          parser: 'html',
          printWidth: 80,
          tabWidth: 2,
          useTabs: false,
          semi: true,
          singleQuote: false,
          trailingComma: 'none',
          insertFinalNewline: true,
        });

        writeFileSync(htmlPath, formattedHtml);
      } catch (error) {
        console.error('Error transforming HTML:', error);
      }
    },
  };
};

interface TargetConfig {
  buildOutputDir: string;
  target: 'kaios2' | 'kaios3' | 'jio';
  versionPrefix: string;
}

export const createKaiosConfig = (targetConfig: TargetConfig): UserConfig => {
  return {
    base: '', // Use empty base for hash routing
    publicDir: './public',
    resolve: {
      alias: {
        '@kaios-bible/core': join(__dirname, '..', '..', 'packages', 'kaios-core', 'src'),
        '@kaios-bible/generators': join(__dirname, '..', '..', 'packages', 'generators', 'src'),
        '@kaios-bible/types': join(__dirname, '..', '..', 'packages', 'types'),
      },
    },
    plugins: [
      preact(),
      legacy({
        targets: ['ie >= 11'],
      }),
      kaiosHtmlPlugin(targetConfig.buildOutputDir),
      appManifestPlugin({
        appConfig,
        target: targetConfig.target,
        version: packageJson.version.replace(/^0\./, targetConfig.versionPrefix),
      }),
    ],
    build: {
      cssTarget: 'firefox48',
      outDir: `./${targetConfig.buildOutputDir}`,
      emptyOutDir: true,
      minify: true,
      sourcemap: false,
    },
    css: {
      preprocessorOptions: {
        scss: {
          // You can add global SASS variables here if needed
        },
      },
    },
    server: {
      port: 3000,
      open: true,
      host: true,
    },
    // Include offline bibles
    assetsInclude: ['**/*.zip'],
  };
};
