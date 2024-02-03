import { useContext } from 'react';
import { AppContext, Context } from './context';

export function useAppContext(): AppContext {
  return useContext(Context);
}
