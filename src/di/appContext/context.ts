import { createContext } from 'react';
import { ApiClient } from '../../services/api';
import { AuthService } from '../../services/api/authService';

export interface AppContext {
  apiClient: ApiClient;
  authService: AuthService;
}

export const Context = createContext<AppContext>(null!);
