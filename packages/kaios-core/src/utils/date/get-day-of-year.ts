/**
 * Gets the day of year (1-366) from a given date.
 * @param date - The date to calculate day of year for (defaults to current date).
 * @returns The day of year as a number (1-366).
 * @example
 * ```typescript
 * // Get current day of year
 * const today = getDayOfYear(); // e.g., 45
 *
 * // Get day of year for specific date
 * const christmas = getDayOfYear(new Date(2025, 11, 25)); // 359
 *
 * // Leap year handling
 * const leapYearDate = getDayOfYear(new Date(2024, 1, 29)); // 60
 * ```
 */
export function getDayOfYear(date: Date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}
