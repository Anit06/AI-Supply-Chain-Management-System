import "../../assets/css/sidebar.css";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaWarehouse,
  FaShoppingCart,
  FaRobot,
  FaFileAlt,
  FaUsers,
  FaTruck,
  FaSignOutAlt
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Top Container: Logo + Menu */}
      <div className="sidebar-top">
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="logo-icon">📦</div>
          <div className="logo-text">
            <h1>AI Supply Chain</h1>
            <p>Management System</p>
          </div>
        </div>

        {/* Menu */}
        <ul className="sidebar-menu">
          <li>
            <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
              <FaTachometerAlt className="menu-icon" />
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/products" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
              <FaBoxOpen className="menu-icon" />
              <span>Products</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/warehouses" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
              <FaWarehouse className="menu-icon" />
              <span>Warehouses</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/orders" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
              <FaShoppingCart className="menu-icon" />
              <span>Orders</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/ai-prediction" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
              <FaRobot className="menu-icon" />
              <span>AI Predictions</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/reports" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
              <FaFileAlt className="menu-icon" />
              <span>Reports</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/users" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
              <FaUsers className="menu-icon" />
              <span>Users</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/suppliers" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
              <FaTruck className="menu-icon" />
              <span>Suppliers</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/logout" className="sidebar-link">
              <FaSignOutAlt className="menu-icon" />
              <span>Logout</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Profile */}
      <div className="sidebar-profile">
        <div className="profile-image">👨</div>
        <div>
          <h3>Admin</h3>
          <p>Super Admin</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;