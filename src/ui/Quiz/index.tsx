import * as yup from 'yup';
import {
  Box,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { useActiveChapter } from '../Chapter/useActiveChapter';
import AppContainer from '../widgets/AppContainer';
import WrapInLoader from '../widgets/WrapInLoader';
import { useAppDispatch, useAppTexts } from '../../di/redux';
import { Formik, useFormik } from 'formik';
import { useCallback, useMemo } from 'react';
import { TeachingQuestion } from '../../clients/fv1';
import FormikFieldError from '../widgets/FormikFieldError';
import ContinueButton from '../widgets/ContinueButton';
import { arrayToObject } from '../../lib/arrayToObject';
import { calculateWrongAnswers, updateProgress } from '../../models/progress';
import { useNavigate } from 'react-router-dom';
import { replaceProgress, setWrongAnswers } from '../../di/redux/browserSlice';
import { useAppContext } from '../../di/appContext/useAppContext';
import { setError } from '../../di/redux/appSlice';
import ChapterTitle from '../Chapter/ChapterTitle';

type OnChange = ReturnType<typeof useFormik>['handleChange'];

function useQuiz() {
  const texts = useAppTexts();
  const { apiClient } = useAppContext();
  const dispatch = useAppDispatch();
  const active = useActiveChapter();
  const navigate = useNavigate();

  const validationSchema = useMemo(() => {
    return yup.object().shape(
      arrayToObject(
        active?.chapter.questions ?? [],
        (q) => q.key,
        () => yup.string().required(),
      ),
    );
  }, [active?.chapter.questions]);

  const initialValues = useMemo(() => {
    return arrayToObject(
      active?.chapter.questions ?? [],
      (q) => q.key,
      () => '',
    );
  }, [active?.chapter.questions]);

  const onSubmit = useCallback(
    async (values: Record<string, string>) => {
      const wrongAnswers = calculateWrongAnswers(active!.chapter.questions, values);
      const updated = updateProgress(active!.progress, active!.chapterIndex, wrongAnswers);
      dispatch(setWrongAnswers(wrongAnswers));
      dispatch(replaceProgress(updated));
      navigate('../score', { replace: true });
      try {
        await apiClient.progress.save(active!.progress.id, {
          scores: updated.scores,
          clientTimestamp: updated.clientTimestamp,
        });
      } catch (error) {
        console.log({ error });
        dispatch(setError(texts.errorProgressNotSaved));
      }
    },
    [active, apiClient.progress, dispatch, navigate, texts.errorProgressNotSaved],
  );

  return {
    active,
    initialValues,
    validationSchema,
    onSubmit,
  };
}

export default function QuizScreen() {
  const texts = useAppTexts();
  const { active, initialValues, validationSchema, onSubmit } = useQuiz();
  return (
    <AppContainer dataCy='QuizScreen'>
      <WrapInLoader
        isReady={!!active}
        builder={() => (
          <>
            <ChapterTitle active={active} />
            <Typography>{texts.quizHelp}</Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ values, isSubmitting, handleSubmit, handleChange }) => (
                <form onSubmit={handleSubmit}>
                  {active?.chapter.questions.map((question, i) => (
                    <QuestionField
                      index={i}
                      disabled={isSubmitting}
                      key={question.key}
                      question={question}
                      value={values?.[question.key]}
                      onChange={handleChange}
                    />
                  ))}
                  {isSubmitting ? (
                    <CircularProgress />
                  ) : (
                    <ContinueButton
                      disabled={isSubmitting}
                      type='submit'
                    />
                  )}
                </form>
              )}
            </Formik>
          </>
        )}
      />
    </AppContainer>
  );
}

function QuestionField({
  index,
  question,
  value,
  disabled,
  onChange,
}: {
  index: number;
  question: TeachingQuestion;
  value: string | undefined;
  disabled: boolean;
  onChange: OnChange;
}) {
  return (
    <Box>
      <Divider />
      <FormControl>
        <FormLabel data-cy={`Question:${question.key}`}>
          {index + 1}. {question.question}
        </FormLabel>
        <RadioGroup
          value={value ?? null}
          name={question.key}
          onChange={onChange}
        >
          {question.options.map((option, i) => (
            <FormControlLabel
              key={i}
              data-cy={`Option:${question.key}:${option}`}
              value={i}
              label={option}
              control={<Radio disabled={disabled} />}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <FormikFieldError name={question.key} />
    </Box>
  );
}
