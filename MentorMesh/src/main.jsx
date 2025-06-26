import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// we can import export defaul component with any name
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
);
