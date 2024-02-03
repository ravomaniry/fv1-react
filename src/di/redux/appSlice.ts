import { createSlice } from '@reduxjs/toolkit';
import { UiUserModel } from '../../clients/fv1';
import { AppTexts, mgTexts } from '../../models/texts';
import { AppAction } from './types';

export interface AppSlice {
  user: UiUserModel | null;
  texts: AppTexts;
}

const appSlice = createSlice({
  name: 'app',
  initialState: <AppSlice>{
    user: null,
    texts: mgTexts,
  },
  reducers: {
    setUser: (state, action: AppAction<UiUserModel | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = appSlice.actions;
export default appSlice.reducer;
