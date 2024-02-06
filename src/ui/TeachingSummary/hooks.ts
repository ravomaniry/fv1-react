import { useParams } from 'react-router-dom';
import { TeachingRouteParams } from '../routes';
import { useAppSelector } from '../../di/redux';
import { useMemo } from 'react';

export function useActiveProgress() {
  const { teachingId } = useParams() as unknown as TeachingRouteParams;
  const progresses = useAppSelector((s) => s.browser.progresses);
  return useMemo(() => {
    const activeId = Number(teachingId);
    return progresses?.find((p) => p.teaching.id === activeId);
  }, [teachingId, progresses]);
}
