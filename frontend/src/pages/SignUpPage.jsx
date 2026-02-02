import { Link } from "react-router-dom";

export default function SignUpPage() {
  return (
    <div className="page">
      <div className="top-row">
        <div>
          <h1 className="page-title">Sign Up</h1>
          <p className="page-subtitle">Create a fresh notebook</p>
        </div>
        <Link className="chip" to="/folders">
          Skip
        </Link>
      </div>

      <div className="form-card">
        <label className="form-field">
          Username
          <input type="text" placeholder="marrfee" />
        </label>
        <label className="form-field">
          Email
          <input type="email" placeholder="name@email.com" />
        </label>
        <label className="form-field">
          Password
          <input type="password" placeholder="••••••••" />
        </label>
        <button className="primary-btn" type="button">
          Create account
        </button>
      </div>

      <div className="top-row">
        <span className="page-subtitle">Already have an account?</span>
        <Link className="chip" to="/signin">
          Sign in
        </Link>
      </div>
    </div>
  );
}
