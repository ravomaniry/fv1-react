import { PropsWithChildren, useMemo } from 'react';
import { Context, Services } from './context';
import { StorageService } from '../../services/storage';

export default function ServicesProvider({ children }: PropsWithChildren) {
  const value = useMemo<Services>(
    () => ({
      storage: new StorageService(),
    }),
    [],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
