import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface AudioPlayerSlice {
  audioId?: string;
  audioUrl?: string;
  error?: string;
}

const initialState: AudioPlayerSlice = {};

const audioPlayerSlice = createSlice({
  name: 'audioPlayer',
  initialState,
  reducers: {
    setAudioId(state, action: PayloadAction<string | undefined>) {
      state.audioId = action.payload;
    },
    setAudioUrl(state, action: PayloadAction<{ id: string; url: string | undefined }>) {
      if (state.audioId === action.payload.id) {
        state.audioUrl = action.payload.url;
      }
    },
    setAudioError(state, action: PayloadAction<{ id: string; error: string }>) {
      if (state.audioId === action.payload.id) {
        state.error = action.payload.error;
        state.audioId = undefined;
      }
    },
    dismissAudioError(state) {
      state.error = undefined;
    },
    closeAudioPlayer(state) {
      state.error = undefined;
      state.audioId = undefined;
      state.audioUrl = undefined;
    },
  },
});

export const { setAudioId, setAudioUrl, setAudioError, dismissAudioError, closeAudioPlayer } = audioPlayerSlice.actions;
export default audioPlayerSlice.reducer;
