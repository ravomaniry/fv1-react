import { Box, Divider, Stack, Typography } from '@mui/material';
import ChapterTitle from '../Chapter/ChapterTitle';
import { useActiveChapter } from '../Chapter/useActiveChapter';
import AppContainer from '../widgets/AppContainer';
import WrapInLoader from '../widgets/WrapInLoader';
import ContinueButton from '../widgets/ContinueButton';
import { useAppSelector, useAppTexts } from '../../di/redux';
import { WrongAnswer } from '../../models/progress';
import BorderedCircularProgress from '../widgets/BorderedCircularProgress';
import { useMemo } from 'react';
import { replacePathParams, routes } from '../routes';

function useScoreScreen() {
  const active = useActiveChapter();

  const nextPage = useMemo(() => {
    return active && active.chapterIndex < active.teaching.chapters.length - 1
      ? replacePathParams(routes.fullChapterPath, {
          teachingId: active.teaching.id,
          chapterIndex: active.chapterIndex + 1,
        })
      : '../..';
  }, [active]);

  return {
    active,
    nextPage,
  };
}

export default function ScoreScreen() {
  const { active, nextPage } = useScoreScreen();
  const wrongAnswers = useAppSelector((s) => s.browser.wrongAnswers);
  const texts = useAppTexts();
  return (
    <WrapInLoader
      isReady={!!active && !!wrongAnswers}
      builder={() => {
        const correct = active!.chapter.questions.length - wrongAnswers!.length;
        const total = active!.chapter.questions.length;
        return (
          <AppContainer dataCy='ScoreScreen'>
            <Stack direction='column'>
              <ChapterTitle active={active} />
              <Box flexGrow={1}>
                <Stack
                  direction='column'
                  alignItems='center'
                >
                  <Typography
                    data-cy='Score'
                    variant='subtitle1'
                  >
                    {texts.score}: {correct} / {total}
                  </Typography>
                  <BorderedCircularProgress
                    variant='determinate'
                    value={(correct * 100) / total}
                  />
                </Stack>
                <Box>
                  {wrongAnswers?.map((answer) => (
                    <WrongAnswerCard
                      key={answer.index}
                      answer={answer}
                    />
                  ))}
                </Box>
              </Box>
              <ContinueButton href={nextPage} />
            </Stack>
          </AppContainer>
        );
      }}
    />
  );
}

function WrongAnswerCard({ answer }: { answer: WrongAnswer }) {
  return (
    <Box
      paddingTop={1}
      paddingBottom={1}
      data-cy={`WrongAnswer:${answer.index}`}
    >
      <Divider />
      <Typography variant='subtitle1'>
        {answer.index + 1}. {answer.question}
      </Typography>
      <Typography
        color='secondary'
        fontStyle='italic'
        sx={{ textDecoration: 'line-through' }}
        data-cy={`GivenAnswer:${answer.index}`}
      >
        {answer.givenAnswer}
      </Typography>
      <Typography data-cy={`CorrectAnswer:${answer.index}`}>{answer.correctAnswer}</Typography>
    </Box>
  );
}
