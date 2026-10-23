import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';

import './styles/App.scss';

import Header from './components/Header';
import AuthContext from './components/Auth';
import BrowserStorage from './utils/storage';

function App() {
  const [isLoggedIn, setLoginState] = useState(false);
  useEffect(() => {
    console.log('Frontend version: ', APP_VERSION);
    const token = BrowserStorage.get('token');
    if (token) {
      setLoginState(true);
    } else {
      setLoginState(false);
    }
  }, [APP_VERSION]);
  return (
    <>
      <AuthContext value={isLoggedIn}>
        <Header></Header>
        <Outlet></Outlet>
      </AuthContext>
    </>
  );
}

export default App;
