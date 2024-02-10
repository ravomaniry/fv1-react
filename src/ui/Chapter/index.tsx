import { Box, Card, CardActionArea, CardContent, CardHeader, Stack, useTheme } from '@mui/material';
import { useActiveChapter } from './useActiveChapter';
import AppContainer from '../widgets/AppContainer';
import { TeachingSection } from '../../clients/fv1';
import Markdown from 'react-markdown';
import { PlayCircle, Speaker } from '@mui/icons-material';
import { useAudioPlayer } from '../widgets/AudioPlayer/useAudioPlayer';
import AudioPlayer from '../widgets/AudioPlayer';
import ContinueButton from '../widgets/ContinueButton';
import { routes } from '../routes';
import WrapInLoader from '../widgets/WrapInLoader';
import ChapterTitle from './ChapterTitle';
import { useAppDispatch } from '../../di/redux';
import { useEffect } from 'react';
import { closeAudioPlayer } from '../../di/redux/audioPlayerSlice';

function useAutoClosePlayer() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    return () => {
      console.log('Close audio player');
      dispatch(closeAudioPlayer());
    };
  }, [dispatch]);
}

export default function ChapterScreen() {
  useAutoClosePlayer();
  const active = useActiveChapter();
  return (
    <WrapInLoader
      isReady={!!active}
      builder={() => (
        <>
          <AppContainer dataCy='ChapterScreen'>
            <Stack direction='column'>
              <ChapterTitle active={active} />
              {active?.chapter.sections.map((section, i) => (
                <SectionCard
                  i={i}
                  key={i}
                  section={section}
                />
              ))}
              <ContinueButton href={routes.quiz} />
              <Box
                data-comment='to compensate the height of the audio player'
                height={60}
              />
            </Stack>
          </AppContainer>
          <AudioPlayer key='audioPlayer' />
        </>
      )}
    />
  );
}

function SectionCard({ i, section }: { section: TeachingSection; i: number }) {
  const { activeAudioId, play } = useAudioPlayer();
  const isPlaying = section.audioId === activeAudioId;
  const { palette } = useTheme();
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
        <Box
          data-cy={`SectionVerses:${i}`}
          paddingLeft={1}
          sx={{
            borderLeft: `2px solid ${isPlaying ? palette.secondary.main : palette.primary.main}`,
          }}
        >
          <Markdown>{section.verses}</Markdown>
        </Box>
        <div data-cy={`SectionComment:${i}`}>
          <Markdown>{section.comment}</Markdown>
        </div>
      </CardContent>
    </Card>
  );
}

function AudioIcon({ isPlaying }: { isPlaying: boolean }) {
  return isPlaying ? <Speaker color='secondary' /> : <PlayCircle color='primary' />;
}
