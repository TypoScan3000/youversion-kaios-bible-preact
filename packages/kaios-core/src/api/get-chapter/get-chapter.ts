import { unzip } from 'fflate';

import type { BibleChapterResponse } from '../../types/bible/chapter';
import { addToCache, getFromCache, hasCache } from '../cache/cache';
import { getOfflineBiblePath } from '../fetcher';

export default async function getChapter(usfm = 'JHN.1', version: number): Promise<BibleChapterResponse> {
  const cacheKey = `chapter_${version}_${usfm}`;

  // Check cache first
  if (hasCache(cacheKey)) {
    console.log('Using cached chapter data for:', usfm);
    return getFromCache<BibleChapterResponse>(cacheKey)!;
  }

  const zipFileName = `${usfm}.json`;

  try {
    const response = await fetch(getOfflineBiblePath(version));

    // Check if response is ok before processing
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const zipBuffer = await response.arrayBuffer();

    return new Promise<BibleChapterResponse>((resolve, reject) => {
      unzip(
        new Uint8Array(zipBuffer),
        {
          filter: file => file.name === zipFileName,
        },
        (err, files) => {
          if (err) {
            reject(err);
            return;
          }

          const file = files[zipFileName];
          if (!file) {
            reject(new Error(`Chapter ${usfm} not found`));
            return;
          }

          try {
            const text = new TextDecoder().decode(file);
            const parsed = JSON.parse(text) as BibleChapterResponse;

            // Cache the result
            addToCache(cacheKey, parsed);
            console.log('Cached chapter data for:', usfm);

            resolve(parsed);
          } catch (parseError) {
            reject(new Error(`Failed to parse chapter data: ${parseError}`));
          }
        }
      );
    });
  } catch (error) {
    console.error('Error loading chapter:', error);
    throw error;
  }
}
