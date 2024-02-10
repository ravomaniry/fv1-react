import { useContext } from 'react';
import { Context } from './ctx';

export function useResponsivePadding() {
  return useContext(Context);
}
