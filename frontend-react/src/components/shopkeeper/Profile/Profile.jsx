import { useState, useEffect } from "react";
import axios from "axios";
import "../../../assets/css/profile.css";

function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    shopCategory: "vegetable",
  });

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:5000/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFormData({
        name: response.data.user.name,
        email: response.data.user.email,
        phone: response.data.user.phone,
        shopCategory: response.data.user.shopCategory,
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
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

    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        "http://localhost:5000/api/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      localStorage.setItem("name", formData.name);

      alert(response.data.message);

      await fetchProfile();
    } catch (error) {
      console.log(error);
      console.log(error.response);

      if (error.response) {
        console.log(error.response.data);
      }

      alert("Failed to update profile");
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {formData.name ? formData.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="profile-titles">
            <h2>My Profile</h2>
            <p>Manage your personal information</p>
          </div>
        </div>

        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
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
              <option value="vegetable">Vegetable</option>
              <option value="dairy">Dairy</option>
              <option value="both">Both</option>
            </select>
          </div>

          <div className="button-container">
            <button type="submit" className="profile-btn">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
