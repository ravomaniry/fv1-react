import { Navigate, Route, Routes, useMatch } from 'react-router-dom';
import Home from './Home';
import TeachingSummary from './TeachingSummary';
import Chapter from './Chapter';
import Quiz from './Quiz';
import Score from './Score';
import Explorer from './Explorer';
import Login from './Login';
import Register from './Register';
import Help from './Help';
import { useAppSelector } from '../di/redux';
import { Logger } from '../lib/logger';
import { ReactNode } from 'react';
import { routes } from './routes';

const logger = new Logger('AppRouter');

function Guard({ component }: { component: ReactNode }) {
  const route = useMatch('');
  const user = useAppSelector((state) => state.app.user);
  const isOnAuthPages = route?.pathname !== routes.login && route?.pathname !== routes.register;
  if (user && isOnAuthPages) {
    logger.debug('Redirecting to', routes.home);
    return <Navigate to={routes.home} />;
  } else if (!user) {
    logger.debug('Redirecting to', routes.login);
    return <Navigate to={routes.login} />;
  }
  return component;
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path={routes.home} element={<Guard component={<Home />} />} />
      <Route path={routes.login} element={<Login />} />
      <Route path={routes.register} element={<Register />} />
      <Route path='teaching/:teachingId' element={<Guard component={<TeachingSummary />} />}>
        <Route path='chapter/:chapterIndex' element={<Guard component={<Chapter />} />}>
          <Route path={routes.quiz} element={<Guard component={<Quiz />} />} />
          <Route path={routes.score} element={<Guard component={<Score />} />} />
        </Route>
      </Route>
      <Route path={routes.explorer} element={<Guard component={<Explorer />} />} />
      <Route path={routes.help} element={<Help />} />
    </Routes>
  );
}
