import React from 'react';
import ReactDOM from 'react-dom/client';

import { ToastContainer } from 'react-toastify';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <ToastContainer />
    <App />
  </React.StrictMode>
);

