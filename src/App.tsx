import { Suspense } from 'react';
import AppRouter from './ui/router';
import SplashScreen from './ui/Splash';

function App() {
  return (
    <Suspense fallback={<SplashScreen />}>
      <AppRouter />
    </Suspense>
  );
}

export default App;
