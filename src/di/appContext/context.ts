import { createContext } from 'react';
import { AppTexts } from '../../models/texts';
import { ApiClient } from '../../services/api';
import { AuthService } from '../../services/api/authService';
import { UiUserModel } from '../../clients/fv1';

export interface AppContext {
  user: UiUserModel | null;
  texts: AppTexts;
  apiClient: ApiClient;
  authService: AuthService;
}

export const Context = createContext<AppContext>(null!);
