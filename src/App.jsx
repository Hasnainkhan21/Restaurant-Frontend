import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Client-Pages/Home';
import Menu from './Client-Pages/Menu';
import Order from './Client-Pages/Order';
import Thanks from './Client-Pages/Thanks';
import Login from './Client-Pages/Login';
import Register from './Client-Pages/Register';
import About from './Client-Pages/About';

import AdminLayout from './Admin-components/AdminLayout';
import Dashboard from './Admin-pages/Dashboard';
import MenuManager from './Admin-pages/MenuManager';
import Orders from './Admin-pages/Orders';
import Inventory from './Admin-pages/Inventory';
import Staff from './Admin-pages/Staff';
import StaffRegister from './Admin-pages/StaffRegister';

import ProtectedRoute from './Utils/ProtectedRoute';
import PlaceOrder from './Client-Pages/PlaceOrder';

function App() {
  return (
    <Router>
      <Routes>
        {/* Client Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={ <Menu />} />
        <Route path="/order" element={<ProtectedRoute><Order /></ProtectedRoute> } />
        <Route path="/place-order" element={<ProtectedRoute><PlaceOrder/></ProtectedRoute> } />
        <Route path="/about" element={<About />} />
        <Route path="/thanks" element={<Thanks />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin', 'chef', 'waiter', 'inventory']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="menu" element={ <MenuManager />} />
          <Route path="orders" element={<Orders />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="staff" element={<Staff />} />
          <Route path="staff-registration" element={<StaffRegister />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
