import { useEffect, useState } from "react";

import Sidebar from "../components/common/Sidebar";

import "../assets/css/users.css";

import {
  getUsers,
  updateRole
} from "../services/authService";

function Users() {

  const [users, setUsers] = useState([]);

  const [editUserId, setEditUserId] =
    useState(null);

  const [editData, setEditData] =
    useState({
      name: "",
      email: "",
      phone: "",
      role: ""
    });

  const currentRole =
    localStorage.getItem("role");

  const loadUsers = async () => {

    try {

      const data =
        await getUsers();

      if (data.success) {
        setUsers(data.users);
      }

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleEdit = (user) => {

    setEditUserId(user._id);

    setEditData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role
    });
  };

  const handleUpdate = async () => {

    try {

      const response =
        await updateRole(
          editUserId,
          editData
        );

      if (response.success) {

        alert(
          "User Updated Successfully"
        );

        setEditUserId(null);

        loadUsers();
      }

    } catch (error) {

      console.log(error);

      alert("Update Failed");
    }
  };

  const handleCancel = () => {

    setEditUserId(null);

    setEditData({
      name: "",
      email: "",
      phone: "",
      role: ""
    });
  };

  return (
    <div className="users-layout">

      {/* Sidebar */}

      <Sidebar />

      {/* Content */}

      <div className="users-content">

        <h1>User Management</h1>

        <table className="users-table">

          <thead>

            <tr>

              <th>Name</th>

              <th>Email</th>

              <th>Phone</th>

              <th>Role</th>

              <th>Created Date</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr key={user._id}>

                {/* Name */}

                <td>

                  {editUserId === user._id ? (

                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          name: e.target.value
                        })
                      }
                    />

                  ) : (

                    user.name

                  )}

                </td>

                {/* Email */}

                <td>

                  {editUserId === user._id ? (

                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          email: e.target.value
                        })
                      }
                    />

                  ) : (

                    user.email

                  )}

                </td>

                {/* Phone */}

                <td>

                  {editUserId === user._id ? (

                    <input
                      type="text"
                      value={editData.phone}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          phone: e.target.value
                        })
                      }
                    />

                  ) : (

                    user.phone

                  )}

                </td>

                {/* Role */}

                <td>

                  {editUserId === user._id ? (

                    <select
                      value={editData.role}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          role: e.target.value
                        })
                      }
                      disabled={
                        currentRole !== "admin"
                      }
                    >

                      <option value="user">
                        User
                      </option>

                      <option value="administrative_user">
                        Administrative User
                      </option>

                      <option value="admin">
                        Admin
                      </option>

                    </select>

                  ) : (

                    user.role

                  )}

                </td>

                {/* Created Date */}

                <td>

                  {new Date(
                    user.createdAt
                  ).toLocaleDateString()}

                </td>

                {/* Action */}

                <td>

                  {editUserId === user._id ? (

                    <>
                      <button
                        className="update-btn"
                        onClick={
                          handleUpdate
                        }
                      >
                        Update
                      </button>

                      <button
                        className="cancel-btn"
                        onClick={
                          handleCancel
                        }
                      >
                        Cancel
                      </button>
                    </>

                  ) : (

                    <button
                      className="edit-btn"
                      onClick={() =>
                        handleEdit(user)
                      }
                    >
                      Edit
                    </button>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Users;