import { Search } from '@mui/icons-material';
import { useAppDispatch, useAppSelector, useAppTexts } from '../../di/redux';
import { routes } from '../routes';
import AppFab from '../widgets/Fab';
import HomePageContainer from '../widgets/HomePageContainer';
import WrapInLoader from '../widgets/WrapInLoader';
import { Box, Card, CardContent, CardHeader, LinearProgress, Typography } from '@mui/material';
import { useCallOnMount } from '../hooks/useCallOnMount';
import { useAppContext } from '../../di/appContext/useAppContext';
import { setError } from '../../di/redux/appSlice';
import { getErrorMessage } from '../../services/api/mapError';
import { setProgresses } from '../../di/redux/browserSlice';
import { useLoadNewTeachings } from '../Explorer/hooks';
import { NewTeachingRespDto } from '../../clients/fv1';
import { UiProgressModel } from '../../models/progress';
import { Link, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { Logger } from '../../lib/logger';

const logger = new Logger('HomeScreen');

function useHome() {
  const texts = useAppTexts();
  const { apiClient } = useAppContext();
  const dispatch = useAppDispatch();

  useCallOnMount(async () => {
    try {
      const progresses = await apiClient.progress.getProgresses();
      dispatch(setProgresses(progresses.data.map((p) => new UiProgressModel(p))));
    } catch (error) {
      dispatch(setError(getErrorMessage(error, texts)));
    }
  });
  useLoadNewTeachings();
}

function useStartTeaching(teaching: NewTeachingRespDto) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { apiClient } = useAppContext();
  const texts = useAppTexts();
  const progresses = useAppSelector((s) => s.browser.progresses);

  return useCallback(async () => {
    // set to null to display loader
    dispatch(setProgresses(null));
    try {
      const newProgress = await apiClient.progress.start({ teachingId: teaching.id });
      dispatch(
        setProgresses([
          ...(progresses?.filter((p) => p.teaching.id !== teaching.id) ?? []),
          new UiProgressModel(newProgress.data),
        ]),
      );
      navigate(`teaching/${teaching.id}`);
      logger.debug(`teaching/${teaching.id}`);
    } catch (error) {
      dispatch(setError(getErrorMessage(error, texts)));
      dispatch(setProgresses(progresses));
    }
  }, [apiClient.progress, dispatch, navigate, progresses, teaching.id, texts]);
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
      <Search data-cy='ExplorerButton' />
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
  progresses: UiProgressModel[];
  newTeachings: NewTeachingRespDto[] | null;
}) {
  const texts = useAppTexts();
  return (
    <Box>
      {progresses.length > 0 && <Typography variant='subtitle2'>{texts.teachingsInProgress}</Typography>}
      {progresses.map((progress) => (
        <ProgressCard key={progress.id} progress={progress} />
      ))}
      {Boolean(newTeachings?.length) && <Typography variant='subtitle2'>{texts.teachingsAvailable}</Typography>}
      {newTeachings?.map((teaching) => <NewTeachingCard key={teaching.id} teaching={teaching} />)}
    </Box>
  );
}

function ProgressCard({ progress }: { progress: UiProgressModel }) {
  return (
    <Link to={`/teaching/${progress.teaching.id}`}>
      <Card>
        <CardHeader data-cy={`HomeTeachingTitle:${progress.teaching.id}`} title={progress.teaching.title} />
        <CardContent>
          <Typography variant='body2' data-cy={`HomeTeachingSubtitle:${progress.teaching.id}`}>
            {progress.teaching.subtitle}
          </Typography>
          <LinearProgress
            data-cy={`HomeScreenProgress:${progress.teaching.id}`}
            variant='determinate'
            value={progress.completionPercentage * 100}
          />
        </CardContent>
      </Card>
    </Link>
  );
}

function NewTeachingCard({ teaching }: { teaching: NewTeachingRespDto }) {
  const onClick = useStartTeaching(teaching);
  return (
    <Card onClick={onClick} data-cy={`NewTeaching:${teaching.id}`}>
      <CardHeader title={teaching.title} />
      <CardContent>
        <Typography variant='body2'>{teaching.subtitle}</Typography>
      </CardContent>
    </Card>
  );
}
