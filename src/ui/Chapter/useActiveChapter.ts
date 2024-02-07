import { useParams } from 'react-router-dom';
import { useActiveProgress } from '../TeachingSummary/hooks';
import { ChapterRouteParams } from '../routes';
import { useMemo } from 'react';
import { ProgressScore, TeachingChapter, TeachingEntity } from '../../clients/fv1';

export type ActiveChapter = {
  teaching: TeachingEntity;
  chapter: TeachingChapter;
  score: ProgressScore | undefined;
};

export function useActiveChapter(): ActiveChapter | null {
  const { chapterIndex } = useParams() as unknown as ChapterRouteParams;
  const progress = useActiveProgress();
  return useMemo(() => {
    const i = Number(chapterIndex);
    if (progress && progress.teaching.chapters[i]) {
      return {
        teaching: progress.teaching,
        chapter: progress.teaching.chapters[i],
        score: progress.scores[i],
      };
    }
    return null;
  }, [chapterIndex, progress]);
}
