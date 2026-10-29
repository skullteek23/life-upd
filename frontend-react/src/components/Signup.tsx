import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import { signup } from '../services/auth.service';
import { useAuth } from './context/Auth';
import { useSubmitAction } from './context/SubmitAction';

function Signup() {
  const [isSubmit, setIsSubmit] = useSubmitAction();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { login: updateLoginState } = useAuth();

  useEffect(() => {
    if (isSubmit) {
      handleSubmit();
      setIsSubmit(false);
    }
  }, [isSubmit]);

  const handleSubmit = () => {
    const username = String(usernameRef?.current?.value)?.trim();
    const password = String(passwordRef?.current?.value)?.trim();
    signup(username, password).then((token) => {
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
          <form id="signup-form">
            <article className="card">
              <div className="card-title">Signup</div>
              <div className="card-content">
                <div className="input-field">
                  <input type="text" ref={usernameRef} name="username" placeholder="Choose Username" id="username" />
                </div>
                <div className="input-field">
                  <input type="password" ref={passwordRef} name="password" placeholder="Choose a Password" id="password" />
                </div>
              </div>
              <footer>
                <div className="footer-subtitle">
                  Existing user? <Link to="/login">Login</Link>
                </div>
              </footer>
            </article>
          </form>
        </li>
      </ul>
    </section>
  );
}

export default Signup;
