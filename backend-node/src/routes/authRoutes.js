const express = require("express");

const {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require(
  "../controllers/authController"
);

const router = express.Router();


// Authentication

router.post(
  "/register",
  register
);

router.post(
  "/login",
  login
);


// User Management

router.get(
  "/users",
  getAllUsers
);

router.get(
  "/users/:id",
  getUserById
);

router.put(
  "/users/:id",
  updateUser
);

router.delete(
  "/users/:id",
  deleteUser
);

module.exports = router;