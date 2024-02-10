import { ErrorMessage } from 'formik';
import { useAppTexts } from '../../di/redux';
import { Typography } from '@mui/material';

export default function FormikFieldError({ name }: { name: string }) {
  const texts = useAppTexts();
  return (
    <ErrorMessage
      name={name}
      render={() => (
        <Typography
          component='div'
          variant='caption'
          color='secondary'
          data-cy={`FieldError:${name}`}
        >
          {texts.requiredFieldMessage}
        </Typography>
      )}
    />
  );
}
