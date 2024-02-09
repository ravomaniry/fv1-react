import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import HomeScreenIndex from './Home';
import { useAppSelector } from '../di/redux';
import { Logger } from '../lib/logger';
import { ReactNode, lazy } from 'react';
import { routes } from './routes';
import HomeRoutesContainer from './Home/RoutesContainer';
const TeachingSummary = lazy(() => import('./TeachingSummary'));
const Chapter = lazy(() => import('./Chapter'));
const Quiz = lazy(() => import('./Quiz'));
const Score = lazy(() => import('./Score'));
const Explorer = lazy(() => import('./Explorer'));
const Login = lazy(() => import('./Login'));
const Register = lazy(() => import('./Register'));
const Help = lazy(() => import('./Help'));

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
      <Route
        path={routes.login}
        element={<Redirect component={<Login />} />}
      />
      <Route
        path={routes.register}
        element={<Redirect component={<Register />} />}
      />
      <Route
        path={routes.home}
        element={<Redirect component={<HomeRoutesContainer />} />}
      >
        <Route
          index
          element={<Redirect component={<HomeScreenIndex />} />}
        />
        <Route path='teaching/:teachingId'>
          <Route
            index
            element={<Redirect component={<TeachingSummary />} />}
          />
          <Route path='chapter/:chapterIndex'>
            <Route
              index
              element={<Redirect component={<Chapter />} />}
            />
            <Route
              path={routes.quiz}
              element={<Redirect component={<Quiz />} />}
            />
            <Route
              path={routes.score}
              element={<Redirect component={<Score />} />}
            />
          </Route>
        </Route>
        <Route
          path={routes.explorer}
          element={<Redirect component={<Explorer />} />}
        />
        <Route
          path={routes.help}
          element={<Help />}
        />
      </Route>
    </Routes>
  );
}
