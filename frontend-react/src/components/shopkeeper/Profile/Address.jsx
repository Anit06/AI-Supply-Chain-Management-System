import { useEffect, useState } from "react";
import axios from "axios";
import AddressForm from "./AddressForm";
import "../../../assets/css/address.css";

function Address() {
  const [addresses, setAddresses] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [editingAddress, setEditingAddress] = useState(null);

  //warehouse
  const [warehouses, setWarehouses] = useState([]);

  // GET ADDRESSES

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/profile/addresses",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setAddresses(response.data.addresses);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch addresses");
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // OPEN ADD FORM

  const handleAddAddress = () => {
    setEditingAddress(null);
    setShowForm(true);
  };

  // OPEN EDIT FORM

  const handleEdit = (address) => {
    setEditingAddress(address);
    setShowForm(true);
  };

  // CLOSE FORM

  const handleClose = () => {
    setShowForm(false);
    setEditingAddress(null);
  };

  const handleSave = async (formData) => {
    try {
      const token = localStorage.getItem("token");

      // ADD

      if (!editingAddress) {
        const response = await axios.post(
          "http://localhost:5000/api/profile/addresses",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        alert(response.data.message);
      }

      //  UPDATE
      else {
        const response = await axios.put(
          `http://localhost:5000/api/profile/addresses/${editingAddress._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        alert(response.data.message);
      }

      setShowForm(false);
      setEditingAddress(null);

      fetchAddresses();
    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong");
      }
    }
  };

  const handleDelete = async (addressId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this address?",
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `http://localhost:5000/api/profile/addresses/${addressId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert(response.data.message);

      fetchAddresses();
    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.message);
      }
    }
  };

  const handleMakeDefault = async (addressId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:5000/api/profile/addresses/${addressId}/default`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert(response.data.message);

      fetchAddresses();
    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.message);
      }
    }
  };

  // NEW: Fetch Warehouses
  const fetchWarehouses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/warehouses");
      setWarehouses(response.data.warehouses);
    } catch (error) {
      console.log("Error fetching warehouses", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
    fetchWarehouses(); // Fetch both on load
  }, []);

  return (
    <div className="address-page">
      <div className="address-header">
        <h2>My Addresses</h2>

        <button className="add-address-btn" onClick={handleAddAddress}>
          + Add Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="no-address">
          <h3>No Address Found</h3>

          <p>
            Click <strong>+ Add Address</strong> to save your first address.
          </p>
        </div>
      ) : (
        addresses.map((address) => (
          <div className="address-card" key={address._id}>
            <h3>
              {address.fullName}

              {address.isDefault && (
                <span className="default-badge">Current Address</span>
              )}
            </h3>

            <p>
              <strong>Phone:</strong> {address.phone}
            </p>

            <p>{address.addressLine1}</p>

            {address.addressLine2 && <p>{address.addressLine2}</p>}

            {address.landmark && (
              <p>
                <strong>Landmark:</strong> {address.landmark}
              </p>
            )}

            <p>
              {address.city}, {address.state} - {address.pincode}
            </p>

            <p>
              <strong>Type:</strong> {address.addressType}
            </p>

            <div className="address-buttons">
              <button className="edit-btn" onClick={() => handleEdit(address)}>
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(address._id)}
              >
                Delete
              </button>

              {!address.isDefault && (
                <button
                  className="default-btn"
                  onClick={() => handleMakeDefault(address._id)}
                >
                  Make Current
                </button>
              )}
            </div>
          </div>
        ))
      )}
      <div className="address-header" style={{ marginTop: "40px" }}>
        <h2>Warehouses</h2>
      </div>

      {warehouses.length === 0 ? (
        <div className="no-address">
          <h3>No Warehouses Available</h3>
        </div>
      ) : (
        warehouses.map((wh) => (
          <div className="address-card" key={wh._id}>
            <h3>{wh.name}</h3>
            <p>
              <strong>Phone:</strong> {wh.phone}
            </p>
            <p>
              {wh.location}, {wh.city} - {wh.country}
            </p>
            <p>
              <strong>Capacity:</strong> {wh.available} / {wh.capacity}
            </p>
            <p>
              <strong>Manager:</strong> {wh.manager}
            </p>
            <span className="default-badge">{wh.status}</span>
          </div>
        ))
      )}

      <AddressForm
        show={showForm}
        onClose={handleClose}
        onSave={handleSave}
        initialData={editingAddress}
      />
    </div>
  );
}

export default Address;
