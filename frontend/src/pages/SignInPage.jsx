import { Link } from "react-router-dom";

export default function SignInPage() {
  return (
    <div className="page">
      <div className="top-row">
        <div>
          <h1 className="page-title">Sign In</h1>
          <p className="page-subtitle">Welcome back to your notebook</p>
        </div>
        <Link className="chip" to="/folders">
          Skip
        </Link>
      </div>

      <div className="form-card">
        <label className="form-field">
          Email
          <input type="email" placeholder="name@email.com" />
        </label>
        <label className="form-field">
          Password
          <input type="password" placeholder="••••••••" />
        </label>
        <button className="primary-btn" type="button">
          Sign in
        </button>
      </div>

      <div className="top-row">
        <span className="page-subtitle">No account?</span>
        <Link className="chip" to="/signup">
          Create one
        </Link>
      </div>
    </div>
  );
}
