export const routes = {
  home: '/',
  login: '/login',
  register: '/register',
  teachingSummary: 'teaching',
  chapter: 'chapter',
  fullChapterPath: '/teaching/:teachingId/chapter/:chapterIndex',
  quiz: 'quiz',
  score: 'score',
  explorer: 'explorer',
  help: '/help',
};

export interface TeachingRouteParams {
  teachingId: string;
}

export interface ChapterRouteParams extends TeachingRouteParams {
  chapterIndex: string;
}

export function replacePathParams(fullPath: string, params: Record<string, string | number>) {
  for (const key in params) {
    fullPath = fullPath.replace(`:${key}`, `${params[key]}`);
  }
  return fullPath;
}
