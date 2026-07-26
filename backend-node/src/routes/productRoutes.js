const express = require("express");

const router = express.Router();

const upload = require(
  "../middleware/uploadMiddleware"
);

const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct
} = require(
  "../controllers/productController"
);

router.post(
  "/",
  upload.single("image"),
  addProduct
);

router.get(
  "/",
  getProducts
);

router.put(
  "/:id",
  upload.single("image"),
  updateProduct
);

router.delete(
  "/:id",
  deleteProduct
);

module.exports = router;