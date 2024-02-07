import { PropsWithChildren } from 'react';
import ResponsivePadding from './ResponsivePadding';
import AppError from './AppError';
import { Stack } from '@mui/material';
import AppBar from './AppBar';

export default function AppContainer({ children, dataCy }: PropsWithChildren<{ dataCy: string }>) {
  return (
    <Stack
      data-cy={dataCy}
      height='100vh'
      direction='column'
    >
      <AppBar />
      <ResponsivePadding
        flexGrow={1}
        backgroundColor='white'
      >
        {children}
        <AppError />
      </ResponsivePadding>
    </Stack>
  );
}
