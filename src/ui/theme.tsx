import { createTheme, LinkProps } from '@mui/material';
import { LinkBehavior } from '../lib/LinkBehavior';

const primary = '#402bff';
const accent: string = '#ff5722';

export const theme = createTheme({
  palette: {
    primary: { main: primary },
    secondary: { main: accent },
  },
  components: {
    MuiLink: {
      defaultProps: { component: LinkBehavior } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: { LinkComponent: LinkBehavior },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: primary,
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 1,
        sx: { marginBottom: 1 },
      },
    },
  },
});
