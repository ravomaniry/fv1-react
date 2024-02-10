import { Search } from '@mui/icons-material';
import { useAppSelector, useAppTexts } from '../../di/redux';
import { routes } from '../routes';
import AppFab from '../widgets/Fab';
import HomePageContainer from '../widgets/HomePageContainer';
import WrapInLoader from '../widgets/WrapInLoader';
import { Box, Card, CardActionArea, CardContent, CardHeader, LinearProgress, Typography } from '@mui/material';
import { NewTeachingRespDto } from '../../clients/fv1';
import { UiProgressModel } from '../../models/progress';
import { Link } from 'react-router-dom';
import NewTeachingCard from '../Explorer/NewTeachingCard';

export default function HomeScreenIndex() {
  const progresses = useAppSelector((s) => s.browser.progresses);
  const newTeachings = useAppSelector((s) => s.browser.newTeachings);
  const isReady = Boolean(progresses);
  return (
    <HomePageContainer
      userMenu
      dataCy='HomeScreen'
      fab={isReady ? <ExplorerButton /> : null}
    >
      <WrapInLoader
        isReady={!!progresses}
        builder={() => {
          if (!progresses?.length && !newTeachings?.length) {
            return <EmptyScreen />;
          }
          return (
            <RegularScreen
              progresses={progresses!}
              newTeachings={newTeachings}
            />
          );
        }}
      />
    </HomePageContainer>
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
  newTeachings: NewTeachingRespDto[] | undefined;
}) {
  const texts = useAppTexts();
  return (
    <Box>
      {progresses.length > 0 && <Typography variant='h3'>{texts.teachingsInProgress}</Typography>}
      {progresses.map((progress) => (
        <ProgressCard
          key={progress.id}
          progress={progress}
        />
      ))}
      {Boolean(newTeachings?.length) && <Typography variant='subtitle2'>{texts.teachingsAvailable}</Typography>}
      {newTeachings?.map((teaching) => (
        <NewTeachingCard
          key={teaching.id}
          teaching={teaching}
        />
      ))}
    </Box>
  );
}

function ProgressCard({ progress }: { progress: UiProgressModel }) {
  return (
    <Link to={`/teaching/${progress.teaching.id}`}>
      <Card>
        <CardActionArea>
          <CardHeader
            data-cy={`HomeTeachingTitle:${progress.teaching.id}`}
            title={progress.teaching.title}
          />
          <CardContent>
            <Typography
              variant='body2'
              data-cy={`HomeTeachingSubtitle:${progress.teaching.id}`}
            >
              {progress.teaching.subtitle}
            </Typography>
            <LinearProgress
              data-cy={`HomeScreenProgress:${progress.teaching.id}`}
              variant='determinate'
              value={progress.completionPercentage * 100}
            />
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
