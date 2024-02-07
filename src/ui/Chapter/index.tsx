import { Card, CardContent, CardHeader, CircularProgress, Typography } from '@mui/material';
import { useActiveChapter } from './useActiveChapter';
import AppContainer from '../widgets/AppContainer';
import { TeachingSection } from '../../clients/fv1';
import Markdown from 'react-markdown';

export default function ChapterScreen() {
  const active = useActiveChapter();
  if (!active) {
    return <CircularProgress />;
  }
  return (
    <AppContainer dataCy='ChapterScreen'>
      <Typography variant='h2'>{active.chapter.title}</Typography>
      {active.chapter.sections.map((section, i) => (
        <SectionCard
          key={i}
          section={section}
        />
      ))}
    </AppContainer>
  );
}

function SectionCard({ section }: { section: TeachingSection }) {
  return (
    <Card>
      <CardHeader title={section.subtitle} />
      <CardContent>
        <Markdown>{section.verses}</Markdown>
      </CardContent>
    </Card>
  );
}
