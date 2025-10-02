import React from 'react'
import '../../styles/auth.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function UserLogin(){

  const navigate = useNavigate();

  const loginUser = async(e)=>{
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post('http://localhost:3000/api/auth/user/login', {
      email,
      password,
    }, {
      withCredentials: true,
    })

    console.log(response.data);

    navigate('/')

  }

  return (
    <div className="auth-wrap">
      <div className="auth-card" role="region" aria-label="User login">
        <div className="auth-header">
          <div>
            <h1 className="auth-title">Welcome back</h1>
            <div className="auth-sub">Sign in to continue ordering</div>
          </div>
        </div>

        <form className="form" onSubmit={loginUser} aria-label="user-login-form">
          <div className="input">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" />
          </div>

          <div className="input">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="••••••••" />
          </div>

          <div className="actions">
            <button type="submit" className="btn">Sign in</button>
            <Link to={'/user/register'}>
            <button type="button" className="btn ghost">Create account</button>
            </Link>
          </div>

          <div className="switch-row">
            <span>Or continue as</span>
            <Link to="/partner/login">
            <p className="small-link">Food partner</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}