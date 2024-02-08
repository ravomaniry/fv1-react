import { configureStore } from '@reduxjs/toolkit';
import appSlice from './appSlice';
import { useDispatch, useSelector } from 'react-redux';
import browserSlice from './browserSlice';
import audioPlayerSlice from './audioPlayerSlice';

const store = configureStore({
  reducer: {
    app: appSlice,
    browser: browserSlice,
    audioPlayer: audioPlayerSlice,
  },
});

type AppState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppTexts = () => useAppSelector((s) => s.app.texts);
export const useUser = () => useAppSelector((s) => s.app.user);

export default store;
