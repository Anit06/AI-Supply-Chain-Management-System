const Product =
  require("../models/Product");


// CREATE PRODUCT

const addProduct =
  async (req, res) => {

    try {

    const stock = Number(req.body.stock);

    let stockStatus = "In Stock";

    if (stock === 0) {
      stockStatus = "Out Of Stock";
    }
    else if (stock <= 20) {
      stockStatus = "Low Stock";
    }

    const product =
      await Product.create({
        name: req.body.name,
        sku: req.body.sku,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        unit: req.body.unit,
        stock,
        status: req.body.status,
        stockStatus,
        image: req.file
          ? req.file.path
          : ""
      });

      res.status(201).json({
        success: true,
        product
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });

    }
  };


// GET PRODUCTS

const getProducts =
  async (req, res) => {

    try {

      const products =
        await Product.find();

      res.json({
        success: true,
        products
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });

    }
  };


// UPDATE PRODUCT

const updateProduct =
  async (req, res) => {

    try {

      const stock = Number(req.body.stock);

      let stockStatus = "In Stock";

      if (stock === 0) {
        stockStatus = "Out Of Stock";
      }
      else if (stock <= 20) {
        stockStatus = "Low Stock";
      }

      const updateData = {
        name: req.body.name,
        sku: req.body.sku,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        unit: req.body.unit,
        stock,
        status: req.body.status,
        stockStatus
      };

      if (req.file) {
        updateData.image =
          req.file.path;
      }

      const product =
        await Product.findByIdAndUpdate(
          req.params.id,
          updateData,
          {
            new: true
          }
        );

      res.json({
        success: true,
        product
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });

    }
  };


// DELETE PRODUCT

const deleteProduct =
  async (req, res) => {

    try {

      await Product.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true,
        message:
          "Product Deleted"
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message
      });

    }
  };

module.exports = {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct
};