const Product = require("../models/Product");
const ProductPrice = require("../models/ProductPrice");
const ProductHolding = require("../models/ProductHolding");

// ======================
// CREATE PRODUCT
// ======================
const addProduct = async (req, res) => {
  try {
    const stock = Number(req.body.stock);

    let stockStatus = "In Stock";
    if (stock === 0) {
      stockStatus = "Out Of Stock";
    } else if (stock <= 20) {
      stockStatus = "Low Stock";
    }

    const product = await Product.create({
      name: req.body.name,
      sku: req.body.sku,
      category: req.body.category,
      description: req.body.description,
      status: req.body.status,
      image: req.file ? req.file.path : ""
    });

    await ProductPrice.create({
      productId: product._id,
      price: req.body.price
    });

    await ProductHolding.create({
      productId: product._id,
      quantity: req.body.quantity,
      unit: req.body.unit,
      stock,
      stockStatus
    });

    return res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      productId: product._id
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ======================
// GET PRODUCTS
// ======================
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const result = await Promise.all(
      products.map(async (product) => {
        const priceDoc = await ProductPrice.findOne({
          productId: product._id
        });

        const holdingDoc = await ProductHolding.findOne({
          productId: product._id
        });

        return {
          ...product.toObject(),
          price: priceDoc?.price || 0,
          quantity: holdingDoc?.quantity || 0,
          unit: holdingDoc?.unit || "",
          stock: holdingDoc?.stock || 0,
          stockStatus: holdingDoc?.stockStatus || "Out Of Stock"
        };
      })
    );

    return res.json({
      success: true,
      products: result
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ======================
// UPDATE PRODUCT
// ======================
const updateProduct = async (req, res) => {
  try {
    const stock = Number(req.body.stock);

    let stockStatus = "In Stock";
    if (stock === 0) {
      stockStatus = "Out Of Stock";
    } else if (stock <= 20) {
      stockStatus = "Low Stock";
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        sku: req.body.sku,
        category: req.body.category,
        description: req.body.description,
        status: req.body.status,
        ...(req.file && { image: req.file.path })
      },
      { new: true }
    );

    await ProductPrice.findOneAndUpdate(
      { productId: req.params.id },
      { price: req.body.price }
    );

    await ProductHolding.findOneAndUpdate(
      { productId: req.params.id },
      {
        quantity: req.body.quantity,
        unit: req.body.unit,
        stock,
        stockStatus
      }
    );

    return res.json({
      success: true,
      product
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ======================
// DELETE PRODUCT
// ======================
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    await ProductPrice.findOneAndDelete({
      productId: req.params.id
    });

    await ProductHolding.findOneAndDelete({
      productId: req.params.id
    });

    return res.json({
      success: true,
      message: "Product Deleted"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct
};