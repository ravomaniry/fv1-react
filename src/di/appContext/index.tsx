import { PropsWithChildren, useMemo } from 'react';
import { createApiClient } from '../../services/api';
import { AuthService } from '../../services/api/authService';
import { config } from '../../config';
import { createAuthClient } from '../../services/api/authClient';
import { AppContext, Context } from './context';
import { StorageService } from '../../services/storage';

export function AppContextProvider({ children }: PropsWithChildren<unknown>) {
  const value = useMemo<AppContext>(() => {
    const storageService = new StorageService();
    const authService = new AuthService(storageService, createAuthClient(config.apiBaseURL));
    const apiClient = createApiClient(authService, config.apiBaseURL);
    return {
      apiClient,
      authService,
    };
  }, []);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
