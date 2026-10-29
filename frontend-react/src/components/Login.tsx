import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import { login } from '../services/auth.service';
import { useAuth } from './context/Auth';
import { useSubmitAction } from './context/SubmitAction';

function Login() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { login: updateLoginState } = useAuth();
  const [isSubmit, setIsSubmit] = useSubmitAction();

  useEffect(() => {
    if (isSubmit) {
      handleSubmit();
      setIsSubmit(false);
    }
  }, [isSubmit]);

  const handleSubmit = () => {
    const username = String(usernameRef?.current?.value)?.trim();
    const password = String(passwordRef?.current?.value)?.trim();
    login(username, password).then((token) => {
      if (token) {
        navigate('/');
        updateLoginState(token);
      }
    });
  };

  return (
    <section className="feed">
      <ul id="posts">
        <li>
          <form id="login-form">
            <article className="card">
              <div className="card-title">Login with username</div>
              <div className="card-content">
                <div className="input-field">
                  <input type="text" ref={usernameRef} name="username" placeholder="Username" id="username" />
                </div>
                <div className="input-field">
                  <input type="password" ref={passwordRef} name="password" placeholder="Password" id="password" />
                </div>
              </div>
              <footer>
                <div className="footer-subtitle">
                  New here? <Link to="/signup">Create an Account</Link>
                </div>
              </footer>
            </article>
          </form>
        </li>
      </ul>
    </section>
  );
}

export default Login;
