function AddProduct({
  formData,
  handleChange,
  handleImage,
  handleAdd,
  onClose
}) {
  return (
    <div className="modal-overlay">

      <div className="product-modal">

        <h2>Add Product</h2>

        <input
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          name="sku"
          placeholder="SKU"
          value={formData.sku}
          onChange={handleChange}
        />

        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
        />

        <select
          name="unit"
          value={formData.unit}
          onChange={handleChange}
        >
          <option value="KG">
            KG
          </option>

          <option value="G">
            G
          </option>

          <option value="L">
            L
          </option>

          <option value="ML">
            ML
          </option>
        </select>

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Active">
            Active
          </option>

          <option value="Inactive">
            Inactive
          </option>
        </select>

        <input
          type="file"
          onChange={handleImage}
        />

        <div className="modal-buttons">

          <button
            onClick={handleAdd}
          >
            Save
          </button>

          <button
            onClick={onClose}
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
}

export default AddProduct;