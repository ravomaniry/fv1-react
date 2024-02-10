import { Formik } from 'formik';
import * as yup from 'yup';
import { Box, Button, TextField } from '@mui/material';
import FormikFieldError from '../widgets/FormikFieldError';
import { useAppTexts } from '../../di/redux';

interface Props {
  disabled: boolean;
  submitButtonLabel: string;
  onSubmit: (v: FormValues) => void;
}

export interface FormValues {
  username: string;
  password: string;
}

const initialValues: FormValues = {
  username: '',
  password: '',
};

const validationSchema = yup
  .object()
  .shape({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

export default function LoginForm({ disabled, submitButtonLabel, onSubmit }: Props) {
  const texts = useAppTexts();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Box>
            <TextField
              fullWidth
              inputProps={{ 'data-cy': 'username' }}
              name='username'
              label={texts.username}
              onChange={handleChange}
              disabled={disabled}
            />
            <FormikFieldError name='username' />
          </Box>
          <Box
            marginTop={2}
            marginBottom={2}
          >
            <TextField
              fullWidth
              inputProps={{ 'data-cy': 'password' }}
              name='password'
              type='password'
              label={texts.password}
              onChange={handleChange}
              disabled={disabled}
            />
            <FormikFieldError name='password' />
          </Box>
          <Button
            disabled={disabled}
            variant='contained'
            type='submit'
            data-cy='LoginButton'
          >
            {submitButtonLabel}
          </Button>
        </form>
      )}
    </Formik>
  );
}
