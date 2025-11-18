import './sass/main.scss';

import type { AppConfig } from '@kaios-bible/types';
import { render } from 'preact';

import { App } from './app';

export interface InitAppOptions {
  config: AppConfig;
  elementId?: string;
}

export function initApp(options: InitAppOptions) {
  const { config, elementId = 'app' } = options;

  // Ensure DOM is ready before Preact renders
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => renderApp(elementId, config));
  } else {
    renderApp(elementId, config);
  }
}

function renderApp(elementId: string, config: AppConfig) {
  try {
    const appElement = document.getElementById(elementId);
    if (appElement) {
      render(<App config={config} />, appElement);
    } else {
      throw new Error(`App element with id "${elementId}" not found`);
    }
  } catch (error) {
    console.error('Error during app initialization:', error);
    // Visual error display for debugging
    document.body.innerHTML = `<div style="color:red; padding: 20px;">
      Error: ${error instanceof Error ? error.message : 'Unknown error'}
    </div>`;
  }
}

// Export the App component and types for direct use if needed
export { App };
export type { AppConfig };
