const Product =
  require("../models/Product");

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
      });

      res.status(201).json({
        success: true,
        message:
          "Product Added Successfully"
      });

    }
    catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };


// ======================
// GET PRODUCTS
// ======================

const getProducts =
  async (req, res) => {
    try {

      const products =
        await Product.find();

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
      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };


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
      }

      const product =
        await Product.findByIdAndUpdate(
          req.params.id,
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
          {
            new: true
          }
        );

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

      res.json({
        success: true,
        product
      });

    }
    catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };


// ======================
// DELETE PRODUCT
// ======================

const deleteProduct =
  async (req, res) => {
    try {

      await Product.findByIdAndDelete(
        req.params.id
      );

      await ProductPrice.findOneAndDelete({
        productId:
          req.params.id
      });

      await ProductHolding.findOneAndDelete({
        productId:
          req.params.id
      });

      res.json({
        success: true,
        message:
          "Product Deleted"
      });

    }
    catch (error) {
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