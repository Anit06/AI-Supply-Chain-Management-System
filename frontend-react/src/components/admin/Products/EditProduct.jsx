function EditProduct({
  editProduct,
  setEditProduct,
  handleUpdate,
  onClose
}) {
  return (
    <div className="modal-overlay">

      <div className="product-modal">

        <h2>Edit Product</h2>

        <input
          value={editProduct.name}
          onChange={(e) =>
            setEditProduct({
              ...editProduct,
              name:
                e.target.value
            })
          }
        />

        <input
          value={editProduct.sku}
          onChange={(e) =>
            setEditProduct({
              ...editProduct,
              sku:
                e.target.value
            })
          }
        />

        <input
          value={editProduct.category}
          onChange={(e) =>
            setEditProduct({
              ...editProduct,
              category:
                e.target.value
            })
          }
        />

        <textarea
          value={
            editProduct.description
          }
          onChange={(e) =>
            setEditProduct({
              ...editProduct,
              description:
                e.target.value
            })
          }
        />

        <input
          type="number"
          value={editProduct.price}
          onChange={(e) =>
            setEditProduct({
              ...editProduct,
              price:
                e.target.value
            })
          }
        />

        <input
          type="number"
          value={
            editProduct.quantity
          }
          onChange={(e) =>
            setEditProduct({
              ...editProduct,
              quantity:
                e.target.value
            })
          }
        />

        <select
          value={editProduct.unit}
          onChange={(e) =>
            setEditProduct({
              ...editProduct,
              unit:
                e.target.value
            })
          }
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
          value={editProduct.stock}
          onChange={(e) =>
            setEditProduct({
              ...editProduct,
              stock:
                e.target.value
            })
          }
        />

        <select
          value={editProduct.status}
          onChange={(e) =>
            setEditProduct({
              ...editProduct,
              status:
                e.target.value
            })
          }
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
          onChange={(e) =>
            setEditProduct({
              ...editProduct,
              image:
                e.target.files[0]
            })
          }
        />

        <div className="modal-buttons">

          <button
            onClick={
              handleUpdate
            }
          >
            Update
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

export default EditProduct;