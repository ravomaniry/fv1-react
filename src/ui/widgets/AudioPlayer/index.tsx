import { Box, CircularProgress, Divider, IconButton, Stack, useTheme } from '@mui/material';
import { useAudioPlayer } from './useAudioPlayer';
import { Close } from '@mui/icons-material';

export default function AudioPlayer() {
  const { palette } = useTheme();
  const { activeAudioId, activeAudioUrl, close, onError } = useAudioPlayer();
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
            margin={1}
            paddingRight={1}
            sx={{ borderRadius: 24, backgroundColor: palette.primary.light }}
          >
            <audio
              controls
              autoPlay
              onError={onError}
              style={{ width: '100%', height: 48 }}
              src={activeAudioUrl}
              data-cy='AudioPlayer'
            />
            <IconButton
              onClick={close}
              size='small'
              sx={{ marginLeft: 0 }}
            >
              <Close sx={{ color: 'black' }} />
            </IconButton>
          </Stack>
        ) : (
          <CircularProgress />
        )}
      </>
    </Stack>
  );
}
