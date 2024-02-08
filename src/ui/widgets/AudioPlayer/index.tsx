import { Box, CircularProgress, Divider, IconButton, Stack } from '@mui/material';
import { useAudioPlayer } from './useAudioPlayer';
import { Close } from '@mui/icons-material';

export default function AudioPlayer() {
  const { activeAudioId, activeAudioUrl, close } = useAudioPlayer();
  if (!activeAudioId) {
    return null;
  }
  return (
    <Stack
      position='fixed'
      bottom={0}
      width='100%'
      direction='column'
      alignItems='center'
      sx={{ backgroundColor: 'white' }}
    >
      <>
        <Box width='100%'>
          <Divider />
        </Box>
        {activeAudioUrl ? (
          <Stack
            direction='row'
            spacing={1}
            alignItems='center'
            width='100%'
            maxWidth={600}
            padding={1}
          >
            <audio
              controls
              autoPlay
              style={{ width: '100%', height: 48 }}
              src={activeAudioUrl}
              data-cy='AudioPlayer'
            />
            <div>
              <IconButton onClick={close}>
                <Close color='secondary' />
              </IconButton>
            </div>
          </Stack>
        ) : (
          <CircularProgress />
        )}
      </>
    </Stack>
  );
}
