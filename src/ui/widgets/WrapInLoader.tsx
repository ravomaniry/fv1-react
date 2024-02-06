import { CircularProgress } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  isReady: boolean;
  builder: () => ReactNode;
}

export default function WrapInLoader({ isReady, builder }: Props) {
  return isReady ? builder() : <CircularProgress />;
}
