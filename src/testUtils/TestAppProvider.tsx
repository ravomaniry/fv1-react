import { PropsWithChildren } from 'react';
import { AppContext, Context } from '../di/appContext/context';
import { MemoryRouter } from 'react-router-dom';

export default function TestAppProvider({ value, children }: PropsWithChildren<{ value: Partial<AppContext> }>) {
  return (
    <Context.Provider value={value as AppContext}>
      <MemoryRouter>{children}</MemoryRouter>
    </Context.Provider>
  );
}
