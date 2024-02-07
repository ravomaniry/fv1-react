import { PropsWithChildren } from 'react';
import { useDocumentWidth } from '../../ui/hooks/documentWidth';
import { Context } from './ctx';

const bigScreenWidth = 800;

export default function ResponsivePaddingProvider({ children }: PropsWithChildren) {
  const docWidth = useDocumentWidth();
  const totalPadding = docWidth - bigScreenWidth;
  const padding = Math.max(0, totalPadding / 2);
  return <Context.Provider value={padding}>{children}</Context.Provider>;
}
