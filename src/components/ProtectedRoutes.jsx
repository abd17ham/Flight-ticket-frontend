import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import Login from "../screens/Login";
import { NotificationManager } from "react-notifications";
import Loading from "../screens/Loading";

const ProtectedRoutes = ({ children }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const { user } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return children;
  } else {
    return <Login />;
  }
};

export default ProtectedRoutes;
