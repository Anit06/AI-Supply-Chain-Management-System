import {
  FaWarehouse,
  FaCheckCircle,
  FaTimesCircle,
  FaBoxes
} from "react-icons/fa";

function WarehouseCards({ warehouses }) {
  const total = warehouses.length;

  const active = warehouses.filter(
    (w) => w.status === "Active"
  ).length;

  const inactive = warehouses.filter(
    (w) => w.status === "Inactive"
  ).length;

  const full = warehouses.filter(
    (w) => w.status === "Full"
  ).length;

  const capacity = warehouses.reduce(
    (sum, w) => sum + Number(w.capacity),
    0
  );

  return (
    <div className="warehouse-cards">

      <div className="warehouse-card">
        <div className="card-icon blue">
          <FaWarehouse />
        </div>

        <div>
          <h2>{total}</h2>
          <p>Total Warehouses</p>
        </div>
      </div>

      <div className="warehouse-card">
        <div className="card-icon green">
          <FaCheckCircle />
        </div>

        <div>
          <h2>{active}</h2>
          <p>Active</p>
        </div>
      </div>

      <div className="warehouse-card">
        <div className="card-icon red">
          <FaTimesCircle />
        </div>

        <div>
          <h2>{inactive}</h2>
          <p>Inactive</p>
        </div>
      </div>

      <div className="warehouse-card">
        <div className="card-icon orange">
          <FaWarehouse/>
        </div>

        <div>
          <h2>{full}</h2>
          <p>Full</p>
        </div>
      </div>

      <div className="warehouse-card">
        <div className="card-icon purple">
          <FaBoxes />
        </div>

        <div>
          <h2>{capacity.toLocaleString()}</h2>
          <p>Total Capacity</p>
        </div>
      </div>

    </div>
  );
}

export default WarehouseCards;