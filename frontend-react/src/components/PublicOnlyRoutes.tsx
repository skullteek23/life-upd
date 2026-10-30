import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from './context/Auth';

function PublicOnlyRoutes() {
  const { isLogged } = useAuth();
  const location = useLocation();

  if (isLogged) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <Outlet />;
}

export default PublicOnlyRoutes;
