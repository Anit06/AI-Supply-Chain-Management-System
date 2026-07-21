const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
    createProfile,
    getProfile,
    updateProfile,
    addAddress,
    getAddresses,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    deleteProfile,
} = require("../controllers/shopkeeperController");

const router = express.Router();

router.post("/", authMiddleware, createProfile);
router.get("/:userId", authMiddleware, getProfile);
router.put("/profile/:userId", authMiddleware, updateProfile);
router.post("/:userId/address", authMiddleware, addAddress);
router.get("/:userId/address", authMiddleware, getAddresses);
router.put("/:userId/address/:addressId", authMiddleware, updateAddress);
router.delete("/:userId/address/:addressId", authMiddleware, deleteAddress);
router.put("/:userId/address/default/:addressId", authMiddleware, setDefaultAddress);
router.delete("/:userId", authMiddleware, deleteProfile);

module.exports = router;
