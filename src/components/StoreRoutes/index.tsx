import { Outlet } from 'react-router-dom';
import Header from '../Header';

export function StoreRoutes() {
  return (
    <>
      <Header />
      <div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
