import { Link, useLocation } from 'react-router';

import AddPostButton from './buttons/AddPostButton';
import ContinueButton from './buttons/ContinueButton';
import LoginButton from './buttons/LoginButton';
import LogoutButton from './buttons/LogoutButton';
import PublishButton from './buttons/PublishButton';
import { useAuth } from './Auth';
import type { IAction } from '../utils/actions';

interface IHeaderAction extends IAction {
  isRefresh: () => void;
}

function Header(props: IHeaderAction) {
  const currentPath = useLocation().pathname;
  const { isLogged, logout } = useAuth();
  const handleLogout = () => {
    logout();
    props.isRefresh();
  };

  return (
    <header>
      <Link to="/" className="main-header-title">
        Life Updates
      </Link>
      {isLogged ? (
        <>
          {/* Navigates to a page */}
          {currentPath === '/' && <AddPostButton></AddPostButton>}

          {/* Submit a form */}
          {currentPath === '/add' && <PublishButton action={props.action}></PublishButton>}

          {/* Logs out the current user */}
          <LogoutButton action={handleLogout}></LogoutButton>
        </>
      ) : (
        <>
          {/* Submit a form */}
          {(currentPath === '/login' || currentPath === '/signup') && <ContinueButton action={props.action}></ContinueButton>}

          {/* Navigates to a page */}
          {currentPath === '/' && <LoginButton></LoginButton>}
        </>
      )}
    </header>
  );
}

export default Header;
