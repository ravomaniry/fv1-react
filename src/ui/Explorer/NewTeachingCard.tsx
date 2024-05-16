import { Card, CardActionArea, CardContent, CardHeader, Typography } from '@mui/material';
import { NewTeachingRespDto } from '../../clients/fv1';
import { useStartTeaching } from './hooks';

export default function NewTeachingCard({ teaching }: { teaching: NewTeachingRespDto }) {
  const onClick = useStartTeaching();
  return (
    <Card
      onClick={() => onClick(teaching)}
      data-cy={`NewTeaching:${teaching.id}`}
    >
      <CardActionArea>
        <CardHeader title={teaching.title} />
        <CardContent>
          <Typography variant='body2'>{teaching.subtitle}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
