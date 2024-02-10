import { IconButton, useTheme } from '@mui/material';
import { routes } from '../routes';
import { Help } from '@mui/icons-material';

export default function WhiteHelpButton() {
  const theme = useTheme();
  return (
    <IconButton href={routes.help}>
      <Help sx={{ color: theme.palette.common.white }} />
    </IconButton>
  );
}
