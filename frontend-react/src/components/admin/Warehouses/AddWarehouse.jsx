import { useState } from "react";

function AddWarehouse({
  warehouses,
  setWarehouses,
  onClose
}) {
  const [formData, setFormData] =
    useState({
      code: "",
      name: "",
      location: "",
      city: "",
      capacity: "",
      available: "",
      manager: "",
      phone: "",
      status: "Active"
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newWarehouse = {
      id: Date.now(),
      ...formData
    };

    setWarehouses([
      ...warehouses,
      newWarehouse
    ]);

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="warehouse-modal">

        <h2>Add Warehouse</h2>

        <form
          className="warehouse-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label>
              Warehouse Code
            </label>

            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={
                handleChange
              }
              placeholder="WH-001"
              required
            />
          </div>

          <div className="form-group">
            <label>
              Warehouse Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={
                handleChange
              }
              placeholder="Central Warehouse"
              required
            />
          </div>

          <div className="form-group full-width">
            <label>
              Location
            </label>

            <input
              type="text"
              name="location"
              value={
                formData.location
              }
              onChange={
                handleChange
              }
              placeholder="Industrial Area"
              required
            />
          </div>

          <div className="form-group">
            <label>City</label>

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={
                handleChange
              }
              required
            />
          </div>

          <div className="form-group">
            <label>
              Capacity
            </label>

            <input
              type="number"
              name="capacity"
              value={
                formData.capacity
              }
              onChange={
                handleChange
              }
              required
            />
          </div>

          <div className="form-group">
            <label>
              Available Space
            </label>

            <input
              type="number"
              name="available"
              value={
                formData.available
              }
              onChange={
                handleChange
              }
              required
            />
          </div>

          <div className="form-group">
            <label>
              Manager Name
            </label>

            <input
              type="text"
              name="manager"
              value={
                formData.manager
              }
              onChange={
                handleChange
              }
              required
            />
          </div>

          <div className="form-group">
            <label>
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              value={
                formData.phone
              }
              onChange={
                handleChange
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Status</label>

            <select
              name="status"
              value={
                formData.status
              }
              onChange={
                handleChange
              }
            >
              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>

              <option value="Full">
                Full
              </option>
            </select>
          </div>

          <div className="modal-buttons">
            <button
              type="submit"
              className="save-btn"
            >
              Add Warehouse
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default AddWarehouse;