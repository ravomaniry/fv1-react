import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewTeachingRespDto } from '../../clients/fv1';
import { UiProgressModel } from '../../models/progress';

export interface BrowserSlice {
  progresses: UiProgressModel[] | null;
  newTeachings: NewTeachingRespDto[] | null;
}

const initialState: BrowserSlice = {
  progresses: null,
  newTeachings: null,
};

const browserSlice = createSlice({
  name: 'browser',
  initialState,
  reducers: {
    setProgresses(state, action: PayloadAction<UiProgressModel[] | null>) {
      state.progresses = action.payload;
    },
    setNewTeachings(state, action: PayloadAction<NewTeachingRespDto[] | null>) {
      state.newTeachings = action.payload;
    },
  },
});

export const { setProgresses, setNewTeachings } = browserSlice.actions;
export default browserSlice.reducer;
