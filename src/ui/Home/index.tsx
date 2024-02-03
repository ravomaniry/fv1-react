import { useState } from 'react';
import { useAppContext } from '../../di/appContext/useAppContext';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Home() {
  const { authService, apiClient } = useAppContext();
  const [resp, setResp] = useState<unknown>(null);

  return (
    <div>
      <Button
        onClick={() => {
          authService
            .registerGuest()
            .then((data) => setResp(data))
            .catch((err) => setResp(err.message));
        }}
      >
        {'Test register'}
      </Button>

      <Button
        onClick={() =>
          apiClient.teaching
            .getNew()
            .then((data) => setResp(data))
            .catch((err) => setResp(err.message))
        }
      >
        {'Test list teachings'}
      </Button>
      <div>
        <Link to='help'>
          <Button>Go to help</Button>
        </Link>
      </div>
      <pre>{JSON.stringify(resp, null, 2)}</pre>
    </div>
  );
}
