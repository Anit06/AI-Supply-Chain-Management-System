const Product = require("../models/Product");
const Inventory = require("../models/Inventory");
const Warehouse = require("../models/Warehouse");
const ProductPrice = require("../models/ProductPrice");
const ProductHolding = require("../models/ProductHolding");
const { convertQuantityToKg, calculateWarehouseUsagePercent } = require("../utils/dashboardMetrics");

const getAdminDashboardMetrics = async () => {
    const [inventoryAggregation, warehouseData, productPrices, productHoldings] = await Promise.all([
        Product.aggregate([
            {
                $lookup: {
                    from: "productprices",
                    localField: "_id",
                    foreignField: "productId",
                    as: "priceDocs",
                },
            },
            {
                $lookup: {
                    from: "productholdings",
                    localField: "_id",
                    foreignField: "productId",
                    as: "holdingDocs",
                },
            },
            {
                $lookup: {
                    from: "inventory",
                    let: { productId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$product", "$$productId"] },
                            },
                        },
                        {
                            $group: {
                                _id: null,
                                totalWarehouseStock: { $sum: "$stock" },
                            },
                        },
                    ],
                    as: "inventoryDocs",
                },
            },
            {
                $project: {
                    _id: 1,
                    price: {
                        $ifNull: [
                            { $arrayElemAt: ["$priceDocs.price", 0] },
                            "$price",
                        ],
                    },
                    holdingStock: {
                        $ifNull: [{ $arrayElemAt: ["$holdingDocs.stock", 0] }, 0],
                    },
                    warehouseStock: {
                        $ifNull: [{ $arrayElemAt: ["$inventoryDocs.totalWarehouseStock", 0] }, 0],
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    totalInventoryValue: {
                        $sum: {
                            $add: [
                                { $multiply: ["$holdingStock", "$price"] },
                                { $multiply: ["$warehouseStock", "$price"] },
                            ],
                        },
                    },
                    totalStock: {
                        $sum: {
                            $add: ["$holdingStock", "$warehouseStock"],
                        },
                    },
                },
            },
        ]),
        Warehouse.find().lean(),
        ProductPrice.find().lean(),
        ProductHolding.find().lean(),
    ]);

    const inventorySummary = inventoryAggregation[0] || {};
    const warehouseDocs = warehouseData || [];
    const inventoryDocs = await Inventory.find().populate("product").lean();

    const warehouseSummary = warehouseDocs.map((warehouse) => {
        const warehouseInventory = inventoryDocs.filter(
            (item) => item.warehouse?.toString() === warehouse._id.toString()
        );

        const usedStock = warehouseInventory.reduce((sum, item) => {
            const product = item.product;
            const unit = product?.unit || "KG";
            const stock = Number(item.stock || 0);
            return sum + convertQuantityToKg(stock, unit);
        }, 0);

        const capacity = Number(warehouse.capacity || 0);
        const utilization = calculateWarehouseUsagePercent(capacity, usedStock);

        return {
            ...warehouse,
            totalStock: usedStock,
            utilization: Number.isFinite(utilization) ? Number(utilization.toFixed(2)) : 0,
        };
    });

    return {
        inventoryValue: Number(inventorySummary.totalInventoryValue || 0),
        totalStock: Number(inventorySummary.totalStock || 0),
        warehouseSummary,
        priceDocs: productPrices,
        holdingDocs: productHoldings,
    };
};

module.exports = {
    getAdminDashboardMetrics,
};
