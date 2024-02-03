import { useContext } from 'react';
import { Context } from './context';

export function useServices() {
  return useContext(Context);
}
