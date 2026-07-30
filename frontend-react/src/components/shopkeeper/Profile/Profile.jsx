import { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../../../services/shopkeeperService";
import "../../../assets/css/profile.css";
<<<<<<< HEAD
=======
import Select from "react-select";
>>>>>>> 8ebc819e3df109c552f8e25d6c537d085fc18a78

function Profile() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
<<<<<<< HEAD
    shopCategory: "",
=======
    shopCategory: [],
>>>>>>> 8ebc819e3df109c552f8e25d6c537d085fc18a78
  });
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

<<<<<<< HEAD
=======
  const categoryOptions = [
    { value: "Vegetables", label: "Vegetables" },
    { value: "Fruits", label: "Fruits" },
    { value: "Dairy", label: "Dairy" },
  ];

>>>>>>> 8ebc819e3df109c552f8e25d6c537d085fc18a78
  const fetchProfile = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}") || {};
      if (!user.id) return;

      setUserId(user.id);
      const response = await getProfile(user.id);
      const profile = response.data.profile;
      setFormData({
        fullName: profile.fullName || "",
        email: profile.userId?.email || "",
        phone: profile.phone || "",
<<<<<<< HEAD
        shopCategory: profile.shopCategory || "",
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      setFeedback({ type: "error", message: "Unable to load your profile right now." });
=======
        shopCategory: profile.shopCategory || [],
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      setFeedback({
        type: "error",
        message: "Unable to load your profile right now.",
      });
>>>>>>> 8ebc819e3df109c552f8e25d6c537d085fc18a78
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ type: "", message: "" });

    try {
      if (!userId) {
        throw new Error("Profile not ready");
      }

      if (!formData.fullName || !formData.phone || !formData.shopCategory) {
        throw new Error("Full name, phone, and shop category are required");
      }

      if (!/^\d{10}$/.test(formData.phone)) {
        throw new Error("Phone number must be 10 digits");
      }

      const response = await updateProfile(userId, formData);
      localStorage.setItem("name", formData.fullName || "");
      setFeedback({ type: "success", message: response.data.message });
      await fetchProfile();
    } catch (error) {
<<<<<<< HEAD
      setFeedback({ type: "error", message: error.response?.data?.message || error.message || "Failed to update profile" });
=======
      setFeedback({
        type: "error",
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to update profile",
      });
>>>>>>> 8ebc819e3df109c552f8e25d6c537d085fc18a78
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    fetchProfile();
    setFeedback({ type: "", message: "" });
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
<<<<<<< HEAD
        <div className="profile-header">
          <div className="profile-avatar">
            {formData.fullName ? formData.fullName.charAt(0).toUpperCase() : "U"}
=======
        {/* Header Section */}
        <div className="profile-header">
          <div className="profile-avatar">
            {formData.fullName
              ? formData.fullName.charAt(0).toUpperCase()
              : "U"}
>>>>>>> 8ebc819e3df109c552f8e25d6c537d085fc18a78
          </div>
          <div className="profile-titles">
            <h2>My Profile</h2>
            <p>Manage your shopkeeper information</p>
          </div>
        </div>

<<<<<<< HEAD
        {feedback.message && (
          <div style={{ marginBottom: "12px", color: feedback.type === "success" ? "#0f9d58" : "#d93025", fontWeight: 600 }}>
            {feedback.message}
          </div>
        )}

        <form className="profile-form" onSubmit={handleSubmit}>
=======
        {/* Form Container */}
        <form className="profile-form" onSubmit={handleSubmit}>
          {/* Feedback Banner */}
          {feedback.message && (
            <div
              className="profile-message"
              style={{
                background: feedback.type === "success" ? "#e7f8ee" : "#fdecec",
                color: feedback.type === "success" ? "#0f9d58" : "#d93025",
              }}
            >
              {feedback.message}
            </div>
          )}

          {/* Full Name */}
>>>>>>> 8ebc819e3df109c552f8e25d6c537d085fc18a78
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
            />
          </div>

<<<<<<< HEAD
=======
          {/* Email */}
>>>>>>> 8ebc819e3df109c552f8e25d6c537d085fc18a78
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              placeholder="Email"
            />
          </div>

<<<<<<< HEAD
=======
          {/* Phone Number */}
>>>>>>> 8ebc819e3df109c552f8e25d6c537d085fc18a78
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
<<<<<<< HEAD
            />
          </div>

          <div className="form-group">
            <label>Shop Category</label>
            <select
              name="shopCategory"
              value={formData.shopCategory}
              onChange={handleChange}
            >
              <option value="">Select category</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Dairy">Dairy</option>
              <option value="Fruits">Fruits</option>
              <option value="All">All</option>
            </select>
          </div>

=======
              style={{ marginTop: "15px" }}
            />
          </div>

          {/* Shop Category */}
          <div className="form-group">
            <label>Shop Category</label>
           
            <Select
              isMulti
              options={categoryOptions}
              placeholder="Search and select categories..."
              value={categoryOptions.filter((option) =>
                formData.shopCategory.includes(option.value),
              )}
              onChange={(selectedOptions) =>
                setFormData({
                  ...formData,
                  shopCategory: selectedOptions
                    ? selectedOptions.map((option) => option.value)
                    : [],
                })
              }
            />
          </div>

          {/* Action Buttons */}
>>>>>>> 8ebc819e3df109c552f8e25d6c537d085fc18a78
          <div className="button-container">
            <button type="submit" className="profile-btn" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
