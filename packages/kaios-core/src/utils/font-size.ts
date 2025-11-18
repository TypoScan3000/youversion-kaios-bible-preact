// Global font size cache
let globalFontSize = 16; // Default to Medium

/**
 * Get the current global font size.
 *
 * @returns The current font size in pixels.
 *
 * @example
 * ```typescript
 * const currentSize = getGlobalFontSize(); // Returns 16
 * ```
 */
export function getGlobalFontSize(): number {
  return globalFontSize;
}

/**
 * Set the global font size.
 *
 * @param size - The font size in pixels to set globally.
 *
 * @example
 * ```typescript
 * setGlobalFontSize(20); // Sets font size to 20px
 * ```
 */
export function setGlobalFontSize(size: number): void {
  globalFontSize = size;
}

/**
 * Apply the global font size to a DOM element and all its children.
 *
 * @param element - The HTML element to apply font size to.
 *
 * @example
 * ```typescript
 * const bibleText = document.getElementById('bibleText');
 * if (bibleText) {
 *   applyGlobalFontSize(bibleText);
 * }
 * ```
 */
export function applyGlobalFontSize(element: HTMLElement): void {
  const fontSize = getGlobalFontSize();
  element.style.fontSize = `${fontSize}px`;

  // Apply font size to all child elements
  const allElements = element.querySelectorAll('*');
  allElements.forEach(childElement => {
    (childElement as HTMLElement).style.fontSize = `${fontSize}px`;
  });
}
