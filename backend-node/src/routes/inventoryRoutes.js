const express = require("express");

const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

// Get inventory by warehouse
router.get("/warehouse/:warehouseId", inventoryController.getInventory);

// Add inventory
router.post("/", inventoryController.addInventory);

// Update inventory stock
router.put("/:inventoryId", inventoryController.updateInventory);

// Delete inventory
router.delete("/:inventoryId", inventoryController.deleteInventory);

module.exports = router;