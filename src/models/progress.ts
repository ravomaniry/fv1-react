import { ProgressEntity, ProgressScore, TeachingEntity } from '../clients/fv1';

export interface UiProgressModel {
  readonly id: number;
  readonly teaching: TeachingEntity;
  readonly scores: ProgressScore[];
  readonly clientTimestamp: number;
  readonly completionPercentage: number;
}

export function newUiProgressModel(raw: ProgressEntity): UiProgressModel {
  return {
    ...raw,
    completionPercentage: calculateCompletionPercentage(raw),
  };
}

export function isChapterDone({ scores }: ProgressEntity, index: number) {
  return scores.length > index && scores[index].correctAnswersPercentage >= 0.75;
}

function calculateCompletionPercentage(progress: ProgressEntity) {
  let completed = 0;
  for (let i = 0; i < progress.teaching.chapters.length; i++) {
    if (isChapterDone(progress, i)) {
      completed++;
    }
  }
  return completed / progress.teaching.chapters.length;
}

export function getNextChapterIndex(progress: UiProgressModel) {
  const { scores, teaching } = progress;
  for (let i = 0; i < scores.length; i++) {
    if (!isChapterDone(progress, i)) {
      return i;
    }
  }
  return scores.length < teaching.chapters.length ? scores.length : 0;
}
