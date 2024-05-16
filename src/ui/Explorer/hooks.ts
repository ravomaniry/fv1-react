import { useAppContext } from '../../di/appContext/useAppContext';
import { setError } from '../../di/redux/appSlice';
import { getErrorMessage } from '../../services/api/mapError';
import { useCallOnMount } from '../hooks/useCallOnMount';
import { useAppDispatch, useAppSelector, useAppTexts } from '../../di/redux';
import { setNewTeachings, setProgresses } from '../../di/redux/browserSlice';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { newUiProgressModel } from '../../models/progress';
import { NewTeachingRespDto } from '../../clients/fv1';

export function useLoadNewTeachings() {
  const dispatch = useAppDispatch();
  const texts = useAppTexts();
  const { apiClient } = useAppContext();

  useCallOnMount(async () => {
    try {
      dispatch(setNewTeachings(undefined)); // refresh screen
      const teachings = await apiClient.teaching.getNew();
      dispatch(setNewTeachings(teachings.data));
    } catch (error) {
      dispatch(setError(getErrorMessage(error, texts)));
    }
  });
}

export function useStartTeaching() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { apiClient } = useAppContext();
  const texts = useAppTexts();
  const progresses = useAppSelector((s) => s.browser.progresses);
  const newTeachings = useAppSelector((s) => s.browser.newTeachings);

  return useCallback(
    async (teaching: NewTeachingRespDto) => {
      // set to null to display loader
      dispatch(setProgresses(undefined));
      dispatch(setNewTeachings(undefined));
      try {
        const newProgress = await apiClient.progress.start({ teachingId: teaching.id });
        dispatch(
          setProgresses([
            ...(progresses?.filter((p) => p.teaching.id !== teaching.id) ?? []),
            newUiProgressModel(newProgress.data),
          ]),
        );
        navigate(`/teaching/${teaching.id}`);
      } catch (error) {
        dispatch(setError(getErrorMessage(error, texts)));
        dispatch(setProgresses(progresses));
      }
      dispatch(setNewTeachings(newTeachings));
    },
    [apiClient.progress, dispatch, navigate, newTeachings, progresses, texts],
  );
}
