import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UiUserModel } from '../../clients/fv1';
import { AppTexts, mgTexts } from '../../models/texts';

export interface AppSlice {
  isInitialized: boolean;
  user: UiUserModel | null;
  texts: AppTexts;
  error: string | null;
}

const initialState: AppSlice = {
  isInitialized: false,
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
    setIsInitialized(state) {
      state.isInitialized = true;
    },
  },
});

export const { setUser, setError, setIsInitialized } = appSlice.actions;
export default appSlice.reducer;
