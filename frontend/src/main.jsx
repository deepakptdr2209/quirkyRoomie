import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux"; // Import Provider

import './index.css'
import App from './App.jsx'
import store from './reduxStore/AppStore.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)


