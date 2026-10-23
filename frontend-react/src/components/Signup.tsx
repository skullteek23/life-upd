import { Link } from 'react-router';

function Signup() {
  return (
    <section className="feed">
      <ul id="posts">
        <li>
          <form id="auth-form">
            <article className="card">
              <div className="card-title">Signup</div>
              <div className="card-content">
                <div className="input-field">
                  <input type="text" name="username" placeholder="Choose Username" id="username" />
                </div>
                <div className="input-field">
                  <input type="password" name="password" placeholder="Choose a Password" id="password" />
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
