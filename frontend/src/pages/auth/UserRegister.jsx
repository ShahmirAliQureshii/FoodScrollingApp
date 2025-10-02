import React from 'react'
import '../../styles/auth.css'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function UserRegister(){

  const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault()
        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(firstName, lastName, email, password);

        const response = await axios.post('http://localhost:3000/api/auth/user/register',{
            fullName: firstName +" "+lastName,
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
      <div className="auth-card" role="region" aria-label="User register">
        <div className="auth-header">
          <div>
            <h1 className="auth-title">Create account</h1>
            <div className="auth-sub">Register as a user to order your favorite meals</div>
          </div>
        </div>

        <form className="form" onSubmit={handleSubmit} noValidate aria-label="user-register-form">
          <div className="input">
            <label htmlFor="firstName">First name</label>
            <input id="firstName" name="firstName" type="text" placeholder="Jane" />
          </div>
          <div className="input">
            <label htmlFor="lastName">Last name</label>
            <input id="lastName" name="lastName" type="text" placeholder="Doe" />
          </div>

          <div className="input">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" />
          </div>

          <div className="input">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="••••••••" />
          </div>

          <div className="actions">
            <button type="submit" className="btn">Create account</button>
            <Link to={'/user/login'}><button type="button" className="btn ghost">Sign in</button></Link>
          </div>

          <div className="helper">
            By creating an account you agree to the <a className="small-link" href="#">terms</a>.
          </div>
          <div className="switch-row">
                      <span>Or continue as</span>
                      <Link to="/partner/register">
                      <p className="small-link">Food partner</p>
                      </Link>
                    </div>
        </form>
      </div>
    </div>
  )
}