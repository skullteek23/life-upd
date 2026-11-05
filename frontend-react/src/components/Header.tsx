import { Link, useLocation, useNavigate } from 'react-router';

import AddPostButton from './buttons/AddPostButton';
import ContinueButton from './buttons/ContinueButton';
import LoginButton from './buttons/LoginButton';
import LogoutButton from './buttons/LogoutButton';
import EditButtons from './buttons/EditButtons';
import { useSubmitAction } from './context/SubmitAction';
import { useAuth } from './context/Auth';
import { useRefreshAction } from './context/refreshAction';
import Loader from './Loader';
import Error from './Error';
import { useLoadingAction } from './context/LoadingAction';
import { useEffect, useState } from 'react';

type INDICATOR_STATUS = 'normal' | 'error';

function Header() {
  const currentPath = useLocation().pathname;
  const navigate = useNavigate();
  const { isLogged, logout } = useAuth();
  const [_isSubmit, setIsSubmit] = useSubmitAction();
  const [_isRefresh, setIsRefresh] = useRefreshAction();
  const [loadingStatus, _setIsLoading] = useLoadingAction();
  const [status, setStatus] = useState<INDICATOR_STATUS>();

  useEffect(() => {
    if (loadingStatus.status === 'error') {
      setStatus('error');
      const timer = resetStatus();
      return () => clearTimeout(timer);
    } else {
      setStatus('normal');
    }
  }, [loadingStatus]);

  const handleLogout = () => {
    logout();
    setIsRefresh(true);
    navigate('/');
  };

  const resetStatus = () =>
    setTimeout(() => {
      setStatus('normal');
    }, 3000); // Wait 3 seconds before fading

  return (
    <>
      {loadingStatus.status === 'error' && status === 'error' && <Error err={loadingStatus.error} />}
      <header>
        <Link to="/" className="main-header-title">
          Life Updates
        </Link>
        {isLogged ? (
          <>
            {/* Navigates to a page */}
            {currentPath === '/' && <AddPostButton></AddPostButton>}

            {/* Submit a form */}
            {currentPath === '/add' && <EditButtons action={setIsSubmit.bind(null, true)}></EditButtons>}
            {currentPath.startsWith('/edit') && <EditButtons action={setIsSubmit.bind(null, true)}></EditButtons>}

            {/* Logs out the current user */}
            <LogoutButton action={handleLogout}></LogoutButton>
          </>
        ) : (
          <>
            {/* Submit a form */}
            {(currentPath === '/login' || currentPath === '/signup') && <ContinueButton action={setIsSubmit.bind(null, true)}></ContinueButton>}

            {/* Navigates to a page */}
            {currentPath === '/' && <LoginButton></LoginButton>}
          </>
        )}
      </header>
      {loadingStatus.status === 'loading' && <Loader></Loader>}
    </>
  );
}

export default Header;
