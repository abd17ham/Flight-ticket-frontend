import React from "react";
import { Routes, Route, Router } from "react-router-dom";
import Home from "./screens/Home";
import SearchScreen from "./screens/SearchScreen";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Booking from "./screens/Booking";
import Loading from "./screens/Loading";
import ManageBooking from "./screens/ManageBooking";
import AdminLogin from "./screens/admin/AdminLogin";
import AdminFlightsDashboard from "./screens/admin/AdminFlightsDashboard";
import AdminBookingDashboard from "./screens/admin/AdminBookingDashboard";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AdminDashboard from "./screens/admin/AdminDashboard";
import AdminAddFlights from "./screens/admin/AdminAddFlights";
import ResetPassword from "./screens/ResetPassword";
import ForgotPassword from "./screens/ForgotPassword";
import PrivateRoute from "./components/PrivateRoute";

const AllRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/" element={<SearchScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/resetpassword/:token" element={<ResetPassword />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route
        path="/booking/:id"
        element={
          <ProtectedRoutes>
            <Booking />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/mybookings"
        element={
          <ProtectedRoutes>
            <ManageBooking />
          </ProtectedRoutes>
        }
      />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoutes>
            <PrivateRoute roles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          </ProtectedRoutes>
        }
      />
      <Route
        path="/admin/bookings"
        element={
          <ProtectedRoutes>
            <PrivateRoute roles={["admin"]}>
              <AdminBookingDashboard />
            </PrivateRoute>
          </ProtectedRoutes>
        }
      />
      <Route
        path="/admin/flights"
        element={
          <ProtectedRoutes>
            <PrivateRoute roles={["admin"]}>
              <AdminFlightsDashboard />
            </PrivateRoute>
          </ProtectedRoutes>
        }
      />
      <Route
        path="/admin/addflights"
        element={
          <ProtectedRoutes>
            <PrivateRoute roles={["admin"]}>
              <AdminAddFlights />
            </PrivateRoute>
          </ProtectedRoutes>
        }
      />
      <Route path="/loading" element={<Loading />} />
    </Routes>
  );
};

export default AllRoutes;
