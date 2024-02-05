import { useAppContext } from '../../di/appContext/useAppContext';
import { useAppDispatch, useAppTexts } from '../../di/redux';
import { setError } from '../../di/redux/appSlice';
import { setNewTeachings } from '../../di/redux/browserSlice';
import { getErrorMessage } from '../../services/api/mapError';
import { useCallOnMount } from '../hooks/useCallOnMount';

export function useLoadNewTeachings() {
  const dispatch = useAppDispatch();
  const texts = useAppTexts();
  const { apiClient } = useAppContext();

  useCallOnMount(async () => {
    try {
      const teachings = await apiClient.teaching.getNew();
      dispatch(setNewTeachings(teachings.data));
    } catch (error) {
      dispatch(setError(getErrorMessage(error, texts)));
    }
  });
}
