import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
import { store } from './store.js';
import App from './App.jsx';
import ErrorFallback from './ErrorFallback.jsx';
import './index.css';

// Initialize root
const root = createRoot(document.getElementById('root'));

// Render application
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.reload()}
      >
        <BrowserRouter>
          <HelmetProvider>
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 5000,
                style: {
                  background: '#fff',
                  color: '#1a1a1a',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  padding: '12px 20px',
                  borderRadius: '8px',
                },
                success: {
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
            <App />
          </HelmetProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
);