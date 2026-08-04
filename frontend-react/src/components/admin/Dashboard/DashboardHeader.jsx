import { useMemo, useState } from "react";
import { FaBars, FaBell, FaChevronDown, FaSearch, FaSignOutAlt, FaUserCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function DashboardHeader({ title = "Dashboard", subtitle = "Operations overview", onToggleSidebar }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  }, []);

  const name = user.name || user.fullName || "Admin";
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "A";

  return (
    <header className="dashboard-header">
      <div className="dashboard-header__title">
        <button className="dashboard-icon-button" type="button" aria-label="Toggle navigation" onClick={onToggleSidebar}>
          <FaBars />
        </button>
        <div>
          <p className="dashboard-eyebrow">{subtitle}</p>
          <h1>{title}</h1>
        </div>
      </div>

      <div className="dashboard-header__actions">
        <label className="dashboard-search" aria-label="Search dashboard">
          <FaSearch />
          <input type="search" placeholder="Search dashboard..." />
        </label>

        <button className="dashboard-icon-button dashboard-notification" type="button" aria-label="Notifications">
          <FaBell />
          <span>3</span>
        </button>

        <div className="dashboard-user-menu">
          <button className="dashboard-user" type="button" aria-label="Open user menu" onClick={() => setMenuOpen((current) => !current)}>
            <span className="dashboard-avatar">{initials}</span>
            <span className="dashboard-user__details">
              <strong>{name}</strong>
              <small>Administrator</small>
            </span>
            <FaChevronDown className="dashboard-user__chevron" />
          </button>

          {menuOpen ? (
            <div className="dashboard-user-dropdown">
              <button type="button" onClick={() => { setMenuOpen(false); navigate("/admin/users"); }}>
                <FaUserCog /> Manage users
              </button>
              <button type="button" onClick={() => { setMenuOpen(false); navigate("/logout"); }}>
                <FaSignOutAlt /> Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
