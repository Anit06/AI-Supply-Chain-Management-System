import { NavLink, useNavigate } from "react-router-dom";

import "../../assets/css/shopkeeperSidebar.css";

import {
  FaHome,
  FaShoppingCart,
  FaHistory,
  FaBoxOpen,
  FaSearch,
  FaUser,
  FaMapMarkerAlt,
  FaBell,
  FaHeadset,
  FaSignOutAlt,
  FaStore,
  FaShoppingBag
} from "react-icons/fa";

function ShopkeeperSidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");

    navigate("/");

  };

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
          to="/shopkeeper/cart"
          className="shopkeeper-link"
        >
          <FaShoppingCart />
          <span>Cart</span>
        </NavLink>

        <NavLink
          to="/shopkeeper/place-order"
          className="shopkeeper-link"
        >
          <FaShoppingBag />
          <span>Place Order</span>
        </NavLink>

        <NavLink
          to="/shopkeeper/order-history"
          className="shopkeeper-link"
        >
          <FaHistory />
          <span>Order History</span>
        </NavLink>

        <h4 className="menu-title">Products</h4>

        <NavLink
          to="/shopkeeper/product-catalog"
          className="shopkeeper-link"
        >
          <FaBoxOpen />
          <span>Product Catalog</span>
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

        <button
          className="shopkeeper-link logout-link"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>

      </div>



    </div>
  );
}

export default ShopkeeperSidebar;