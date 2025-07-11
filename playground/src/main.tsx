import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.js';

import '@fontsource-variable/open-sans/wght.css';
import '@fontsource-variable/open-sans/wght-italic.css';
import '@cimpress-ui/react/styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
