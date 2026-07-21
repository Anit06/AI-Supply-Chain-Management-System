const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getWarehouseCatalog
} = require("../controllers/catalogController");

router.get(
  "/warehouse/:warehouseId",
  authMiddleware,
  getWarehouseCatalog
);

module.exports = router;