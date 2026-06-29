import { useState, useEffect } from "react";
import "../../../assets/css/address.css";

const initialFormData = {
  fullName: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  landmark: "",
  city: "",
  state: "",
  pincode: "",
  addressType: "Shop",
};

function AddressForm({
  show,
  onClose,
  onSave,
  initialData,
}) {
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (show) {
      if (initialData) {
        setFormData({
          fullName: initialData.fullName || "",
          phone: initialData.phone || "",
          addressLine1: initialData.addressLine1 || "",
          addressLine2: initialData.addressLine2 || "",
          landmark: initialData.landmark || "",
          city: initialData.city || "",
          state: initialData.state || "",
          pincode: initialData.pincode || "",
          addressType: initialData.addressType || "Shop",
        });
      } else {
        setFormData(initialFormData);
      }
    }
  }, [show, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    if (!formData.fullName.trim()) {
      alert("Full Name is required");
      return false;
    }

    if (!formData.phone.trim()) {
      alert("Phone Number is required");
      return false;
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      alert("Phone number must contain 10 digits");
      return false;
    }

    if (!formData.addressLine1.trim()) {
      alert("Address Line 1 is required");
      return false;
    }

    if (!formData.city.trim()) {
      alert("City is required");
      return false;
    }

    if (!formData.state.trim()) {
      alert("State is required");
      return false;
    }

    if (!/^[0-9]{6}$/.test(formData.pincode)) {
      alert("Enter valid 6 digit pincode");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSave(formData);

    if (!initialData) {
      setFormData(initialFormData);
    }
  };

  if (!show) return null;

  return (
    <div className="address-modal-overlay">
      <div className="address-modal">

        <div className="address-modal-header">
          <h2>
            {initialData ? "Edit Address" : "Add New Address"}
          </h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form
          className="address-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter Full Name"
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter Phone Number"
            />
          </div>

          <div className="form-group">
            <label>Address Line 1</label>

            <input
              type="text"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
              placeholder="House No., Street..."
            />
          </div>

          <div className="form-group">
            <label>Address Line 2</label>

            <input
              type="text"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
              placeholder="Area, Locality"
            />
          </div>

          <div className="form-group">
            <label>Landmark</label>

            <input
              type="text"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              placeholder="Nearby Landmark"
            />
          </div>

          <div className="address-row">

            <div className="form-group">
              <label>City</label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>State</label>

              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="address-row">

            <div className="form-group">
              <label>Pincode</label>

              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Address Type</label>

              <select
                name="addressType"
                value={formData.addressType}
                onChange={handleChange}
              >
                <option value="Shop">Shop</option>
                <option value="Home">Home</option>
                <option value="Other">Other</option>
              </select>
            </div>

          </div>

          <div className="address-form-buttons">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              {initialData ? "Update Address" : "Save Address"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default AddressForm;