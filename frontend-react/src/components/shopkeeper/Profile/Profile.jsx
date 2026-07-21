import { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../../../services/shopkeeperService";
import "../../../assets/css/profile.css";

function Profile() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    shopCategory: "",
  });
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

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
        shopCategory: profile.shopCategory || "",
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      setFeedback({ type: "error", message: "Unable to load your profile right now." });
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
      setFeedback({ type: "error", message: error.response?.data?.message || error.message || "Failed to update profile" });
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
        <div className="profile-header">
          <div className="profile-avatar">
            {formData.fullName ? formData.fullName.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="profile-titles">
            <h2>My Profile</h2>
            <p>Manage your shopkeeper information</p>
          </div>
        </div>

        {feedback.message && (
          <div style={{ marginBottom: "12px", color: feedback.type === "success" ? "#0f9d58" : "#d93025", fontWeight: 600 }}>
            {feedback.message}
          </div>
        )}

        <form className="profile-form" onSubmit={handleSubmit}>
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

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
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

          <div className="button-container">
            <button type="submit" className="profile-btn" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
            <button type="button" className="delete-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
