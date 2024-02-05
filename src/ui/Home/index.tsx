import { Search } from '@mui/icons-material';
import { useAppDispatch, useAppSelector, useAppTexts } from '../../di/redux';
import { routes } from '../routes';
import AppFab from '../widgets/Fab';
import HomePageContainer from '../widgets/HomePageContainer';
import WrapInLoader from '../widgets/WrapInloader';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { useCallOnMount } from '../hooks/useCallOnMount';
import { useAppContext } from '../../di/appContext/useAppContext';
import { setError } from '../../di/redux/appSlice';
import { getErrorMessage } from '../../services/api/mapError';
import { setProgresses } from '../../di/redux/browserSlice';
import { useLoadNewTeachings } from '../Explorer/hooks';
import { NewTeachingRespDto, ProgressEntity } from '../../clients/fv1';

function useHome() {
  const texts = useAppTexts();
  const { apiClient } = useAppContext();
  const dispatch = useAppDispatch();

  useCallOnMount(async () => {
    try {
      const progresses = await apiClient.progress.getProgresses();
      dispatch(setProgresses(progresses.data));
    } catch (error) {
      dispatch(setError(getErrorMessage(error, texts)));
    }
  });
  useLoadNewTeachings();
}

export default function Home() {
  useHome();
  const progresses = useAppSelector((s) => s.browser.progresses);
  const newTeachings = useAppSelector((s) => s.browser.newTeachings);
  const isReady = Boolean(progresses);
  return (
    <div data-cy='HomeScreen'>
      <HomePageContainer fab={isReady ? <ExplorerButton /> : null}>
        <WrapInLoader
          isReady={progresses !== null}
          builder={() =>
            !progresses?.length && !newTeachings?.length ? (
              <EmptyScreen />
            ) : (
              <RegularScreen progresses={progresses!} newTeachings={newTeachings} />
            )
          }
        />
      </HomePageContainer>
    </div>
  );
}

function ExplorerButton() {
  return (
    <AppFab href={routes.explorer}>
      <Search />
    </AppFab>
  );
}

function EmptyScreen() {
  const texts = useAppTexts();
  return <Typography data-cy='EmptyScreen'>{texts.explorerHelp}</Typography>;
}

function RegularScreen({
  progresses,
  newTeachings,
}: {
  progresses: ProgressEntity[];
  newTeachings: NewTeachingRespDto[] | null;
}) {
  const texts = useAppTexts();
  return (
    <Box>
      {progresses.length > 0 && <Typography variant='subtitle2'>{texts.teachingsInProgress}</Typography>}
      {progresses.map((progress) => (
        <Card>
          <CardContent>Progress: {progress.teaching.title} </CardContent>
        </Card>
      ))}
      {newTeachings && <Typography variant='subtitle2'>{texts.teachingsAvailable}</Typography>}
      {newTeachings?.map((teaching) => (
        <Card data-cy={`NewTeaching:${teaching.id}`}>
          <CardContent>
            <Typography>{teaching.title}</Typography>
            <Typography variant='body2'>{teaching.subtitle}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
