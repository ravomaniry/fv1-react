import { Suspense } from 'react';
import AppRouter from './ui/router';
import SplashScreen from './ui/Splash';
import { useAppSelector } from './di/redux';

function App() {
  const isInitialized = useAppSelector((s) => s.app.isInitialized);
  // avoid redirecting to /login page when the app is not initialized.
  if (!isInitialized) {
    return null;
  }
  return (
    <Suspense fallback={<SplashScreen />}>
      <AppRouter />
    </Suspense>
  );
}

export default App;
