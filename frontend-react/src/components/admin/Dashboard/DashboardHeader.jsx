import { FaBars, FaBell, FaChevronDown, FaSearch } from "react-icons/fa";

function DashboardHeader() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const name = user.name || user.fullName || "Admin";
  return <header className="dashboard-header"><div className="dashboard-header__title"><button className="dashboard-icon-button" type="button" aria-label="Open navigation"><FaBars /></button><div><p className="dashboard-eyebrow">Overview</p><h1>Dashboard</h1></div></div><div className="dashboard-header__actions"><label className="dashboard-search" aria-label="Search dashboard"><FaSearch /><input type="search" placeholder="Search anything..." /></label><button className="dashboard-icon-button dashboard-notification" type="button" aria-label="Notifications"><FaBell /><span>3</span></button><button className="dashboard-user" type="button" aria-label="Open user menu"><span className="dashboard-avatar">{name.charAt(0).toUpperCase()}</span><span className="dashboard-user__details"><strong>{name}</strong><small>Administrator</small></span><FaChevronDown className="dashboard-user__chevron" /></button></div></header>;
}

export default DashboardHeader;
