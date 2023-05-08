import React from "react";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children, roles }) => {
  const { role } = useAuth();

  if (roles.includes(role)) {
    return children;
  } else {
    return (
      <p style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center" }}>
        You are not allowed to access
      </p>
    );
  }
};

export default PrivateRoute;
