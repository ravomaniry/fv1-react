import { Grid } from '@mui/material';

export default function SplashScreen() {
  return (
    <Grid container sx={{ height: '100vh' }} justifyContent='center' alignItems='center'>
      <Grid item>
        <img src='/icon.png' alt='...' />
      </Grid>
    </Grid>
  );
}
