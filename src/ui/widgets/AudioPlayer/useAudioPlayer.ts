import { useCallback } from 'react';
import { useAppDispatch, useAppSelector, useAppTexts } from '../../../di/redux';
import { useAppContext } from '../../../di/appContext/useAppContext';
import { closeAudioPlayer, setAudioError, setAudioId, setAudioUrl } from '../../../di/redux/audioPlayerSlice';
import { getErrorMessage } from '../../../services/api/mapError';
import { setError } from '../../../di/redux/appSlice';

export function useAudioPlayer() {
  const texts = useAppTexts();
  const dispatch = useAppDispatch();
  const { apiClient } = useAppContext();

  const stop = useCallback(() => dispatch(setAudioId(undefined)), [dispatch]);

  const play = useCallback(
    async (id: string) => {
      dispatch(setAudioId(id));
      dispatch(setAudioUrl({ id, url: undefined }));
      try {
        const resp = await apiClient.audio.getUrl(id);
        dispatch(setAudioUrl({ id, url: resp.data.url }));
      } catch (error) {
        dispatch(setAudioError({ id, error: getErrorMessage(error, texts) }));
      }
    },
    [apiClient.audio, dispatch, texts],
  );

  const close = useCallback(() => dispatch(closeAudioPlayer()), [dispatch]);

  const onError = useCallback(() => dispatch(setError(texts.errorAudioPlayer)), [dispatch, texts.errorAudioPlayer]);

  return {
    activeAudioId: useAppSelector((s) => s.audioPlayer.audioId),
    activeAudioUrl: useAppSelector((s) => s.audioPlayer.audioUrl),
    play,
    stop,
    close,
    onError,
  };
}
