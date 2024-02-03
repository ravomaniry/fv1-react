import { Link } from 'react-router-dom';
import AppFab from './Fab';
import { routes } from '../routes';
import { Help } from '@mui/icons-material';

export default function HelpButton() {
  return (
    <AppFab>
      <Link data-cy='helpButton' to={routes.help}>
        <Help />
      </Link>
    </AppFab>
  );
}