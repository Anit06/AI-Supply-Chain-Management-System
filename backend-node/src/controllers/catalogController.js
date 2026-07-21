const User = require("../models/User");
const Product = require("../models/Product");
const ProductPrice = require("../models/ProductPrice");
const javaService = require("../services/javaService");

/*
GET WAREHOUSE CATALOG
*/

exports.getWarehouseCatalog = async (req, res) => {
  try {
    const warehouseId = req.params.warehouseId;

    // Logged in user
    const user = await User.findById(req.user.id);

    

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Inventory from Java
    const inventoryResponse =
      await javaService.getInventoryByWarehouse(warehouseId);

    const inventory =
      inventoryResponse.data.inventory || inventoryResponse.data;

    let catalog = [];

    for (const item of inventory) {
      const product = await Product.findById(item.productId);

      if (!product) continue;

      const price = await ProductPrice.findOne({
        productId: product._id,
      });

      catalog.push({
        inventoryId: item.inventoryId,

        productId: product._id,

        warehouseId: item.warehouseId,

        warehouseName: item.warehouseName,

        name: item.productName,

        category: item.category,

        description: product.description,

        image: product.image,

        price: price?.price || 0,

        stock: item.stock,
      });
    }


    // Shopkeepers -> only own category
    
    if (user.role === "user") {

    console.log("User Category:", user.shopCategory);

    catalog = catalog.filter(product => {

        console.log(
            "Product Category:",
            product.category
        );

        return (
            product.category.trim().toLowerCase() ===
            user.shopCategory.trim().toLowerCase()
        );

    });

}

    res.status(200).json({
      success: true,
      products: catalog,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
