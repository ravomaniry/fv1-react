import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppTexts } from '../../di/redux';
import { useAppContext } from '../../di/appContext/useAppContext';
import { useCallOnMount } from '../hooks/useCallOnMount';
import { setProgresses } from '../../di/redux/browserSlice';
import { newUiProgressModel } from '../../models/progress';
import { setError } from '../../di/redux/appSlice';
import { getErrorMessage } from '../../services/api/mapError';
import { useLoadNewTeachings } from '../Explorer/hooks';

function useLoadData() {
  const texts = useAppTexts();
  const { apiClient } = useAppContext();
  const dispatch = useAppDispatch();

  useCallOnMount(async () => {
    try {
      const progresses = await apiClient.progress.getProgresses();
      dispatch(setProgresses(progresses.data.map((p) => newUiProgressModel(p))));
    } catch (error) {
      dispatch(setError(getErrorMessage(error, texts)));
    }
  });
  useLoadNewTeachings();
}

export default function HomeRoutesContainer() {
  useLoadData();
  return <Outlet />;
}
