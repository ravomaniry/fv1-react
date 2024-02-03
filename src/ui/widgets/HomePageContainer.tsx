import { Box, Card, CardContent, Stack, Typography, useTheme } from '@mui/material';
import { PropsWithChildren } from 'react';
import ResponsivePadding from './ResponsivePadding';
import { useAppTexts } from '../../di/redux';

function Header() {
  const text = useAppTexts();
  const theme = useTheme();
  return (
    <Box
      sx={{ backgroundColor: theme.palette.primary.main, maxHeight: '40vh' }}
      display='flex'
      flexDirection='column'
      justifyContent='center'
      position='relative'
      flexGrow={1}
    >
      <ResponsivePadding>
        <Typography variant='h3' color='white' fontFamily='Jetbrains Mono, monospace' fontWeight='bold'>
          {text.title1}
        </Typography>
        <Box>
          <Typography
            sx={{ borderRadius: 20, backgroundColor: theme.palette.secondary.main }}
            padding={1}
            paddingLeft={2}
            paddingRight={2}
            variant='h6'
            color='white'
            fontWeight='bold'
            component='span'
            fontFamily='Jetbrains Mono, monospace'
          >
            {text.title2}
          </Typography>
        </Box>
        <Typography zIndex={2} color='white' variant='body2' marginTop={1} position='relative'>
          {text.appSlogan}
        </Typography>
      </ResponsivePadding>
      <Box
        zIndex={1}
        sx={{
          position: 'absolute',
          top: '1vw',
          right: '5vw',
          width: '25vw',
          height: '25vw',
          maxWidth: '250px',
          maxHeight: '250px',
          borderRadius: '50%',
          background: theme.palette.primary.light,
        }}
      />
      <Box
        zIndex={1}
        sx={{
          position: 'absolute',
          bottom: '1vw',
          left: '5vw',
          width: '10vw',
          height: '10vw',
          maxWidth: '100px',
          maxHeight: '100px',
          borderRadius: '50%',
          background: theme.palette.primary.light,
        }}
      />
    </Box>
  );
}

export default function HomePageContainer({ children }: PropsWithChildren) {
  return (
    <Box display='flex' flexDirection='column' minHeight='100vh'>
      <Header />
      <Box flex={0} marginTop={2}>
        <ResponsivePadding>
          <Card>
            <CardContent>
              <Stack direction='column' justifyContent='center' spacing={2}>
                {children}
              </Stack>
            </CardContent>
          </Card>
        </ResponsivePadding>
      </Box>
    </Box>
  );
}
