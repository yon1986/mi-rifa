import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // IMPORTACIÓN OBLIGATORIA PARA TAILWIND

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
