import React from 'react';
import { useDocumentWidth } from '../hooks/documentWidth';

interface ResponsivePaddingProps {
  children: React.ReactNode;
}
const bigScreenWidth = 800;

const ResponsivePadding: React.FC<ResponsivePaddingProps> = ({ children }) => {
  const docWidth = useDocumentWidth();
  const totalPadding = docWidth - bigScreenWidth;
  const padding = Math.max(0, totalPadding / 2);
  return (
    <div style={{ paddingLeft: padding, paddingRight: padding }}>
      <div style={{ position: 'relative' }}>{children}</div>{' '}
    </div>
  );
};

export default ResponsivePadding;
