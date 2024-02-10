import { Box, Button } from '@mui/material';
import { useAppTexts } from '../../di/redux';

type ButtonType = 'submit' | 'reset' | 'button';

interface Props {
  disabled?: boolean;
  type?: ButtonType;
  href?: string;
  onClick?: () => void;
}

export default function ContinueButton({ type, href, disabled, onClick }: Props) {
  const texts = useAppTexts();
  return (
    <Box textAlign='right'>
      <Button
        variant='contained'
        data-cy='ContinueButton'
        type={type}
        disabled={disabled}
        href={href}
        onClick={onClick}
      >
        {texts.continueButton}
      </Button>
    </Box>
  );
}
