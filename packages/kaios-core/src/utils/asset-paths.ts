/**
 * Get the correct asset path based on build target and environment.
 *
 * @param filename - The filename of the asset.
 * @returns The correct path for the asset.
 *
 * @example
 * ```typescript
 * const iconPath = getAssetPath('bible.png');
 * const imagePath = getAssetPath('background.jpg');
 * ```
 */
export function getAssetPath(filename: string): string {
  // Resources are now directly in the built app's resources folder
  return `resources/${filename}`;
}

/**
 * Get the correct icon path based on build target and environment.
 *
 * @param iconName - The name of the icon file.
 * @returns The correct path for the icon.
 *
 * @example
 * ```typescript
 * const bibleIcon = getIconPath('bible.png');
 * ```
 */
export function getIconPath(iconName: string): string {
  return getAssetPath(iconName);
}

/**
 * Get the correct image path based on build target and environment.
 *
 * @param imageName - The name of the image file.
 * @returns The correct path for the image.
 *
 * @example
 * ```typescript
 * const backgroundImage = getImagePath('background.jpg');
 * ```
 */
export function getImagePath(imageName: string): string {
  return getAssetPath(imageName);
}
