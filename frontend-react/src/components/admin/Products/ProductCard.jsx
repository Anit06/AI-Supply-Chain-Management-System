import {
  FaBoxOpen,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle
} from "react-icons/fa";

function ProductCard({ products }) {

  const total =
    products.length;

  const active =
    products.filter(
      (p) => p.status === "Active"
    ).length;

  const inactive =
    products.filter(
      (p) => p.status === "Inactive"
    ).length;

  const lowStock =
    products.filter(
      (p) => p.stock <= 20 && p.stock !=  0
    ).length;

  const outOfStockProducts =
    products.filter(
      (p) => p.stock == 0
    ).length;

  return (

    <div className="product-cards">

      <div className="stat-card">

        <div className="icon blue">
          <FaBoxOpen />
        </div>

        <div>

          <h4>Total Products</h4>

          <h2>{total}</h2>

        </div>

      </div>

      <div className="stat-card">

        <div className="icon green">
          <FaCheckCircle />
        </div>

        <div>

          <h4>Active Products</h4>

          <h2>{active}</h2>

        </div>

      </div>

      <div className="stat-card">

        <div className="icon red">
          <FaTimesCircle/>
        </div>

        <div>

          <h4>Inactive Products</h4>

          <h2>{inactive}</h2>

        </div>

      </div>

      <div className="stat-card">

        <div className="icon orange">
          <FaExclamationTriangle />
        </div>

        <div>

          <h4>Low Stock</h4>

          <h2>{lowStock}</h2>

        </div>

      </div>

      <div className="stat-card">

        <div className="icon red">
          <FaBoxOpen/>
        </div>

        <div>

          <h4>Out of Stock</h4>

          <h2>{outOfStockProducts}</h2>

        </div>

      </div>

    </div>

  );
}

export default ProductCard;