import { Box, Typography } from '@mui/material';
import { useLoginRegister } from '../Login/useLoginRegister';
import HelpButton from '../widgets/HelpButton';
import HomePageContainer from '../widgets/HomePageContainer';
import { useAppTexts } from '../../di/redux';
import LoginForm from '../Login/LoginForm';

export default function RegisterScreen() {
  const { disabled, onRegister } = useLoginRegister();
  const texts = useAppTexts();
  return (
    <HomePageContainer
      dataCy='RegisterScreen'
      fab={<HelpButton />}
    >
      <Box textAlign='center'>
        <Typography
          variant='subtitle1'
          textAlign='center'
        >
          {texts.createAccount}
        </Typography>
        <LoginForm
          disabled={disabled}
          submitButtonLabel={texts.continueButton}
          onSubmit={onRegister}
        />
      </Box>
    </HomePageContainer>
  );
}
