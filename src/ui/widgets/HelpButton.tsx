import AppFab from './Fab';
import { routes } from '../routes';
import { QuestionMarkRounded } from '@mui/icons-material';

export default function HelpButton() {
  return (
    <AppFab href={routes.help}>
      <QuestionMarkRounded fontSize='large' data-cy='HelpButton' />
    </AppFab>
  );
}
