import { Typography } from '@mui/material';
import { ActiveChapter } from './useActiveChapter';

export default function ChapterTitle({ active }: { active: ActiveChapter | null }) {
  return (
    <Typography
      variant='h2'
      data-cy='ChapterTitle'
    >
      {active?.chapter.title}
    </Typography>
  );
}
