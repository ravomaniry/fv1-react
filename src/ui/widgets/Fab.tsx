import { Fab } from '@mui/material';
import { PropsWithChildren } from 'react';
import { useResponsivePadding } from '../../di/paddingContext/useResponsivePadding';

interface Props {
  href?: string;
}

export default function AppFab({ children, href }: PropsWithChildren<Props>) {
  const pagePadding = useResponsivePadding();
  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20 + pagePadding }}>
      <Fab
        href={href}
        color='secondary'
      >
        {children}
      </Fab>
    </div>
  );
}
