import { Link } from 'react-router-dom';
import { Divider, ListItemText, MenuItem, MenuList, Typography, useTheme } from '@mui/material';
import WrapInLoader from '../widgets/WrapInLoader';
import { TeachingChapter } from '../../clients/fv1';
import AppContainer from '../widgets/AppContainer';
import { Check } from '@mui/icons-material';
import { useActiveProgress } from './hooks';

export default function TeachingSummaryScreen() {
  const active = useActiveProgress();
  return (
    <AppContainer dataCy='TeachingSummaryScreen'>
      <WrapInLoader
        isReady={!!active}
        builder={() => (
          <div>
            <Typography
              variant='h2'
              data-cy='TSTitle'
            >
              {active?.teaching.title}
            </Typography>
            <Typography
              variant='body2'
              data-cy='TSSubtitle'
            >
              {active?.teaching.subtitle}
            </Typography>
            <MenuList>
              {active?.teaching.chapters.map((chapter, i) => (
                <ChapterCard
                  i={i}
                  key={i}
                  chapter={chapter}
                  isDone={active.isChapterDone(i)}
                />
              ))}
            </MenuList>
          </div>
        )}
      />
    </AppContainer>
  );
}

function ChapterCard({ i, chapter, isDone }: { i: number; chapter: TeachingChapter; isDone: boolean }) {
  const {
    palette: {
      primary: { main },
    },
  } = useTheme();
  return (
    <Link to={`chapter/${i}`}>
      <Divider />
      <MenuItem>
        <ListItemText data-cy={`TSChapter:${i}`}>
          <Typography
            variant='subtitle2'
            color={main}
          >
            {chapter.title}
          </Typography>
        </ListItemText>
        {isDone && (
          <Check
            color='primary'
            data-cy={`DoneIcon:${i}`}
          />
        )}
      </MenuItem>
    </Link>
  );
}
