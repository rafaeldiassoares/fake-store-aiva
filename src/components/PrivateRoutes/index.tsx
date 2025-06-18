import { Navigate, Outlet } from 'react-router-dom';
import { useAuthState } from '../../stores/useAuthStore';
import HeaderAdmin from '../HeaderAdmin';

export function PrivateRoutes() {
  const { isAuthenticated } = useAuthState();

  if (isAuthenticated) {
    return (
      <>
        <HeaderAdmin />
        <div>
          <div>
            <Outlet />
          </div>
        </div>
      </>
    );
  }

  return <Navigate to="/login" replace />;
}
