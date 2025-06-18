import { lazy } from 'react';

import { Routes as ReactRoutes, Route } from 'react-router-dom';
import { PrivateRoutes } from '../components/PrivateRoutes';
import { StoreRoutes } from '../components/StoreRoutes';
import NewProduct from '../pages/Admin/NewProduct';
import ListProducts from '../pages/Admin/ListProducts';

const Dashboard = lazy(() => import('../pages/Admin/Dashboard'));
const Cart = lazy(() => import('../pages/Cart'));
const Categories = lazy(() => import('../pages/Categories'));
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Product = lazy(() => import('../pages/Product'));

export default function Routes() {
  return (
    <ReactRoutes>
      <Route element={<PrivateRoutes />}>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/list-products" element={<ListProducts />} />
        <Route path="/admin/new-product" element={<NewProduct />} />
        <Route path="/admin/update-product/:id" element={<NewProduct />} />
      </Route>
      <Route element={<StoreRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/categories/" element={<Categories />} />
        <Route path="/cart" element={<Cart />} />
      </Route>

      <Route path="/login" element={<Login />} />
    </ReactRoutes>
  );
}
