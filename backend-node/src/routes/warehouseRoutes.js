const express =
  require("express");

const router =
  express.Router();

const {
  addWarehouse,
  getWarehouses,
  getWarehouse,
  updateWarehouse,
  deleteWarehouse
} =
  require(
    "../controllers/warehouseController"
  );

router.post(
  "/",
  addWarehouse
);

router.get(
  "/",
  getWarehouses
);

router.get(
  "/:id",
  getWarehouse
);

router.put(
  "/:id",
  updateWarehouse
);

router.delete(
  "/:id",
  deleteWarehouse
);

module.exports = router;