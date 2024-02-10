import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewTeachingRespDto } from '../../clients/fv1';
import { UiProgressModel, WrongAnswer } from '../../models/progress';

export interface BrowserSlice {
  progresses?: UiProgressModel[];
  newTeachings?: NewTeachingRespDto[];
  wrongAnswers?: WrongAnswer[];
}

const initialState: BrowserSlice = {};

const browserSlice = createSlice({
  name: 'browser',
  initialState,
  reducers: {
    setProgresses(state, action: PayloadAction<UiProgressModel[] | undefined>) {
      state.progresses = action.payload;
    },
    setNewTeachings(state, action: PayloadAction<NewTeachingRespDto[] | undefined>) {
      state.newTeachings = action.payload;
    },
    setWrongAnswers(state, action: PayloadAction<WrongAnswer[]>) {
      state.wrongAnswers = action.payload;
    },
    replaceProgress(state, action: PayloadAction<UiProgressModel>) {
      state.progresses = state.progresses?.map((p) => (p.id === action.payload.id ? action.payload : p));
    },
  },
});

export const { setProgresses, setNewTeachings, setWrongAnswers, replaceProgress } = browserSlice.actions;
export default browserSlice.reducer;
