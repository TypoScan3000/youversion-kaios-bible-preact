import type { AppConfig } from '@kaios-bible/types';
import { createContext } from 'preact';
import { useContext } from 'preact/hooks';

const ConfigContext = createContext<AppConfig | null>(null);

export function ConfigProvider({ children, config }: { children: preact.ComponentChildren; config: AppConfig }) {
  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
}

export function useConfig(): AppConfig {
  const config = useContext(ConfigContext);
  if (!config) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return config;
}
