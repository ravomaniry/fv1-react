import { IconButton, Stack, Typography, useTheme } from '@mui/material';
import { useAppSelector } from '../../di/redux';
import { useDispatch } from 'react-redux';
import { setError } from '../../di/redux/appSlice';
import { Close } from '@mui/icons-material';
import { dismissAudioError } from '../../di/redux/audioPlayerSlice';

export default function AppError() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const appError = useAppSelector((s) => s.app.error);
  const audioError = useAppSelector((s) => s.audioPlayer.error);
  const error = appError || audioError;

  if (error) {
    return (
      <Stack
        position='fixed'
        direction='row'
        justifyContent='center'
        width='100%'
        data-cy='AppError'
        bottom={0}
      >
        <Stack
          direction='row'
          alignItems='center'
          padding={1}
          borderRadius={theme.spacing(1)}
          sx={{
            backgroundColor: theme.palette.text.primary,
            color: theme.palette.error.main,
          }}
        >
          <Typography
            flex={1}
            variant='body2'
          >
            {error}
          </Typography>
          <IconButton
            color='secondary'
            data-cy='DismissErrorButton'
            onClick={() => {
              dispatch(setError(null));
              dispatch(dismissAudioError());
            }}
          >
            <Close />
          </IconButton>
        </Stack>
      </Stack>
    );
  }
  return null;
}
