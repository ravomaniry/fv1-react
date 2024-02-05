import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './ui/theme';
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './di/appContext/index.tsx';
import { Provider } from 'react-redux';
import store from './di/redux/index.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AppContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AppContextProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);
