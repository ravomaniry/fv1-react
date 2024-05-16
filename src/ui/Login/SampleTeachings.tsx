import { useCallback, useState } from 'react';
import { useAppContext } from '../../di/appContext/useAppContext';
import { NewTeachingRespDto } from '../../clients/fv1';
import { useCallOnMount } from '../hooks/useCallOnMount';
import { useAuth } from '../hooks/useAuth';
import { useStartTeaching } from '../Explorer/hooks';
import { Card, CardContent, CardHeader } from '@mui/material';

function useSampleTeachings() {
  const { onRegisterGuest } = useAuth();
  const { apiClient } = useAppContext();
  const [list, setList] = useState<NewTeachingRespDto[] | null>(null);
  const startTeaching = useStartTeaching();

  const onOpen = useCallback(
    async (teaching: NewTeachingRespDto) => {
      try {
        await onRegisterGuest();
        await startTeaching(teaching);
      } catch (error) {
        console.error('Unable to open sample teaching', error);
      }
    },
    [onRegisterGuest, startTeaching],
  );

  useCallOnMount(async () => {
    try {
      setList((await apiClient.getSampleTeaching()).data);
    } catch (error) {
      console.warn('Unable to load sample teaching.', error);
    }
  });

  return {
    list,
    onOpen,
  };
}

export function SampleTeachings() {
  const { list } = useSampleTeachings();
  if (list) {
    return (
      <Card data-cy='SampleTeachings'>
        <CardContent>
          {list.map((teaching) => (
            <Card>
              <CardHeader>{teaching.title}</CardHeader>
              <CardContent>{teaching.subtitle}</CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    );
  }
  return null;
}
