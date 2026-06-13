import { NavLink } from "react-router-dom";

import "../../assets/css/shopkeeperSidebar.css";

import {
  FaHome,
  FaShoppingCart,
  FaHistory,
  FaTruck,
  FaBoxOpen,
  FaSearch,
  FaUser,
  FaMapMarkerAlt,
  FaCreditCard,
  FaBell,
  FaHeadset,
  FaCog,
  FaSignOutAlt,
  FaStore
} from "react-icons/fa";

function ShopkeeperSidebar() {
  return (
    <div className="shopkeeper-sidebar">

      {/* Logo */}

      <div className="shopkeeper-logo">

        <div className="shopkeeper-logo-icon">
          <FaStore />
        </div>

        <div>
          <h2>AI Supply Chain</h2>
          <p>Management System</p>
        </div>

      </div>

      {/* Menu */}

      <div className="shopkeeper-menu">

        <NavLink
          to="/shopkeeper"
          className="shopkeeper-link"
        >
          <FaHome />
          <span>Dashboard</span>
        </NavLink>

        <h4 className="menu-title">Orders</h4>

        <NavLink
          to="/shopkeeper/place-order"
          className="shopkeeper-link"
        >
          <FaShoppingCart />
          <span>Place Order</span>
        </NavLink>

        <NavLink
          to="/shopkeeper/order-history"
          className="shopkeeper-link"
        >
          <FaHistory />
          <span>Order History</span>
        </NavLink>

        <NavLink
          to="/shopkeeper/track-order"
          className="shopkeeper-link"
        >
          <FaTruck />
          <span>Track Order</span>
        </NavLink>

        <h4 className="menu-title">Products</h4>

        <NavLink
          to="/shopkeeper/product-catalog"
          className="shopkeeper-link"
        >
          <FaBoxOpen />
          <span>Product Catalog</span>
        </NavLink>

        <NavLink
          to="/shopkeeper/search-products"
          className="shopkeeper-link"
        >
          <FaSearch />
          <span>Search Products</span>
        </NavLink>

        <h4 className="menu-title">Profile & Account</h4>

        <NavLink
          to="/shopkeeper/profile"
          className="shopkeeper-link"
        >
          <FaUser />
          <span>My Profile</span>
        </NavLink>

        <NavLink
          to="/shopkeeper/address"
          className="shopkeeper-link"
        >
          <FaMapMarkerAlt />
          <span>Addresses</span>
        </NavLink>

        <NavLink
          to="/shopkeeper/payment-method"
          className="shopkeeper-link"
        >
          <FaCreditCard />
          <span>Payment Methods</span>
        </NavLink>

        <h4 className="menu-title">Others</h4>

        <NavLink
          to="/shopkeeper/notifications"
          className="shopkeeper-link"
        >
          <FaBell />
          <span>Notifications</span>
        </NavLink>

        <NavLink
          to="/shopkeeper/support"
          className="shopkeeper-link"
        >
          <FaHeadset />
          <span>Support</span>
        </NavLink>

        <NavLink
          to="/shopkeeper/settings"
          className="shopkeeper-link"
        >
          <FaCog />
          <span>Settings</span>
        </NavLink>

      </div>

      {/* Logout */}

      <div className="sidebar-bottom">

        <NavLink
          to="/"
          className="shopkeeper-link logout-link"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </NavLink>

      </div>

    </div>
  );
}

export default ShopkeeperSidebar;