import { Avatar, AppBar as MuiAppBar, Stack, Toolbar, Typography, useTheme } from '@mui/material';
import ResponsivePadding from './ResponsivePadding';
import { useAppTexts } from '../../di/redux';
import UserMenu from './UserMenu';
import WhiteHelpButton from './WhiteHelpButton';
import { Link } from 'react-router-dom';

export default function AppBar() {
  const texts = useAppTexts();
  const theme = useTheme();
  return (
    <MuiAppBar position='static'>
      <ResponsivePadding>
        <Toolbar disableGutters>
          <Stack
            flexGrow={1}
            direction='row'
            alignItems='end'
          >
            <Link to='/'>
              <Avatar>
                <img
                  width='110%'
                  src='/icon.png'
                  alt='logo'
                />
              </Avatar>
            </Link>
            <Typography
              marginLeft={2}
              color='white'
              fontWeight='bold'
              fontSize={20}
              fontFamily='Jetbrains Mono, monospace'
            >
              {texts.title1}
            </Typography>
            <Typography
              color='white'
              paddingLeft={1}
              paddingRight={1}
              fontWeight='bold'
              variant='body2'
              sx={{ borderRadius: 10, backgroundColor: theme.palette.secondary.main }}
              fontFamily='Jetbrains Mono, monospace'
            >
              {texts.shortTitle2}
            </Typography>
          </Stack>
          <WhiteHelpButton />
          <UserMenu />
        </Toolbar>
      </ResponsivePadding>
    </MuiAppBar>
  );
}
