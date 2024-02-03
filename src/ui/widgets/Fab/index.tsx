import { Fab } from '@mui/material';
import { PropsWithChildren } from 'react';

export default function AppFab({ children }: PropsWithChildren) {
  return (
    <Fab sx={{ position: 'absolute', bottom: 20, right: 20 }} color='secondary'>
      {children}
    </Fab>
  );
}
