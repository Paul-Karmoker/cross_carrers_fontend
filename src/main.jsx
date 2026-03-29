import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { store } from './store.ts';
import App from './App.jsx';
import './index.css';

// SAFETY CHECK: Only access 'document' if we are in the browser
if (typeof window !== 'undefined') {
  const rootElement = document.getElementById('root');
  
  if (rootElement) {
    // Check if the server already provided some HTML (Prerendered)
    const isPrerendered = rootElement.hasChildNodes();

    const appContent = (
      <React.StrictMode>
        <Provider store={store}>
          <HelmetProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </HelmetProvider>
        </Provider>
      </React.StrictMode>
    );

    if (isPrerendered) {
      // Hydrate the existing HTML for better performance
      hydrateRoot(rootElement, appContent);
    } else {
      // Standard render for development
      createRoot(rootElement).render(appContent);
    }

    // Optional: Tell the prerenderer the page is ready
    // This matches the 'renderAfterDocumentEvent' if you use it in vite.config
    document.dispatchEvent(new Event('x-render-complete'));
  }
}

/**
 * THIS IS FOR PRERENDERING:
 * This function is exported so the build tool can "see" your App
 * and turn it into static HTML files.
 */
export const prerender = () => (
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);