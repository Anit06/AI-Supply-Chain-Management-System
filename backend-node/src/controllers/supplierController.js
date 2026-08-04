const Supplier = require("../models/Supplier");
const {
    validateRequestBody,
    validateSupplierCapacity,
    validateObjectId
} = require("../middleware/validationMiddleware");

//CREATE 
const addSupplier =
    async (req, res) => {
        try {
            const errors = [
                ...validateRequestBody(req, ["supplierCode", "supplierName", "supplierPhonenumber", "supplierAddress", "supplierVehiclenumber", "supplierCapacity"], {
                    trimFields: ["supplierCode", "supplierName", "supplierPhonenumber", "supplierAddress", "supplierVehiclenumber"]
                }),
                ...validateSupplierCapacity(req.body.supplierCapacity, "supplierCapacity")
            ];

            if (errors.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    errors
                });
            }

            const supplier =
                await Supplier.create(req.body);

            res.status(201).json(
                {
                    success: true,
                    supplier
                }
            );
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                errors: []
            });
        }
    };

//GET ALL
const getSuppliers =
    async (req, res) => {
        try {
            const supplier =
                await Supplier.find();
            res.json({
                success: true,
                supplier
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
//GET SINGLE
const getSupplier =
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

            const supplier =
                await Supplier.findById(
                    req.params.id
                );

            if (!supplier) {
                return res.status(404).json({
                    success: false,
                    message: "Supplier not found",
                    errors: []
                });
            }

            res.json({
                success: true,
                supplier
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

//UPDATE
const updateSuppliers =
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

            const supplier =
                await Supplier.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    { new: true }
                );

            if (!supplier) {
                return res.status(404).json({
                    success: false,
                    message: "Supplier not found",
                    errors: []
                });
            }

            res.json({
                success: true,
                supplier
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

//DELETE
const deleteSuppliers =
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

            const supplier = await Supplier.findById(req.params.id);
            if (!supplier) {
                return res.status(404).json({
                    success: false,
                    message: "Supplier not found",
                    errors: []
                });
            }

            await Supplier.findByIdAndDelete(
                req.params.id
            );

            res.json({
                success: true,
                message:
                    "Supplier Deleted"
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

module.exports =
{
    addSupplier,
    getSupplier,
    getSuppliers,
    updateSuppliers,
    deleteSuppliers
};
