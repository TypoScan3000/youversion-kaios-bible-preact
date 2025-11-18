import type { BibleChapterResponse } from '../../types/bible/chapter';
import type { BibleVersionResponse } from '../../types/bible/version';

// Simple in-memory cache for frequently accessed chapters and versions
const chapterCache = new Map<string, BibleChapterResponse | BibleVersionResponse>();
const CACHE_SIZE_LIMIT = 20; // Increased limit for version + chapter caching

// Cache management
export function addToCache(key: string, data: BibleChapterResponse | BibleVersionResponse) {
  if (chapterCache.size >= CACHE_SIZE_LIMIT) {
    // Remove oldest entry (first key)
    const firstKey = chapterCache.keys().next().value;
    if (firstKey) {
      chapterCache.delete(firstKey);
    }
  }
  chapterCache.set(key, data);
}

export function getFromCache<T>(key: string): T | undefined {
  return chapterCache.get(key) as T | undefined;
}

export function hasCache(key: string): boolean {
  return chapterCache.has(key);
}

// Utility function to clear cache if memory gets tight
export function clearCache(): void {
  chapterCache.clear();
}

// Get cache stats for debugging
export function getCacheStats(): { keys: Array<string>; size: number } {
  return {
    keys: Array.from(chapterCache.keys()),
    size: chapterCache.size,
  };
}
