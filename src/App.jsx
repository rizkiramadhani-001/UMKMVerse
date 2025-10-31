import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { useState, useEffect } from 'react';
import Loading from './components/common/Loading';

function App() {
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isInitializing) {
    return <Loading fullScreen text="Loading UMKMVerse" />;
  }

  return <RouterProvider router={router} />;
}

export default App;