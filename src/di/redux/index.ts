import { configureStore } from '@reduxjs/toolkit';
import appSlice, { AppSlice } from './appSlice';
import { UseSelector, useSelector } from 'react-redux';

export interface ReduxState {
  app: AppSlice;
}

export default configureStore({
  reducer: {
    app: appSlice,
  },
});

export const useAppSelector: UseSelector<ReduxState> = useSelector;
