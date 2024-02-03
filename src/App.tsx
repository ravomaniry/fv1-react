import { AppContextProvider } from './di/appContext';
import Home from './ui/home';

function App() {
  return (
    <AppContextProvider>
      <Home />
    </AppContextProvider>
  );
}

export default App;
