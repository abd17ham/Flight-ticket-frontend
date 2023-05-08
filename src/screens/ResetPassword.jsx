import React, { useState, u } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { NotificationManager } from "react-notifications";

const ResetPassword = () => {
  const [userDetails, setUserDetails] = useState({
    password: "",
    passwordConfirm: "",
  });
  const { token } = useParams();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setUserDetails({ ...userDetails, [e.target.id]: e.target.value });
  };

  const resetPassword = async () => {
    const response = await fetch(`/api/v1/users/resetPassword/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });
    const data = await response.json();
    if (data.status === "success") {
      NotificationManager.success("Password Reset Successful", "Success");
      navigate("/login");
    } else {
      NotificationManager.error(data.message, "Error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword();
  };
  return (
    <div>
      <Navbar />
      <div className="password-container">
        <div className="add-flight">
          <h3>Forgot Password</h3>
          <form onSubmit={handleSubmit}>
            <div className="admin-add-form-group">
              <label
                style={{ fontSize: "1rem", fontWeight: "bold" }}
                htmlFor="email"
              >
                Password :
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="admin-add-input"
                value={userDetails.password}
                onChange={changeHandler}
              />
            </div>
            <div className="admin-add-form-group">
              <label
                style={{ fontSize: "1rem", fontWeight: "bold" }}
                htmlFor="email"
              >
                Confirm Password :
              </label>
              <input
                type="password"
                id="passwordConfirm"
                placeholder="Password Confirm"
                className="admin-add-input"
                value={userDetails.passwordConfirm}
                onChange={changeHandler}
              />
            </div>
            <div className="admin-add-form-group">
              <button
                style={{ marginLeft: "5rem" }}
                className="admin-add-form-button"
                type="submit"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
