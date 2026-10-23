import { Link, useLocation } from 'react-router';
import AddPostButton from './buttons/AddPostButton';
import ContinueButton from './buttons/ContinueButton';
import LoginButton from './buttons/LoginButton';
import LogoutButton from './buttons/LogoutButton';
import PublishButton from './buttons/PublishButton';
import { useContext } from 'react';
import AuthContext from './Auth';

function Header() {
  const currentPath = useLocation().pathname;
  const isLoggedIn = useContext(AuthContext);
  return (
    <header>
      <Link to="/" className="main-header-title">
        Life Updates
      </Link>
      {isLoggedIn ? (
        <>
          {currentPath === '/' && <AddPostButton></AddPostButton>}
          {currentPath === '/add' && <PublishButton></PublishButton>}
          <LogoutButton></LogoutButton>
        </>
      ) : (
        <>
          {(currentPath === '/login' || currentPath === '/signup') && <ContinueButton></ContinueButton>}
          {currentPath === '/' && <LoginButton></LoginButton>}
        </>
      )}
    </header>
  );
}

export default Header;
