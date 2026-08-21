import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../context/useAuth";

const ProtectedRoute = (): React.ReactElement => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  console.log("ProtectedRoute isAuthenticated:", isAuthenticated);
  console.log(
    "ProtectedRoute localStorage:",
    localStorage.getItem("inventory_is_authenticated"),
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
