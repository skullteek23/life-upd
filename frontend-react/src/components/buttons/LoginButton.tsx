import { Link } from 'react-router';

function LoginButton() {
  return (
    <Link to="/login">
      <button className="primary-btn action-btn" id="action-btn">
        Login
      </button>
    </Link>
  );
}

export default LoginButton;
