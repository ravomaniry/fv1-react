import { ProgressEntity, ProgressScore, TeachingEntity } from '../clients/fv1';

export class UiProgressModel implements ProgressEntity {
  public readonly id: number;
  public readonly teaching: TeachingEntity;
  public readonly scores: ProgressScore[];
  public readonly clientTimestamp: number;
  public completionPercentage: number = 0;

  public constructor(raw: ProgressEntity) {
    this.id = raw.id;
    this.teaching = raw.teaching;
    this.scores = raw.scores;
    this.clientTimestamp = raw.clientTimestamp;
    this.calculateCompletionPercentage();
  }

  private calculateCompletionPercentage() {
    let completed = 0;
    for (let i = 0; i < this.teaching.chapters.length; i++) {
      if (this.isChapterDone(i)) {
        completed++;
      }
    }
    this.completionPercentage = completed / this.teaching.chapters.length;
  }

  public isChapterDone(index: number) {
    return this.scores.length > index && this.scores[index].correctAnswersPercentage >= 0.75;
  }

  public getNextChapterIndex() {
    for (let i = 0; i < this.scores.length; i++) {
      if (!this.isChapterDone(i)) {
        return i;
      }
    }
    return this.scores.length < this.teaching.chapters.length ? this.scores.length : 0;
  }
}
