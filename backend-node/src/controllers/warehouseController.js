const Warehouse =
  require("../models/Warehouse");


// CREATE
const addWarehouse =
  async (req, res) => {
    try {
      const warehouse =
        await Warehouse.create(
          req.body
        );

      res.status(201).json({
        success: true,
        warehouse
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


// GET ALL
const getWarehouses =
  async (req, res) => {
    try {
      const warehouses =
        await Warehouse.find();

      res.json({
        success: true,
        warehouses
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


// GET SINGLE
const getWarehouse =
  async (req, res) => {
    try {
      const warehouse =
        await Warehouse.findById(
          req.params.id
        );

      res.json({
        success: true,
        warehouse
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


// UPDATE
const updateWarehouse =
  async (req, res) => {
    try {
      const warehouse =
        await Warehouse.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );

      res.json({
        success: true,
        warehouse
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


// DELETE
const deleteWarehouse =
  async (req, res) => {
    try {
      await Warehouse.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true,
        message:
          "Warehouse Deleted"
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
  addWarehouse,
  getWarehouses,
  getWarehouse,
  updateWarehouse,
  deleteWarehouse
};