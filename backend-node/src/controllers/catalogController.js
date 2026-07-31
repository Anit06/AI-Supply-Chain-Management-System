const User = require("../models/User");

const Product = require("../models/Product");
const ProductPrice = require("../models/ProductPrice");
const javaService = require("../services/javaService");

exports.getWarehouseCatalog = async (req, res) => {
  try {
    const warehouseId = req.params.warehouseId;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // GET INVENTORY FROM JAVA

    const inventoryResponse =
      await javaService.getInventoryByWarehouse(warehouseId);

    const inventory =
      inventoryResponse.data.inventory || inventoryResponse.data || [];

    let catalog = [];

    for (const item of inventory) {
      const product = await Product.findById(item.productId);

      if (!product) {
        continue;
      }

      const productPrice = await ProductPrice.findOne({
        productId: product._id,
      });

      catalog.push({
        inventoryId: item.inventoryId,

        warehouseId: item.warehouseId,

        warehouseName: item.warehouseName,

        productId: product._id,

        name: product.name,

        sku: product.sku,

        category: product.category,

        description: product.description,

        image: product.image,

        unit: product.unit || "KG",

        stock: item.stock,

        price: productPrice ? productPrice.price : 0,
      });
    }

    // REMOVE OUT OF STOCK

    catalog = catalog.filter((product) => product.stock > 0);

    // FILTER SHOP CATEGORY

    if (user.role === "user") {
      const categories = user.shopCategory || [];

      if (categories.length > 0) {
        catalog = catalog.filter((product) =>
          categories.includes(product.category),
        );
      }
    }

    return res.status(200).json({
      success: true,

      totalProducts: catalog.length,

      products: catalog,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};