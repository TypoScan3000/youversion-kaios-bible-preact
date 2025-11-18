/**
 * Parses a USFM string into its components.
 * @param usfm - The USFM string (e.g., "JHN.3.16").
 * @returns Object with parsed components.
 * @example
 * ```typescript
 * const parsed = parseUsfm("JHN.3.16");
 * // Returns: { book: "JHN", chapter: "3", verse: "16", bookChapter: "JHN.3" }
 * ```
 */
export function parseUsfm(usfm: string) {
  const parts = usfm.split('.');
  return {
    book: parts[0],
    bookChapter: `${parts[0]}.${parts[1]}`,
    chapter: parts[1],
    verse: parts[2],
  };
}
