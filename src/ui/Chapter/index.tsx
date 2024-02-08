import { Box, Card, CardActionArea, CardContent, CardHeader, CircularProgress, Stack, Typography } from '@mui/material';
import { useActiveChapter } from './useActiveChapter';
import AppContainer from '../widgets/AppContainer';
import { TeachingSection } from '../../clients/fv1';
import Markdown from 'react-markdown';
import { PlayCircle, Speaker } from '@mui/icons-material';
import { useAudioPlayer } from '../widgets/AudioPlayer/useAudioPlayer';
import AudioPlayer from '../widgets/AudioPlayer';

export default function ChapterScreen() {
  const active = useActiveChapter();
  if (!active) {
    return <CircularProgress />;
  }
  return (
    <>
      <AppContainer dataCy='ChapterScreen'>
        <Stack
          direction='column'
          height='100%'
        >
          <Typography
            variant='h2'
            data-cy='ChapterTitle'
          >
            {active.chapter.title}
          </Typography>
          <Box flexGrow={1}>
            {active.chapter.sections.map((section, i) => (
              <SectionCard
                i={i}
                key={i}
                section={section}
              />
            ))}
          </Box>
        </Stack>
      </AppContainer>
      <AudioPlayer key='audioPlayer' />
    </>
  );
}

function SectionCard({ i, section }: { section: TeachingSection; i: number }) {
  const { activeAudioId, play } = useAudioPlayer();
  const isPlaying = section.audioId === activeAudioId;
  return (
    <Card>
      <CardActionArea onClick={() => play(section.audioId)}>
        <CardHeader
          data-cy={`SectionTitle:${i}`}
          title={section.subtitle}
          avatar={<AudioIcon isPlaying={isPlaying} />}
        />
      </CardActionArea>
      <CardContent>
        <div data-cy={`SectionVerses:${i}`}>
          <Markdown>{section.verses}</Markdown>
        </div>
        <Typography data-cy={`SectionComment:${i}`}>{section.comment}</Typography>
      </CardContent>
    </Card>
  );
}

function AudioIcon({ isPlaying }: { isPlaying: boolean }) {
  return isPlaying ? <Speaker color='secondary' /> : <PlayCircle color='primary' />;
}
