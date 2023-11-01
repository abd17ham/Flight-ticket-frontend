import React, { useState } from "react";
import "../css/screens/Login.css";
import flight from "../assets/Flight.png";
import logo from "../assets/logo.png";
import Loading from "./Loading";
import { NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  const loginUser = async () => {
    setLoading(true);
    const response = await fetch(
      "http://localhost:8000/api/v1/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      }
    );

    const data = await response.json();
    if (data.status === "success") {
      // console.log(data);
      NotificationManager.success("Login Successful", "Success");
      localStorage.setItem(
        "user",
        JSON.stringify({
          token: data.token,
          user: data.data.name,
          role: data.data.role,
          id: data.data._id,
        })
      );
      navigate("/");
    } else {
      NotificationManager.error(data.message, "Error");
    }
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="login-container">
      <div className="login-left-section">
        <img src={flight} alt="flight" />
      </div>
      <div className="login-right-section">
        <div className="login-form">
          <div className="login-form-group">
            <img src={logo} alt="logo" className="login-logo" />
            <p className="login-title">Welcome back!</p>
            <p className="login-subtitle">
              Start booking your tickets now onwards 🤩
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="login-form-group">
              <label htmlFor="email">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="login-icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </label>
              <input
                className="login-input"
                type="email"
                name="email"
                id="email"
                placeholder="you@example.com"
                value={userDetails.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="login-form-group">
              <label htmlFor="password">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="login-icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                  />
                </svg>
              </label>
              <input
                className="login-input"
                type="password"
                id="password"
                name="password"
                value={userDetails.password}
                onChange={handleChange}
                placeholder="Atleast 8 characters"
                required
              />
            </div>
            <div className="forgot-password">
              <Link to="/forgotpassword">Forgot password?</Link>
            </div>
            <div className="login-form-group">
              <button type="submit" className="login-button">
                Login
              </button>
            </div>
          </form>
          <div className="login-form-group create-account">
            <p>
              Are you admin ? <Link to={"/admin/login"}>Admin Login</Link>
            </p>
          </div>
          <div className="login-form-group create-account">
            <Link to="/signup">Create New Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
