import React from "react";
import Navbar from "../../components/Navbar";

import logo from "../../assets/logo.png";
const AdminDashboard = () => {
  return (
    <div>
      <Navbar />

      <div className="admin-dash-welcome-container">
        <img src={logo} alt="logo" />
        <span className="admin-dash-welcome">Welcome Admin !</span>
      </div>
    </div>
  );
};

export default AdminDashboard;
