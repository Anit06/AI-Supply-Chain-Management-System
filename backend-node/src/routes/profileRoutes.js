const express = require("express");

const router = express.Router();

const {
  getProfile,
  updateProfile,
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  setDefaultAddress
} = require("../controllers/profileController");

const authMiddleware = require("../middleware/authMiddleware");

// GET Logged In User Profile

router.get("/", authMiddleware, getProfile);

// UPDATE Logged In User Profile

router.put("/", authMiddleware, updateProfile);

// ADD Address

router.post("/addresses", authMiddleware, addAddress);

// GET Addresses

router.get("/addresses", authMiddleware, getAddresses);

// UPDATE Address

router.put("/addresses/:addressId", authMiddleware, updateAddress);

// DELETE Address

router.delete("/addresses/:addressId", authMiddleware, deleteAddress);

// SET Default Address

router.put("/addresses/:addressId/default", authMiddleware, setDefaultAddress);

module.exports = router;
