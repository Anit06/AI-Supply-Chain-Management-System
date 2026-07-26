import {
  FaSearch
} from "react-icons/fa";

function SearchFilter({
  search,
  setSearch,
  status,
  setStatus
}) {
  return (
    <div className="warehouse-filter">

      <div className="search-box">
        <FaSearch />

        <input
          type="text"
          placeholder="Search Warehouse"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />
      </div>

      <select
        value={status}
        onChange={(e) =>
          setStatus(
            e.target.value
          )
        }
      >
        <option value="">
          All Status
        </option>

        <option value="Active">
          Active
        </option>

        <option value="Inactive">
          Inactive
        </option>

        <option value="Full">
          Full
        </option>

        <option value="Under Maintenance">
          Under Maintenance
        </option>
      </select>
    </div>
  );
}

export default SearchFilter;