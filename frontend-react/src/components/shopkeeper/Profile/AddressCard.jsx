function AddressCard({ address, onEdit, onDelete, onSetDefault }) {
  return (
    <div className="address-card" style={{ marginBottom: "16px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h3 style={{ margin: "0 0 8px" }}>{address.fullName}</h3>
          <p style={{ margin: "2px 0" }}>
            <strong>Phone:</strong> {address.phone}
          </p>
          <p style={{ margin: "2px 0" }}>{address.addressLine1}</p>
          {address.addressLine2 && (
            <p style={{ margin: "2px 0" }}>{address.addressLine2}</p>
          )}
          {address.landmark && (
            <p style={{ margin: "2px 0" }}>
              <strong>Landmark:</strong> {address.landmark}
            </p>
          )}
          <p style={{ margin: "2px 0" }}>
            {address.city}, {address.state} - {address.pincode}
          </p>
          <p style={{ margin: "2px 0" }}>{address.country}</p>
          <p style={{ margin: "2px 0" }}>
            <strong>Type:</strong> {address.addressType}
          </p>
        </div>
        {address.isDefault && (
          <span
            className="default-badge"
            style={{ background: "#0f9d58", color: "#fff" }}
          >
            Default Address
          </span>
        )}
      </div>

      <div
        className="address-buttons"
        style={{
          marginTop: "12px",
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <button className="edit-btn" onClick={() => onEdit(address)}>
          Edit
        </button>

        <button className="delete-btn" onClick={() => onDelete(address._id)}>
          Delete
        </button>

        {!address.isDefault && (
          <button
            className="profile-btn"
            onClick={() => onSetDefault(address._id)}
          >
            Set Default
          </button>
        )}
      </div>
    </div>
  );
}

export default AddressCard;
