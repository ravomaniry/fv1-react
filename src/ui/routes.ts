export const routes = {
  home: '/',
  login: '/login',
  register: '/register',
  teachingSummary: 'teaching',
  chapter: 'chapter',
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
