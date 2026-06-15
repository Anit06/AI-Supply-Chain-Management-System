import "../../assets/css/sidebar.css";
import { Link, useLocation } from "react-router-dom";

import {
  FaTachometerAlt,
  FaBoxOpen,
  FaWarehouse,
  FaShoppingCart,
  FaClipboardList,
  FaRobot,
  FaFileAlt,
  FaUsers,
  FaTruck,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";

function Sidebar() {

  const location = useLocation();

  return (
    <div className="sidebar">

      {/* Logo */}
      <div className="sidebar-logo">

        <div className="logo-icon">
          📦
        </div>

        <div>
          <h1>AI Supply Chain</h1>
          <p>Management System</p>
        </div>

      </div>

      {/* Menu */}
      <ul className="sidebar-menu">

        <Link to="/admin/dashboard" className="sidebar-link">
          <li className={location.pathname === "/admin/dashboard" ? "active" : ""}>
            <FaTachometerAlt className="menu-icon" />
            Dashboard
          </li>
        </Link>

        <Link to="/products" className="sidebar-link">
          <li className={location.pathname === "/products" ? "active" : ""}>
            <FaBoxOpen className="menu-icon" />
            Products
          </li>
        </Link>

        <Link to="/warehouses" className="sidebar-link">
          <li className={location.pathname === "/warehouses" ? "active" : ""}>
            <FaWarehouse className="menu-icon" />
            Warehouses
          </li>
        </Link>

        <Link to="/orders" className="sidebar-link">
          <li className={location.pathname === "/orders" ? "active" : ""}>
            <FaShoppingCart className="menu-icon" />
            Orders
          </li>
        </Link>

        <Link to="/inventory" className="sidebar-link">
          <li className={location.pathname === "/inventory" ? "active" : ""}>
            <FaClipboardList className="menu-icon" />
            Inventory
          </li>
        </Link>

        <Link to="/ai-prediction" className="sidebar-link">
          <li className={location.pathname === "/ai-prediction" ? "active" : ""}>
            <FaRobot className="menu-icon" />
            AI Predictions
          </li>
        </Link>

        <Link to="/reports" className="sidebar-link">
          <li className={location.pathname === "/reports" ? "active" : ""}>
            <FaFileAlt className="menu-icon" />
            Reports
          </li>
        </Link>

        <Link to="/admin/users" className="sidebar-link">
          <li className={location.pathname === "/admin/users" ? "active" : ""}>
            <FaUsers className="menu-icon" />
            Users
          </li>
        </Link>

        <Link to="/suppliers" className="sidebar-link">
          <li className={location.pathname === "/suppliers" ? "active" : ""}>
            <FaTruck className="menu-icon" />
            Suppliers
          </li>
        </Link>

        <Link to="/settings" className="sidebar-link">
          <li className={location.pathname === "/settings" ? "active" : ""}>
            <FaCog className="menu-icon" />
            Settings
          </li>
        </Link>

        <Link to="/logout" className="sidebar-link">
          <li>
            <FaSignOutAlt className="menu-icon" />
            <span>Logout</span>
          </li>
        </Link>
      </ul>

      {/* Profile */}
      <div className="sidebar-profile">

        <div className="profile-image">
          👨
        </div>

        <div>
          <h3>Admin</h3>
          <p>Super Admin</p>
        </div>

      </div>

    </div>
  );
}

export default Sidebar;