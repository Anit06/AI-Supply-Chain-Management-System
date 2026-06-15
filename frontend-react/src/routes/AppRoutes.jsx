import { Routes, Route } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import ShopkeeperLayout from "../layouts/ShopkeeperLayout";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Logout from "../pages/Logout";

import AdminHome from "../components/admin/Dashboard/AdminHome";
import ShopkeeperHome from "../components/shopkeeper/Dashboard/ShopkeeperHome";

import Dashboard from "../pages/Dashboard";
import Products from "../components/admin/Products/Products";

import Warehouses from "../components/admin/Warehouses/Warehouses";
import Orders from "../components/admin/Orders/Orders";
import Inventory from "../components/admin/Products/Inventory";
import AIPrediction from "../components/admin/AI/AIPrediction";
import Reports from "../components/admin/Reports/Reports";
import Users from "../pages/Users";
import Suppliers from "../components/admin/Orders/Suppliers";
import Settings from "../components/shopkeeper/Others/Settings";

import PlaceOrder from "../components/shopkeeper/Orders/PlaceOrder";
import OrderHistory from "../components/shopkeeper/Orders/OrderHistory";
import TrackOrder from "../components/shopkeeper/Orders/TrackOrder";
import ProductCatalog from "../components/shopkeeper/Products/ProductCatalog";
import SearchProducts from "../components/shopkeeper/Products/SearchProducts";
import Profile from "../components/shopkeeper/Profile/Profile";
import Address from "../components/shopkeeper/Profile/Address";
import PaymentMethod from "../components/shopkeeper/Profile/PaymentMethod";
import Notifications from "../components/shopkeeper/Others/Notifications";
import Support from "../components/shopkeeper/Others/Support";

function AppRoutes() {
  return (
    <Routes>

      {/* Public Routes */}

      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<Logout />} />

      {/* ================= ADMIN ROUTES ================= */}

      <Route path="/admin" element={<AdminLayout />}>

        <Route index element={<AdminHome />} />

        <Route path="dashboard" element={<Dashboard />} />

        <Route path="products" element={<Products />} />

        <Route path="warehouses" element={<Warehouses />} />

        <Route path="orders" element={<Orders />} />

        <Route path="inventory" element={<Inventory />} />

        <Route path="ai-prediction" element={<AIPrediction />} />

        <Route path="reports" element={<Reports />} />

        <Route path="/admin/users" element={<Users />} />

        <Route path="suppliers" element={<Suppliers />} />

        <Route path="settings" element={<Settings />} />

      </Route>

      {/* ================= SHOPKEEPER ROUTES ================= */}

      <Route path="/shopkeeper" element={<ShopkeeperLayout />}>

        <Route index element={<ShopkeeperHome />} />

        <Route path="place-order" element={<PlaceOrder />} />

        <Route path="order-history" element={<OrderHistory />} />

        <Route path="track-order" element={<TrackOrder />} />

        <Route path="product-catalog" element={<ProductCatalog />} />

        <Route path="search-products" element={<SearchProducts />} />

        <Route path="profile" element={<Profile />} />

        <Route path="address" element={<Address />} />

        <Route path="payment-method" element={<PaymentMethod />} />

        <Route path="notifications" element={<Notifications />} />

        <Route path="support" element={<Support />} />

        <Route path="settings" element={<Settings />} />

      </Route>

    </Routes>
  );
}

export default AppRoutes;