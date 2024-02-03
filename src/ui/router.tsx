import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
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

function Redirect({ component }: { component: ReactNode }) {
  const { pathname } = useLocation();
  const user = useAppSelector((state) => state.app.user);
  const isOnAuthPages = pathname === routes.login || pathname === routes.register;
  if (user && isOnAuthPages) {
    logger.debug('Redirecting to', routes.home);
    return <Navigate to={routes.home} />;
  } else if (!user && !isOnAuthPages) {
    logger.debug('Redirecting to', routes.login);
    return <Navigate to={routes.login} />;
  }
  return component;
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path={routes.home} element={<Redirect component={<Home />} />} />
      <Route path={routes.login} element={<Redirect component={<Login />} />} />
      <Route path={routes.register} element={<Redirect component={<Register />} />} />
      <Route path='teaching/:teachingId' element={<Redirect component={<TeachingSummary />} />}>
        <Route path='chapter/:chapterIndex' element={<Redirect component={<Chapter />} />}>
          <Route path={routes.quiz} element={<Redirect component={<Quiz />} />} />
          <Route path={routes.score} element={<Redirect component={<Score />} />} />
        </Route>
      </Route>
      <Route path={routes.explorer} element={<Redirect component={<Explorer />} />} />
      <Route path={routes.help} element={<Help />} />
    </Routes>
  );
}
