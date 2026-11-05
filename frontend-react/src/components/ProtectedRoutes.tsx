import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from './context/Auth';

function ProtectedRoutes() {
  const { isLogged } = useAuth();
  const location = useLocation();

  if (!isLogged) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;
