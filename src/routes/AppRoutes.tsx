import { Navigate, Route, Routes } from 'react-router-dom';

import ForgotPassword from '../components/ForgetPassword';
import Login from '../components/login'
import Register from '../components/Register';

const AppRoutes = (): React.ReactElement => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  );
};

export default AppRoutes;