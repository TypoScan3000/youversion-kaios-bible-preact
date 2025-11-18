import { unzip } from 'fflate';

import type { BibleVersionResponse } from '../../types/bible/version';
import { addToCache, getFromCache, hasCache } from '../cache/cache';
import { getOfflineBiblePath } from '../fetcher';

export default async function getVersion(version: number): Promise<BibleVersionResponse> {
  const versionCacheKey = `version_${version}`;
  const versionFileName = '_version.json';

  // Check cache first
  if (hasCache(versionCacheKey)) {
    return getFromCache<BibleVersionResponse>(versionCacheKey)!;
  }

  try {
    const offlinePath = getOfflineBiblePath(version);
    const response = await fetch(offlinePath);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const zipBuffer = await response.arrayBuffer();

    return new Promise<BibleVersionResponse>((resolve, reject) => {
      unzip(
        new Uint8Array(zipBuffer),
        {
          filter: file => file.name === versionFileName,
        },
        (err, files) => {
          if (err) {
            reject(err);
            return;
          }

          const file = files[versionFileName];
          if (!file) {
            reject(new Error(`Version ${version} not found`));
            return;
          }

          try {
            const text = new TextDecoder().decode(file);
            const parsed = JSON.parse(text) as BibleVersionResponse;

            // Cache the result
            addToCache(versionCacheKey, parsed);

            resolve(parsed);
          } catch (parseError) {
            reject(new Error(`Failed to parse version data: ${parseError}`));
          }
        }
      );
    });
  } catch (error) {
    console.error('Error loading version:', error);
    throw error;
  }
}
