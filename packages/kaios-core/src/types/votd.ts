import { type Brand } from './brand';

// Branded types for VOTD
export type USFM = Brand<string, 'USFM'>;
export type HumanRef = Brand<string, 'HumanRef'>;
export type Day = Brand<string, 'Day'>;

/**
 * Highly compressed VOTD year data.
 * @example
 * ```json
 * {
 *   "1": [
 *     {
 *       "1:1": "John 1:1"
 *     }
 *   ]
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Usage in a VOTD.tsx page
 * import { VOTDYear } from "./types/votd";
 * import votdData from "./2024_206_en.json";
 *
 * // Get today's day number (1-based)
 * const today = new Date();
 * const start = new Date(today.getFullYear(), 0, 0);
 * const diff = today.getTime() - start.getTime();
 * const oneDay = 1000 * 60 * 60 * 24;
 * const dayOfYear = Math.floor(diff / oneDay);
 *
 * // Get VOTD for today
 * const dayKey = dayOfYear.toString();
 * const todaysVotd = (votdData as VOTDYear)[dayKey];
 *
 * // Example render
 * export default function VOTDPage() {
 *   if (!todaysVotd) return <div>No VOTD for today</div>;
 *
 *   return (
 *     <div>
 *       {todaysVotd.map((reference) =>
 *         Object.entries(reference).map(([usfm, human]) => (
 *           <div key={usfm}>
 *             <b>{human}</b> ({usfm})
 *           </div>
 *         ))
 *       )}
 *     </div>
 *   );
 * }
 * ```
 */
export type VOTDYear = {
  [x: Day]: Array<Record<USFM, HumanRef>>;
};
