import { Link } from 'react-router';

function Login() {
  return (
    <section className="feed">
      <ul id="posts">
        <li>
          <form id="auth-form">
            <article className="card">
              <div className="card-title">Login with username</div>
              <div className="card-content">
                <div className="input-field">
                  <input type="text" name="username" placeholder="Username" id="username" />
                </div>
                <div className="input-field">
                  <input type="password" name="password" placeholder="Password" id="password" />
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
