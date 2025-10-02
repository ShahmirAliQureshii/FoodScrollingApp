import React from "react";
import "../../styles/auth.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function PartnerLogin() {
  const navigate = useNavigate();

  const loginPartner = async (e) => {

    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post(
      "http://localhost:3000/api/auth/food-partner/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    console.log(response.data);

    navigate("/create-food");
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card" role="region" aria-label="Partner login">
        <div className="auth-header">
          <div>
            <h1 className="auth-title">Partner sign in</h1>
            <div className="auth-sub">Access your partner dashboard</div>
          </div>
        </div>

        <form
          className="form"
          onSubmit={loginPartner}
          aria-label="partner-login-form"
        >
          <div className="input">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@business.com"
            />
          </div>

          <div className="input">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
            />
          </div>

          <div className="actions">
            <button type="submit" className="btn">
              Sign in
            </button>
            <Link to="/partner/register">
              <button type="button" className="btn ghost">
                Register
              </button>
            </Link>
          </div>

          <div className="switch-row">
            <span>Quick links:</span>
            <Link to="/user/login">
              <p className="small-link">User Login</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
