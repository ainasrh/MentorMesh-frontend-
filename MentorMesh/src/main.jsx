import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// we can import export defaul component with any name
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <Provider store={store}>
      <App />
      </Provider>
    </StrictMode>
  </BrowserRouter>
);
