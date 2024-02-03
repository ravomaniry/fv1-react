import { useAppSelector } from '../../di/redux';
import { Typography } from '@mui/material';

function LoginError() {
  const error = useAppSelector((s) => s.app.error);
  if (error) {
    return <Typography data-cy='LoginError'>{error}</Typography>;
  }
  return null;
}

export default LoginError;
