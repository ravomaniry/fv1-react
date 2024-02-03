import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function HelpScreen() {
  return (
    <div data-cy='helpScreen'>
      Help
      <div>
        <Link to='/'>
          <Button>Home</Button>
        </Link>
      </div>
    </div>
  );
}