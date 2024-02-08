import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Divider, ListItemText, MenuItem, MenuList, Stack, Typography, useTheme } from '@mui/material';
import WrapInLoader from '../widgets/WrapInLoader';
import { TeachingChapter } from '../../clients/fv1';
import AppContainer from '../widgets/AppContainer';
import { Check } from '@mui/icons-material';
import { useActiveProgress } from './hooks';
import { useCallback } from 'react';
import { useAppTexts } from '../../di/redux';

function useTS() {
  const navigate = useNavigate();
  const active = useActiveProgress();

  const onContinue = useCallback(() => {
    navigate(`chapter/${active!.getNextChapterIndex()}`);
  }, [active, navigate]);

  return {
    active,
    onContinue,
  };
}

export default function TeachingSummaryScreen() {
  const texts = useAppTexts();
  const { active, onContinue } = useTS();
  return (
    <AppContainer dataCy='TeachingSummaryScreen'>
      <WrapInLoader
        isReady={!!active}
        builder={() => (
          <Stack
            direction='column'
            height='100%'
          >
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
            <Box flexGrow={1}>
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
            </Box>
            <Box textAlign='right'>
              <Button
                variant='contained'
                data-cy='ContinueButton'
                onClick={onContinue}
              >
                {texts.continueButton}
              </Button>
            </Box>
          </Stack>
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
