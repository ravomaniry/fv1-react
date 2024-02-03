import { useCallback, useState } from 'react';
import { useAppDispatch, useAppTexts } from '../../di/redux';
import { FormValues } from './LoginForm';
import { setError, setUser } from '../../di/redux/appSlice';
import { useAppContext } from '../../di/appContext/useAppContext';
import { getErrorMessage } from '../../services/api/mapError';
import { UiUserModel } from '../../clients/fv1';

export function useLoginRegister() {
  const texts = useAppTexts();
  const dispatch = useAppDispatch();
  const { authService } = useAppContext();
  const [disabled, setDisabled] = useState(false);

  const processRequest = useCallback(
    async (fn: () => Promise<UiUserModel>) => {
      dispatch(setError(null));
      setDisabled(true);
      try {
        dispatch(setUser(await fn()));
      } catch (error) {
        dispatch(setError(getErrorMessage(error, texts)));
      }
      setDisabled(false);
    },
    [dispatch, texts],
  );

  const onSubmit = useCallback(
    (values: FormValues) => {
      processRequest(() => authService.login(values));
    },
    [authService, processRequest],
  );

  const onRegisterGuest = useCallback(
    () => processRequest(() => authService.registerGuest()),
    [authService, processRequest],
  );

  const onRegister = useCallback(
    (values: FormValues) => {
      processRequest(() => authService.register(values));
    },
    [authService, processRequest],
  );

  return {
    disabled,
    onSubmit,
    onRegisterGuest,
    onRegister,
  };
}
