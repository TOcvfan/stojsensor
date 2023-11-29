import React from 'react';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StyledEngineProvider } from '@mui/material/styles';
import App from './components/App';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StyledEngineProvider injectFirst>
    <StrictMode>
      <App />
    </StrictMode>
  </StyledEngineProvider>
);