import { Box, Card, CardContent, Stack, Typography, useTheme } from '@mui/material';
import { PropsWithChildren, ReactNode } from 'react';
import ResponsivePadding from './ResponsivePadding';
import { useAppTexts } from '../../di/redux';
import UserMenu from './UserMenu';

interface Props {
  fab: ReactNode;
  dataCy: string;
}

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
      overflow='hidden'
      flexGrow={1}
    >
      <ResponsivePadding zIndex={2}>
        <Box padding={1}>
          <Stack direction='row'>
            <Box flexGrow={1}>
              <Typography
                variant='h3'
                color='white'
                fontFamily='Jetbrains Mono, monospace'
                fontWeight='bold'
              >
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
              <Typography
                color='white'
                variant='body2'
                marginTop={1}
              >
                {text.appSlogan}
              </Typography>
            </Box>
            <UserMenu />
          </Stack>
        </Box>
      </ResponsivePadding>
      <Box
        zIndex={0}
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
        zIndex={0}
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

export default function HomePageContainer({ children, fab, dataCy }: PropsWithChildren<Props>) {
  return (
    <Box
      display='flex'
      flexDirection='column'
      minHeight='100vh'
      data-cy={dataCy}
    >
      <Header />
      <Box
        flex={0}
        marginTop={2}
      >
        <ResponsivePadding>
          <Card>
            <CardContent>
              <Stack
                direction='column'
                justifyContent='center'
                spacing={2}
              >
                {children}
              </Stack>
            </CardContent>
          </Card>
        </ResponsivePadding>
      </Box>
      {fab}
    </Box>
  );
}
