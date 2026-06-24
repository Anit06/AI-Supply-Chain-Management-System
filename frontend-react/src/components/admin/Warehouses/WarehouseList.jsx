import {
  FaEdit,
  FaTrash,
  FaEye
} from "react-icons/fa";

function WarehouseList({
  warehouses,
  onEdit,
  onDelete
}) {
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
          {warehouses.map(
            (warehouse) => (
              <tr
                key={
                  warehouse._id
                }
              >
                <td>
                  {warehouse.code}
                </td>

                <td>
                  {warehouse.name}
                </td>

                <td>
                  {
                    warehouse.location
                  }
                </td>

                <td>
                  {warehouse.city}
                </td>

                <td>
                  {
                    warehouse.capacity
                  }
                </td>

                <td>
                  {
                    warehouse.available
                  }
                </td>

                <td>
                  <span
                    className={`status ${warehouse.status
                      .toLowerCase()
                      .replace(
                        " ",
                        "-"
                      )}`}
                  >
                    {
                      warehouse.status
                    }
                  </span>
                </td>

                <td>
                  {
                    warehouse.manager
                  }
                  <br />
                  {
                    warehouse.phone
                  }
                </td>

                <td>
                  <div className="action-buttons">

                    <button className="action-btn">
                      <FaEye />
                    </button>

                    <button
                      className="action-btn edit"
                      onClick={() =>
                        onEdit(
                          warehouse
                        )
                      }
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="action-btn delete"
                      onClick={() =>
                        onDelete(
                          warehouse._id
                        )
                      }
                    >
                      <FaTrash />
                    </button>

                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default WarehouseList;