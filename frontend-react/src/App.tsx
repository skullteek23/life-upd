import { useEffect } from 'react';
import { Outlet } from 'react-router';

import Header from './components/Header';

function App() {
  useEffect(() => {
    console.log('Frontend version: ', APP_VERSION);
  }, []);

  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
    </>
  );
}

export default App;
