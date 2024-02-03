import { PropsWithChildren, useMemo } from 'react';
import { createApiClient } from '../../services/api';
import { AuthService } from '../../services/api/authService';
import { config } from '../../config';
import { createAuthClient } from '../../services/api/authClient';
import { AppContext, Context } from './context';
import { useServices } from '../services/useProviders';

export function AppContextProvider({ children }: PropsWithChildren<unknown>) {
  const { storage: storageService } = useServices();
  const value = useMemo<AppContext>(() => {
    const authService = new AuthService(storageService, createAuthClient(config.apiBaseURL));
    const apiClient = createApiClient(authService, config.apiBaseURL);
    return {
      apiClient,
      authService,
    };
  }, [storageService]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
