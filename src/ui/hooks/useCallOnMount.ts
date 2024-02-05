import { useEffect, useRef } from 'react';

export function useCallOnMount(cb: () => void) {
  const isCalled = useRef(false);

  // useEffect does not allow async by default
  useEffect(() => {
    if (!isCalled.current) {
      isCalled.current = true;
      cb();
    }
  }, [cb]);
}
