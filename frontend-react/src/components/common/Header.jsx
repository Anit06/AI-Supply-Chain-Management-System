import "../../assets/css/header.css";
import SearchBar from "../common/SearchBar";

function Header() {
  return (
    <div className="header">

      <h1>Dashboard</h1>

      <div className="header-right">

        <SearchBar />

        <div className="notification">
          🔔
        </div>

        <div className="admin-profile">
          Admin
        </div>

      </div>

    </div>
  );
}

export default Header;