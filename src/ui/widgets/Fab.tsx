import { Fab } from '@mui/material';
import { PropsWithChildren } from 'react';

interface Props {
  href?: string;
}

export default function AppFab({ children, href }: PropsWithChildren<Props>) {
  return (
    <div style={{ position: 'absolute', bottom: 20, right: 20 }}>
      <Fab
        href={href}
        color='secondary'
      >
        {children}
      </Fab>
    </div>
  );
}
