// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import StoreContext from "./Store/store.jsx";
import { ThemeProvider } from "./context/ThemeContext"; // Update this import

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider>
    <StoreContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreContext>
  </ThemeProvider>
);