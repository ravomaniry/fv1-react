import HelpButton from '../widgets/HelpButton';
import { useAppTexts } from '../../di/redux';
import HomePageContainer from '../widgets/HomePageContainer';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { routes } from '../routes';
import LoginForm from './LoginForm';
import { useAuth } from '../hooks/useAuth';

export default function LoginScreen() {
  const texts = useAppTexts();
  const { disabled, onSubmit, onRegisterGuest } = useAuth();
  return (
    <HomePageContainer
      dataCy='LoginScreen'
      fab={<HelpButton />}
    >
      <Box textAlign='center'>
        <Typography
          variant='subtitle1'
          textAlign='center'
        >
          {texts.loginTitle}
        </Typography>
        <LoginForm
          disabled={disabled}
          submitButtonLabel={texts.login}
          onSubmit={onSubmit}
        />
        <Typography
          marginTop={1}
          component='div'
          variant='caption'
        >
          {texts.noAccountYet}
        </Typography>
        <Box
          marginTop={1}
          marginBottom={1}
        >
          <Link to={routes.register}>
            <Button
              disabled={disabled}
              variant='outlined'
              data-cy='RegisterButton'
            >
              {texts.createAccount}
            </Button>
          </Link>
        </Box>
        <Button
          disabled={disabled}
          variant='outlined'
          data-cy='RegisterGuestButton'
          onClick={onRegisterGuest}
        >
          {texts.continueAsGuest}
        </Button>
      </Box>
    </HomePageContainer>
  );
}
