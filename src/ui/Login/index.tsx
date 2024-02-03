import HelpButton from '../widgets/HelpButton';
import { useCallback } from 'react';
import { useAppDispatch, useAppTexts } from '../../di/redux';
import LoginError from '../widgets/LoginError';
import HomePageContainer from '../widgets/HomePageContainer';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { routes } from '../routes';
import LoginForm, { FormValues } from './LoginForm';
import { setError, setUser } from '../../di/redux/appSlice';
import { useAppContext } from '../../di/appContext/useAppContext';
import { getErrorMessage } from '../../services/api/mapError';

function useLogin() {
  const texts = useAppTexts();
  const dispatch = useAppDispatch();
  const { authService } = useAppContext();

  const onSubmit = useCallback(
    async (values: FormValues) => {
      dispatch(setError(null));
      try {
        const user = await authService.login(values);
        dispatch(setUser(user));
      } catch (error) {
        dispatch(setError(getErrorMessage(error, texts)));
      }
    },
    [authService, dispatch, texts],
  );

  return {
    onSubmit,
  };
}

export default function LoginScreen() {
  const texts = useAppTexts();
  const { onSubmit } = useLogin();
  return (
    <HomePageContainer>
      <Box textAlign='center'>
        <Typography variant='subtitle1' textAlign='center'>
          {texts.loginTitle}
        </Typography>
        <LoginForm onSubmit={onSubmit} />
        <Typography component='div' variant='caption'>
          {texts.noAccountYet}
        </Typography>
        <Link to={routes.register}>
          <Button variant='outlined'>{texts.createAccount}</Button>
        </Link>
        <Typography component='div' variant='caption'>
          {texts.or}
        </Typography>
        <Button variant='outlined'>{texts.continueAsGuest}</Button>
        <LoginError />
      </Box>
      <HelpButton />
    </HomePageContainer>
  );
}
