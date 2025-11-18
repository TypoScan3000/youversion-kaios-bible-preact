export function getOfflineBiblePath(version: number | string): string {
  // Use different paths for dev vs production
  const isDev = import.meta.env.DEV;
  const basePath = isDev ? '/' : './';
  return `${basePath}offline/${version}.zip`;
}
