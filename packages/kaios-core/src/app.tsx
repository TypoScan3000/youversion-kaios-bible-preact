import type { AppConfig } from '@kaios-bible/types';

import { ActionHandlerProvider } from './contexts/ActionHandlerContext';
import { ConfigProvider } from './contexts/ConfigContext';
import { Router } from './routes/Router';
import { Routes } from './routes/Routes';

interface AppProps {
  config: AppConfig;
}

export function App({ config }: AppProps) {
  return (
    <ConfigProvider config={config}>
      <ActionHandlerProvider>
        <Router>
          <Routes />
        </Router>
      </ActionHandlerProvider>
    </ConfigProvider>
  );
}
