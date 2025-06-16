import { Route, Routes as ReactRoutes } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';

export default function Routes() {
  return (
    <ReactRoutes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />{' '}
      {/* Home vai ser uma rota privada */}
    </ReactRoutes>
  );
}
