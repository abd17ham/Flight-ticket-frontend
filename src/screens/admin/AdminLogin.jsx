import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import "../../css/screens/Login.css";
import flight from "../../assets/Flight.png";
import logo from "../../assets/logo.png";
import Loading from "../Loading";

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "admin@avesair.com",
    password: "test123",
  });

  const changeHandler = (e) => {
    setUserDetails({ ...userDetails, [e.target.id]: e.target.value });
  };
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    loginUser();
  };

  const loginUser = async () => {
    setLoading(true);
    const response = await fetch(
      "http://localhost:8000/api/v1/users/admin/login",
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
      navigate("/admin/dashboard");
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
            <p className="login-title">Welcome Admin!</p>
            <p className="login-subtitle">
              Please login to your account to continue
            </p>
          </div>
          <form onSubmit={submitHandler}>
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
                id="email"
                value={userDetails.email}
                onChange={changeHandler}
                placeholder="you@example.com"
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
                value={userDetails.password}
                onChange={changeHandler}
                placeholder="Atleast 8 characters"
                required
              />
            </div>
            <div className="forgot-password">
              <p href="/">Forgot password?</p>
            </div>
            <div className="login-form-group">
              <button type="submit" className="login-button">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
