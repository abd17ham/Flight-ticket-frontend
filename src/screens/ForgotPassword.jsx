import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { NotificationManager } from "react-notifications";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const sendResetToken = async () => {
    const response = await fetch("/api/v1/users/forgotpassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (data.status === "success") {
      NotificationManager.success("Reset token sent to Mail", "Success");
    } else {
      NotificationManager.error("Reset token could not be sent", "Error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendResetToken();
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
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="admin-add-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="admin-add-form-group">
              <button
                style={{ marginLeft: "5rem" }}
                className="admin-add-form-button"
                type="submit"
              >
                Send Email
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
