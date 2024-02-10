import { PropsWithChildren } from 'react';
import ResponsivePadding from './ResponsivePadding';
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
        height='100%'
        flexGrow={1}
        backgroundColor='white'
      >
        {children}
      </ResponsivePadding>
    </Stack>
  );
}
