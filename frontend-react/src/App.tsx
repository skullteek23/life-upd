import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';

import Header from './components/Header';
import type { ActionOutletContext } from './utils/actions';

function App() {
  const [isSubmit, setIsSubmit] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);

  useEffect(() => {
    console.log('Frontend version: ', APP_VERSION);
  }, []);

  return (
    <>
      <Header action={setIsSubmit.bind(null, true)} isRefresh={setIsRefresh.bind(null, true)}></Header>
      <Outlet
        context={
          {
            submission: [isSubmit, setIsSubmit],
            refresh: [isRefresh, setIsRefresh],
          } as ActionOutletContext
        }
      ></Outlet>
    </>
  );
}

export default App;
