import { createTheme } from '@mui/material';

const primary = '#402bff';
const accent: string = '#ff5722';
export const theme = createTheme({
  palette: {
    primary: { main: primary },
    secondary: { main: accent },
  },
  components: {
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
  },
});
