import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

import { getInventory } from "../../../services/inventoryService";
import { getProducts } from "../../../services/productService";

function WarehouseList({
  warehouses,
  onEdit,
  onDelete
}) {
  const navigate = useNavigate();

  const [inventories, setInventories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [warehouses]);

  const loadData = async () => {

    if (!warehouses || warehouses.length === 0) {
      setInventories([]);
      return;
    }

    setLoading(true);

    try {

      // load all products (each product already carries
      // quantity / unit / stock merged in from ProductHolding
      // on the backend)
      const productRes = await getProducts();

      if (productRes.success) {
        setProducts(productRes.products);
      }

      // load inventory of every warehouse
      let allInventory = [];

      for (const warehouse of warehouses) {

        const res = await getInventory(warehouse._id);

        // backend returns the inventory list as the response body directly
        const list = res.data || [];

        allInventory.push(...list);

      }

      setInventories(allInventory);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Total product capacity used inside one warehouse:
  // sum over every inventory row of (inventory stock * product quantity),
  // normalising G -> KG and ML -> L so everything is on the same scale
  // as warehouse.capacity
  const calculateUsedCapacity = (warehouseId) => {

    const warehouseInventory = inventories.filter(
      item => item.warehouseId === warehouseId
    );

    let total = 0;

    warehouseInventory.forEach(item => {

      const product = products.find(
        p => p._id === item.productId
      );

      if (!product) return;

      const stock = Number(item.stock) || 0;
      const quantity = Number(product.quantity) || 0;

      let capacity = stock * quantity;

      const unit = (product.unit || "").toUpperCase();

      // KG -> no change
      // G  -> convert to KG
      if (unit === "G") {
        capacity = capacity / 1000;
      }

      // L  -> no change
      // ML -> convert to L
      if (unit === "ML") {
        capacity = capacity / 1000;
      }

      total += capacity;

    });

    return total;

  };

  return (

    <div className="warehouse-table-wrapper">

      <table className="warehouse-table">

        <thead>

          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Location</th>
            <th>City</th>
            <th>Capacity</th>
            <th>Available</th>
            <th>Status</th>
            <th>Manager</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {loading && (
            <tr>
              <td colSpan={9} style={{ textAlign: "center" }}>
                Loading inventory...
              </td>
            </tr>
          )}

          {!loading && warehouses.map((warehouse) => {

            const totalCapacity = Number(warehouse.capacity) || 0;

            const used = calculateUsedCapacity(
              warehouse._id
            );

            let available = totalCapacity - used;

            // never show a negative available capacity in the UI
            if (available < 0) {
              available = 0;
            }

            return (

              <tr key={warehouse._id}>

                <td>{warehouse.code}</td>

                <td>{warehouse.name}</td>

                <td>{warehouse.location}</td>

                <td>{warehouse.city}</td>

                <td>{totalCapacity}</td>

                <td>{available.toFixed(2)}</td>

                <td>

                  <span
                    className={`status ${warehouse.status
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {warehouse.status}
                  </span>

                </td>

                <td>

                  {warehouse.manager}

                  <br />

                  {warehouse.phone}

                </td>

                <td>

                  <div className="action-buttons">

                    <button
                      className="action-btn"
                      onClick={() =>
                        navigate(
                          `/admin/warehouses/${warehouse._id}/inventory`
                        )
                      }
                    >
                      <FaEye />
                    </button>

                    <button
                      className="action-btn edit"
                      onClick={() => onEdit(warehouse)}
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="action-btn delete"
                      onClick={() =>
                        onDelete(warehouse._id)
                      }
                    >
                      <FaTrash />
                    </button>

                  </div>

                </td>

              </tr>

            );

          })}

        </tbody>

      </table>

    </div>

  );
}

export default WarehouseList;
