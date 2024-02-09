import { Box, Button } from '@mui/material';
import { useAppTexts } from '../../di/redux';

export default function ContinueButton({ onClick, href }: { onClick?: () => void; href?: string }) {
  const texts = useAppTexts();
  return (
    <Box textAlign='right'>
      <Button
        variant='contained'
        data-cy='ContinueButton'
        href={href}
        onClick={onClick}
      >
        {texts.continueButton}
      </Button>
    </Box>
  );
}
