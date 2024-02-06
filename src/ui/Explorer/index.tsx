import { Button, Stack, Typography } from '@mui/material';
import { useAppSelector, useAppTexts } from '../../di/redux';
import AppContainer from '../widgets/AppContainer';
import { useLoadNewTeachings } from './hooks';
import WrapInLoader from '../widgets/WrapInLoader';
import NewTeachingCard from './NewTeachingCard';

export default function ExplorerScreen() {
  const list = useAppSelector((s) => s.browser.newTeachings);
  useLoadNewTeachings();
  return (
    <AppContainer>
      <WrapInLoader
        isReady={!!list}
        builder={() => {
          if (list?.length === 0) {
            return <NoDataMessage />;
          }
          return list?.map((teaching) => <NewTeachingCard key={teaching.id} teaching={teaching} />);
        }}
      />
    </AppContainer>
  );
}

function NoDataMessage() {
  const texts = useAppTexts();
  return (
    <Stack justifyContent='center'>
      <Typography data-cy='NoDataMessage'>{texts.noNewTeaching}</Typography>
      <Button href='/'>{texts.close}</Button>
    </Stack>
  );
}
