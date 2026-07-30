import { FaSearch, FaFilter } from "react-icons/fa";

function Filter({
  search,
  setSearch,
  category,
  setCategory,
  products
}) {
  const categories = [
    ...new Set(
      products.map((p) => p.category)
    )
  ];

  return (
    <div className="filter-container">

      <div className="table-search">
        <FaSearch />

        <input
          type="text"
          placeholder="Search Product..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      <div className="category-filter">
        <FaFilter />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option value="">
            All Categories
          </option>

          {categories.map((cat) => (
            <option
              key={cat}
              value={cat}
            >
              {cat}
            </option>
          ))}
        </select>
      </div>

    </div>
  );
}

export default Filter;