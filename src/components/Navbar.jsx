import React from "react";
import useAuth from "../hooks/useAuth";
import logo from "../assets/logo.png";
import "../css/components/Navbar.css";
import { NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    const response = await fetch(
      "http://localhost:8000/api/v1/users/logout"
    );
    const data = await response.json();
    if (data.status === "success") {
      NotificationManager.success("Logout Successful", "Success");
      window.location.reload();
    } else {
      NotificationManager.error(data.message, "Error");
    }
    localStorage.removeItem("user");
  };

  return (
    <div id="navbar">
      <div
        className="logo-container"
        onClick={() => {
          navigate("/");
        }}
      >
        <img src={logo} alt="logo" />
        <p>AvesAir</p>
      </div>
      <div className="account-details">
        {!user ? (
          <div className="account-login">
            <span
              className="register button"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Register
            </span>
            <span
              className="login button"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </span>
          </div>
        ) : (
          <div className="account-login">
            {role === "admin" ? (
              <>
                <Link className="manage-booking button" to={"/admin/flights"}>
                  All Flights
                </Link>
                <Link className="manage-booking button" to={"/admin/bookings"}>
                  All Bookings
                </Link>
              </>
            ) : (
              <span
                className="manage-booking button"
                onClick={() => {
                  navigate("/mybookings");
                }}
              >
                Manage Booking
              </span>
            )}
            <span className="user">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              {user}
            </span>
            <div
              title="Logout"
              onClick={handleLogout}
              className="logout-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
