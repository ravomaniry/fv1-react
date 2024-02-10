import { ProgressEntity, ProgressScore, TeachingEntity, TeachingQuestion } from '../clients/fv1';

export interface UiProgressModel {
  readonly id: number;
  readonly teaching: TeachingEntity;
  readonly scores: ProgressScore[];
  readonly clientTimestamp: number;
  readonly completionPercentage: number;
}

export interface WrongAnswer {
  index: number;
  question: string;
  givenAnswer: string;
  correctAnswer: string;
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

export function calculateWrongAnswers(questions: TeachingQuestion[], value: Record<string, string>): WrongAnswer[] {
  const wrongAnswers: WrongAnswer[] = [];
  questions.forEach((question, index) => {
    const givenAnswer = question.options[Number(value[question.key])];
    const correctAnswer = question.options[question.responseIndex];
    if (givenAnswer != correctAnswer) {
      wrongAnswers.push({
        index,
        question: question.question,
        givenAnswer,
        correctAnswer,
      });
    }
  });
  return wrongAnswers;
}

export function updateProgress(
  progress: UiProgressModel,
  chapterIndex: number,
  wrongAnswers: WrongAnswer[],
): UiProgressModel {
  const questionsCount = progress.teaching.chapters[chapterIndex].questions.length;
  const nextScores = progress.scores.slice();
  while (nextScores.length <= chapterIndex) {
    nextScores.push({ correctAnswersPercentage: 0 });
  }
  nextScores[chapterIndex] = {
    correctAnswersPercentage: roundedPercentage(questionsCount - wrongAnswers.length, questionsCount),
  };
  return {
    ...progress,
    clientTimestamp: Math.floor(new Date().getTime() / 1000),
    scores: nextScores,
  };
}

function roundedPercentage(n: number, total: number): number {
  return Math.round(((100 * n) / total) * 100) / 100;
}
