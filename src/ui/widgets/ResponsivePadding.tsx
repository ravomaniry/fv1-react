import React from 'react';
import { useResponsivePadding } from '../../di/paddingContext/useResponsivePadding';
import { Box } from '@mui/material';

interface ResponsivePaddingProps {
  children: React.ReactNode;
  zIndex?: number;
  flexGrow?: number;
  backgroundColor?: string;
}

const ResponsivePadding: React.FC<ResponsivePaddingProps> = ({ children, zIndex, flexGrow, backgroundColor }) => {
  const padding = useResponsivePadding();
  return (
    <Box
      zIndex={zIndex}
      flexGrow={flexGrow}
      style={{ paddingLeft: padding, paddingRight: padding, backgroundColor }}
    >
      <Box
        padding={1}
        style={{ position: 'relative' }}
      >
        {children}
      </Box>{' '}
    </Box>
  );
};

export default ResponsivePadding;
