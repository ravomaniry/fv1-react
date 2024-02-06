import { IconButton, Stack, Typography, useTheme } from '@mui/material';
import { useAppSelector } from '../../di/redux';
import { useDispatch } from 'react-redux';
import { setError } from '../../di/redux/appSlice';
import { Close } from '@mui/icons-material';

export default function AppError() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const error = useAppSelector((s) => s.app.error);

  if (error) {
    return (
      <Stack
        direction='row'
        alignItems='center'
        padding={1}
        sx={{
          backgroundColor: theme.palette.text.primary,
          color: theme.palette.error.main,
          position: 'absolute',
          bottom: 0,
        }}
      >
        <Typography flex={1} variant='body2'>
          {error}
        </Typography>
        <IconButton color='secondary' onClick={() => dispatch(setError(null))}>
          <Close />
        </IconButton>
      </Stack>
    );
  }
  return null;
}
