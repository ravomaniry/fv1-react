import { createContext } from 'react';
import { AppTexts } from '../../models/texts';
import { ApiClient } from '../../services/api';
import { AuthService } from '../../services/api/authService';

export interface AppContext {
  texts: AppTexts;
  apiClient: ApiClient;
  authService: AuthService;
}

export const Context = createContext<AppContext>(null!);
