import { useField } from 'formik';
import { useAppTexts } from '../../di/redux';
import { Typography } from '@mui/material';

export default function FormikFieldError({ name }: { name: string }) {
  const [, meta] = useField(name);
  const texts = useAppTexts();
  if (meta.touched && meta.error) {
    return (
      <Typography component='div' variant='caption' color='secondary'>
        {texts.requiredFieldMessage}
      </Typography>
    );
  }
  return null;
}
