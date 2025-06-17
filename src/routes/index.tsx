import { Route, Routes as ReactRoutes } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import { PrivateRoutes } from '../components/PrivateRoutes';
import Admin from '../pages/Admin';
import { StoreRoutes } from '../components/StoreRoutes';
import Product from '../pages/Product';
import Categories from '../pages/Categories';

export default function Routes() {
  return (
    <ReactRoutes>
      <Route element={<PrivateRoutes />}>
        <Route path="/admin" element={<Admin />} />
      </Route>
      <Route element={<StoreRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/categories/" element={<Categories />} />
      </Route>

      <Route path="/login" element={<Login />} />
    </ReactRoutes>
  );
}
