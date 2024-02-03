import { PropsWithChildren } from 'react';
import { AppContext, Context } from '../di/appContext/context';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../ui/theme';
import { Provider } from 'react-redux';
import store from '../di/redux';

export default function TestAppProvider({ value, children }: PropsWithChildren<{ value: Partial<AppContext> }>) {
  return (
    <Context.Provider value={value as AppContext}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <MemoryRouter>{children}</MemoryRouter>
        </Provider>
      </ThemeProvider>
    </Context.Provider>
  );
}
