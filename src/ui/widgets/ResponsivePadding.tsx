import React from 'react';
import { useResponsivePadding } from '../../di/paddingContext/useResponsivePadding';
import { Box, Theme } from '@mui/material';

interface ResponsivePaddingProps {
  children: React.ReactNode;
  zIndex?: number;
  flexGrow?: number;
  backgroundColor?: string;
  height?: number | string | ((theme: Theme) => number | string);
}

const ResponsivePadding: React.FC<ResponsivePaddingProps> = ({
  children,
  zIndex,
  flexGrow,
  backgroundColor,
  height,
}) => {
  const padding = useResponsivePadding();
  return (
    <Box
      zIndex={zIndex}
      flexGrow={flexGrow}
      style={{ paddingLeft: padding, paddingRight: padding, backgroundColor }}
    >
      <Box
        padding={1}
        height={height}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ResponsivePadding;
