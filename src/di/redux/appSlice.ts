import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UiUserModel } from '../../clients/fv1';
import { AppTexts, mgTexts } from '../../models/texts';

export interface AppSlice {
  user: UiUserModel | null;
  texts: AppTexts;
  error: string | null;
}

const initialState: AppSlice = {
  user: null,
  texts: mgTexts,
  error: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UiUserModel | null>) => {
      state.user = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, setError } = appSlice.actions;
export default appSlice.reducer;
