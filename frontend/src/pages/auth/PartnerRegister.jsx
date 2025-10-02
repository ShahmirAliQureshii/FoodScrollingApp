import React from "react";
import "../../styles/auth.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function PartnerRegister() {
  const navigate = useNavigate();

  const registerPartner = async (e) => {

    e.preventDefault()
    
    const businessName = e.target.businessName.value;
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const address = e.target.address.value;

    const response = await axios.post(
      "http://localhost:3000/api/auth/food-partner/register",
      {
        businessName,
        contactName,
        phone,
        email,
        password,
        address,
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
      <div className="auth-card" role="region" aria-label="Partner register">
        <div className="auth-header">
          <div>
            <h1 className="auth-title">Partner sign up</h1>
            <div className="auth-sub">Register your restaurant or kitchen</div>
          </div>
        </div>

        <form
          className="form"
          onSubmit={registerPartner}
          aria-label="partner-register-form"
        >
          <div className="input">
            <label htmlFor="businessName">Business name</label>
            <input id="businessName" name="businessName" type="text" placeholder="Business name" />
          </div>

          <div className="input">
            <label htmlFor="contactName">Contact name</label>
            <input
              id="contactName"
              name="contactName"
              type="text"
              placeholder="Contact name"
            />
          </div>
          <div className="input">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+1 555 1234 4567"
            />
          </div>

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

          <div className="input">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              name="address"
              type="text"
              placeholder="123 Market Street"
            />
          </div>

          <div className="actions">
            <button type="submit" className="btn">
              Register
            </button>
            <Link to="/partner/login">
              <button type="button" className="btn ghost">
                Sign in
              </button>
            </Link>
          </div>
          <div className="switch-row">
            <span>Quick links:</span>
            <Link to="/user/register">
              <p className="small-link">User register</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
