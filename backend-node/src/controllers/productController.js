const Product =
  require("../models/Product");

<<<<<<< HEAD
const ProductPrice =
  require("../models/ProductPrice");

const ProductHolding =
  require("../models/ProductHolding");


// ======================
// CREATE PRODUCT
// ======================

const addProduct =
  async (req, res) => {
    try {

      const stock =
        Number(req.body.stock);

      let stockStatus =
        "In Stock";

      if (stock === 0) {
        stockStatus =
          "Out Of Stock";
      }
      else if (stock <= 20) {
        stockStatus =
          "Low Stock";
      }

      const product =
        await Product.create({
          name:
            req.body.name,
          sku:
            req.body.sku,
          category:
            req.body.category,
          description:
            req.body.description,
          status:
            req.body.status,
          image:
            req.file
              ? req.file.path
              : ""
        });

      await ProductPrice.create({
        productId:
          product._id,
        price:
          req.body.price
      });

      await ProductHolding.create({
        productId:
          product._id,
        quantity:
          req.body.quantity,
        unit:
          req.body.unit,
        stock,
        stockStatus
=======

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
>>>>>>> eb5a4f2783018f24536dfc00e581d7e0d4789b96
      });

      res.status(201).json({
        success: true,
<<<<<<< HEAD
        message:
          "Product Added Successfully"
      });

    }
    catch (error) {
=======
        product
      });

    } catch (error) {

>>>>>>> eb5a4f2783018f24536dfc00e581d7e0d4789b96
      res.status(500).json({
        success: false,
        message:
          error.message
      });
<<<<<<< HEAD
=======

>>>>>>> eb5a4f2783018f24536dfc00e581d7e0d4789b96
    }
  };


<<<<<<< HEAD
// ======================
// GET PRODUCTS
// ======================

const getProducts =
  async (req, res) => {
=======
// GET PRODUCTS

const getProducts =
  async (req, res) => {

>>>>>>> eb5a4f2783018f24536dfc00e581d7e0d4789b96
    try {

      const products =
        await Product.find();

<<<<<<< HEAD
      const result =
        await Promise.all(
          products.map(
            async (product) => {

              const price =
                await ProductPrice.findOne({
                  productId:
                    product._id
                });

              const holding =
                await ProductHolding.findOne({
                  productId:
                    product._id
                });

              return {
                ...product.toObject(),

                price:
                  price?.price ||
                  0,

                quantity:
                  holding?.quantity ||
                  0,

                unit:
                  holding?.unit ||
                  "",

                stock:
                  holding?.stock ||
                  0,

                stockStatus:
                  holding?.stockStatus ||
                  "Out Of Stock"
              };
            }
          )
        );

      res.json({
        success: true,
        products:
          result
      });

    }
    catch (error) {
=======
      res.json({
        success: true,
        products
      });

    } catch (error) {

>>>>>>> eb5a4f2783018f24536dfc00e581d7e0d4789b96
      res.status(500).json({
        success: false,
        message:
          error.message
      });
<<<<<<< HEAD
=======

>>>>>>> eb5a4f2783018f24536dfc00e581d7e0d4789b96
    }
  };


<<<<<<< HEAD
// ======================
// UPDATE PRODUCT
// ======================

const updateProduct =
  async (req, res) => {
    try {

      const stock =
        Number(req.body.stock);

      let stockStatus =
        "In Stock";

      if (stock === 0) {
        stockStatus =
          "Out Of Stock";
      }
      else if (stock <= 20) {
        stockStatus =
          "Low Stock";
=======
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
>>>>>>> eb5a4f2783018f24536dfc00e581d7e0d4789b96
      }

      const product =
        await Product.findByIdAndUpdate(
          req.params.id,
<<<<<<< HEAD
          {
            name:
              req.body.name,
            sku:
              req.body.sku,
            category:
              req.body.category,
            description:
              req.body.description,
            status:
              req.body.status,
            ...(req.file && {
              image:
                req.file.path
            })
          },
=======
          updateData,
>>>>>>> eb5a4f2783018f24536dfc00e581d7e0d4789b96
          {
            new: true
          }
        );

<<<<<<< HEAD
      await ProductPrice.findOneAndUpdate(
        {
          productId:
            req.params.id
        },
        {
          price:
            req.body.price
        }
      );

      await ProductHolding.findOneAndUpdate(
        {
          productId:
            req.params.id
        },
        {
          quantity:
            req.body.quantity,
          unit:
            req.body.unit,
          stock,
          stockStatus
        }
      );

=======
>>>>>>> eb5a4f2783018f24536dfc00e581d7e0d4789b96
      res.json({
        success: true,
        product
      });

<<<<<<< HEAD
    }
    catch (error) {
=======
    } catch (error) {

>>>>>>> eb5a4f2783018f24536dfc00e581d7e0d4789b96
      res.status(500).json({
        success: false,
        message:
          error.message
      });
<<<<<<< HEAD
=======

>>>>>>> eb5a4f2783018f24536dfc00e581d7e0d4789b96
    }
  };


<<<<<<< HEAD
// ======================
// DELETE PRODUCT
// ======================

const deleteProduct =
  async (req, res) => {
=======
// DELETE PRODUCT

const deleteProduct =
  async (req, res) => {

>>>>>>> eb5a4f2783018f24536dfc00e581d7e0d4789b96
    try {

      await Product.findByIdAndDelete(
        req.params.id
      );

<<<<<<< HEAD
      await ProductPrice.findOneAndDelete({
        productId:
          req.params.id
      });

      await ProductHolding.findOneAndDelete({
        productId:
          req.params.id
      });

=======
>>>>>>> eb5a4f2783018f24536dfc00e581d7e0d4789b96
      res.json({
        success: true,
        message:
          "Product Deleted"
      });

<<<<<<< HEAD
    }
    catch (error) {
=======
    } catch (error) {

>>>>>>> eb5a4f2783018f24536dfc00e581d7e0d4789b96
      res.status(500).json({
        success: false,
        message:
          error.message
      });
<<<<<<< HEAD
=======

>>>>>>> eb5a4f2783018f24536dfc00e581d7e0d4789b96
    }
  };

module.exports = {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct
};