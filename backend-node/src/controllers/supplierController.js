const Supplier = require("../models/Supplier");


//CREATE 
const addSupplier =
    async (req, res) => {
        try {
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
                message:
                    error.message
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
            const supplier =
                await Supplier.findById(
                    req.params.id
                );
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

//UPDATE
const updateSuppliers =
    async (req, res) => {
        try {
            const supplier =
                await Supplier.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    { new: true }
                );

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

//DELETE
const deleteSuppliers =
    async (req, res) => {
        try {
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
                message: error.message
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
