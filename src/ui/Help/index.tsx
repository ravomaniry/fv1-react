import { Box, Button, Typography } from '@mui/material';
import AppContainer from '../widgets/AppContainer';
import { useAppTexts } from '../../di/redux';
import { memo } from 'react';
import ImageWithDescription from '../widgets/ImageWithDescription';

interface HelpItem {
  title: string;
  description: string;
  imagePath: string;
}

function Memoized() {
  const texts = useAppTexts();
  const items: HelpItem[] = [
    {
      title: texts.helpLoginTitle,
      description: texts.helpLoginDescription,
      imagePath: '/images/help-login.png',
    },
    {
      title: texts.helpHomeTitle,
      description: texts.helpHomeDescription,
      imagePath: '/images/help-home.png',
    },
    {
      title: texts.helpTeachingSummaryTitle,
      description: texts.helpTeachingSummaryDescription,
      imagePath: '/images/help-teaching.png',
    },
    {
      title: texts.helpChapterTitle,
      description: texts.helpChapterDescription,
      imagePath: '/images/help-chapter.png',
    },
    {
      title: texts.helpQuizTitle,
      description: texts.helpQuizDescription,
      imagePath: '/images/help-quiz.png',
    },
  ];
  return (
    <AppContainer dataCy='HelpScreen'>
      <Typography variant='h2'>{texts.helpTitle}</Typography>
      {items.map((item, i) => (
        <ImageWithDescription
          isMarkdown
          key={i}
          {...item}
        />
      ))}
      <Box textAlign='right'>
        <Button
          variant='contained'
          href='/'
        >
          {texts.close}
        </Button>
      </Box>
    </AppContainer>
  );
}

const HelpScreen = memo(Memoized);

export default HelpScreen;
