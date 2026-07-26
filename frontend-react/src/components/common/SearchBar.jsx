import { FaSearch } from "react-icons/fa";
import "../../assets/css/header.css";

function SearchBar() {
  return (
    <div className="search-box">

      <FaSearch className="search-icon" />

      <input
        type="text"
        placeholder="Search..."
      />

    </div>
  );
}

export default SearchBar;