import { PropsWithChildren } from 'react';
import { Context } from '../di/services/context';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../ui/theme';
import { Provider } from 'react-redux';
import store from '../di/redux';
import '../index.css';
import { Services } from '../di/services/context';
import { AppContextProvider } from '../di/appContext';
import { StorageService } from '../services/storage';

export default function TestAppProvider({ override, children }: PropsWithChildren<{ override: Partial<Services> }>) {
  return (
    <Context.Provider value={{ storage: new StorageService(), ...override }}>
      <AppContextProvider>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <MemoryRouter>{children}</MemoryRouter>
          </Provider>
        </ThemeProvider>
      </AppContextProvider>
    </Context.Provider>
  );
}
