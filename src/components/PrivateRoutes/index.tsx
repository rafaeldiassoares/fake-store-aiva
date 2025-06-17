import { Navigate, Outlet } from 'react-router-dom';
import { useAuthState } from '../../stores/useAuthStore';
import Header from '../Header';

export function PrivateRoutes() {
  const { isAuthenticated } = useAuthState();

  if (isAuthenticated) {
    return (
      <>
        <Header />
        <div>
          {/* <Sidebar isMenuVisible={isSideBarVisible} displayMenu={displayMenu} /> */}
          <div>
            <Outlet />
          </div>
        </div>
      </>
    );
  }

  return <Navigate to="/login" replace />;
}
