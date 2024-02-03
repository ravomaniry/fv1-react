import { useEffect, useState } from 'react';

export function useDocumentWidth() {
  const [width, setWidth] = useState(document.body.clientWidth);

  useEffect(() => {
    const listener = () => setWidth(document.body.clientWidth);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, []);
  return width;
}
