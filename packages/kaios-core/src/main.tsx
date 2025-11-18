import './sass/main.scss';

import { initApp } from './index';
import { baseConfig } from './utils/base-config';

// Initialize the app with base config for development
initApp({ config: baseConfig });
