const Warehouse = require("../models/Warehouse");
const {
  validateRequestBody,
  validateWarehouseCapacity,
  validateObjectId
} = require("../middleware/validationMiddleware");

// CREATE
const addWarehouse =
  async (req, res) => {
    try {
      const requiredErrors = validateRequestBody(req, ["code", "name", "location", "city", "capacity", "manager", "phone"], {
        trimFields: ["code", "name", "location", "city", "manager", "phone"]
      });

      const capacityErrors = validateWarehouseCapacity(req.body.capacity, "capacity");
      const errors = [...requiredErrors, ...capacityErrors];

      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors
        });
      }

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
        message: error.message,
        errors: []
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
      const idErrors = validateObjectId(req.params.id, "id");
      if (idErrors.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: idErrors
        });
      }

      const warehouse =
        await Warehouse.findById(
          req.params.id
        );

      if (!warehouse) {
        return res.status(404).json({
          success: false,
          message: "Warehouse not found",
          errors: []
        });
      }

      res.json({
        success: true,
        warehouse
      });
    }
    catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
        errors: []
      });
    }
  };


// UPDATE
const updateWarehouse =
  async (req, res) => {
    try {
      const idErrors = validateObjectId(req.params.id, "id");
      if (idErrors.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: idErrors
        });
      }

      const warehouse =
        await Warehouse.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );

      if (!warehouse) {
        return res.status(404).json({
          success: false,
          message: "Warehouse not found",
          errors: []
        });
      }

      res.json({
        success: true,
        warehouse
      });
    }
    catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
        errors: []
      });
    }
  };


// DELETE
const deleteWarehouse =
  async (req, res) => {
    try {
      const idErrors = validateObjectId(req.params.id, "id");
      if (idErrors.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: idErrors
        });
      }

      const warehouse = await Warehouse.findById(req.params.id);
      if (!warehouse) {
        return res.status(404).json({
          success: false,
          message: "Warehouse not found",
          errors: []
        });
      }

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
        message: error.message,
        errors: []
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