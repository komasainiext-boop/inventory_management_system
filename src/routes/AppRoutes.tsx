import { Navigate, Route, Routes } from "react-router-dom";

import Dashboard from "../components/Dashboard";
import ForgotPassword from "../components/ForgetPassword";
import Login from "../components/login";
import NotFound from "../components/NotFound";
import Profile from "../components/Profile";
import Register from "../components/Register";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = (): React.ReactElement => {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
