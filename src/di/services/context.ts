import { createContext } from 'react';
import { StorageService } from '../../services/storage';

export interface Services {
  storage: StorageService;
}

export const Context = createContext<Services>(null!);
