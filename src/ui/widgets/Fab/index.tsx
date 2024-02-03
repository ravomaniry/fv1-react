import { Fab } from '@mui/material';
import { PropsWithChildren } from 'react';

export default function AppFab({ children }: PropsWithChildren) {
  return <Fab color='secondary'>{children}</Fab>;
}
