function EditWarehouse({
  editWarehouse,
  setEditWarehouse,
  handleUpdate,
  onClose
}) {
  const handleChange = (e) => {
    setEditWarehouse({
      ...editWarehouse,
      [e.target.name]:
        e.target.value
    });
  };

  return (
    <div className="modal-overlay">
      <div className="warehouse-modal">
        <h2>Edit Warehouse</h2>

        <form
          className="warehouse-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
        >
          <div className="form-group">
            <label>
              Warehouse Code
            </label>

            <input
              type="text"
              name="code"
              value={
                editWarehouse.code || ""
              }
              onChange={
                handleChange
              }
            />
          </div>

          <div className="form-group">
            <label>
              Warehouse Name
            </label>

            <input
              type="text"
              name="name"
              value={
                editWarehouse.name || ""
              }
              onChange={
                handleChange
              }
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
                editWarehouse.location ||
                ""
              }
              onChange={
                handleChange
              }
            />
          </div>

          <div className="form-group">
            <label>City</label>

            <input
              type="text"
              name="city"
              value={
                editWarehouse.city || ""
              }
              onChange={
                handleChange
              }
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
                editWarehouse.capacity ||
                ""
              }
              onChange={
                handleChange
              }
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
                editWarehouse.available ||
                ""
              }
              onChange={
                handleChange
              }
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
                editWarehouse.manager ||
                ""
              }
              onChange={
                handleChange
              }
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
                editWarehouse.phone || ""
              }
              onChange={
                handleChange
              }
            />
          </div>

          <div className="form-group">
            <label>Status</label>

            <select
              name="status"
              value={
                editWarehouse.status ||
                "Active"
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
              Update
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

export default EditWarehouse;