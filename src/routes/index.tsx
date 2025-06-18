import { Routes as ReactRoutes, Route } from 'react-router-dom';
import { PrivateRoutes } from '../components/PrivateRoutes';
import { StoreRoutes } from '../components/StoreRoutes';
import Dashboard from '../pages/Admin/Dashboard';
import ListProducts from '../pages/Admin/ListProducts';
import NewProduct from '../pages/Admin/NewProduct';
import Cart from '../pages/Cart';
import Categories from '../pages/Categories';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Product from '../pages/Product';

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
