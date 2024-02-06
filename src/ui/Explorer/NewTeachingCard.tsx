import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { NewTeachingRespDto } from '../../clients/fv1';
import { useAppContext } from '../../di/appContext/useAppContext';
import { useAppDispatch, useAppSelector, useAppTexts } from '../../di/redux';
import { setError } from '../../di/redux/appSlice';
import { setNewTeachings, setProgresses } from '../../di/redux/browserSlice';
import { getErrorMessage } from '../../services/api/mapError';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { UiProgressModel } from '../../models/progress';

function useStartTeaching(teaching: NewTeachingRespDto) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { apiClient } = useAppContext();
  const texts = useAppTexts();
  const progresses = useAppSelector((s) => s.browser.progresses);
  const newTeachings = useAppSelector((s) => s.browser.newTeachings);

  return useCallback(async () => {
    // set to null to display loader
    dispatch(setProgresses(null));
    dispatch(setNewTeachings(null));
    try {
      const newProgress = await apiClient.progress.start({ teachingId: teaching.id });
      dispatch(
        setProgresses([
          ...(progresses?.filter((p) => p.teaching.id !== teaching.id) ?? []),
          new UiProgressModel(newProgress.data),
        ]),
      );
      navigate(`/teaching/${teaching.id}`);
    } catch (error) {
      dispatch(setError(getErrorMessage(error, texts)));
      dispatch(setProgresses(progresses));
    }
    dispatch(setNewTeachings(newTeachings));
  }, [apiClient.progress, dispatch, navigate, newTeachings, progresses, teaching.id, texts]);
}

export default function NewTeachingCard({ teaching }: { teaching: NewTeachingRespDto }) {
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
