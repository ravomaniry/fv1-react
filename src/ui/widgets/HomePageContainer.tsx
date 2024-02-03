import { Grid } from '@mui/material';
import { PropsWithChildren } from 'react';

export default function HomePageContainer({ children }: PropsWithChildren) {
  return (
    <Grid container direction='column' justifyContent='center'>
      <Grid item>{children}</Grid>
    </Grid>
  );
}
