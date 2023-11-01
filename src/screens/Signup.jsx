import React, { useState } from "react";
import "../css/screens/Login.css";
import flight from "../assets/signup.jpeg";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import Loading from "./Loading";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phone: "",
    passport: "",
  });

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (userDetails.password !== userDetails.passwordConfirm) {
      return NotificationManager.error("Passwords do not match", "Error");
    }

    createUser();
  };

  const changeHandler = (e) => {
    setUserDetails({ ...userDetails, [e.target.id]: e.target.value });
  };

  const createUser = async () => {
    setLoading(true);
    const response = await fetch(
      "http://localhost:8000/api/v1/users/signup",
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
      NotificationManager.success("User Created Successfully", "Success");
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
            <p className="login-title">Sign Up!</p>
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
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </label>
              <input
                className="login-input"
                type="text"
                id="name"
                placeholder="Username"
                value={userDetails.name}
                onChange={changeHandler}
                required
              />
            </div>
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
              <label htmlFor="phone">
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
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
              </label>
              <input
                className="login-input"
                type="text"
                id="phone"
                value={userDetails.phone}
                onChange={changeHandler}
                placeholder="+91 9876543210"
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
                placeholder="Password"
                required
              />
            </div>
            <div className="login-form-group">
              <label htmlFor="passwordConfirm">
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
                id="passwordConfirm"
                value={userDetails.passwordConfirm}
                onChange={changeHandler}
                placeholder="Confirm Password"
                required
              />
            </div>
            <div className="login-form-group">
              <button type="submit" className="login-button">
                Signup
              </button>
            </div>
          </form>
          <div className="login-form-group create-account">
            <p>
              Already have an Account ? <Link to={"/login"}>Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
