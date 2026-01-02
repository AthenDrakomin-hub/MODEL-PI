
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Global shim for process.env to prevent ReferenceErrors in libraries like recharts
// We use a safe assignment to ensure we don't overwrite if it already exists
(window as any).process = (window as any).process || { env: { NODE_ENV: 'production' } };

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
