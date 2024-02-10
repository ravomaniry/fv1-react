import { Stack } from '@mui/material';

export default function SplashScreen() {
  return (
    <Stack
      sx={{ height: '100vh' }}
      justifyContent='center'
      alignItems='center'
    >
      <img
        width='50vw'
        src='/icon.png'
        alt='...'
      />
    </Stack>
  );
}
