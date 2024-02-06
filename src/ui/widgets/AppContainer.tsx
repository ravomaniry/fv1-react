import { PropsWithChildren } from 'react';
import ResponsivePadding from './ResponsivePadding';
import AppError from './AppError';
import { Paper } from '@mui/material';

export default function AppContainer({ children }: PropsWithChildren) {
  return (
    <ResponsivePadding>
      <Paper sx={{ height: '100vh', padding: 1 }}>
        {children}
        <AppError />
      </Paper>
    </ResponsivePadding>
  );
}
