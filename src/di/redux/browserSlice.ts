import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewTeachingRespDto, ProgressEntity } from '../../clients/fv1';

export interface BrowserSlice {
  progresses: ProgressEntity[] | null;
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
    setProgresses(state, action: PayloadAction<ProgressEntity[]>) {
      state.progresses = action.payload;
    },
    setNewTeachings(state, action: PayloadAction<NewTeachingRespDto[]>) {
      state.newTeachings = action.payload;
    },
  },
});

export const { setProgresses, setNewTeachings } = browserSlice.actions;
export default browserSlice.reducer;
